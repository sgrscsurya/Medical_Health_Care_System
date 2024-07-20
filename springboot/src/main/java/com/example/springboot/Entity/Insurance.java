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
public class Insurance {
    @Id
    private int icid;
    private String icname;
    private String pswd;
    private String phno;
    private String email;
    private String address;

    @OneToMany(mappedBy = "insurance")
    @JsonIgnore
    private List<Policy> policy;

}
