package com.example.ecommerce;

import com.example.ecommerce.models.Product;
import com.example.ecommerce.repositories.OrderRepository;
import com.example.ecommerce.services.OrderService;
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
            List<?> result = orderService.findMonthlyProductQuantityByCategory(2024);
            System.out.println("ok");
        };
    }
}
