package com.example.backend.util;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

public class GenerateUtils {

    // Method to get a formatted date string
    public static String getFormattedDate() {
        return new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
    }

    // Method to generate a UUID string
    public static String generateUUID() {
        return UUID.randomUUID().toString();
    }
}
