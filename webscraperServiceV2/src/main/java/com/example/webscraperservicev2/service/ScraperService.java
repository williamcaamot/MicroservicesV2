package com.example.webscraperservicev2.service;


import org.htmlunit.WebClient;
import org.htmlunit.html.HtmlPage;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ScraperService {

    public ArrayList<String> getEmails(String url) {
        ArrayList<String> result = new ArrayList<>();

        String emailRegex = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}";
        Pattern emailPattern = Pattern.compile(emailRegex);

        try (WebClient webClient = new WebClient()) {
            webClient.getOptions().setJavaScriptEnabled(false);
            webClient.getOptions().setCssEnabled(false);

            HtmlPage page = webClient.getPage(url);
            String pageHtml = page.asXml();

            Matcher matcher = emailPattern.matcher(pageHtml);
            while (matcher.find()) {
                result.add(matcher.group());
            }

        } catch (Exception e) {
            System.err.println("Error fetching emails: " + e.getMessage());
            e.printStackTrace();
        }
        return result;
    }

    public ArrayList<String> getPhonenumbers(String url) {
        ArrayList<String> result = new ArrayList<>();

        // Regex pattern to match Norwegian phone numbers
        String phoneRegex = "(\\+47\\s?\\d{2}\\s?\\d{2}\\s?\\d{2}\\s?\\d{2})" +          // +47 xx xx xx xx
                "|(0047\\s?\\d{2}\\s?\\d{2}\\s?\\d{2}\\s?\\d{2})" +         // 0047 xx xx xx xx
                "|(\\b\\d{3}\\s\\d{2}\\s\\d{3}\\b)" +                        // xxx xx xxx
                "|(\\b\\d{4}\\s\\d{4}\\b)";                                  // xxxx xxxx

        Pattern phonePattern = Pattern.compile(phoneRegex);

        // Set up the HTMLUnit WebClient
        try (WebClient webClient = new WebClient()) {
            webClient.getOptions().setJavaScriptEnabled(false);
            webClient.getOptions().setCssEnabled(false);

            // Load the page and get the raw HTML content
            HtmlPage page = webClient.getPage(url);
            String pageHtml = page.asXml(); // Get the raw HTML as a string

            // Find and add phone numbers to the result list
            Matcher matcher = phonePattern.matcher(pageHtml);
            while (matcher.find()) {
                result.add(matcher.group().trim());
            }

        } catch (Exception e) {
            System.err.println("Error fetching phone numbers: " + e.getMessage());
            e.printStackTrace();
        }

        return result;
    }

}