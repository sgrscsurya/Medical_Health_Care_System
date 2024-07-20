package com.example.springboot.Repo;

import com.example.springboot.Entity.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HospitalRepo extends JpaRepository<Hospital,Integer> {

    Optional<Hospital> findByEmail(String email);
}
