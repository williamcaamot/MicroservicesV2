package com.example.aiservice.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClient.RequestBodyUriSpec;
import org.springframework.web.reactive.function.client.WebClient.RequestHeadersSpec;
import org.springframework.web.reactive.function.client.WebClient.ResponseSpec;
import reactor.core.publisher.Mono;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class OpenAIChatGPTServiceTest {

    private OpenAIChatGPTService openAIChatGPTService;
    private WebClient webClient;
    private RequestBodyUriSpec requestBodyUriSpec;
    private RequestHeadersSpec<?> requestHeadersSpec;
    private ResponseSpec responseSpec;

    @BeforeEach
    void setUp() {
        // Mock WebClient and its chainable interfaces
        WebClient.Builder webClientBuilder = mock(WebClient.Builder.class);
        webClient = mock(WebClient.class);
        requestBodyUriSpec = mock(RequestBodyUriSpec.class);
        requestHeadersSpec = mock(RequestHeadersSpec.class);
        responseSpec = mock(ResponseSpec.class);

        // Mock WebClient.Builder behavior
        when(webClientBuilder.baseUrl(anyString())).thenReturn(webClientBuilder);
        when(webClientBuilder.defaultHeader(anyString(), anyString())).thenReturn(webClientBuilder);
        when(webClientBuilder.build()).thenReturn(webClient);

        // Initialize OpenAIChatGPTService with mocked WebClient.Builder
        openAIChatGPTService = new OpenAIChatGPTService(webClientBuilder);
    }

    @Test
    void testGetChatResponse() {
        // Arrange
        String prompt = "Hello, how are you?";
        String mockResponseJson = """
                {
                    "choices": [
                        {
                            "message": {
                                "content": "I am fine, thank you!"
                            }
                        }
                    ]
                }
                """;

        // Mock WebClient behavior
        when(webClient.post()).thenReturn(requestBodyUriSpec);
        when(requestBodyUriSpec.bodyValue(any())).thenAnswer(invocation -> requestHeadersSpec); // Explicit answer
        when(requestHeadersSpec.retrieve()).thenReturn(responseSpec);
        when(responseSpec.bodyToMono(String.class)).thenReturn(Mono.just(mockResponseJson));

        // Act
        String response = openAIChatGPTService.getChatResponse(prompt);

        // Assert
        assertEquals("I am fine, thank you!", response);

        // Verify interactions
        verify(webClient).post();
        verify(requestBodyUriSpec).bodyValue(any());
        verify(requestHeadersSpec).retrieve();
        verify(responseSpec).bodyToMono(String.class);
    }
}


