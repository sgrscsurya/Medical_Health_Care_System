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
public class Hospital {

    @Id
    private int hid;
    private String hname;
    private String pswd;
    private String email;
    private String pno;
    private String address;


    @OneToMany(mappedBy = "hospital")
    @JsonIgnore
    private List<Doctor> doctor;

    @OneToMany(mappedBy = "hospital")
    @JsonIgnore
    private List<MapPolicyPatient> mapPolicyPatient;


}
