package com.ubt.todo.security;

import com.ubt.todo.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

public class JwtUtil {

    private static final String SECRET = "ThisIsASecret";
    private static final String TOKEN_PREFIX = "Bearer";

    public static String generateToken(User user) {
        Claims claims = JwtClaims.fromUserWithAccount(user);
        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(new Date(System.currentTimeMillis() + JwtClaims.EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
    }

    public static JwtClaims validateTokenAndGetClaims(String authorizationHeader) throws TokenValidationException {
        if (authorizationHeader == null) {
            throw new TokenValidationException("Missing token");
        }
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET)
                .parseClaimsJws(authorizationHeader.replace(TOKEN_PREFIX, ""))
                .getBody();

        return new JwtClaims(claims);
    }
}