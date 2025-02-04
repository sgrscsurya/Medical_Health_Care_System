package com.example.springboot.Controller;

import com.example.springboot.Entity.Incharger;
import com.example.springboot.Repo.InchargerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")

public class InchargerController {

    @Autowired
    private InchargerRepo inchargerRepo;


    @PostMapping("/userLogin")
    public ResponseEntity<?> userLogin(@RequestBody Incharger obj){
        var user = inchargerRepo.findById(obj.getInchargerid()).orElseThrow(() -> new RuntimeException("User Not Found"));
        if (user.getInpassword().equals(obj.getInpassword()))
            return new ResponseEntity<>("Login Successfully", HttpStatus.OK);
        else
            return new ResponseEntity<>("Invalid Password",HttpStatus.OK);

    }
}
