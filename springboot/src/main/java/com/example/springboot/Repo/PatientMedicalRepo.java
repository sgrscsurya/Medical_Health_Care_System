package com.example.springboot.Repo;

import com.example.springboot.Entity.PatientMedical;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PatientMedicalRepo extends JpaRepository<PatientMedical,Integer>
{
    @Query("select pm from PatientMedical pm where pm.patientBasic.patientid=?1")
    PatientMedical findByPatientid(Integer pid);


}
