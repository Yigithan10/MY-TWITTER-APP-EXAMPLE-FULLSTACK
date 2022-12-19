package com.example.demo.services;

import com.example.demo.entities.Comment;
import com.example.demo.entities.Like;
import com.example.demo.entities.Tweet;
import com.example.demo.entities.User;
import com.example.demo.repos.CommentRepository;
import com.example.demo.repos.TweetRepository;
import com.example.demo.requests.CommentCreateRequest;
import com.example.demo.requests.CommentUpdateRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    private CommentRepository commentRepository;
    private TweetService tweetService;

    private UserService userService;

    private TweetRepository tweetRepository;

    private List<Comment> foundList = new ArrayList<>();

    private List<Comment> list = new ArrayList<>();

    public CommentService(CommentRepository commentRepository, TweetService tweetService, UserService userService, TweetRepository tweetRepository, List<Comment> foundList, List<Comment> list) {
        this.commentRepository = commentRepository;
        this.tweetService = tweetService;
        this.userService = userService;
        this.tweetRepository = tweetRepository;
        this.foundList = foundList;
        this.list = list;
    }

    public List<Comment> getAllComments(Optional<Long> tweetId) {
        if(tweetId.isPresent()){
            List<Comment> list = commentRepository.findByTweetId(tweetId.get());
            return list;
        }else {
            return commentRepository.findAll();
        }
    }

    public List<Comment> getAllCommentsWithParam(Long tweetId) {
        Optional<Tweet> tweet = Optional.ofNullable(tweetService.getOneTweet(tweetId));
        list = commentRepository.findByTweetId(tweetId);

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
        toUpdate.setComments(list.size());
        tweetRepository.save(toUpdate);
        return foundList;
    }

    public ResponseEntity setOneComment(CommentCreateRequest commentCreateRequest) {
        Tweet tweet = tweetService.getOneTweet(commentCreateRequest.getTweetId());
        User user = userService.getOneUser(commentCreateRequest.getUserId());
        if(tweet != null && user != null){
            Comment comment = new Comment();
            comment.setId(commentCreateRequest.getId());
            comment.setTweet(tweet);
            comment.setUser(user);
            comment.setText(commentCreateRequest.getText());
            commentRepository.save(comment);
            getAllCommentsWithParam(comment.getTweet().getId());
            return new ResponseEntity(comment, HttpStatus.CREATED);
        }else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }


    public ResponseEntity updateOneComment(Optional<Long> commentId, CommentUpdateRequest commentUpdateRequest) {
        Optional<Comment> comment = commentRepository.findById(commentId.get());
        if(comment!=null){
            if(comment.get().getText().equals(commentUpdateRequest.getText())){
                return new ResponseEntity(comment, HttpStatus.BAD_GATEWAY);
            }else {
                Comment saveComment = comment.get();
                saveComment.setText(commentUpdateRequest.getText());
                commentRepository.save(saveComment);
                return new ResponseEntity(saveComment, HttpStatus.OK);
            }
        }else {
            return new ResponseEntity(null, HttpStatus.BAD_REQUEST);
        }
    }

    public void deleteOneComment(Long commentId) {
        Optional<Comment> comment = commentRepository.findById(commentId);
        commentRepository.deleteById(commentId);
        list.clear();
        foundList.clear();
        getAllCommentsWithParam(comment.get().getTweet().getId());
    }
}
