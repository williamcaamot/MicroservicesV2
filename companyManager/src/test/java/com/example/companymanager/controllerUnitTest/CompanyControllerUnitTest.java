package com.example.companymanager.controllerUnitTest;


import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

@ActiveProfiles("test")
@SpringBootTest
public class CompanyControllerUnitTest {

    //@LocalServerPort(2000L);

    @Test
    public void basicSaveCompanyTest(){

    }

    @Test
    public void testApiResponse() {
        given().
                baseUri("localhost").
                when().
                get("/endpoint").
                then().
                statusCode(200).
                body("key", equalTo("value"));
    }

}
