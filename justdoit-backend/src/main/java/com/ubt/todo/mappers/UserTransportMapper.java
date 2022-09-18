package com.ubt.todo.mappers;

import com.ubt.todo.model.User;
import com.ubt.todo.transports.UserTransport;

import java.util.List;
import java.util.stream.Collectors;

public final class UserTransportMapper {

    private UserTransportMapper() {
    }

    public static UserTransport toTransport(User user) {
        if (user == null) {
            return null;
        }
        UserTransport userTransport = new UserTransport();
        userTransport.setId(user.getId());
        userTransport.setEmail(user.getEmail());
        userTransport.setUsername(user.getUsername());
        return userTransport;
    }

    public static List<UserTransport> toTransportList(List<User> users) {
        return users.stream().map(UserTransportMapper::toTransport).collect(Collectors.toList());
    }
}
