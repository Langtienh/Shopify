package com.example.ecommerce.utils;

import com.example.ecommerce.exceptions.InvalidFileTypeException;
import com.example.ecommerce.services.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
@RequiredArgsConstructor
public class FileUtil {
    private final CloudinaryService cloudinaryService;

    public String uploadFile(MultipartFile file){
        if(file != null){
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                throw new InvalidFileTypeException("File is not a valid image.");
            }
            try{
                return cloudinaryService.uploadFile(file);
            }
            catch (Exception e){
                throw new RuntimeException(e.getMessage());
            }
        }
        return "";
    }
}
