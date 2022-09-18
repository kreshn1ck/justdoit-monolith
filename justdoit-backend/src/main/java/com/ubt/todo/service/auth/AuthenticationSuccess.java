package com.ubt.todo.service.auth;

import com.ubt.todo.model.User;
import com.ubt.todo.service.refresh.RefreshTokenSuccess;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticationSuccess extends RefreshTokenSuccess {

    private Long userId;
    private String username;

    public AuthenticationSuccess(String email, AuthenticationSuccessReason reason, String authToken,
                                 String refreshToken, Long userId, String username) {
        super(email, reason, authToken, refreshToken);
        this.userId = userId;
        this.username = username;
    }

    public static AuthenticationSuccess of(String email, AuthenticationSuccessReason reason, String authToken,
                                           String refreshToken, User user) {
        return new AuthenticationSuccess(email, reason, authToken, refreshToken, user.getId(), user.getUsername());
    }
}

