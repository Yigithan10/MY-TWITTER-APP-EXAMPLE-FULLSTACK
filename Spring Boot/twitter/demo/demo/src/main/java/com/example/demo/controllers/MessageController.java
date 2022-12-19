package com.example.demo.controllers;

import com.example.demo.entities.Message;
import com.example.demo.repos.MessageRepository;
import com.example.demo.requests.MessageCreateRequest;
import com.example.demo.requests.MessageUpdateRequest;
import com.example.demo.services.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/messages")
public class MessageController {
    private MessageService messageService;
    private MessageRepository messageRepository;

    public MessageController(MessageService messageService, MessageRepository messageRepository) {
        this.messageService = messageService;
        this.messageRepository = messageRepository;
    }

    @GetMapping
    public List getAllMessages(@RequestParam Optional<Long> userId, @RequestParam Optional<Long> toUserId){
        return messageService.getAllMessages(userId, toUserId);
    }

    @GetMapping("/{messageId}")
    public Optional<Message> getOneMessage(@PathVariable Long messageId){
        return messageService.getOneMessage(messageId);
    }

    @PostMapping
    public ResponseEntity<Message> setOneMessage(@RequestBody MessageCreateRequest messageCreateRequest){
        return messageService.setOneMessage(messageCreateRequest);
    }

    @PutMapping("/{messageId}")
    public ResponseEntity<Message> updateOneMessage(@PathVariable Long messageId, @RequestBody MessageUpdateRequest messageUpdateRequest){
        return messageService.updateOneMessage(messageId, messageUpdateRequest);
    }

    @DeleteMapping("/{messageId}")
    public void deleteOneMessage(@PathVariable Long messageId){
        messageRepository.deleteById(messageId);
    }
}
