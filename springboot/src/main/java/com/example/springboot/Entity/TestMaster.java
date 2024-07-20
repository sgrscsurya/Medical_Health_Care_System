package com.example.springboot.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class TestMaster {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int testid;
    private String testname;

    @OneToMany(mappedBy = "testMaster")
    @JsonIgnore
    private List<PatientTest> patientTest;

    @OneToMany(mappedBy = "testMaster")
    @JsonIgnore
    private List<MedicalTest> medicalTest;
}

