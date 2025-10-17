package com.ensolvers.notes_app_backend.application.dto;

import lombok.Data;

@Data
public class NoteResponseDTO {
    private Long id;
    private String title;
    private String content;
    private boolean archived;
    private CategoryResponseDTO category;
}
