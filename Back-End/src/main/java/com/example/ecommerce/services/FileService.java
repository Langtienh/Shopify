package com.example.ecommerce.services;

import com.example.ecommerce.dtos.FileDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FileService {
    void uploadProductFile(FileDTO fileDTO, long id);

    void uploadUserFile(FileDTO fileDTO, long id);
}
