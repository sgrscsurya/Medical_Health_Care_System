package com.example.springboot.Repo;

import com.example.springboot.Entity.Incharger;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InchargerRepo extends JpaRepository<Incharger,Integer> {
}
