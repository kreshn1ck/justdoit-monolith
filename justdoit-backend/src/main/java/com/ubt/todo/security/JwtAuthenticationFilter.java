package com.ubt.todo.security;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.util.PathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.UUID;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger LOGGER = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
    private static final PathMatcher PATH_MATCHER = new AntPathMatcher();
    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String PROTECTED_URL_PATTERN = "/api/**";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String username = "";
            if (isProtectedUrl(request)) {
                String authorizationHeader = request.getHeader(AUTHORIZATION_HEADER);
                JwtClaims claims = JwtUtil.validateTokenAndGetClaims(authorizationHeader);

                Long userId = claims.getUserId();
                String email = claims.getUserEmail();
                username = claims.getUsername();
                SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(email, userId, null));
            }
            String mdcData = String.format("[username:%s | requestId:%s] ", username, UUID.randomUUID().toString());
            MDC.put("mdcData", mdcData);
            filterChain.doFilter(request, response);
        } catch (TokenValidationException | ExpiredJwtException | UnsupportedJwtException | MalformedJwtException
                | SignatureException | IllegalArgumentException e) {
            LOGGER.error("An exception was thrown when setting Authentication", e);
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, e.getMessage());
        } finally {
            MDC.clear();
        }
    }

    private boolean isProtectedUrl(HttpServletRequest request) {
        return PATH_MATCHER.match(PROTECTED_URL_PATTERN, request.getServletPath());
    }

}
