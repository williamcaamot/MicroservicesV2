package com.example.aiservice.service;

import com.example.aiservice.dto.PutSalesPitchDTO;
import com.example.aiservice.entity.SalesPitch;
import com.example.aiservice.repository.SalesPitchRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

@Service
public class RabbitMQService {

    private RabbitTemplate rabbitTemplate;
    private final OpenAIChatGPTService openAIChatGPTService;

    private final SalesPitchRepo salesPitchRepo;

    @Autowired
    public RabbitMQService(
            RabbitTemplate rabbitTemplate,
            OpenAIChatGPTService openAIChatGPTService,
            SalesPitchRepo salesPitchRepo
    ){
        this.rabbitTemplate = rabbitTemplate;
        this.openAIChatGPTService = openAIChatGPTService;
        this.salesPitchRepo = salesPitchRepo;
    }


    @RabbitListener(queues = "ai_sales_pitch")
    public void receiveMessage(Message message) {
        try {
            String json = new String(message.getBody(), StandardCharsets.UTF_8);
            ObjectMapper objectMapper = new ObjectMapper();
            PutSalesPitchDTO dto = objectMapper.readValue(json, PutSalesPitchDTO.class);

            System.out.println("Deserialized DTO: " + dto);

            String prompt = "You are now going to generate a sales pitch for me. It should be written in English, and you should only provide me with the sales pitch and nothing more." +
                    " The pitch is going to be sent via e-mail to a company called " +
                    dto.getCompanyName() +
                    ". The product sold has the following description: " +
                    dto.getWorkspaceProductDescription() +
                    ". Further, this is the activity of the company selling to: " +
                    dto.getAktivitet().stream()
                            .map(Object::toString) // Convert each entry to a string
                            .collect(Collectors.joining("")) + // Join entries with commas
                    ".";


            // Create and save initial salespitch
            SalesPitch salesPitch = new SalesPitch();
            salesPitch.setPrompt(prompt);
            salesPitch.setComplete(false);
            salesPitch.setWorkspaceId(dto.getWorkspaceId());
            salesPitch.setCompanyId(dto.getCompanyId());

            salesPitchRepo.save(salesPitch);


            // Fetch the response
            String response = openAIChatGPTService.getChatResponse(prompt);

            // Set the response and save it
            salesPitch.setSalesPitch(response);
            salesPitch.setComplete(true);
            salesPitchRepo.save(salesPitch);


        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}