package com.example.springboot.Repo;

import com.example.springboot.Entity.Doctor;
import com.example.springboot.Entity.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DoctorRepo extends JpaRepository<Doctor,Integer> {

    Optional<Doctor> findByEmail(String email);
}
