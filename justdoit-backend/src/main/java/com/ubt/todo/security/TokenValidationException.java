package com.ubt.todo.security;

public class TokenValidationException extends Exception {
    public TokenValidationException(String msg) {
        super(msg);
    }
}
