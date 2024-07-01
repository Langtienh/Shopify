package com.example.ecommerce.utils;

import com.example.ecommerce.models.Order;
import com.example.ecommerce.models.OrderDetail;
import com.example.ecommerce.models.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.text.DecimalFormat;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmailTemplate {
    private Order order;
    private List<OrderDetail> orderDetails;
    private final DecimalFormat decimalFormat = new DecimalFormat("#,### VND");
    private final DateTimeFormatter dateTimeFormat = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");

    public String body(){
        String body = "";
        body += "<div marginwidth=\"0\" marginheight=\"0\"\n" +
                "    style=\"font-size:13px;line-height:24px!important;font-family:arial;background:#eee;padding:5px\">\n" +
                "    <center>\n" +
                "      <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"\n" +
                "        style=\"font-family:arial;max-width:600px;color:#333333;text-align:center;border-bottom-width:2px;border-bottom-style:solid;border-bottom-color:#c9c9c9;border-top-left-radius:5px;border-top-right-radius:5px;border-top-width:5px;border-top-style:solid;border-top-color:#1775bc;margin-top:50px;background-image:initial;background-size:initial;background-origin:initial;background-clip:initial;background-position:initial;background-repeat:initial;background:#fff\">\n" +
                "        <tbody>\n" +
                "          <tr>\n" +
                "            <td style=\"padding:30px 0px 0px\">\n" +
                "              <h1><a href=\"http://localhost:8080/\" style=\"color:#333333;text-decoration:none\" target=\"_blank\">CELLPHONES</a></h1>\n" +
                "              <hr\n" +
                "                style=\"width:570px;margin:0px auto;border-top-style:solid;border-top-color:#c9c9c9;border-bottom-style:none\">\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "          <tr>\n" +
                "            <td align=\"left\" style=\"padding:20px;line-height:24px\">\n" +
                "              <p>Hello <b>" +order.getFullName()+ "</b>,</p>";
        body += "<p>Thank you for ordering at <b>CELLPHONES</b>! We are sending you this email to confirm order <b>#"+order.getId()+"</b> just placed</p>\n" +
                "              <table width=\"100%\" style=\"padding:10px\">\n" +
                "                <tbody>\n" +
                "                  <tr>\n" +
                "                    <td colspan=\"4\">\n" +
                "                      <p style=\"margin-bottom:15px\">Code orders: <b>#"+order.getId()+"</b></p>\n" +
                "                    </td>\n" +
                "                  </tr>\n" +
                "                  <tr>\n" +
                "                    <td>Image</td>\n" +
                "                    <td width=\"200px\">Product name</td>\n" +
                "                    <td>Quantity</td>\n" +
                "                    <td>Price</td>\n" +
                "                  </tr>";
        for(OrderDetail orderDetail : orderDetails){
            Product p = orderDetail.getProduct();
            body += "<tr>\n" +
                    "                    <td>\n" +
                    "                      <p style=\"padding-right:10px\"><img\n" +
                    "                          src=\""+p.getImage()+"\"\n" +
                    "                          width=\"100px\" class=\"CToWUd\" data-bit=\"iit\"></p>\n" +
                    "                    </td>\n" +
                    "                    <td width=\"200px\">\n" +
                    "                      <p>"+p.getName()+"</p>\n" +
                    "                    </td>\n" +
                    "                    <td>"+orderDetail.getQuantity()+"</td>\n" +
                    "                    <td>"+decimalFormat.format(orderDetail.getPrice())+"</td>\n" +
                    "                  </tr>";
        }
        body += "<tr>\n" +
                "                    <td colspan=\"4\">\n" +
                "                      <hr>\n" +
                "                    </td>\n" +
                "                  </tr>\n" +
                "                  <tr>\n" +
                "                    <td colspan=\"2\">Total product value</td>\n" +
                "                    <td colspan=\"2\">"+decimalFormat.format(order.getTotalPrice())+"</td>\n" +
                "                  </tr>\n" +
                "                </tbody>\n" +
                "              </table>\n" +
                "              <table width=\"100%\" style=\"padding:10px\">\n" +
                "                <tbody>";
        body += "<tr>\n" +
                "                    <td>Order date</td>\n" +
                "                    <td>"+dateTimeFormat.format(order.getOrderDate())+"</td>\n" +
                "                  </tr>\n" +
                "                  <tr>\n" +
                "                    <td>Address</td>\n" +
                "                    <td>\n" +
                "                      <p>"+order.getFullName()+"</p>\n" +
                "                      <p>"+order.getAddress()+"</p>\n" +
                "                      <p>"+order.getPhone()+"</p>\n" +
                "                    </td>\n" +
                "                  </tr>\n" +
                "                </tbody>\n" +
                "              </table>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "        </tbody>\n" +
                "      </table>\n" +
                "    </center>\n" +
                "  </div>";
        return body;
    }
}
