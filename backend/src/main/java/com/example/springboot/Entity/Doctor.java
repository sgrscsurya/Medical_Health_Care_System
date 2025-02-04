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
public class Doctor {
    @Id
    private int dcid;
    private String dcname;
    private String password;
    private String pno;
    private String email;
    private String address;


    @ManyToOne
    @JoinColumn(name = "hid")
    private Hospital hospital;

    @ManyToOne
    @JoinColumn(name= "deptno")
    private Department department;

    @OneToMany(mappedBy = "doctor")
    @JsonIgnore
    private List<Treatment> treatment;


}
