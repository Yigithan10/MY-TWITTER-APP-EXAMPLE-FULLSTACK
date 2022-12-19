package com.example.demo.services;

import com.example.demo.entities.Conversation;
import com.example.demo.entities.User;
import com.example.demo.repos.ConversationRepository;
import com.example.demo.requests.ConversationCreateRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConversationService {

    private ConversationRepository conversationRepository;
    private UserService userService;

    public ConversationService(ConversationRepository conversationRepository, UserService userService) {
        this.conversationRepository = conversationRepository;
        this.userService = userService;
    }

    public List<Conversation> getAllConversations(Optional<Long> userId) {
        if(userId.isPresent()){
            List<Conversation> list = conversationRepository.findByUserIdOrToUserId(userId.get());
            return list;
        }else {
            return conversationRepository.findAll();
        }
    }

    public Optional<Conversation> getOneConversation(Long conversationId) {
        return conversationRepository.findById(conversationId);
    }

    public ResponseEntity<Conversation> setOneConversation(ConversationCreateRequest conversationCreateRequest) {
        User user = userService.getOneUser(conversationCreateRequest.getUserId());
        User toUser = userService.getOneUser(conversationCreateRequest.getToUserId());
        Conversation firstConversation = conversationRepository.findByUserIdAndToUserId(user.getId(), toUser.getId());
        Conversation secondConversation = conversationRepository.findByUserIdAndToUserId(toUser.getId(), user.getId());
        if(user != null && toUser != null){
            if(firstConversation != null || secondConversation != null){
                if(firstConversation == null){
                    saveInfosConversation(secondConversation, conversationCreateRequest.getMessage());
                    return new ResponseEntity<>(secondConversation, HttpStatus.CONTINUE);
                }else {
                    saveInfosConversation(firstConversation, conversationCreateRequest.getMessage());
                    return new ResponseEntity<>(secondConversation, HttpStatus.CONTINUE);
                }
            }else {
                Conversation conversation = new Conversation();
                conversation.setId(conversationCreateRequest.getId());
                conversation.setUser(user);
                conversation.setToUser(toUser);
                conversation.setMessage(conversationCreateRequest.getMessage());
                conversation.setLocalTime(conversationCreateRequest.getLocalTime());
                conversation.setLocalDate(conversationCreateRequest.getLocalDate());
                conversationRepository.save(conversation);
                return new ResponseEntity<>(conversation, HttpStatus.CREATED);
            }
        }else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<Conversation> saveInfosConversation(Conversation conversation, String message) {
        if(conversation!=null){
            conversation.setMessage(message);
            conversationRepository.save(conversation);
            return new ResponseEntity<>(conversation, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
