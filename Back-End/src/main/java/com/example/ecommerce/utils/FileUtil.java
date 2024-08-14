package com.example.ecommerce.utils;

import com.example.ecommerce.exceptions.InvalidFileTypeException;
import com.example.ecommerce.exceptions.InvalidParamException;
import com.example.ecommerce.services.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

@Component
@RequiredArgsConstructor
public class FileUtil {
    private final CloudinaryService cloudinaryService;

    public List<String> uploadFile(List<MultipartFile> files) {
        List<String> images = new ArrayList<>();
        isFileValid(files);

        // Tạo một ExecutorService với một số lượng luồng cố định
        ExecutorService executorService = Executors.newFixedThreadPool(files.size());
        List<Future<String>> futures = new ArrayList<>();

        // Đặt các tác vụ tải lên vào hàng đợi
        for (MultipartFile file : files) {
            Future<String> future = executorService.submit(() -> {
                try {
                    return cloudinaryService.uploadFile(file);
                } catch (Exception e) {
                    throw new RuntimeException(e.getMessage());
                }
            });
            futures.add(future);
        }

        // Chờ cho tất cả các tác vụ hoàn tất và thu thập kết quả
        for (Future<String> future : futures) {
            try {
                images.add(future.get());
            } catch (InterruptedException | ExecutionException e) {
                throw new RuntimeException(e.getMessage()); // Xử lý lỗi một cách hợp lý
            }
        }

        // Đóng ExecutorService sau khi hoàn tất
        executorService.shutdown();

        return images;
    }

    private void isFileValid(List<MultipartFile> files){
        if(files.size() > 4){
            throw new InvalidParamException("Chỉ được upload tối đa 4 hình ảnh");
        }
        for(MultipartFile file : files){
            if(file != null){
                String originalFilename = file.getOriginalFilename();
                if (originalFilename == null || !(originalFilename.endsWith(".jpg") || originalFilename.endsWith(".png"))) {
                    throw new InvalidFileTypeException("Chỉ được phép sử dụng file ảnh có đuôi .jpg và .png");
                }
            }
        }
    }
}
