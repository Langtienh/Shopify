package com.example.ecommerce.configurations;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary(){
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dj7ivh0ph",
                "api_key", "564415429986211",
                "api_secret", "rn6qr-yP0LHhDd79QBo__Pm6UPs",
                "secure",true
        ));
    }
}
