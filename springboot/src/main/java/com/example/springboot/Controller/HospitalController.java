package com.example.springboot.Controller;

import com.example.springboot.DTO.Emaildata;
import com.example.springboot.Entity.Hospital;
import com.example.springboot.Repo.HospitalRepo;
import com.example.springboot.Smtpservice.Smtpservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@RestController
@CrossOrigin("*")
public class HospitalController {

    @Autowired
    private HospitalRepo hospitalRepo;
    @Autowired
    private Smtpservice smtpservice;


    @PostMapping("/AddHospital")
    public ResponseEntity<?>AddHospital(@RequestBody Hospital obj)
    {
        Optional<Hospital>L=hospitalRepo.findByEmail(obj.getEmail());
        if(L.isPresent()) {
            return new ResponseEntity<>("Email ID Already exist", HttpStatus.OK);
        }
        else{
            Random rnd=new Random();
            int id= rnd.nextInt(100000,999999);
            int password= rnd.nextInt(1000,9999);
            obj.setHid(id);
            obj.setPswd(String.valueOf(password));
            hospitalRepo.save(obj);

            Emaildata emaildata=new Emaildata();
            emaildata.setRecipient(obj.getEmail());
            emaildata.setSubject("Login credentails");
            String Message="Login Credentails Hospital ID:"+ id + "& Password" + password;
            emaildata.setMessage(Message);
            smtpservice.sendMail(emaildata);

            return new ResponseEntity<>("Hospital added Successfully",HttpStatus.OK);
        }
    }

    @GetMapping("/GetHospital")
    public ResponseEntity<?>GetHospital()
    {
        List<Hospital> list=hospitalRepo.findAll();

        return new ResponseEntity<>(list,HttpStatus.OK);
    }

    @GetMapping("/chkHospitalLogin/{id}/{password}")
    public ResponseEntity<?> chkHospitalLoginData(@PathVariable Integer id,@PathVariable String password)
    {
        Optional<Hospital>L=hospitalRepo.findById(id);
        if(L.isPresent())
        {
            Hospital hospital=L.get();
            if(hospital.getPswd().equals(password))
                return new ResponseEntity<>("Correct Password",HttpStatus.OK);
            else
                return new ResponseEntity<>("Invalid Password",HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Hospital ID not found",HttpStatus.OK);
    }


}
