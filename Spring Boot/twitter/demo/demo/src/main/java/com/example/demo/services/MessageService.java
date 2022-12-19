package com.example.demo.services;

import com.example.demo.entities.Conversation;
import com.example.demo.entities.Message;
import com.example.demo.entities.User;
import com.example.demo.repos.ConversationRepository;
import com.example.demo.repos.MessageRepository;
import com.example.demo.requests.ConversationCreateRequest;
import com.example.demo.requests.MessageCreateRequest;
import com.example.demo.requests.MessageUpdateRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MessageService {

    private MessageRepository messageRepository;
    private UserService userService;

    private ConversationService conversationService;
    private ConversationRepository conversationRepository;

    public MessageService(MessageRepository messageRepository, UserService userService, ConversationService conversationService, ConversationRepository conversationRepository) {
        this.messageRepository = messageRepository;
        this.userService = userService;
        this.conversationService = conversationService;
        this.conversationRepository = conversationRepository;
    }

    public List getAllMessages(Optional<Long> userId, Optional<Long> toUserId) {
        Conversation conversation = conversationRepository.findByUserIdAndToUserId(userId.get(), toUserId.get());
        if(conversation==null){
            conversation = conversationRepository.findByUserIdAndToUserId(toUserId.get(), userId.get());
        }

        if (userId.isPresent() && toUserId.isPresent() && conversation!=null){
            List<Message> list = messageRepository.findByConversationId(conversation.getId());
            return list;
        }else {
            String empty = " ";
            List<String> list2 = new ArrayList<>();
            list2.add(0, empty);
            return list2;
        }
    }

    public Optional<Message> getOneMessage(Long messageId) {
        return messageRepository.findById(messageId);
    }

    public ResponseEntity<Message> setOneMessage(MessageCreateRequest messageCreateRequest) {
        User user = userService.getOneUser(messageCreateRequest.getUserId());
        User toUser = userService.getOneUser(messageCreateRequest.getToUserId());
        if(user != null || toUser != null){
            LocalTime localTime = LocalTime.now();
            LocalDate localDate = LocalDate.now();
            if(conversationRepository.findByUserIdAndToUserId(messageCreateRequest.getUserId(), messageCreateRequest.getToUserId())==null){
                if(conversationRepository.findByUserIdAndToUserId(messageCreateRequest.getToUserId(), messageCreateRequest.getUserId())==null){
                    ConversationCreateRequest conversationCreateRequest = new ConversationCreateRequest();
                    conversationCreateRequest.setUserId(messageCreateRequest.getUserId());
                    conversationCreateRequest.setToUserId(messageCreateRequest.getToUserId());
                    conversationCreateRequest.setMessage(messageCreateRequest.getMessage());
                    conversationCreateRequest.setLocalTime(localTime);
                    conversationCreateRequest.setLocalDate(localDate);
                    conversationService.setOneConversation(conversationCreateRequest);

                    Message message = new Message();
                    Conversation isConversation = conversationRepository.findByUserIdAndToUserId(user.getId(), toUser.getId());
                    message.setId(messageCreateRequest.getId());
                    message.setUser(user);
                    message.setToUser(toUser);
                    message.setMessage(messageCreateRequest.getMessage());
                    message.setConversation(isConversation);
                    messageRepository.save(message);
                    return new ResponseEntity<>(message, HttpStatus.OK);
                }else {
                    Message message = new Message();
                    Conversation isConversation = conversationRepository.findByUserIdAndToUserId(user.getId(), toUser.getId());
                    message.setId(messageCreateRequest.getId());
                    message.setUser(user);
                    message.setToUser(toUser);
                    message.setMessage(messageCreateRequest.getMessage());
                    if(isConversation==null){
                        isConversation = conversationRepository.findByUserIdAndToUserId(toUser.getId(), user.getId());
                    }
                    message.setConversation(isConversation);
                    messageRepository.save(message);

                    Conversation secondConversation = conversationRepository.findByUserIdAndToUserId(messageCreateRequest.getToUserId(), messageCreateRequest.getUserId());
                    secondConversation.setMessage(message.getMessage());
                    secondConversation.setLocalTime(message.getLocalTime());
                    secondConversation.setLocalDate(message.getLocalDate());
                    conversationRepository.save(secondConversation);
                    return new ResponseEntity<>(message, HttpStatus.CREATED);
                }
            }else {
                Message message = new Message();
                Conversation isConversation = conversationRepository.findByUserIdAndToUserId(user.getId(), toUser.getId());
                message.setId(messageCreateRequest.getId());
                message.setUser(user);
                message.setToUser(toUser);
                message.setMessage(messageCreateRequest.getMessage());
                message.setConversation(isConversation);
                messageRepository.save(message);

                Conversation firstConversation = conversationRepository.findByUserIdAndToUserId(messageCreateRequest.getUserId(), messageCreateRequest.getToUserId());
                firstConversation.setMessage(message.getMessage());
                firstConversation.setLocalTime(message.getLocalTime());
                firstConversation.setLocalDate(message.getLocalDate());
                conversationRepository.save(firstConversation);
                return new ResponseEntity<>(message, HttpStatus.CREATED);
            }
        }else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<Message> updateOneMessage(Long messageId, MessageUpdateRequest messageUpdateRequest) {
        Optional<Message> message = messageRepository.findById(messageId);
        if(message != null){
            Message toUpdate = message.get();
            toUpdate.setMessage(messageUpdateRequest.getMessage());
            messageRepository.save(toUpdate);
            return new ResponseEntity<>(toUpdate, HttpStatus.CREATED);
        }else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
