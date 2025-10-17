package com.ensolvers.notes_app_backend.service.Impl;

import com.ensolvers.notes_app_backend.application.dto.CategoryResponseDTO;
import com.ensolvers.notes_app_backend.application.dto.NoteRequestDTO;
import com.ensolvers.notes_app_backend.application.dto.NoteResponseDTO;
import com.ensolvers.notes_app_backend.domain.model.Category;
import com.ensolvers.notes_app_backend.domain.model.Note;
import com.ensolvers.notes_app_backend.domain.repository.CategoryRepository;
import com.ensolvers.notes_app_backend.domain.repository.NoteRepository;
import com.ensolvers.notes_app_backend.service.NoteService;
import com.ensolvers.notes_app_backend.service.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NoteServiceImpl implements NoteService {

    private final NoteRepository noteRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public NoteServiceImpl(NoteRepository noteRepository, CategoryRepository categoryRepository) {
        this.noteRepository = noteRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<NoteResponseDTO> getFilteredNotes(Optional<Boolean> isArchived, Optional<Long> categoryId) {
        List<Note> notes;

        if (categoryId.isPresent() && isArchived.isPresent()) {
            notes = noteRepository.findByCategory_IdAndArchived(categoryId.get(), isArchived.get());
        } else if (categoryId.isPresent()) {
            notes = noteRepository.findByCategory_Id(categoryId.get());
        } else if (isArchived.isPresent()) {
            notes = noteRepository.findByArchived(isArchived.get());
        } else {
            notes = noteRepository.findAll();
        }

        return notes.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public NoteResponseDTO createNote(NoteRequestDTO noteDTO) {
        Note newNote = new Note();
        newNote.setTitle(noteDTO.getTitle());
        newNote.setContent(noteDTO.getContent());

        if (noteDTO.getCategoryId() != null) {
            Category category = categoryRepository.findById(noteDTO.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + noteDTO.getCategoryId()));
            newNote.setCategory(category);
        }

        Note savedNote = noteRepository.save(newNote);
        return mapToDTO(savedNote);
    }

    @Override
    public NoteResponseDTO updateNote(Long id, NoteRequestDTO noteDetails) {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Note not found with id: " + id));

        note.setTitle(noteDetails.getTitle());
        note.setContent(noteDetails.getContent());

        if (noteDetails.getCategoryId() != null) {
            Category category = categoryRepository.findById(noteDetails.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + noteDetails.getCategoryId()));
            note.setCategory(category);
        }

        Note updatedNote = noteRepository.save(note);
        return mapToDTO(updatedNote);
    }

    @Override
    public void deleteNote(Long id) {
        if (!noteRepository.existsById(id)) {
            throw new ResourceNotFoundException("Note not found with id: " + id);
        }
        noteRepository.deleteById(id);
    }

    @Override
    public NoteResponseDTO toggleNoteArchivedStatus(Long id) {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Note not found with id: " + id));

        note.setArchived(!note.isArchived());

        Note updatedNote = noteRepository.save(note);
        return mapToDTO(updatedNote);
    }

    private NoteResponseDTO mapToDTO(Note note) {
        NoteResponseDTO dto = new NoteResponseDTO();
        dto.setId(note.getId());
        dto.setTitle(note.getTitle());
        dto.setContent(note.getContent());
        dto.setArchived(note.isArchived());

        if (note.getCategory() != null) {
            CategoryResponseDTO categoryDTO = new CategoryResponseDTO();
            categoryDTO.setId(note.getCategory().getId());
            categoryDTO.setName(note.getCategory().getName());
            dto.setCategory(categoryDTO);
        }

        return dto;
    }
}
