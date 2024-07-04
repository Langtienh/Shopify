package com.example.ecommerce.repositories;

import com.example.ecommerce.exceptions.ResourceNotFoundException;
import com.example.ecommerce.models.Brand;
import com.example.ecommerce.models.Category;
import com.example.ecommerce.models.Product;
import com.example.ecommerce.repositories.custom.SearchProduct;
import com.example.ecommerce.responses.PageResponse;
import com.example.ecommerce.responses.ProductResponse;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Repository
@RequiredArgsConstructor
public class SearchRepository {
    @PersistenceContext
    private EntityManager entityManager;
    private final ProductAttributeRepository productAttributeRepository;
    private final BrandRepository brandRepository;
    /**
     * api/v1/products?brand=iphone&category=smartphone&search=name:iphone,price>25000000&page=1&limit=10&sort=price:desc
     * */
    public PageResponse getAllProducts(
            int page, int limit, String brand,String category, String[] search, String... sort) {
        if(StringUtils.hasLength(brand) && brandRepository.findByName(brand) == null)
            throw new ResourceNotFoundException("Brand not found");
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Product> query = builder.createQuery(Product.class);
        Root<Product> pRoot = query.from(Product.class);

        List<Predicate> predicates = new ArrayList<>();

        // Lấy ra các product có active = true
        predicates.add(builder.equal(pRoot.get("active"), true));
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

        // Select
        query.select(pRoot);

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
            for(SearchProduct searchProduct : searchProducts){
                if(searchProduct.getOperation().equals(">")){
                    predicates.add(builder.greaterThanOrEqualTo(pRoot.get(searchProduct.getKey()),
                            Float.parseFloat(searchProduct.getValue().toString())));
                }
                else if(searchProduct.getOperation().equals("<")){
                    predicates.add(builder.lessThanOrEqualTo(pRoot.get(searchProduct.getKey()),
                            Float.parseFloat(searchProduct.getValue().toString())));
                }
                else{
                    predicates.add(builder.like(pRoot.get(searchProduct.getKey()),
                            "%"+searchProduct.getValue().toString()+"%"));
                }
            }
        }

        // Sort
        List<Order> orders = new ArrayList<>();
        if(sort != null){
            for(String s : sort){
                //firstName:asc
                Pattern pattern = Pattern.compile("(.*)(:)(asc|desc)");
                Matcher matcher = pattern.matcher(s);
                if(matcher.find()){
                    if(matcher.group(3).equals("asc")){
                        orders.add(builder.asc(pRoot.get(matcher.group(1))));
                    }
                    else{
                        orders.add(builder.desc(pRoot.get(matcher.group(1))));
                    }
                }
            }
        }
        query.where(predicates.toArray(new Predicate[0]));
        query.orderBy(orders);

        long totalPage = entityManager.createQuery(query).getResultList().size();

        List<Product> products = entityManager.createQuery(query)
                .setFirstResult(page * limit)
                .setMaxResults(limit).getResultList();
        Pageable pageable = PageRequest.of(page,limit);
        Page<?> pageImpl = new PageImpl<Product>(products, pageable, totalPage);
        return PageResponse.builder()
                .page(page+1)
                .limit(limit)
                .totalPage(pageImpl.getTotalPages())
                .totalItem((int)pageImpl.getTotalElements())
                .result(pageImpl.stream()
                        .map(p -> ProductResponse.fromProduct((Product) p,
                                productAttributeRepository.findAllByProduct((Product) p))))
                .build();
    }
}
