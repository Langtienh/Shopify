package com.example.ecommerce.utils;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SendOtpTemplate {
    private String otp;
    public String body(){
        String body = "<div>\n" +
                "  <div><a>CellphoneS</a></div>\n" +
                "  <p>Xin chào.</p>\n" +
                "  <p>Bạn đang đăng nhập vào hệ thống Smember của CellphoneS. Sử dụng mã OTP bên dưới để hoàn tất quá trình đăng nhập. Mã\n" +
                "    OTP chỉ có hiệu lực trong 1 phút.</p>\n" +
                "  <h2>"+ otp +"</h2>\n" +
                "  <p>Mọi thắc mắc, Quý khách vui lòng liên hệ tổng đài hỗ trợ 1800.2097 (Miền Nam) hoặc 1800.2044 (Miền Bắc) từ 8:00 -\n" +
                "    22:00.</p>\n" +
                "  <p>Trân trọng,<br>CellphoneS</p>\n" +
                "  </div>\n" +
                "</div>";
        return body;
    }
}
