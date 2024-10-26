package com.example.companymanager.service;

import com.example.companymanager.entity.Email;
import com.example.companymanager.repository.EmailRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmailService {

    private EmailRepository emailRepository;

    @Autowired
    public EmailService(EmailRepository emailRepository){
        this.emailRepository = emailRepository;
    }

    public List<Email> getEmailByCompanyId(Long companyId){
        return emailRepository.findByCompanyId(companyId);
    }

    public Email saveEmail(Email email){
        return emailRepository.save(email);
    }

    public Email findEmailById(Long emailId){
        return emailRepository.findById(emailId).orElseThrow(() -> new EntityNotFoundException("Could not find email with id: " + emailId));
    }



}
