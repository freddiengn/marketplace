package com.example.backend.service;

import com.example.backend.dto.ProductDto;
import com.example.backend.entity.Product;
import com.example.backend.entity.User;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.response.ProductResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.core.Authentication;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Value("${upload.path}")
    private String uploadPath; 

    public ProductService(ProductRepository productRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::convertToProductResponse)
                .collect(Collectors.toList());
    }

    public ProductResponse getProductById(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + productId));
        return convertToProductResponse(product);
    }

    public List<ProductResponse> getProductsByCategory(String category) {
        return productRepository.findByCategory(category).stream()
                .map(this::convertToProductResponse)
                .collect(Collectors.toList());
    }

    public List<ProductResponse> getProductsByPriceRange(Double minPrice, Double maxPrice) {
        return productRepository.findByPriceBetween(minPrice, maxPrice).stream()
                .map(this::convertToProductResponse)
                .collect(Collectors.toList());
    }

    public ProductResponse createProduct(ProductDto productDto) throws IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = null;
    
        if (authentication != null && authentication.getPrincipal() != null) {
            userEmail = (String) authentication.getPrincipal(); 
        }
    
        if (userEmail == null) {
            throw new RuntimeException("No authenticated user found.");
        }
    
        User user = userRepository.findByEmail(userEmail);
        if (user == null) {
            throw new RuntimeException("User not found with email: " + userEmail);
        }
    
        Product product = new Product();
        product.setTitle(productDto.getTitle());
        product.setCategory(productDto.getCategory());
        product.setPrice(productDto.getPrice());
        product.setDetails(productDto.getDetails());
        product.setCondition(productDto.getCondition());
        product.setCreatedBy(user);
    
        if (productDto.getImage() != null && !productDto.getImage().isEmpty()) {
            String imageUrl = saveImage(productDto.getImage());
            product.setImageUrl(imageUrl);
        }
    
        product.setCreatedAt(new Date());
        product.setUpdatedAt(new Date());
    
        Product savedProduct = productRepository.save(product);
    
        return convertToProductResponse(savedProduct);
    }

    public ProductResponse updateProduct(Long productId, ProductDto updatedProductDto) throws IOException {
        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + productId));

        existingProduct.setTitle(updatedProductDto.getTitle());
        existingProduct.setCategory(updatedProductDto.getCategory());
        existingProduct.setPrice(updatedProductDto.getPrice());
        existingProduct.setDetails(updatedProductDto.getDetails());
        existingProduct.setCondition(updatedProductDto.getCondition());

        if (updatedProductDto.getImage() != null && !updatedProductDto.getImage().isEmpty()) {
            String imageUrl = saveImage(updatedProductDto.getImage());
            existingProduct.setImageUrl(imageUrl);
        }

        existingProduct.setUpdatedAt(new Date());

        Product savedProduct = productRepository.save(existingProduct);
        return convertToProductResponse(savedProduct);
    }

    public void deleteProduct(Long productId) {
        if (!productRepository.existsById(productId)) {
            throw new ResourceNotFoundException("Product not found with ID: " + productId);
        }
        productRepository.deleteById(productId);
    }

    private String saveImage(MultipartFile imageFile) throws IOException {
        String fileName = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();

        Path uploadDir = Paths.get(uploadPath, "images");

        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }

        Path imagePath = uploadDir.resolve(fileName);
        try (FileOutputStream outputStream = new FileOutputStream(imagePath.toFile())) {
            outputStream.write(imageFile.getBytes());
        }
        return "/images/" + fileName;
    }

    private ProductResponse convertToProductResponse(Product product) {
        if (product == null) {
            return null;
        }

        String formattedImageUrl = product.getImageUrl();
        if (formattedImageUrl != null && !formattedImageUrl.isEmpty()) {
            formattedImageUrl = "http://localhost:8080" + formattedImageUrl;
        }

        return new ProductResponse(
                product.getProductId(),
                product.getTitle(),
                product.getCategory(),
                product.getPrice(),
                product.getDetails(),
                product.getCondition(),
                formattedImageUrl,
                product.getIsSold(),
                product.getCreatedAt(),
                product.getUpdatedAt()
        );
    }
}