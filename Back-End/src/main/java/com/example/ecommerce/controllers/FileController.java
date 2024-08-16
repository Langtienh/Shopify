package com.example.ecommerce.controllers;

import com.example.ecommerce.dtos.FileDTO;
import com.example.ecommerce.responses.ResponseSuccess;
import com.example.ecommerce.services.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/files")
@RequiredArgsConstructor
public class FileController {
    private final FileService fileService;

    @PostMapping(value = "/upload/user/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("#id == authentication.principal.id or hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponseSuccess> uploadUserFile(@PathVariable("id") long id,
                                                      @ModelAttribute FileDTO fileDTO){
        fileService.uploadUserFile(fileDTO, id);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Upload file successfully")
                .status(HttpStatus.CREATED.value())
                .build());
    }

    @PostMapping(value = "/upload/product/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponseSuccess> uploadProductFile(@PathVariable("id") long id,
                                                      @ModelAttribute FileDTO fileDTO){
        fileService.uploadProductFile(fileDTO, id);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Upload file successfully")
                .status(HttpStatus.CREATED.value())
                .build());
    }
}
