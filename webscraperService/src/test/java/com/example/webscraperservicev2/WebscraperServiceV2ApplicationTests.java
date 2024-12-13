package com.example.webscraperservicev2;

import org.htmlunit.WebClient;
import org.htmlunit.html.HtmlPage;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@SpringBootTest
class WebscraperServiceV2ApplicationTests {

    @Test
    void contextLoads() {
    }

    @Test
    public void testEmailScraper() {
        try (final WebClient webClient = new WebClient()) {
            webClient.getOptions().setCssEnabled(false);
            webClient.getOptions().setJavaScriptEnabled(false);

            final HtmlPage page = webClient.getPage("https://e24.no/");

            String pageContent = page.asNormalizedText();

            String emailRegex = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}";
            Pattern pattern = Pattern.compile(emailRegex);
            Matcher matcher = pattern.matcher(pageContent);

            // Print out all email addresses found
            while (matcher.find()) {
                System.out.println("Found email: " + matcher.group());
            }
            if (!matcher.find()){
                System.out.println("No e-mail found");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
