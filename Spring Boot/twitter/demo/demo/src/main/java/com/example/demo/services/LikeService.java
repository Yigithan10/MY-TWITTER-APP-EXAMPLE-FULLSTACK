package com.example.demo.services;

import com.example.demo.entities.Like;
import com.example.demo.entities.Tweet;
import com.example.demo.entities.User;
import com.example.demo.repos.LikeRepository;
import com.example.demo.repos.TweetRepository;
import com.example.demo.requests.LikeCreateRequest;
import com.example.demo.requests.TweetCreateRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LikeService {
    private LikeRepository likeRepository;
    private UserService userService;
    private TweetService tweetService;

    private TweetRepository tweetRepository;

    private List<Like> foundList = new ArrayList<>();
    private List<Like> list = new ArrayList<>();

    public LikeService(LikeRepository likeRepository, UserService userService, TweetService tweetService, TweetRepository tweetRepository) {
        this.likeRepository = likeRepository;
        this.userService = userService;
        this.tweetService = tweetService;
        this.tweetRepository = tweetRepository;
    }

    public List<Like> getAllLikes(Optional<Long> tweetId) {
        if(tweetId.isPresent()){
            List<Like> like = likeRepository.findByTweetId(tweetId.get());
            return like;
        }else {
            return likeRepository.findAll();
        }
    }

    public List<Like> getAllLikesWithPath(Long tweetId) {
        Optional<Tweet> tweet = Optional.ofNullable(tweetService.getOneTweet(tweetId));
        list = likeRepository.findByTweetId(tweetId);

        for(int i = 0; i<list.size(); i++){
            int control=0;
            for(int j = 0; j<foundList.size(); j++){
                if(list.get(i).getId()==foundList.get(j).getId()){
                   control=1;
                }
            }
            if(control!=1){
                foundList.add(list.get(i));
            }
        }
        Tweet toUpdate = tweet.get();
        toUpdate.setTitle(tweet.get().getTitle());
        toUpdate.setText(tweet.get().getText());
        toUpdate.setLikes(list.size());
        tweetRepository.save(toUpdate);
        return foundList;
    }

    public Optional<Like> getOneLike(Long likeId) {
        if(likeId==null){
            return null;
        }else {
            return likeRepository.findById(likeId);
        }
    }

    public ResponseEntity<Like> createOneLike(LikeCreateRequest likeCreateRequest) {
        User user = userService.getOneUser(likeCreateRequest.getUserId());
        Tweet tweet = tweetService.getOneTweet(likeCreateRequest.getTweetId());
        if(user==null || tweet==null){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }else {
            Like toSave = new Like();
            toSave.setId(likeCreateRequest.getId());
            toSave.setUser(user);
            toSave.setTweet(tweet);
            if(likeRepository.findByTweetIdAndUserId(likeCreateRequest.getTweetId(), likeCreateRequest.getUserId())!=null){
                deleteOneLike(likeCreateRequest.getTweetId(), likeCreateRequest.getUserId());
                return new ResponseEntity<>(toSave, HttpStatus.NOT_FOUND);
            }else {
                likeRepository.save(toSave);
                list.clear();
                foundList.clear();
                getAllLikesWithPath(likeCreateRequest.getTweetId());
                return new ResponseEntity<>(toSave, HttpStatus.CREATED);
            }
        }
    }

    public void deleteOneLike(Long tweetId, Long userId) {
        Like deleteLike = new Like();
        Like toDelete = likeRepository.findByTweetIdAndUserId(tweetId, userId);
        likeRepository.deleteById(toDelete.getId());
        list.clear();
        foundList.clear();
        getAllLikesWithPath(tweetId);
    }
}
