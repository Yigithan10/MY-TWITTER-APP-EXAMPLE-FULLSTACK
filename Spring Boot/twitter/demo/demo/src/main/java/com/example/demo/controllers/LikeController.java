package com.example.demo.controllers;

import com.example.demo.entities.Like;
import com.example.demo.entities.Tweet;
import com.example.demo.entities.User;
import com.example.demo.repos.LikeRepository;
import com.example.demo.requests.LikeCreateRequest;
import com.example.demo.requests.TweetCreateRequest;
import com.example.demo.services.LikeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/likes")
public class LikeController {
    private LikeService likeService;

    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @GetMapping
    public List<Like> getAllLikes(@RequestParam Optional<Long> tweetId){
        return likeService.getAllLikes(tweetId);
    }

    @GetMapping("/likes/{tweetId}")
    public List<Like> getAllLikesWithPath(@PathVariable Long tweetId){
        return likeService.getAllLikesWithPath(tweetId);
    }

    @GetMapping("/{likeId}")
    public Optional<Like> getOneLike(@PathVariable Long likeId){
        return likeService.getOneLike(likeId);
    }

    @PostMapping
    public ResponseEntity<Like> createOneLike(@RequestBody LikeCreateRequest likeCreateRequest){
        return likeService.createOneLike(likeCreateRequest);
    }

    @DeleteMapping("/{tweetId}/{userId}")
    public void deleteOneLike(@PathVariable Long tweetId, @PathVariable Long userId){
        likeService.deleteOneLike(tweetId, userId);
    }
}
