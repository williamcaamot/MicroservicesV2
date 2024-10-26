package com.example.webscraperservicev2.service;


import org.htmlunit.WebClient;
import org.htmlunit.html.HtmlPage;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class EmailScraperService {

    public ArrayList<String> getEmails(String url) {
        System.out.println("Fetching emails from URL: " + url);

        ArrayList<String> result = new ArrayList<>();

        // Regular expression to match email addresses
        String emailRegex = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}";
        Pattern emailPattern = Pattern.compile(emailRegex);

        // Set up the HTMLUnit WebClient
        try (WebClient webClient = new WebClient()) {
            webClient.getOptions().setJavaScriptEnabled(false);
            webClient.getOptions().setCssEnabled(false);

            // Load the page and get raw HTML content
            HtmlPage page = webClient.getPage(url);
            String pageHtml = page.asXml(); // Get the raw HTML as a string

            // Find and add emails to the result list
            Matcher matcher = emailPattern.matcher(pageHtml);
            while (matcher.find()) {
                result.add(matcher.group());
            }

        } catch (Exception e) {
            System.err.println("Error fetching emails: " + e.getMessage());
            e.printStackTrace();
        }

        System.out.println("Found emails: " + result);
        return result;
    }
}