package com.example.springboot.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor


public class PatientBasic
{
    @Id
    private int patientid;
    private String name;
    private int age;
    private String email;
    private String gender;
    private String phno;
    private String address;

    @OneToMany(mappedBy = "patientBasic")
    @JsonIgnore
    private List<PatientMedical> patientmedical;

    @OneToMany(mappedBy = "patientBasic")
    @JsonIgnore
    private List<Treatment> treatment;

    @OneToMany(mappedBy = "patientBasic")
    @JsonIgnore
    private List<MapPolicyPatient> mapPolicyPatient;

    @OneToMany(mappedBy = "patientBasic")
    @JsonIgnore
    private List<PatientTest> patientTest;

    @OneToMany(mappedBy = "patientBasic")
    @JsonIgnore
    private List<MedicalTest> medicalTest;

}
