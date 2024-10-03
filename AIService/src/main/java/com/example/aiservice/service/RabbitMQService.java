package com.example.aiservice.service;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RabbitMQService {

    private final RabbitTemplate rabbitTemplate;

    @Autowired
    public RabbitMQService(RabbitTemplate rabbitTemplate){
        this.rabbitTemplate = rabbitTemplate;
    }


    @RabbitListener(queues = "ai_sales_pitch")
    public void receiveMessage(String message) {
        // This method will be triggered when a message is received from the queue
        System.out.println("Received message from ai_sales_pitch queue: " + message);

    }


}