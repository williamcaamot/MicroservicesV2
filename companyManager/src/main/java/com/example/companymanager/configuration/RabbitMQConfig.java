package com.example.companymanager.configuration;


import org.springframework.amqp.core.*;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
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

    @Bean
    public Queue myQueue(){
        return QueueBuilder.durable(QUEUE_NAME).build();
    }

    @Bean
    public Jackson2JsonMessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public Binding binding(){
        return BindingBuilder
                .bind(myQueue())
                .to(dealflowExchange())
                .with(ROUTING_KEY)
                .noargs();
    }


}
