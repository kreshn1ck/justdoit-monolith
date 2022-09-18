package com.ubt.todo.controller;

import com.ubt.todo.model.UserRelationship;
import com.ubt.todo.repository.UserRelationshipRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


@AllArgsConstructor
@RestController
public class TestController {

    private UserRelationshipRepository userRelationshipRepository;

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @GetMapping("/test")
    public void validateResetToken() {
        // LOGGER.info("Getting user token: {}", token);
        UserRelationship relationship = userRelationshipRepository.findUserRelationship(3L, 4L);
        if (relationship == null) {
            System.out.println("NULLAJ");
        }
    }
}
