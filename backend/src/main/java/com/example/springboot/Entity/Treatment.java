package com.example.springboot.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Treatment {
    @Id
    private int treatmentid;
    private String treatmentdate;
    private String treatmentdetails;

    @ManyToOne
    @JoinColumn(name = "patientid")
    private PatientBasic patientBasic;

    @ManyToOne
    @JoinColumn(name = "dcid")
    private Doctor doctor;
}
