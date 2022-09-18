package com.ubt.todo.mappers;

import com.ubt.todo.enums.UserRelationshipType;
import com.ubt.todo.model.User;
import com.ubt.todo.model.UserRelationship;
import com.ubt.todo.model.UserRelationshipId;
import com.ubt.todo.transports.UserRelationshipTransport;
import com.ubt.todo.transports.UserTransport;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public final class UserRelationshipTransportMapper {

    private UserRelationshipTransportMapper() {
    }

    public static UserRelationshipTransport toTransport(UserRelationship relationship, Long currentUserId) {
        if (relationship == null) {
            return null;
        }
        // UserTransport relatingUser = UserTransportMapper.toTransport(relationship.getRelatingUser());
        UserTransport relatedUser = getRelatedUser(relationship, currentUserId);

        UserRelationshipTransport transport = new UserRelationshipTransport();
        // transport.setRelatingUser(relatingUser);
        transport.setRelatedUser(relatedUser);
        transport.setUserRelationshipType(relationship.getUserRelationshipType());
        transport.setRequestedAt(relationship.getRequestedAt());
        return transport;
    }

    public static List<UserRelationshipTransport> toTransportList(List<UserRelationship> transports, Long currentUserId) {
        return transports.stream().map(transport -> toTransport(transport, currentUserId))
                .collect(Collectors.toList());
    }

    public static UserRelationship createUserRelationship(UserRelationshipId userRelationshipId,
                                                          User relatingUser,
                                                          User relatedUser) {
        UserRelationship userRelationship = new UserRelationship();
        userRelationship.setUserRelationshipId(userRelationshipId);
        userRelationship.setRelatingUser(relatingUser);
        userRelationship.setRelatedUser(relatedUser);
        userRelationship.setUserRelationshipType(UserRelationshipType.PENDING);
        userRelationship.setRequestedAt(new Date());
        return userRelationship;
    }

    public static UserRelationshipTransport buildNonExistingRelationship(UserRelationshipId userRelationshipId,
                                                          User currentUser,
                                                          User relatedUser) {
        UserRelationship userRelationship = new UserRelationship();
        userRelationship.setUserRelationshipId(userRelationshipId);
        userRelationship.setRelatingUser(currentUser);
        userRelationship.setRelatedUser(relatedUser);
        userRelationship.setUserRelationshipType(UserRelationshipType.NONE);
        userRelationship.setRequestedAt(null);
        return toTransport(userRelationship, currentUser.getId());
    }

    private static UserTransport getRelatedUser(UserRelationship relationship, Long currentUserId) {
        if (currentUserId.equals(relationship.getUserRelationshipId().getRelatedUserId())) {
            return UserTransportMapper.toTransport(relationship.getRelatingUser());
        }
        return UserTransportMapper.toTransport(relationship.getRelatedUser());
    }
}
