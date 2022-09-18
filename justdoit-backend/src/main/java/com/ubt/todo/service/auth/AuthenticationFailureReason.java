package com.ubt.todo.service.auth;

public enum AuthenticationFailureReason {

    /**
     * Corresponding validation error code sent to the frontend
     */
    BAD_CREDENTIALS,
    BAD_REFRESH_TOKEN,
    REFRESH_TOKEN_EXPIRED,
    USER_NOT_CONFIRMED;
}
