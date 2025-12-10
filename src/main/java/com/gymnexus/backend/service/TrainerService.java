package com.gymnexus.backend.service;

import com.gymnexus.backend.Trainer;
import com.gymnexus.backend.repository.TrainerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainerService {

    @Autowired
    private TrainerRepository trainerRepository;

    public List<Trainer> getAllTrainers() {
        return trainerRepository.findAll();
    }

    public Trainer getTrainerById(Long id) {
        return trainerRepository.findById(id).orElseThrow(() -> new RuntimeException("Trainer not found"));
    }

    public Trainer createTrainer(Trainer trainer) {
        return trainerRepository.save(trainer);
    }

    public Trainer updateTrainer(Long id, Trainer trainerDetails) {
        Trainer trainer = getTrainerById(id);

        trainer.setFullName(trainerDetails.getFullName());
        trainer.setPhoneNumber(trainerDetails.getPhoneNumber());
        trainer.setSpecialization(trainerDetails.getSpecialization());
        trainer.setBio(trainerDetails.getBio());

        return trainerRepository.save(trainer);
    }

    public void deleteTrainer(Long id) {
        trainerRepository.deleteById(id);
    }
}
