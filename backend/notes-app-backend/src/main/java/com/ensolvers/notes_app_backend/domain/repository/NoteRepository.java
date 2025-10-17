package com.ensolvers.notes_app_backend.domain.repository;

import com.ensolvers.notes_app_backend.domain.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {

    List<Note> findByArchived(boolean archived);

    List<Note> findByCategory_Id(Long categoryId);

    List<Note> findByCategory_IdAndArchived(Long categoryId, boolean archived);

}
