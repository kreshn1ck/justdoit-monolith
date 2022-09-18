package com.ubt.todo.model;

import com.ubt.todo.enums.UserRelationshipType;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "user_relationships")
public class UserRelationship {

    @EmbeddedId
    private UserRelationshipId userRelationshipId;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("relatingUserId")
    private User relatingUser;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("relatedUserId")
    private User relatedUser;

    @Column(name = "relation_type")
    @Enumerated(EnumType.STRING)
    private UserRelationshipType userRelationshipType;

    @Column(name = "requested_at")
    private Date requestedAt;
}
