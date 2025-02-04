package com.example.springboot.Controller;

import com.example.springboot.Entity.Department;
import com.example.springboot.Entity.TestMaster;
import com.example.springboot.Repo.TestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class TestController {

    @Autowired
    TestRepo testRepo;
    @PostMapping("/AddTest")
    public ResponseEntity<?>AddTest(@RequestBody TestMaster obj)
    {
        Optional<TestMaster>T=testRepo.findByTestname(obj.getTestname());
        if(T.isPresent())
            return new ResponseEntity<>("Test already exist",HttpStatus.OK);
        else {
            testRepo.save(obj);
            return new ResponseEntity<>("Test added successfully", HttpStatus.OK);
        }

    }

    @GetMapping("/GetTest")
    public ResponseEntity<?>GetTest()
    {
        List<TestMaster> list=testRepo.findAll();
        return new ResponseEntity<>(list,HttpStatus.OK);
    }

}
