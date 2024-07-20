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
public class PolicyHolder {
    @Id
    private int policyholderid;
    private String policyholdername;
    private int policyholderage;
    private String policyholdergender;
    private String policyholderphno;
    private String policyholderaddress;
    private String status;

    @ManyToOne
    @JoinColumn(name = "polno")
    private Policy policy;

    @OneToMany(mappedBy = "policyholder")
    @JsonIgnore
    private List<PolicyMember> policymember;


}

