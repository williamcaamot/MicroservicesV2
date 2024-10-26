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
        ArrayList<String> result = new ArrayList<>();

        String emailRegex = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}";
        Pattern emailPattern = Pattern.compile(emailRegex);

        try (WebClient webClient = new WebClient()) {
            webClient.getOptions().setJavaScriptEnabled(false);
            webClient.getOptions().setCssEnabled(false);

            HtmlPage page = webClient.getPage(url);
            String pageContent = page.asNormalizedText();

            Matcher matcher = emailPattern.matcher(pageContent);
            while (matcher.find()) {
                result.add(matcher.group());
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return result;
    }
}