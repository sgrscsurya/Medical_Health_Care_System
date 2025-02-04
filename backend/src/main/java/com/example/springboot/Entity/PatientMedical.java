package com.example.springboot.Entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PatientMedical {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int pmid;
    private String surgery;
    private String medical;
    private String allergy;
    private String social;
    private String other;

    @ManyToOne
    @JoinColumn(name= "patientid")
    private PatientBasic patientBasic;
}
