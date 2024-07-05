package com.example.ecommerce;

import com.example.ecommerce.models.Product;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class EcommerceApplication {

    public static void main(String[] args) {
        SpringApplication.run(EcommerceApplication.class, args);
    }
    @Bean
    public CommandLineRunner commandLineRunner(){
        return runner -> {
//            List<Field> fields = Arrays.asList(Product.class.getDeclaredFields());
//            for(Field f : fields){
//                System.out.println(f.getName());
//            }
        };
    }
}
