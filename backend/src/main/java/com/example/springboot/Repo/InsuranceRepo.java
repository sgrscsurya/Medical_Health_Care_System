package com.example.springboot.Repo;

import com.example.springboot.Entity.Hospital;
import com.example.springboot.Entity.Insurance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InsuranceRepo extends JpaRepository<Insurance,Integer> {
    Optional<Insurance> findByEmail(String email);
}
