package com.example.companymanager.configuration;


import org.springframework.amqp.core.Exchange;
import org.springframework.amqp.core.ExchangeBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {


    public static final String EXCHANGE_NAME = "dealflow";

    public static final String QUEUE_NAME = "ai_sales_pitch";

    public static final String ROUTING_KEY = "my_routing_key";


    @Bean //1 Declare exchange
    public Exchange dealflowExchange(){
        return ExchangeBuilder.directExchange(EXCHANGE_NAME).durable(true).build();
    }

}
