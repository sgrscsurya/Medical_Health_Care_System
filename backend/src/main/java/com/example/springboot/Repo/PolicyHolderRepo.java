package com.example.springboot.Repo;

import com.example.springboot.Entity.PolicyHolder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PolicyHolderRepo extends JpaRepository<PolicyHolder,Integer> {
}
