package com.example.backend.config;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.example.backend.dto.ChatMessage;
import com.example.backend.dto.MessageType;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class WebSocketEventListener {

    private final SimpMessageSendingOperations messageTemplate;

    @EventListener
    public void handleWebSocketDisconnectListener(
        SessionDisconnectEvent event
    )
    {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String userName = (String) headerAccessor.getSessionAttributes().get("userName");
        if(userName != null)
        {
            log.info("User Disconnected: {} " + userName);
            var chatMessage = ChatMessage.builder().type(MessageType.LEAVE).sender(userName).build();
            messageTemplate.convertAndSend("/topic/public", chatMessage);
        }
    }
}
