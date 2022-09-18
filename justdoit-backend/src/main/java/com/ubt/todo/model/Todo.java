package com.ubt.todo.model;

import com.ubt.todo.enums.TodoStatus;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "todos")
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.DETACH, CascadeType.PERSIST})
    @JoinColumn(name = "assignee_id")
    private User assignee;

    @NotNull
    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.DETACH, CascadeType.PERSIST})
    @JoinColumn(name = "created_by")
    private User createdBy;

    @Column(name = "todo_status")
    @Enumerated(EnumType.STRING)
    @NotNull
    private TodoStatus status = TodoStatus.CREATED;

    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    private Date createdAt;

    private Date updatedAt;

    private Date dueDate;

    private Date finishedAt;

    private String title;

    private String description;
}
