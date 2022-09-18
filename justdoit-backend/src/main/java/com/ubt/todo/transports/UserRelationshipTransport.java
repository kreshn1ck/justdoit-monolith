package com.ubt.todo.transports;

import com.ubt.todo.enums.UserRelationshipType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserRelationshipTransport {

    private UserTransport relatedUser;
    private UserRelationshipType userRelationshipType;
    private Date requestedAt;
}
