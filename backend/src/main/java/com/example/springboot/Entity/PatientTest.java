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

public class PatientTest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ptid;
    private  String date;
    private String status;

    @ManyToOne
    @JoinColumn(name = "patientid")
    private PatientBasic patientBasic;

    @ManyToOne
    @JoinColumn(name = "testid")
    private TestMaster testMaster;
}
