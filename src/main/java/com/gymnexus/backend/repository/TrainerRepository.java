package com.gymnexus.backend.repository;

import com.gymnexus.backend.Trainer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrainerRepository extends JpaRepository<Trainer, Long> {

    List<Trainer> findBySpecializationContaining(String specialization);
}
