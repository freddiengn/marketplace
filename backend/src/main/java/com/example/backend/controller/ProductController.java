package com.example.backend.controller;

import com.example.backend.dto.ProductDto;
import com.example.backend.response.ProductResponse;
import com.example.backend.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // Get all products
    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAllProducts() {
        List<ProductResponse> products = productService.getAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    // Get a product by ID
    @GetMapping("/{productId}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable Long productId) {
        ProductResponse product = productService.getProductById(productId);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    // Get products by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<ProductResponse>> getProductsByCategory(@PathVariable String category) {
        List<ProductResponse> products = productService.getProductsByCategory(category);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    // Get products by price range
    @GetMapping("/price")
    public ResponseEntity<List<ProductResponse>> getProductsByPriceRange(@RequestParam Double minPrice, @RequestParam Double maxPrice) {
        List<ProductResponse> products = productService.getProductsByPriceRange(minPrice, maxPrice);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    // Create a new product using ProductDto (with image)
    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(@ModelAttribute ProductDto productDto) throws IOException {
        ProductResponse createdProduct = productService.createProduct(productDto);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }

    // Update an existing product using ProductDto (with image)
    @PutMapping("/{productId}")
    public ResponseEntity<ProductResponse> updateProduct(@PathVariable Long productId,
                                                         @ModelAttribute ProductDto productDto) throws IOException {

        ProductResponse productResponse = productService.updateProduct(productId, productDto);
        return new ResponseEntity<>(productResponse, HttpStatus.OK);
    }

    // Delete a product by ID
    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long productId) {
        productService.deleteProduct(productId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}