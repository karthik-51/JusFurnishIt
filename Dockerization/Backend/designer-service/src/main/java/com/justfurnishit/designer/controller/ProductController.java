package com.justfurnishit.designer.controller;

import com.justfurnishit.designer.model.Product;
import com.justfurnishit.designer.repository.ProductRepository;
import com.justfurnishit.designer.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/maindesigner")
public class ProductController {

    @Autowired private ProductService service;
    
    @Autowired
    private ProductRepository productRepository;

    @PostMapping("/{userId}/products")
    public Product create(@PathVariable Long userId,
                          @RequestPart("data") @Valid Product product,
                          @RequestPart("image") MultipartFile file) throws IOException {
        return service.create(userId, product, file.getBytes());
    }
  
    @GetMapping("/api/designer/products/{productId}")
    public Product getProductById(@PathVariable Long productId) {
        return service.getProductById(productId);
    }

    @GetMapping("/products/{productId}")
    public Product getById(@PathVariable Long productId) {
        return service.getProductById(productId);
    }


    @GetMapping("/{userId}/products")
    public List<Product> list(@PathVariable Long userId) {
        return service.list(userId);
    }

    @PutMapping("/{id}")
    public Product update(@PathVariable Long userId,
                          @PathVariable Long id,
                          @RequestPart("data") @Valid Product product,
                          @RequestPart(value = "image", required = false) MultipartFile file) throws IOException {

        byte[] imageBytes = (file != null && !file.isEmpty()) ? file.getBytes() : null;
        return service.update(id, product, imageBytes);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
    
    @PostMapping("/api/products/by-ids")
    public List<Product> getProductsByIds(@RequestBody Map<String, List<Long>> body) {
        List<Long> ids = body.get("ids");
        return productRepository.findAllById(ids);
    }
    
//    @GetMapping("/api/products/{productId}/category")
//    public ResponseEntity<String> getCategoryByProductId(@PathVariable Long productId) {
//        Product product = service.getProductById(productId);
//        if (product != null) {
//            return ResponseEntity.ok(product.getCategory());
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }


}
