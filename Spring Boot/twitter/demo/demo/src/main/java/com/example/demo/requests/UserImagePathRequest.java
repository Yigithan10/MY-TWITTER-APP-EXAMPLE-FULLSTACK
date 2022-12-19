package com.example.demo.requests;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UserImagePathRequest {
    MultipartFile file;
}
