package com.justfurnishit.customer.client;

import com.justfurnishit.customer.dto.Design;
import com.justfurnishit.customer.dto.Product;
import com.justfurnishit.customer.dto.DesignerProfile;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@FeignClient(name = "designer-service", url = "http://localhost:8082")
public interface DesignerClient {

    @GetMapping("/api/designer/{userId}/designs")
    List<Design> getDesignsByDesigner(@PathVariable("userId") Long userId);

    @GetMapping("/api/designer/{userId}/products")
    List<Product> getProductsByDesigner(@PathVariable("userId") Long userId);

    @GetMapping("/api/designer/{userId}/profile")
    DesignerProfile getDesignerProfile(@PathVariable("userId") Long userId);

    @GetMapping("/api/designer/designs")
    List<Design> getAllDesigns();

    @GetMapping("/api/designer/products")
    List<Product> getAllProducts();

    @GetMapping("/api/designer/designs/{id}")
    Design getDesignById(@PathVariable("id") Long id);

    
    @GetMapping("/api/designer/products/{id}")
    Product getProductById(@PathVariable("id") Long id);
}
