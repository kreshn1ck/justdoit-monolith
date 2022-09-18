package com.ubt.todo.service.auth;

import com.ubt.todo.enums.UserStatus;
import com.ubt.todo.model.User;
import com.ubt.todo.repository.UserRepository;
import com.ubt.todo.security.JwtUtil;
import com.ubt.todo.service.refresh.RefreshTokenService;
import com.ubt.todo.utils.ValidationExceptionBuilder;
import lombok.extern.slf4j.Slf4j;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class AuthenticationService {

    private static final Logger LOGGER = LogManager.getLogger(AuthenticationService.class);
    private final UserRepository userRepository;
    private final RefreshTokenService refreshTokenService;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationService(UserRepository userRepository, RefreshTokenService refreshTokenService,
                                 PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.refreshTokenService = refreshTokenService;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthenticationSuccess authenticate(String usernameOrEmail, String password) {
        User user = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail);
        validateAuthentication(user, password);
        return getAuthenticationResponse(user);
    }

    private void validateAuthentication(User user, String password) {
        Optional<AuthenticationFailure> authenticationError = Optional.empty();

        if (user == null || !passwordMatches(password, user)) {
            authenticationError =  Optional.of(AuthenticationFailure.of(AuthenticationFailureReason.BAD_CREDENTIALS));
        }
        else if (UserStatus.UNCONFIRMED.equals(user.getStatus())) {
            authenticationError = Optional.of(AuthenticationFailure.of(AuthenticationFailureReason.USER_NOT_CONFIRMED));
        }

        if (authenticationError.isPresent()) {
            throw ValidationExceptionBuilder.withErrorCode(authenticationError.get().getReason().name());
        }
    }

    private boolean passwordMatches(String password, User user) {
        return passwordEncoder.matches(password, user.getPassword());
    }

    private AuthenticationSuccess getAuthenticationResponse(User user) {
        String authToken = JwtUtil.generateToken(user);
        String refreshToken = refreshTokenService.createRefreshToken(user);
        return AuthenticationSuccess.of(user.getEmail(), AuthenticationSuccessReason.AUTHENTICATED, authToken, refreshToken, user);
    }

    public User getAuthenticatedUser() {
        String email = getAuthenticatedUserEmail();
        LOGGER.info("Getting authenticated user with email: {} ", email);
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new AuthenticationCredentialsNotFoundException("User with email " + email + " does not exist");
        }
        return user;
    }

    public String getAuthenticatedUserEmail() {
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            LOGGER.info("Getting authenticated user email");
            return (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        }
        LOGGER.debug("No authenticated user present");
        throw new AuthenticationCredentialsNotFoundException("No authenticated user present");
    }

    public Long getAuthenticatedUserId() {
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            LOGGER.info("Getting authenticated user account");
            return (Long) SecurityContextHolder.getContext().getAuthentication().getCredentials();
        }
        LOGGER.debug("No authenticated user present");
        return null;
    }
}
