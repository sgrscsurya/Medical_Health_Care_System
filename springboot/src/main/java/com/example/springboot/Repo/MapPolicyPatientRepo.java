package com.example.springboot.Repo;

import com.example.springboot.Entity.MapPolicyPatient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MapPolicyPatientRepo extends JpaRepository<MapPolicyPatient,Integer> {
}
