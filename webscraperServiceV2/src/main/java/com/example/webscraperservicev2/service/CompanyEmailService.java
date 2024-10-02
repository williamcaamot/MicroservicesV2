package com.example.webscraperservicev2.service;


import org.htmlunit.ScriptResult;
import org.htmlunit.WebClient;
import org.htmlunit.html.HtmlBody;
import org.htmlunit.html.HtmlElement;
import org.htmlunit.html.HtmlPage;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyEmailService {

    // 1. Get DOM and try find an element with email format, maybe use regex?


    public void testMethod(){
        try(final WebClient webClient = new WebClient()){

            final HtmlPage page1 = webClient.getPage("https://www.a-ll.no/");
            final List divs = page1.getByXPath("");
            for(int i = 0; i < divs.size(); i ++){
                System.out.println(divs.get(i).toString());
            }



        }catch (Exception e){
            e.printStackTrace();
        }
    }



}
