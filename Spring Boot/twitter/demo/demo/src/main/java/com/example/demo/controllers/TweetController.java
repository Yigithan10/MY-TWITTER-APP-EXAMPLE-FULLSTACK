package com.example.demo.controllers;

import com.example.demo.entities.Like;
import com.example.demo.entities.Tweet;
import com.example.demo.requests.RetweetCreateRequest;
import com.example.demo.requests.TweetCreateRequest;
import com.example.demo.requests.TweetUpdateRequest;
import com.example.demo.services.LikeService;
import com.example.demo.services.TweetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tweets")
public class TweetController {
    private TweetService tweetService;

    public TweetController(TweetService tweetService) {
        this.tweetService = tweetService;
    }

    @GetMapping()
    public List<Tweet> getAllTweets(@RequestParam Optional<Long> userId){
        return tweetService.getAllTweets(userId);
    }

    @GetMapping("/{tweetId}")
    public Tweet getOneTweet(@PathVariable Long tweetId){
        return tweetService.getOneTweet(tweetId);
    }

    @PostMapping
    public ResponseEntity<Tweet> createOneTweet(@RequestBody TweetCreateRequest newTweetRequest){
        return tweetService.createOneTweet(newTweetRequest);
    }

    @PostMapping("/retweet")
    public ResponseEntity<Tweet> retweetOneTweet(@RequestBody RetweetCreateRequest retweetCreateRequest){
        return tweetService.retweetOneTweet(retweetCreateRequest);
    }

    @PutMapping("/{tweetId}")
    public Tweet updateOneTweet(@PathVariable Long tweetId, @RequestBody TweetUpdateRequest tweetUpdateRequest){
        return tweetService.updateOneTweet(tweetId, tweetUpdateRequest);
    }

    @DeleteMapping("/{tweetId}/{retweetId}")
    public void deleteOneTweet(@PathVariable Long tweetId, @PathVariable Long retweetId){
        tweetService.deleteOneTweet(tweetId, retweetId);
    }
}
