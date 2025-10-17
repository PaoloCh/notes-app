package com.ensolvers.notes_app_backend.service;

import com.ensolvers.notes_app_backend.application.dto.NoteRequestDTO;
import com.ensolvers.notes_app_backend.application.dto.NoteResponseDTO;

import java.util.List;
import java.util.Optional;

public interface NoteService {
    NoteResponseDTO createNote(NoteRequestDTO noteRequestDTO);

    List<NoteResponseDTO> getFilteredNotes(Optional<Boolean> isArchived, Optional<Long> categoryId);

    NoteResponseDTO updateNote(Long id, NoteRequestDTO noteDetails);

    NoteResponseDTO toggleNoteArchivedStatus(Long id);

    void deleteNote(Long id);
}
