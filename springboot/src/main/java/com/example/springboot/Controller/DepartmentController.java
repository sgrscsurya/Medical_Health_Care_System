package com.example.springboot.Controller;

import com.example.springboot.Entity.Department;
import com.example.springboot.Entity.Doctor;
import com.example.springboot.Entity.Hospital;
import com.example.springboot.Entity.Insurance;
import com.example.springboot.Repo.DepartmentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class DepartmentController {

    @Autowired
    private DepartmentRepo departmentRepo;

    @PostMapping("/AddDept")
    public ResponseEntity<?> AddDept(@RequestBody Department obj) {
        Optional<Department> D = departmentRepo.findByDname(obj.getDname());
        if (D.isPresent())
            return new ResponseEntity<>("Department Already exist", HttpStatus.OK);
        else {
            departmentRepo.save(obj);
            return new ResponseEntity<>("Department added Successfully", HttpStatus.OK);
        }
    }


    @GetMapping("/GetDept")
    public ResponseEntity<?>GetDept()
    {
        List<Department> list=departmentRepo.findAll();
        return new ResponseEntity<>(list,HttpStatus.OK);
    }

    }

