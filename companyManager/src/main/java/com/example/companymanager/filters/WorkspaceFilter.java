package com.example.companymanager.filters;


import com.example.companymanager.service.WorkspaceService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.logging.LogRecord;

import jakarta.servlet.Filter;

@Component
@Order(1)
public class WorkspaceFilter implements Filter {
    private WorkspaceService workspaceService;

    public WorkspaceFilter(WorkspaceService workspaceService) {
        this.workspaceService = workspaceService;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        String path = httpRequest.getRequestURI();
        Long workspaceId = extractWorkspaceIdFromPath(path);
        //The request will keep going if cannot find WorkspaceID or if it's not a valid number (another path)
        if (workspaceId != null) {
            if (!workspaceService.workspaceExists(workspaceId)) {
                httpResponse.sendError(HttpStatus.NOT_FOUND.value(), "Workspace not found");
                return; // Stop the request if workspace doesn't exist
            }
            httpRequest.setAttribute("workspaceId", workspaceId);
        }

        chain.doFilter(request, response);
    }


    private Long extractWorkspaceIdFromPath(String path) {
        // Extract workspaceId from the path assuming it's the second segment
        String[] pathSegments = path.split("/");
        try {
            return Long.parseLong(pathSegments[4]); // Adjust based on your API URL structure
        } catch (NumberFormatException | ArrayIndexOutOfBoundsException e) {
            return null; // Return null if workspaceId is not found or is not a valid number
        }
    }

}
