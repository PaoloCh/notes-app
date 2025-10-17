package com.ensolvers.notes_app_backend.domain.repository;

import com.ensolvers.notes_app_backend.domain.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

}
