package com.ensolvers.notes_app_backend.application.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class NoteRequestDTO {
    @NotBlank(message = "Title cannot be blank")
    private String title;

    @NotBlank(message = "Content cannot be blank")
    private String content;

    private Long categoryId;
}
