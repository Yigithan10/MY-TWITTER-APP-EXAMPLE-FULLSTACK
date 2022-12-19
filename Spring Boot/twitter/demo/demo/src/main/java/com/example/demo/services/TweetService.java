package com.example.demo.services;

import com.example.demo.entities.Comment;
import com.example.demo.entities.Tweet;
import com.example.demo.entities.User;
import com.example.demo.repos.TweetRepository;
import com.example.demo.requests.RetweetCreateRequest;
import com.example.demo.requests.TweetCreateRequest;
import com.example.demo.requests.TweetUpdateRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TweetService {
    private TweetRepository tweetRepository;
    private UserService userService;

    private List<Comment> foundList = new ArrayList<>();

    private List<Tweet> list1 = new ArrayList<>();
    private List<Tweet> list2 = new ArrayList<>();
    private List<Tweet> list3 = new ArrayList<>();

    public TweetService(TweetRepository tweetRepository, UserService userService) {
        this.tweetRepository = tweetRepository;
        this.userService = userService;
    }

    public List<Tweet> getAllTweets(Optional<Long> userId) {
        if(userId.isPresent()){
            List<Tweet> found = tweetRepository.findByUserId(userId.get());
            if(found!=null){
                return found;
            }else {
                return null;
            }
        }else {
            return tweetRepository.findAll();
        }
    }

    public Tweet getOneTweet(Long tweetId) {
        return tweetRepository.findById(tweetId).orElse(null);
    }

    public ResponseEntity<Tweet> createOneTweet(TweetCreateRequest newTweetRequest) {
        User user = userService.getOneUser(newTweetRequest.getUserId());
        User retweetUser = userService.getOneUser(newTweetRequest.getRetweetUserId());
        if(user==null || retweetUser==null){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }else {
            Tweet toSave = new Tweet();
            toSave.setId(newTweetRequest.getId());
            toSave.setTitle(newTweetRequest.getTitle());
            toSave.setText(newTweetRequest.getText());
            toSave.setUser(user);
            toSave.setRetweetUser(retweetUser);
            tweetRepository.save(toSave);
            toSave.setRetweetId(toSave.getId());
            tweetRepository.save(toSave);
            return new ResponseEntity<>(toSave, HttpStatus.CREATED);
        }
    }

    public ResponseEntity<Tweet> retweetOneTweet(RetweetCreateRequest retweetCreateRequest) {
        User user = userService.getOneUser(retweetCreateRequest.getUserId());
        User retweetUser = userService.getOneUser(retweetCreateRequest.getRetweetUserId());
        Tweet tweet = tweetRepository.findByUserIdAndRetweetUserIdAndRetweetId(user.getId(), retweetUser.getId(), retweetCreateRequest.getRetweetId());
        if(user==null || retweetUser==null){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }else if(tweet==null){
            Tweet toSave = new Tweet();
            toSave.setId(retweetCreateRequest.getId());
            toSave.setTitle(retweetCreateRequest.getTitle());
            toSave.setText(retweetCreateRequest.getText());
            toSave.setUser(user);
            toSave.setRetweetUser(retweetUser);
            toSave.setRetweetId(retweetCreateRequest.getRetweetId());
            tweetRepository.save(toSave);
            getAllTweetsWithParam(retweetCreateRequest.getRetweetId(), retweetCreateRequest.getRetweetId());
            return new ResponseEntity<>(toSave, HttpStatus.CREATED);
        }else {
            return new ResponseEntity<>(tweet, HttpStatus.BAD_GATEWAY);
        }
    }



    public List<Comment> getAllTweetsWithParam(Long tweetId, Long retweetId) {
        Tweet toSave = getOneTweet(retweetId);
        list1 = tweetRepository.findByRetweetId(retweetId);
        if(list1.isEmpty()){
            return foundList;
        }else {
            toSave.setRetweets(list1.size() - 1);
            tweetRepository.save(toSave);
            return foundList;
        }
    }

    public Tweet updateOneTweet(Long tweetId, TweetUpdateRequest tweetUpdateRequest) {
        Optional<Tweet> tweet = tweetRepository.findById(tweetId);
        if(tweet.isPresent()){
            Tweet toUpdate = tweet.get();
            toUpdate.setTitle(tweetUpdateRequest.getTitle());
            toUpdate.setText(tweetUpdateRequest.getText());
            tweetRepository.save(toUpdate);
            return toUpdate;
        }
        return null;
    }

    public void deleteOneTweet(Long tweetId, Long retweetId) {
        tweetRepository.deleteById(tweetId);
        getAllTweetsWithParam(tweetId, retweetId);
    }
}
