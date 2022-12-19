package com.example.demo.services;

import com.example.demo.entities.Complaint;
import com.example.demo.entities.Tweet;
import com.example.demo.entities.User;
import com.example.demo.repos.ComplaintRepository;
import com.example.demo.requests.ComplaintCreateRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
public class ComplaintService {

    private ComplaintRepository complaintRepository;

    private UserService userService;

    private TweetService tweetService;

    public ComplaintService(ComplaintRepository complaintRepository, UserService userService, TweetService tweetService) {
        this.complaintRepository = complaintRepository;
        this.userService = userService;
        this.tweetService = tweetService;
    }

    public List<Complaint> getAllComplaintsTweets(Optional<Long> userId) {
        if(userId.isPresent()){
            return complaintRepository.findByUserId(userId.get());
        }else {
            return complaintRepository.findAll();
        }
    }

    public Optional<Complaint> getOneComplaint(Long complaintId) {
        return complaintRepository.findById(complaintId);
    }

    public ResponseEntity<Complaint> setOneComplaint(ComplaintCreateRequest complaintCreateRequest) {
        Tweet tweet = tweetService.getOneTweet(complaintCreateRequest.getTweetId());
        User user = userService.getOneUser(complaintCreateRequest.getUserId());
        if(tweet==null || user==null){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }else if(user.getId().equals(tweet.getRetweetUser().getId())){
            return new ResponseEntity<>(null, HttpStatus.BAD_GATEWAY);
        }else {
            Complaint toSave = new Complaint();
            if(complaintRepository.findByTweetIdAndUserId(complaintCreateRequest.getTweetId(), complaintCreateRequest.getUserId())!=null){
                return new ResponseEntity<>(toSave, HttpStatus.BAD_REQUEST);
            }else {
                toSave.setId(complaintCreateRequest.getId());
                toSave.setUser(user);
                toSave.setTweet(tweet);
                complaintRepository.save(toSave);
                return new ResponseEntity<>(toSave, HttpStatus.CREATED);
            }
        }
    }

    public void deleteOneComplaint(Long complaintId) {
        complaintRepository.deleteById(complaintId);
    }
}
