package com.ensolvers.notes_app_backend.application.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CategoryRequestDTO {

    @NotBlank(message = "Name cannot be blank")
    private String name;
}
