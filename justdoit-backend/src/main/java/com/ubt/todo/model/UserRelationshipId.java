package com.ubt.todo.model;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Embeddable
public class UserRelationshipId implements Serializable {

    @Column(name = "relating_user_id")
    private Long relatingUserId;

    @Column(name = "related_user_id")
    private Long relatedUserId;
}
