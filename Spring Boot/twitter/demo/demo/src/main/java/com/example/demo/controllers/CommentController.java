package com.example.demo.controllers;

import com.example.demo.entities.Comment;
import com.example.demo.entities.Tweet;
import com.example.demo.entities.User;
import com.example.demo.repos.CommentRepository;
import com.example.demo.requests.CommentCreateRequest;
import com.example.demo.requests.CommentUpdateRequest;
import com.example.demo.services.CommentService;
import com.example.demo.services.TweetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/comments")
public class CommentController {
    private CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping
    public List<Comment> getAllComments(@RequestParam Optional<Long> tweetId){
        return commentService.getAllComments(tweetId);
    }

    @GetMapping("/comments/{tweetId}")
    public List<Comment> getAllCommentsWithParam(@PathVariable Long tweetId){
        return commentService.getAllCommentsWithParam(tweetId);
    }

    @PostMapping
    public ResponseEntity setOneComment(@RequestBody CommentCreateRequest commentCreateRequest){
        return commentService.setOneComment(commentCreateRequest);
    }

    @PutMapping
    public ResponseEntity updateOneComment(@RequestParam Optional<Long> commentId, @RequestBody CommentUpdateRequest commentUpdateRequest){
        return commentService.updateOneComment(commentId, commentUpdateRequest);
    }

    @DeleteMapping("/{commentId}")
    public void deleteOneComment(@PathVariable Long commentId){
        commentService.deleteOneComment(commentId);
    }
}
