package com.example.aiservice.service;

import com.example.aiservice.dto.PutSalesPitchDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;

@Service
public class RabbitMQService {

    private final RabbitTemplate rabbitTemplate;

    @Autowired
    public RabbitMQService(RabbitTemplate rabbitTemplate){
        this.rabbitTemplate = rabbitTemplate;
    }


    @RabbitListener(queues = "ai_sales_pitch")
    public void receiveMessage(Message message) {
        try {
            String json = new String(message.getBody(), StandardCharsets.UTF_8);
            ObjectMapper objectMapper = new ObjectMapper();
            PutSalesPitchDTO dto = objectMapper.readValue(json, PutSalesPitchDTO.class);

            System.out.println("Deserialized DTO: " + dto);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}