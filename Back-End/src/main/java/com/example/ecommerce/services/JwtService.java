package com.example.ecommerce.services;

import com.example.ecommerce.models.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${jwt.secretKey}")
    private String secretKey;
    @Value("${jwt.expiration}")
    private int expiration;

    public String generateToken(User user){
        // properties => claims
        Map<String, Object> claims = new HashMap<>();

        // Đưa các thuộc tính vào claims
        claims.put("username",user.getUsername());
        Date currentTime = new Date(System.currentTimeMillis());
        Date expirationTime = new Date(System.currentTimeMillis() + expiration);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getUsername())
                .setIssuedAt(currentTime)
                .setExpiration(expirationTime)
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Kiểm tra token có hợp lệ hay không
    public boolean isTokenValid(String token, UserDetails userDetails){
        final String username = extractUsername(token);
        // Trả về true khi username trong token equals username trong userDetails và token còn hạn
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    // Kiểm tra hạn token
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Lấy ra hạn token
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // Lấy username từ chuỗi jwt
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }


    // Lấy riêng 1 claims ta muốn
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Lấy ra tất cả claims
    private Claims extractAllClaims(String token){
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    private Key getSignInKey(){
        byte[] bytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(bytes);
    }
}