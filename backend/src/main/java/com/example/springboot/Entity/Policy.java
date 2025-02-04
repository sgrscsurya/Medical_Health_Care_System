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
public class Policy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int polno;
    private String polname;
    private String description;
    private String status;

    @ManyToOne
    @JoinColumn(name = "icid")
    private Insurance insurance;

    @OneToMany(mappedBy = "policy")
    @JsonIgnore
    private List<PolicyHolder> policyholder;

}
