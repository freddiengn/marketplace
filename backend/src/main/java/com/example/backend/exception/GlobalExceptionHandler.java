package com.example.backend.exception;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AccountStatusException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import io.jsonwebtoken.ExpiredJwtException;

import java.io.IOException;
import java.security.SignatureException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorMessage> handleException(Exception exception) {
        HttpStatus status = determineHttpStatus(exception);
        String message = determineMessage(exception);

        logException(exception);

        ErrorMessage errorMessage = new ErrorMessage(
            status.value(),
            new Date(),
            message,
            exception.getMessage()
        );

        return new ResponseEntity<>(errorMessage, status);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorMessage> resourceNotFoundException(ResourceNotFoundException ex, WebRequest request) {
        ErrorMessage errorMessage = new ErrorMessage(
            HttpStatus.NOT_FOUND.value(),
            new Date(),
            ex.getMessage(),
            request.getDescription(false)
        );
        return new ResponseEntity<>(errorMessage, HttpStatus.NOT_FOUND);
    }

    // Exception handling methods
    private HttpStatus determineHttpStatus(Exception exception) {
        if (exception instanceof BadCredentialsException) {
            return HttpStatus.UNAUTHORIZED;
        } else if (exception instanceof AccountStatusException) {
            return HttpStatus.FORBIDDEN;
        } else if (exception instanceof AccessDeniedException) {
            return HttpStatus.FORBIDDEN;
        } else if (exception instanceof SignatureException) {
            return HttpStatus.FORBIDDEN;
        } else if (exception instanceof ExpiredJwtException) {
            return HttpStatus.FORBIDDEN;
        } else if (exception instanceof IOException) {
            return HttpStatus.BAD_REQUEST;
        } else if (exception instanceof IllegalArgumentException) {
            return HttpStatus.BAD_REQUEST;
        } else {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    private String determineMessage(Exception exception) {
        if (exception instanceof BadCredentialsException) {
            return "The username or password is incorrect";
        } else if (exception instanceof AccountStatusException) {
            return "The account is locked";
        } else if (exception instanceof AccessDeniedException) {
            return "You are not authorized to access this resource";
        } else if (exception instanceof SignatureException) {
            return "The JWT signature is invalid";
        } else if (exception instanceof ExpiredJwtException) {
            return "The JWT token has expired";
        } else if (exception instanceof IOException) {
            return "Error processing the file";
        } else if (exception instanceof IllegalArgumentException) {
            return "Invalid argument provided";
        } else {
            return "Unknown internal server error";
        }
    }


    private void logException(Exception exception) {
        logger.error("Exception occurred: ", exception);
    }
}
