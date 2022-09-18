package com.ubt.todo.utils;

import com.ubt.todo.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

@Component
public class MailHelper {

    private static final String DEFAULT_ENCODING = "UTF-8";

    @Value("${todo.confirm.user.url}")
    private String confirmUserURL;
    @Value("${todo.reset.password.url}")
    private String resetPasswordURL;
    @Value("${spring.mail.sender}")
    private String senderEmail;

    public Mail prepareConfirmUserEmail(User user) throws UnsupportedEncodingException {
        String constructedConfirmUrl = confirmUserURL + URLEncoder.encode(user.getConfirmToken(), DEFAULT_ENCODING);
        Map<String, Object> properties = new HashMap<>();
        properties.put("username", user.getUsername());
        properties.put("confirmUserUrl", constructedConfirmUrl);

        return Mail.builder()
                .from(senderEmail)
                .to(user.getEmail())
                .htmlTemplate(new Mail.HtmlTemplate("User_Confirmation", properties))
                .subject("User confirmation for " + user.getUsername())
                .build();
    }

    public Mail prepareResetPasswordEmail(User user) throws UnsupportedEncodingException {
        String constructedPasswordResetLink = resetPasswordURL + URLEncoder.encode(user.getResetToken(), DEFAULT_ENCODING);
        Map<String, Object> properties = new HashMap<>();
        properties.put("username", user.getUsername());
        properties.put("passwordResetLink", constructedPasswordResetLink);

        return Mail.builder()
                .from(senderEmail)
                .to(user.getEmail())
                .htmlTemplate(new Mail.HtmlTemplate("Reset_Password", properties))
                .subject("Reset password for " + user.getUsername())
                .build();
    }
}
