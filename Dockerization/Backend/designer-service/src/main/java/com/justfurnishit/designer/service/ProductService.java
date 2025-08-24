package com.justfurnishit.designer.service;

import com.justfurnishit.designer.client.UserClient;
import com.justfurnishit.designer.model.Product;
import com.justfurnishit.designer.model.UserDto;
import com.justfurnishit.designer.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class ProductService {

    @Autowired
    private ProductRepository repo;

    @Autowired
    private FileStorageService fs;

    @Autowired
    private UserClient userClient;

    public Product create(Long userId, Product product, byte[] image) {
        product.setUserId(userId);
        product.setImage(image);
        return repo.save(product);
    }

    public List<Product> list(Long userId) {
        UserDto user = userClient.getUserById(userId);
        List<Product> products = repo.findByUserId(userId);
        for (Product product : products) {
            product.setUserName(user.getFullName());
        }
        return products;
    }

    public Product update(Long id, Product input, byte[] imageBytes) {
        Product existingProduct = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));

        existingProduct.setShortBio(input.getShortBio());
        existingProduct.setTheme(input.getTheme());
        existingProduct.setCategory(input.getCategory());
        existingProduct.setDescription(input.getDescription());
        existingProduct.setPrice(input.getPrice());

        if (imageBytes != null && imageBytes.length > 0) {
            existingProduct.setImage(imageBytes);
        }

        return repo.save(existingProduct);
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Product not found with ID: " + id);
        }
        repo.deleteById(id);
    }

    public List<Product> getAllProducts() {
        List<Product> products = repo.findAll();
        for (Product product : products) {
            try {
                UserDto user = userClient.getUserById(product.getUserId());
                product.setUserName(user.getFullName());
            } catch (Exception e) {
                product.setUserName("Unknown");
            }
        }
        return products;
    }

    public Product getProductById(Long id) {
        Product product = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));

        try {
            UserDto user = userClient.getUserById(product.getUserId());
            product.setUserName(user.getFullName());
        } catch (Exception e) {
            product.setUserName("Unknown");
        }

        return product;
    }
}
