package com.example.springboot.Repo;

import com.example.springboot.Entity.Treatment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TreatmentRepo extends JpaRepository<Treatment,Integer> {

    @Query("select t from Treatment t where t.patientBasic.patientid=?1")
    List <Treatment>findByPatientId(Integer pid);

}
