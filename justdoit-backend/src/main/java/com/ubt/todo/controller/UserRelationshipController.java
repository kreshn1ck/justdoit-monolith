package com.ubt.todo.controller;

import com.ubt.todo.service.relationships.UserRelationshipService;
import com.ubt.todo.transports.UserRelationshipTransport;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/relationship")
public class UserRelationshipController {

    private final UserRelationshipService relationshipService;

    @PostMapping("/{id}")
    public ResponseEntity<UserRelationshipTransport> create(@PathVariable Long id) {
        UserRelationshipTransport relationship = relationshipService.createFriendship(id);
        return ResponseEntity.ok(relationship);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserRelationshipTransport> get(@PathVariable Long id) {
        UserRelationshipTransport relationship = relationshipService.getRelationship(id);
        return ResponseEntity.ok(relationship);
    }

    @PutMapping("/{id}/accept")
    public ResponseEntity<UserRelationshipTransport> accept(@PathVariable Long id) {
        UserRelationshipTransport relationship = relationshipService.acceptFriendship(id);
        return ResponseEntity.ok(relationship);
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<UserRelationshipTransport> reject(@PathVariable Long id) {
        UserRelationshipTransport relationship = relationshipService.rejectFriendship(id);
        return ResponseEntity.ok(relationship);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}/cancel")
    public void cancel(@PathVariable Long id) {
        relationshipService.deleteFriendship(id);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        relationshipService.deleteFriendship(id);
    }

    @GetMapping("/pending")
    public List<UserRelationshipTransport> geAllPendingRequests() {
        return relationshipService.getCurrentUserPendingRequests();
    }

    @GetMapping("/requested")
    public List<UserRelationshipTransport> getAllRequestedRequests() {
        return relationshipService.getCurrentUserRequestedFriendships();
    }

    @GetMapping("/friends")
    public List<UserRelationshipTransport> getAllFriends() {
        return relationshipService.getAllCurrentUserFriendships();
    }

    @GetMapping("/all")
    public List<UserRelationshipTransport> getAllPeople() {
        return relationshipService.getAllForUser();
    }
}
