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
public class MapPolicyPatient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int mppid;

    @ManyToOne
    @JoinColumn(name = "patientid")
    private PatientBasic patientBasic;

    @ManyToOne
    @JoinColumn(name = "hid")
    private Hospital hospital;

    @ManyToOne
    @JoinColumn(name = "policymemberid")
    private PolicyMember policyMember;
}
