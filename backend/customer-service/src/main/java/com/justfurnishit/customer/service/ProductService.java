package com.justfurnishit.customer.service;

import com.justfurnishit.customer.client.DesignerClient;
import com.justfurnishit.customer.dto.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private DesignerClient designerClient;

    public List<Product> getAllProducts() {
        return designerClient.getAllProducts();
    }

    public List<Product> searchProducts(String category, String theme, Double minPrice, Double maxPrice) {
        return getAllProducts().stream()
                .filter(p -> category == null || p.getCategory().equalsIgnoreCase(category))
                .filter(p -> theme == null || p.getTheme().equalsIgnoreCase(theme))
                .filter(p -> minPrice == null || p.getPrice() >= minPrice)
                .filter(p -> maxPrice == null || p.getPrice() <= maxPrice)
                .collect(Collectors.toList());
    }
    public Product getProductById(Long id) {
        return designerClient.getProductById(id);
    }
}
