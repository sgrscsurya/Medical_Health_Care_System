package com.example.springboot.Repo;

import com.example.springboot.Entity.Policy;
import org.springframework.data.jpa.repository.JpaRepository;



public interface PolicyRepo extends JpaRepository<Policy,Integer> {
}
