package com.example.springboot.Repo;

import com.example.springboot.Entity.PatientBasic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientBasicRepo extends JpaRepository<PatientBasic,Integer> {

}
