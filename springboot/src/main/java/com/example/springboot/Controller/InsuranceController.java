package com.example.springboot.Controller;

import com.example.springboot.DTO.Emaildata;
import com.example.springboot.Entity.Hospital;
import com.example.springboot.Entity.Insurance;
import com.example.springboot.Repo.InsuranceRepo;
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
public class InsuranceController {

    @Autowired
    private InsuranceRepo insuranceRepo;
    @Autowired
    private Smtpservice smtpservice;


    @PostMapping("/AddInsurance")
    public ResponseEntity<?>AddInsurance(@RequestBody Insurance obj){
    Optional<Insurance> L=insuranceRepo.findByEmail(obj.getEmail());
        if(L.isPresent()) {
            return new ResponseEntity<>("Email ID Already exist", HttpStatus.OK);
        }
        else{
        Random rnd=new Random();
        int id= rnd.nextInt(100000,999999);
        int password= rnd.nextInt(1000,9999);
        obj.setIcid(id);
        obj.setPswd(String.valueOf(password));
        insuranceRepo.save(obj);

            Emaildata emaildata=new Emaildata();
            emaildata.setRecipient(obj.getEmail());
            emaildata.setSubject("Login credentails");
            String Message="Login Credentails Insurance ID:"+ id + "& Password" + password;
            emaildata.setMessage(Message);
            smtpservice.sendMail(emaildata);
        return new ResponseEntity<>("Insurance Company added Successfully",HttpStatus.OK);
    }
}

@GetMapping("/GetInsurance")
public ResponseEntity<?>GetInsurance()
{
    List<Insurance> list=insuranceRepo.findAll();
    return new ResponseEntity<>(list,HttpStatus.OK);
}

@GetMapping("/chkInsuranceLogin/{id}/{password}")
    public ResponseEntity<?>chkInsuranceLoginaData(@PathVariable Integer id,@PathVariable String password)
{
    Optional<Insurance>L=insuranceRepo.findById(id);
    if(L.isPresent())
    {
        Insurance insurance=L.get();
        if(insurance.getPswd().equals(password))
            return new ResponseEntity<>("Correct password",HttpStatus.OK);
        else
            return new ResponseEntity<>("Invalid password",HttpStatus.OK);
    }
    else
        return new ResponseEntity<>("Insurance ID not found",HttpStatus.OK);
}

}
