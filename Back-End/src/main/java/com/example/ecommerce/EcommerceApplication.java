package com.example.ecommerce;

import com.example.ecommerce.models.Product;
import com.example.ecommerce.repositories.OrderRepository;
import com.example.ecommerce.services.OrderService;
import io.github.cdimascio.dotenv.Dotenv;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class EcommerceApplication {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderService orderService;
    public static void main(String[] args) {
        Dotenv dotenv = Dotenv.configure()
                .directory(".")
                .filename("local.env")
                .load();

        // Database
        System.setProperty("APP_PORT", dotenv.get("APP_PORT"));
        System.setProperty("DATABASE_URL", dotenv.get("DATABASE_URL"));
        System.setProperty("DATABASE_USER", dotenv.get("DATABASE_USER"));
        System.setProperty("DATABASE_PASSWORD", dotenv.get("DATABASE_PASSWORD"));

        // Mail
        System.setProperty("MAIL_USER", dotenv.get("MAIL_USER"));
        System.setProperty("MAIL_PASSWORD", dotenv.get("MAIL_PASSWORD"));

        // Api prefix
        System.setProperty("API_PREFIX", dotenv.get("API_PREFIX"));

        // Jwt
        System.setProperty("JWT_EXPIRATION", dotenv.get("JWT_EXPIRATION"));
        System.setProperty("JWT_REFRESH_EXPIRATION", dotenv.get("JWT_REFRESH_EXPIRATION"));
        System.setProperty("JWT_SECRET_KEY", dotenv.get("JWT_SECRET_KEY"));

        // Payment
        System.setProperty("PAYMENT_URL", dotenv.get("PAYMENT_URL"));
        System.setProperty("PAYMENT_TMN_CODE", dotenv.get("PAYMENT_TMN_CODE"));
        System.setProperty("PAYMENT_SECRET_KEY", dotenv.get("PAYMENT_SECRET_KEY"));
        System.setProperty("PAYMENT_RETURN_URL", dotenv.get("PAYMENT_RETURN_URL"));

        // Cloudinary
        System.setProperty("CLOUDINARY_NAME", dotenv.get("CLOUDINARY_NAME"));
        System.setProperty("CLOUDINARY_API_KEY", dotenv.get("CLOUDINARY_API_KEY"));
        System.setProperty("CLOUDINARY_API_SECRET", dotenv.get("CLOUDINARY_API_SECRET"));

        SpringApplication.run(EcommerceApplication.class, args);
    }
    @Bean
    public CommandLineRunner commandLineRunner(){
        return runner -> {
//            List<Field> fields = Arrays.asList(Product.class.getDeclaredFields());
//            for(Field f : fields){
//                System.out.println(f.getName());
//            }
//            List<Object[]> result = orderRepository.findMonthlyProductQuantityByCategory(2024);
//            for(Object[] ob : result){
//                System.out.println(ob[0] + " " + ob[1] + " " + ob[2]);
//            }
//            List<?> result = orderService.findMonthlyProductQuantityByCategory(2024);
//            System.out.println("ok");
//            String a = "màn hình";
//            // Chuyển đổi các ký tự có dấu thành không có dấu
//            a = StringUtils.stripAccents(a);
//            // Thay thế khoảng trắng bằng dấu gạch nối
//            a = a.replace(" ", "-");
//            System.out.println(a);  // Kết quả: "man-hinh"
        };
    }
}
