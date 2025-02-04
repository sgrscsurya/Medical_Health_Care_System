package com.example.springboot.Repo;

import com.example.springboot.Entity.PatientTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PatientTestRepo extends JpaRepository<PatientTest,Integer> {

    @Query("select pt from PatientTest pt where pt.patientBasic.patientid=?1 and pt.testMaster.testid=?2 and pt.status=?3")
    Optional<PatientTest> findByStatus(Integer pid,Integer testid,String status);
}
