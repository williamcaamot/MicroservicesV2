package com.example.companymanager.controllerUnitTest;


import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

@ActiveProfiles("test")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class CompanyControllerUnitTest {


    @LocalServerPort
    private int port;

    @Test
    public void testApiResponse() {

        given()
                .baseUri("http://localhost")
                .port(port) // Dynamically set the port to the injected value
                .when()
                .get("/api/v1/workspace/1/company")
                .then()
                .statusCode(404)
                .body("key", equalTo(null)); //TODO With global exception handling in the controller, can test here that I actually receive the correct error object
    }
}