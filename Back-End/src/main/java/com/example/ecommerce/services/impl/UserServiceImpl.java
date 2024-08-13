package com.example.ecommerce.services.impl;

import com.example.ecommerce.dtos.*;
import com.example.ecommerce.exceptions.*;
import com.example.ecommerce.models.*;
import com.example.ecommerce.repositories.*;
import com.example.ecommerce.responses.*;
import com.example.ecommerce.services.EmailService;
import com.example.ecommerce.services.JwtService;
import com.example.ecommerce.services.TokenService;
import com.example.ecommerce.services.UserService;
import com.example.ecommerce.utils.EmailTemplate;
import com.example.ecommerce.utils.FileUtil;
import com.example.ecommerce.utils.SendOtpTemplate;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final TokenService tokenService;
    private final ForgotPasswordRepository forgotPasswordRepository;
    private final EmailService emailService;
    private final CartRepository cartRepository;
    private final FileUtil fileUtil;
    @Value("${jwt.refreshExpiration}")
    private int refreshExpiration;
    @Override
    @Transactional
    public void createUser(RegisterDTO registerDTO) {
        Role role = roleRepository.findByName("user");
        User user = User.builder()
                .fullName(registerDTO.getFullName())
                .phone(registerDTO.getPhone())
                .password(passwordEncoder.encode(registerDTO.getPassword()))
                .email(registerDTO.getEmail())
                .address(registerDTO.getAddress())
                .active(true)
                .build();
        userRepository.save(user);
        List<String> avatar = fileUtil.uploadFile(List.of(registerDTO.getAvatar()));
        if(!avatar.isEmpty()){
            user.setAvatar(avatar.get(0));
        }
        userRepository.save(user);
        Cart cart = Cart.builder()
                .user(user)
                .build();
        cartRepository.save(cart);
        UserRole userRole = UserRole.builder()
                .user(user)
                .role(role)
                .build();
        userRoleRepository.save(userRole);
    }

    @Override
    public UserResponse getUserById(long id) {
        User user = findById(id);
        return UserResponse.fromUser(user);
    }

    @Override
    public PageResponse getAllUsers(int page, int limit, String name) {
        page = page > 0 ? page - 1 : page;
        Pageable pageable = PageRequest.of(page, limit);
        Page<User> userPage = userRepository.findAllByFullName(name, pageable);
        return PageResponse.builder()
                .page(page + 1)
                .limit(limit)
                .totalPage(userPage.getTotalPages())
                .totalItem((int)userPage.getTotalElements())
                .result(userPage.stream().map(UserResponse::fromUser).toList())
                .build();
    }

    @Override
    @Transactional
    public UserResponse updateUser(long id, UserDTO userDTO) {
        User user = findById(id);
        user.setFullName(userDTO.getFullName());
        user.setPhone(userDTO.getPhone());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setEmail(userDTO.getEmail());
        user.setAddress(userDTO.getAddress());
        userRepository.save(user);
        List<String> avatar = fileUtil.uploadFile(List.of(userDTO.getAvatar()));
        if(!avatar.isEmpty()){
            user.setAvatar(avatar.get(0));
        }
        userRepository.save(user);
        return UserResponse.fromUser(user);
    }

    @Override
    @Transactional
    public LoginResponse login(LoginDTO loginDTO, HttpServletRequest request) {
        User user = userRepository.findByPhone(loginDTO.getPhone())
                .orElseThrow(() -> new BadCredentialsException("Invalid Username or Password"));
        if(!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword()))
            throw new BadCredentialsException("Invalid Username or Password");
        String token = jwtService.generateToken(user);
        boolean isMobile = request.getHeader("User-Agent").equals("mobile");
        Token newToken =tokenService.addToken(user, token, isMobile);
        return LoginResponse.builder()
                .token(newToken.getToken())
                .refreshToken(newToken.getRefreshToken())
                .user(UserResponse.fromUser(user))
                .build();
    }

    @Override
    @Transactional
    public void logout(LogoutDTO logoutDTO) {
        tokenService.deleteToken(logoutDTO.getToken());
    }

    @Override
    @Transactional
    public LoginResponse refreshToken(RefreshTokenDTO refreshTokenDTO) {
        Token token = tokenService.getTokenByRefreshToken(refreshTokenDTO.getRefreshToken());
        if(token.getRefreshExpirationDate().isBefore(LocalDateTime.now()))
            throw new ResourceNotFoundException("RefreshToken expired");
        User user = token.getUser();
        Token newToken = tokenService.updateToken(Token.builder()
                .id(token.getId())
                .token(jwtService.generateToken(user))
                .refreshToken(UUID.randomUUID().toString())
                .refreshExpirationDate(LocalDateTime.now().plusSeconds(refreshExpiration/1000))
                .user(user)
                .isMobileDevice(token.isMobileDevice())
                .build());
        return LoginResponse.builder()
                .token(newToken.getToken())
                .refreshToken(newToken.getRefreshToken())
                .user(UserResponse.fromUser(user))
                .build();
    }

    @Override
    @Transactional
    public LoginResponse loginWithGoogle(LoginWithGoogle loginWithGoogle, HttpServletRequest request) {
        Role role = roleRepository.findByName("user");
        User user = User.builder()
                .fullName(loginWithGoogle.getFullName())
                .phone(loginWithGoogle.getPhone())
                .email(loginWithGoogle.getEmail())
                .avatar(loginWithGoogle.getAvatar())
                .active(true)
                .providerId(loginWithGoogle.getProviderId())
                .build();
        userRepository.save(user);
        Cart cart = Cart.builder()
                .user(user)
                .build();
        cartRepository.save(cart);
        UserRole userRole = UserRole.builder()
                .user(user)
                .role(role)
                .build();
        userRoleRepository.save(userRole);
        user.setUserRoles(List.of(userRole));
        String token = jwtService.generateToken(user);
        boolean isMobile = request.getHeader("User-Agent").equals("mobile");
        Token newToken =tokenService.addToken(user, token, isMobile);
        return LoginResponse.builder()
                .token(newToken.getToken())
                .refreshToken(newToken.getRefreshToken())
                .user(UserResponse.fromUser(user))
                .build();
    }

    @Override
    @Transactional
    public LoginResponse checkLoginWithGoogle(String providerId, HttpServletRequest request) {
        Optional<User> user = userRepository.findByProviderId(providerId);
        if(user.isEmpty())
            throw new LoginWithGoogleException("Login failed");
        String token = jwtService.generateToken(user.get());
        boolean isMobile = request.getHeader("User-Agent").equals("mobile");
        Token newToken =tokenService.addToken(user.get(), token, isMobile);
        return LoginResponse.builder()
                .token(newToken.getToken())
                .refreshToken(newToken.getRefreshToken())
                .user(UserResponse.fromUser(user.get()))
                .build();
    }

    @Override
    public User findById(long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id = " + id));
    }

    @Override
    @Transactional
    public UserResponse updateUserStatus(long id, boolean active) {
        User user = findById(id);
        Role role = user.getUserRoles().stream()
                .map(UserRole::getRole)
                .filter(role1 -> role1.getName().equalsIgnoreCase("admin"))
                .findFirst()
                .orElse(null);
        if(role != null)
            throw new InvalidParamException("Không được cập nhật trạng thái của tài khoản ADMIN");
        user.setActive(active);
        userRepository.save(user);
        return UserResponse.fromUser(user);
    }

    @Override
    @Transactional
    public UserResponse changePassword(long id, ChangePasswordDTO changePasswordDTO) {
        User user = findById(id);
        if(!passwordEncoder.matches(changePasswordDTO.getOldPassword(), user.getPassword()))
            throw new InvalidParamException("Mật khẩu không đúng");
        user.setPassword(passwordEncoder.encode(changePasswordDTO.getNewPassword()));
        userRepository.save(user);
        return UserResponse.fromUser(user);
    }

    @Override
    @Transactional
    public void sendMailForgotPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        Optional<ForgotPassword> existsForgotPassword = forgotPasswordRepository.findByUser(user);
        String otp = generateOtp();
        if(existsForgotPassword.isEmpty()){
            ForgotPassword forgotPassword = ForgotPassword.builder()
                    .otp(otp)
                    .otpExpirationDate(LocalDateTime.now().plusMinutes(1))
                    .otpToken(null)
                    .user(user)
                    .build();
            forgotPasswordRepository.save(forgotPassword);
        }
        else{
            ForgotPassword forgotPassword = existsForgotPassword.get();
            forgotPassword.setOtp(otp);
            forgotPassword.setOtpExpirationDate(LocalDateTime.now().plusMinutes(5));
            forgotPasswordRepository.save(forgotPassword);
        }
        // Send mail
        SendOtpTemplate sendOtpTemplate = new SendOtpTemplate(otp);
        emailService.sendEmail(email,
                "CellphoneS",sendOtpTemplate.body());
    }

    @Override
    @Transactional
    public VerifyOtpResponse verifyOtp(String otp, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        Optional<ForgotPassword> existsForgotPassword = forgotPasswordRepository.findByUser(user);
        if(existsForgotPassword.isEmpty()){
            throw new InvalidParamException("User does not have OTP code");
        }
        ForgotPassword forgotPassword = existsForgotPassword.get();
        if(!forgotPassword.getOtp().equals(otp)){
            throw new InvalidParamException("Invalid OTP code");
        }
        if(forgotPassword.getOtpExpirationDate().isBefore(LocalDateTime.now())){
            throw new InvalidParamException("OTP code expired");
        }
        String otpToken = UUID.randomUUID().toString();
        forgotPassword.setOtpToken(otpToken);
        forgotPasswordRepository.save(forgotPassword);
        return VerifyOtpResponse.builder()
                .userId(user.getId())
                .otpToken(otpToken)
                .build();
    }

    @Override
    @Transactional
    public void resetPassword(long id, ResetPasswordDTO resetPasswordDTO) {
        User user = findById(id);
        Optional<ForgotPassword> existsForgotPassword = forgotPasswordRepository.findByUser(user);
        if(existsForgotPassword.isEmpty()){
            throw new InvalidParamException("User does not have OTP code");
        }
        ForgotPassword forgotPassword = existsForgotPassword.get();
        if(!forgotPassword.getOtpToken().equals(resetPasswordDTO.getOtpToken())){
            throw new InvalidParamException("Invalid OTP token");
        }
        user.setPassword(passwordEncoder.encode(resetPasswordDTO.getNewPassword()));
        userRepository.save(user);
    }

    private String generateOtp(){
        StringBuilder builder = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 4; i++) {
            int digit = random.nextInt(10);
            builder.append(digit);
        }
        return builder.toString();
    }
}
