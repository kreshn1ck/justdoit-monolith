package com.ubt.todo.controller;

import com.ubt.todo.request.UserAuthenticationRequest;
import com.ubt.todo.service.auth.AuthenticationService;
import com.ubt.todo.service.auth.AuthenticationSuccess;
import com.ubt.todo.service.refresh.RefreshTokenSuccess;
import com.ubt.todo.service.refresh.RefreshTokenService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final RefreshTokenService refreshTokenService;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationSuccess> login(@RequestBody UserAuthenticationRequest userAuthenticationRequest) {
        AuthenticationSuccess response = authenticationService.authenticate(userAuthenticationRequest.getUsername(), userAuthenticationRequest.getPassword());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/refresh-token/{token}")
    public ResponseEntity<RefreshTokenSuccess> refreshToken(@PathVariable("token") String refreshToken) {
        RefreshTokenSuccess response = refreshTokenService.renewRefreshToken(refreshToken);
        return ResponseEntity.ok(response);
    }
}
