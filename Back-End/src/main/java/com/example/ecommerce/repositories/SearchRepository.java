package com.example.ecommerce.repositories;

import com.example.ecommerce.exceptions.InvalidParamException;
import com.example.ecommerce.exceptions.ResourceNotFoundException;
import com.example.ecommerce.models.*;
import com.example.ecommerce.repositories.custom.ProductCustom;
import com.example.ecommerce.repositories.custom.SearchProduct;
import com.example.ecommerce.responses.PageResponse;
import com.example.ecommerce.responses.ProductResponse;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.*;
import jakarta.persistence.criteria.Order;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.query.sqm.PathElementException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
@Slf4j
public class SearchRepository {
    @PersistenceContext
    private EntityManager entityManager;
    private final ProductAttributeRepository productAttributeRepository;
    private final BrandRepository brandRepository;
    /**
     * api/v1/products?brand=iphone&category=smartphone&search=name:iphone,price>25000000&page=1&limit=10&sort=price:desc
     * */
    public PageResponse searchProduct(
            int page, int limit, String brand,String category, String[] search, boolean active,
            String... sort) {
        if(StringUtils.hasLength(brand) && brandRepository.findByName(brand) == null)
            throw new ResourceNotFoundException("Brand not found");
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<ProductCustom> query = builder.createQuery(ProductCustom.class);
        Root<Product> pRoot = query.from(Product.class);
        Join<Product, Comment> commentJoin = pRoot.join("comments", JoinType.LEFT);

        List<Predicate> predicates = new ArrayList<>();
        List<Order> orders = new ArrayList<>();
        try{
            // Lấy ra các product có active = true
            predicates.add(builder.equal(pRoot.get("active"), active));
            // Brand
            if(StringUtils.hasLength(brand)){
                Join<Product, Brand> bJoin = pRoot.join("brand");
                Predicate predicate = builder.equal(bJoin.get("name"), brand);
                predicates.add(predicate);
            }

            // Category
            if(StringUtils.hasLength(category)){
                Join<Product, Category> cJoin = pRoot.join("category");
                Predicate predicate = builder.equal(cJoin.get("name"), category);
                predicates.add(predicate);
            }

            // Nếu cột rate bị comment bị null sẽ thay thế bằng 0
            Expression<Double> averageRate = builder.avg(
                    builder.coalesce(commentJoin.get("rate"), 0)
            );
            // Select
            query.multiselect(pRoot.get("id"),
                    pRoot.get("name"),
                    pRoot.get("price"),
                    pRoot.get("discount"),
                    pRoot.get("stock"),
                    pRoot.get("viewCount"),
                    averageRate,
                    pRoot.get("description"),
                    pRoot.get("image"),
                    pRoot.get("discountForMember"),
                    pRoot.get("active"),
                    pRoot.get("brand"),
                    pRoot.get("category")
                    );

            page = page > 0 ? page - 1 : page;

            // Search
            if(search != null){
                List<SearchProduct> searchProducts = new ArrayList<>();
                for(String s : search){
                    Pattern pattern = Pattern.compile("(.*)(:|>|<)(.*)");
                    Matcher matcher = pattern.matcher(s);
                    if(matcher.find()){
                        SearchProduct searchProduct
                                = new SearchProduct(matcher.group(1),matcher.group(2),matcher.group(3));
                        searchProducts.add(searchProduct);
                    }
                }
                List<String> fields = Arrays.stream(Product.class.getDeclaredFields())
                        .map(Field::getName)
                        .toList();
                for(SearchProduct searchProduct : searchProducts){
                    String key = searchProduct.getKey();
                    String value = searchProduct.getValue().toString();
                    if(fields.contains(key)){
                        if(searchProduct.getOperation().equals(">")){
                            predicates.add(builder.greaterThanOrEqualTo(pRoot.get(key),
                                    Float.parseFloat(value)));
                        }
                        else if(searchProduct.getOperation().equals("<")){
                            predicates.add(builder.lessThanOrEqualTo(pRoot.get(key),
                                    Float.parseFloat(value)));
                        }
                        else{
                            predicates.add(builder.like(pRoot.get(key),
                                    "%"+value+"%"));
                        }
                    }
                    else{
                        Join<Product, ProductAttribute> paJoin = pRoot.join("productAttributes");
                        predicates.add(builder.equal(paJoin.get("attribute").get("slug"), key));
                        predicates.add(builder.equal(paJoin.get("slug"), value));
                    }
                }
            }

            // Sort

            if(sort != null){
                for(String s : sort){
                    //firstName:asc
                    Pattern pattern = Pattern.compile("(.*)(:)(asc|desc)");
                    Matcher matcher = pattern.matcher(s);
                    if(matcher.find()){
                        String key = matcher.group(1);
                        if(matcher.group(3).equals("asc")){
                            if(key.equalsIgnoreCase("rate"))
                                orders.add(builder.asc(builder.avg(commentJoin.get("rate"))));
                            else
                                orders.add(builder.asc(pRoot.get(key)));
                        }
                        else{
                            if(key.equalsIgnoreCase("rate"))
                                orders.add(builder.desc(builder.avg(commentJoin.get("rate"))));
                            else
                                orders.add(builder.desc(pRoot.get(key)));
                        }
                    }
                }
            }
        }
        catch (PathElementException e){
          throw new InvalidParamException(e.getMessage());
        }
        query.where(predicates.toArray(new Predicate[0]));
        query.groupBy(pRoot.get("id"),
                pRoot.get("name"),
                pRoot.get("price"),
                pRoot.get("discount"),
                pRoot.get("stock"),
                pRoot.get("viewCount"),
                pRoot.get("description"),
                pRoot.get("image"),
                pRoot.get("discountForMember"),
                pRoot.get("active"),
                pRoot.get("brand"),
                pRoot.get("category")
        );
        query.orderBy(orders);

        long totalPage = entityManager.createQuery(query).getResultList().size();

        List<ProductCustom> productCustoms = entityManager.createQuery(query)
                .setFirstResult(page * limit)
                .setMaxResults(limit).getResultList();
        Pageable pageable = PageRequest.of(page,limit);
        Page<?> pageImpl = new PageImpl<ProductCustom>(productCustoms, pageable, totalPage);
        return PageResponse.builder()
                .page(page+1)
                .limit(limit)
                .totalPage(pageImpl.getTotalPages())
                .totalItem((int)pageImpl.getTotalElements())
                .result(pageImpl.getContent().stream()
                        .map(p -> {
                            Product product = Product.fromProductCustom((ProductCustom) p);
                            return ProductResponse.fromProduct(product,
                                    ((ProductCustom) p).getAvgRate(),
                                    productAttributeRepository.findAllByProduct(product));
                        })
                        .toList())
                .build();
    }

}
