package com.example.springboot.Repo;

import com.example.springboot.Entity.MedicalTest;
import com.example.springboot.Entity.PatientTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MedicalTestRepo extends JpaRepository<MedicalTest,Integer> {

@Query("select tm.testname,mt.date,mt.filepath from TestMaster tm inner join MedicalTest mt on mt.testMaster.testid=tm.testid where mt.patientBasic.patientid=?1")
List<Object> findBypatientid(Integer ID);

}
