package com.example.ecommerce.repositories;

import com.example.ecommerce.enums.OrderStatus;
import com.example.ecommerce.models.Order;
import com.example.ecommerce.models.User;
import com.example.ecommerce.responses.RevenueStatistic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Page<Order> findAllByUser(User user, Pageable pageable);
    long countAllByOrderStatus(OrderStatus orderStatus);
    @Query("select sum(o.totalPrice) from Order o")
    double totalPriceOrder();
    @Query("select month(o.orderDate), sum(o.totalPrice) " +
            "from Order o " +
            "where year(o.orderDate) = ?1 " +
            "group by month(o.orderDate) " +
            "order by month(o.orderDate)")
    List<Object[]> getOrderByMonthInYear(int year);
    @Query("select day(o.orderDate), sum(o.totalPrice) " +
            "from Order o " +
            "where month(o.orderDate) = ?1 and year(o.orderDate) = ?2 " +
            "group by day(o.orderDate) " +
            "order by day(o.orderDate)")
    List<Object[]> getOrderByDayInMonth(int month, int year);
    @Query("select month(o.orderDate), sum(od.quantity), c.name from Order o " +
            "join OrderDetail od on o = od.order " +
            "join Product p on p = od.product " +
            "join Category c on c = p.category " +
            "where year(o.orderDate) = ?1 " +
            "group by month(o.orderDate), c.name " +
            "order by month(o.orderDate)")
    List<Object[]> findMonthlyProductQuantityByCategory(int year);
    @Query("select day(o.orderDate), sum(od.quantity), c.name from Order o " +
            "join OrderDetail od on o = od.order " +
            "join Product p on p = od.product " +
            "join Category c on c = p.category " +
            "where month(o.orderDate) = ?1 and  year(o.orderDate) = ?2 " +
            "group by day(o.orderDate), c.name " +
            "order by day(o.orderDate)")
    List<Object[]> findDailyProductQuantityByCategory(int month, int year);
}
