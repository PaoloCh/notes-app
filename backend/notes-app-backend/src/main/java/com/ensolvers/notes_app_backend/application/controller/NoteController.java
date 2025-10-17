package com.ensolvers.notes_app_backend.application.controller;

import com.ensolvers.notes_app_backend.application.dto.NoteRequestDTO;
import com.ensolvers.notes_app_backend.application.dto.NoteResponseDTO;
import com.ensolvers.notes_app_backend.service.NoteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    private final NoteService noteService;

    @Autowired
    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping
    public List<NoteResponseDTO> getAllNotes(
            @RequestParam Optional<Boolean> archived,
            @RequestParam Optional<Long> categoryId) {
        return noteService.getFilteredNotes(archived, categoryId);
    }

    @PostMapping
    public NoteResponseDTO createNote(@Valid @RequestBody NoteRequestDTO noteDTO) {
        return noteService.createNote(noteDTO);
    }

    @PatchMapping("/{id}/archive")
    public ResponseEntity<NoteResponseDTO> toggleNoteArchiveStatus(@PathVariable Long id) {
        NoteResponseDTO updatedNote = noteService.toggleNoteArchivedStatus(id);
        return ResponseEntity.ok(updatedNote);
    }

    @PutMapping("/{id}")
    public ResponseEntity<NoteResponseDTO> updateNote(@PathVariable Long id, @Valid @RequestBody NoteRequestDTO noteDetails) {
        NoteResponseDTO updatedNote = noteService.updateNote(id, noteDetails);
        return ResponseEntity.ok(updatedNote);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
        return ResponseEntity.noContent().build();
    }

}
