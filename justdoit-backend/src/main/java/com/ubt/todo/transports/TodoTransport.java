package com.ubt.todo.transports;

import com.ubt.todo.enums.TodoStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TodoTransport {

    private Long id;

    @NotNull
    private Date dueDate;

    @NotNull
    private String title;

    @NotNull
    private String description;

    @NotNull
    private UserTransport assignee;

    private UserTransport createdBy;

    private TodoStatus status;
    private Date createdAt;
    private Date updatedAt;
    private Date finishedAt;
}
