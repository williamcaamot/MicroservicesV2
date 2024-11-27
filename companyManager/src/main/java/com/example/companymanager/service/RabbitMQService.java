package com.example.companymanager.service;

import com.example.companymanager.configuration.RabbitMQConfig;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageProperties;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RabbitMQService {


    private final RabbitTemplate rabbitTemplate;

    private final String exchangeName = RabbitMQConfig.EXCHANGE_NAME;
    private final String routingKey = RabbitMQConfig.ROUTING_KEY;

    @Autowired
    public RabbitMQService(RabbitTemplate rabbitTemplate){
        this.rabbitTemplate = rabbitTemplate;
    }


    public void sendMessage(Message message){

        rabbitTemplate.send(exchangeName, routingKey, message);
    }
}
