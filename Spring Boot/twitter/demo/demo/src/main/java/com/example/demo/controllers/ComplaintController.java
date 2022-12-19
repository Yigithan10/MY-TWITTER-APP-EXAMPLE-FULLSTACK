package com.example.demo.controllers;

import com.example.demo.entities.Complaint;
import com.example.demo.repos.ComplaintRepository;
import com.example.demo.requests.ComplaintCreateRequest;
import com.example.demo.services.ComplaintService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/complaints")
public class ComplaintController {
    private ComplaintService complaintService;

    private ComplaintRepository complaintRepository;

    public ComplaintController(ComplaintService complaintService, ComplaintRepository complaintRepository) {
        this.complaintService = complaintService;
        this.complaintRepository = complaintRepository;
    }

    @GetMapping
    public List<Complaint> getAllComplaintsTweets(@RequestParam Optional<Long> userId){
        return complaintService.getAllComplaintsTweets(userId);
    }

    @GetMapping("/{complaintId}")
    public Optional<Complaint> getOneComplaint(@PathVariable Long complaintId){
        return complaintService.getOneComplaint(complaintId);
    }

    @PostMapping
    public ResponseEntity<Complaint> setOneComplaint(@RequestBody ComplaintCreateRequest complaintCreateRequest){
        return complaintService.setOneComplaint(complaintCreateRequest);
    }

    @DeleteMapping("/{complaintId}")
    public void deleteOneComplaint(@PathVariable Long complaintId){
        complaintService.deleteOneComplaint(complaintId);
    }
}
