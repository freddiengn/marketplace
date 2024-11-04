package com.example.backend.util;

import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.List;
import java.util.stream.Collectors;

public class ValidationUtils {

    public static List<String> getErrorMessages(BindingResult result) {
        return result.getAllErrors().stream()
            .map(error -> error instanceof FieldError
                ? ((FieldError) error).getField() + ": " + error.getDefaultMessage()
                : error.getObjectName() + ": " + error.getDefaultMessage())
            .collect(Collectors.toList());
    }
}
