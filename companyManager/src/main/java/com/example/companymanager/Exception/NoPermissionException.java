package com.example.companymanager.Exception;

public class NoPermissionException extends RuntimeException {

    public NoPermissionException() {
        super("You do not have permission to perform this action.");
    }

    public NoPermissionException(String message) {
        super(message);
    }
}