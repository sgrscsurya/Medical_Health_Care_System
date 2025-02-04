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
public class PolicyMember {
    @Id
    private int policymemberid;
    private String policymembername;
    private int policymemberage;
    private String policymembergender;
    private String policymemberphno;
    private String policymemberaddress;
    private String policymemberrelationship;
    private String status;

    @ManyToOne
    @JoinColumn(name = "policyholderid")
    private PolicyHolder policyholder;

    @OneToMany(mappedBy = "policyMember")
    @JsonIgnore
    private List<MapPolicyPatient> mapPolicyPatient;

}
