package com.example.springboot.Repo;

import com.example.springboot.Entity.Department;
import com.example.springboot.Entity.TestMaster;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TestRepo extends JpaRepository<TestMaster,Integer> {

    Optional<TestMaster> findByTestname(String testname);
}
