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
public class MedicalTest {

    @Id
    private int mtid;
    private  String date;

    @Lob
    @Column(columnDefinition = "MEDIUMTEXT")
    private String filepath;

    @ManyToOne
    @JoinColumn(name = "patientid")
    private PatientBasic patientBasic;

    @ManyToOne
    @JoinColumn(name = "testid")
    private TestMaster testMaster;
}
