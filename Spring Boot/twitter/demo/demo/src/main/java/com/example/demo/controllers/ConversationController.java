package com.example.demo.controllers;

import com.example.demo.entities.Conversation;
import com.example.demo.repos.ConversationRepository;
import com.example.demo.requests.ConversationCreateRequest;
import com.example.demo.services.ConversationService;
import com.example.demo.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/conversations")
public class ConversationController {
    private ConversationRepository conversationRepository;
    private ConversationService conversationService;
    private UserService userService;

    public ConversationController(ConversationRepository conversationRepository, ConversationService conversationService, UserService userService) {
        this.conversationRepository = conversationRepository;
        this.conversationService = conversationService;
        this.userService = userService;
    }

    @GetMapping
    public List getAllConversations(@RequestParam Optional<Long> userId){
        return conversationService.getAllConversations(userId);
    }

    @GetMapping("/{conversationId}")
    public Optional<Conversation> getOneConversation(@PathVariable Long conversationId){
        return conversationService.getOneConversation(conversationId);
    }

    @PostMapping
    public ResponseEntity<Conversation> setOneConversation(@RequestBody ConversationCreateRequest conversationCreateRequest){
        return conversationService.setOneConversation(conversationCreateRequest);
    }

    @PutMapping("/saveInfos")
    public ResponseEntity<Conversation> saveInfosConversation(Conversation conversation, String message){
        return conversationService.saveInfosConversation(conversation, message);
    }

    @DeleteMapping("/{conversationId}")
    public void deleteOneConversation(@PathVariable Long conversationId){
        conversationRepository.deleteById(conversationId);
    }
}
