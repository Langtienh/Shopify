package com.example.ecommerce.services.impl;

import com.example.ecommerce.dtos.FileDTO;
import com.example.ecommerce.exceptions.InvalidParamException;
import com.example.ecommerce.exceptions.ResourceNotFoundException;
import com.example.ecommerce.models.Product;
import com.example.ecommerce.models.User;
import com.example.ecommerce.repositories.ProductRepository;
import com.example.ecommerce.repositories.UserRepository;
import com.example.ecommerce.services.FileService;
import com.example.ecommerce.utils.FileUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {
    private final FileUtil fileUtil;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    @Override
    public void uploadProductFile(FileDTO fileDTO, long id) {
        checkValidFile(fileDTO.getFiles());
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id = " + id));
        List<String> image = fileUtil.uploadFile(fileDTO.getFiles());
        product.setImage(image.get(0));
        productRepository.save(product);
    }

    @Override
    public void uploadUserFile(FileDTO fileDTO, long id) {
        checkValidFile(fileDTO.getFiles());
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id = " + id));
        List<String> avatar = fileUtil.uploadFile(fileDTO.getFiles());
        user.setAvatar(avatar.get(0));
        userRepository.save(user);
    }

    private void checkValidFile(List<MultipartFile> files){
        if(files.isEmpty()){
            throw new InvalidParamException("Files không được trống");
        }
        if(files.size() > 1)
            throw new InvalidParamException("Chỉ được upload 1 file hình ảnh");
    }
}
