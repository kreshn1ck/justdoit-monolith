package com.ubt.todo.security;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable().authorizeRequests()
                // AuthenticationController
                .antMatchers(HttpMethod.OPTIONS, "/auth/login").permitAll()
                .antMatchers(HttpMethod.POST, "/auth/login").permitAll()
                .antMatchers(HttpMethod.GET, "/auth/refresh-token/**").permitAll()

                // UserController
                .antMatchers(HttpMethod.POST, "/users/forgot-password").permitAll()
                .antMatchers(HttpMethod.GET, "/reset-password/**").permitAll()
                .antMatchers(HttpMethod.POST, "/reset-password/**").permitAll()
                .antMatchers(HttpMethod.GET, "/user-confirmation/**").permitAll()
                .antMatchers(HttpMethod.POST, "/sign-up/**").permitAll()
                .antMatchers(HttpMethod.GET, "/test").permitAll()

                .antMatchers("/api/*").permitAll()
                .antMatchers("/v2/api-docs",
                        "/swagger-resources/**",
                        "/swagger-ui.html",
                        "/webjars/**",
                        "/**",
                        "/swagger.json").permitAll()
                .anyRequest().authenticated()
                .and()
                .addFilterBefore(new JwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}