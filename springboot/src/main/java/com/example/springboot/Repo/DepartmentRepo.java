package com.example.springboot.Repo;

import com.example.springboot.Entity.Department;
import com.example.springboot.Entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DepartmentRepo extends JpaRepository<Department,Integer> {

    Optional<Department> findByDname(String dname);
}
