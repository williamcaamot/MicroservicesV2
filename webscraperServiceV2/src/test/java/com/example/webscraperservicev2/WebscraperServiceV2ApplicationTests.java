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
            // Disable unnecessary settings
            webClient.getOptions().setCssEnabled(false);
            webClient.getOptions().setJavaScriptEnabled(false);

            // Load the page
            final HtmlPage page = webClient.getPage("https://e24.no/");

            // Get the entire page content as a string
            String pageContent = page.asNormalizedText();

            // Regular expression to find email addresses
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
