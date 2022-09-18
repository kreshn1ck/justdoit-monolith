package com.ubt.todo.controller;

import com.ubt.todo.service.todo.TodoService;
import com.ubt.todo.transports.TodoTransport;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/todos")
public class TodoController {

    private final TodoService todoService;

    @PostMapping
    public ResponseEntity<TodoTransport> create(@RequestBody TodoTransport todoTransport) {
        TodoTransport todo = todoService.createTodo(todoTransport);
        return ResponseEntity.ok(todo);
    }

    @GetMapping("/{todoId}")
    public ResponseEntity<TodoTransport> get(@PathVariable Long todoId) {
        TodoTransport todo = todoService.getTodo(todoId);
        return ResponseEntity.ok(todo);
    }

    @PutMapping("/{todoId}")
    public ResponseEntity<TodoTransport> update(@PathVariable Long todoId,
                                                @RequestBody TodoTransport todoTransport) {
        TodoTransport todo = todoService.updateTodo(todoId, todoTransport);
        return ResponseEntity.ok(todo);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{todoId}")
    public void delete(@PathVariable Long todoId) {
        todoService.deleteTodo(todoId);
    }

    @PutMapping("/{todoId}/finished")
    public ResponseEntity<TodoTransport> markFinished(@PathVariable Long todoId) {
        TodoTransport todo = todoService.markFinished(todoId);
        return ResponseEntity.ok(todo);
    }

    @PutMapping("/{todoId}/not-finished")
    public ResponseEntity<TodoTransport> markNotFinished(@PathVariable Long todoId) {
        TodoTransport todo = todoService.markNotFinished(todoId);
        return ResponseEntity.ok(todo);
    }

    @GetMapping("/created")
    public List<TodoTransport> getCreatedTodos(@RequestParam(required = false, defaultValue = "true") boolean oldestFirst) {
        return todoService.getCurrentCreatedTodos(oldestFirst);
    }

    @GetMapping("/assigned")
    public List<TodoTransport> getAssignedTodos(@RequestParam(required = false, defaultValue = "true") boolean oldestFirst) {
        return todoService.getCurrentUserAssignedTodos(oldestFirst);
    }
}
