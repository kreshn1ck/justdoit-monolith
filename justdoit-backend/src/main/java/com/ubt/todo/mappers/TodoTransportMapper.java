package com.ubt.todo.mappers;

import com.ubt.todo.enums.TodoStatus;
import com.ubt.todo.model.Todo;
import com.ubt.todo.model.User;
import com.ubt.todo.transports.TodoTransport;
import com.ubt.todo.transports.UserTransport;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public final class TodoTransportMapper {

    private TodoTransportMapper() {
    }

    public static TodoTransport toTransport(Todo todo) {
        if (todo == null) {
            return null;
        }
        UserTransport assignee = UserTransportMapper.toTransport(todo.getAssignee());
        UserTransport createdBy = UserTransportMapper.toTransport(todo.getCreatedBy());
        TodoTransport todoTransport = new TodoTransport();
        todoTransport.setId(todo.getId());
        todoTransport.setAssignee(assignee);
        todoTransport.setCreatedBy(createdBy);
        todoTransport.setCreatedAt(todo.getCreatedAt());
        todoTransport.setUpdatedAt(todo.getUpdatedAt());
        todoTransport.setDueDate(todo.getDueDate());
        todoTransport.setFinishedAt(todo.getFinishedAt());
        todoTransport.setTitle(todo.getTitle());
        todoTransport.setDescription(todo.getDescription());
        updateStatus(todoTransport, todo);
        return todoTransport;
    }

    public static void updateStatus(TodoTransport todoTransport, Todo todo) {
        if (!TodoStatus.FINISHED.equals(todo.getStatus()) && new Date().after(todo.getDueDate())) {
            todoTransport.setStatus(TodoStatus.EXPIRED);
        } else {
            todoTransport.setStatus(todo.getStatus());
        }
    }

    public static List<TodoTransport> toTransportList(List<Todo> todos) {
        return todos.stream().map(TodoTransportMapper::toTransport).collect(Collectors.toList());
    }

    public static Todo toEntity(TodoTransport todoTransport, User assigneeUser, User createdByUser) {
        Todo todo = new Todo();
        todo.setCreatedBy(createdByUser);
        todo.setStatus(TodoStatus.CREATED);
        updateCommonFields(todo, todoTransport, assigneeUser);
        return todo;
    }

    public static void updateCommonFields(Todo todo, TodoTransport todoTransport, User assigneeUser) {
        todo.setAssignee(assigneeUser);
        todo.setDueDate(todoTransport.getDueDate());
        todo.setTitle(todoTransport.getTitle());
        todo.setDescription(todoTransport.getDescription());
        todo.setUpdatedAt(new Date());
    }
}
