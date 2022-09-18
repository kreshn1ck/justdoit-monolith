package com.ubt.todo.service.todo;

import com.ubt.todo.enums.TodoStatus;
import com.ubt.todo.mappers.TodoTransportMapper;
import com.ubt.todo.model.Todo;
import com.ubt.todo.model.User;
import com.ubt.todo.repository.TodoRepository;
import com.ubt.todo.repository.UserRepository;
import com.ubt.todo.service.auth.AuthenticationService;
import com.ubt.todo.transports.TodoTransport;
import com.ubt.todo.utils.ValidationExceptionBuilder;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class TodoService {

    private final TodoRepository todoRepository;
    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;

    @Transactional
    public TodoTransport createTodo(TodoTransport todoTransport) {
        User assigneeUser = userRepository.findUserById(todoTransport.getAssignee().getId());
        User createdByUser = authenticationService.getAuthenticatedUser();
        if (assigneeUser == null) {
            throw ValidationExceptionBuilder.withErrorCode(TodoFailureReason.ASSIGNED_USER_NOT_FOUND.name());
        }
        Todo todo = todoRepository.save(TodoTransportMapper.toEntity(todoTransport, assigneeUser, createdByUser));
        return TodoTransportMapper.toTransport(todo);
    }

    @Transactional
    public TodoTransport updateTodo(Long todoId, TodoTransport todoTransport) {
        Optional<Todo> existingTodo = todoRepository.findById(todoId);
        if (existingTodo.isEmpty()) {
            throw ValidationExceptionBuilder.withErrorCode(TodoFailureReason.TODO_NOT_FOUND.name());
        }
        verifyCurrentUserIsCreatorOrAssignedToTask(existingTodo.get());
        User assigneeUser = userRepository.findUserById(todoTransport.getAssignee().getId());
        if (assigneeUser == null) {
            throw ValidationExceptionBuilder.withErrorCode(TodoFailureReason.ASSIGNED_USER_NOT_FOUND.name());
        }
        TodoTransportMapper.updateCommonFields(existingTodo.get(), todoTransport, assigneeUser);
        Todo todo = todoRepository.save(existingTodo.get());
        return TodoTransportMapper.toTransport(todo);
    }

    @Transactional
    public TodoTransport markFinished(Long todoId) {
        return changeTodoStatus(todoId, TodoStatus.FINISHED);
    }

    @Transactional
    public TodoTransport markNotFinished(Long todoId) {
        return changeTodoStatus(todoId, TodoStatus.CREATED);
    }

    @Transactional
    public void deleteTodo(Long todoId) {
        Todo existingTodo = todoRepository.findOneById(todoId);
        if (existingTodo == null) {
            throw ValidationExceptionBuilder.withErrorCode(TodoFailureReason.TODO_NOT_FOUND.name());
        }
        verifyCurrentUserIsCreatorOrAssignedToTask(existingTodo);
        todoRepository.delete(existingTodo);
    }

    public TodoTransport getTodo(Long todoId) {
        Todo existingTodo = todoRepository.findOneById(todoId);
        if (existingTodo == null) {
            throw ValidationExceptionBuilder.withErrorCode(TodoFailureReason.TODO_NOT_FOUND.name());
        }
        verifyCurrentUserIsCreatorOrAssignedToTask(existingTodo);
        return TodoTransportMapper.toTransport(existingTodo);
    }

    public List<TodoTransport> getCurrentUserAssignedTodos(boolean oldestFirst) {
        User authenticatedUser = authenticationService.getAuthenticatedUser();
        List<Todo> todos;
        if (oldestFirst) {
            todos = todoRepository.findAllByAssigneeOrderByDueDateAsc(authenticatedUser);
        } else {
            todos = todoRepository.findAllByAssigneeOrderByDueDateDesc(authenticatedUser);
        }
        return TodoTransportMapper.toTransportList(todos);
    }

    public List<TodoTransport> getCurrentCreatedTodos(boolean oldestFirst) {
        User authenticatedUser = authenticationService.getAuthenticatedUser();
        List<Todo> todos;
        if (oldestFirst) {
            todos = todoRepository.findAllByCreatedByOrderByDueDateAsc(authenticatedUser);
        } else {
            todos = todoRepository.findAllByCreatedByOrderByDueDateDesc(authenticatedUser);
        }
        return TodoTransportMapper.toTransportList(filterOutCurrentUserTasks(authenticatedUser, todos));
    }

    private TodoTransport changeTodoStatus(Long todoId, TodoStatus todoStatus) {
        Todo existingTodo = todoRepository.findOneById(todoId);
        if (existingTodo == null) {
            throw ValidationExceptionBuilder.withErrorCode(TodoFailureReason.TODO_NOT_FOUND.name());
        }
        verifyCurrentUserIsCreatorOrAssignedToTask(existingTodo);
        existingTodo.setStatus(todoStatus);
        if (TodoStatus.FINISHED.equals(todoStatus)) {
            existingTodo.setFinishedAt(new Date());
        } else {
            existingTodo.setFinishedAt(null);
        }
        Todo todo = todoRepository.save(existingTodo);
        return TodoTransportMapper.toTransport(todo);
    }

    private List<Todo> filterOutCurrentUserTasks(User currentUser, List<Todo> todos) {
        return todos
                .stream()
                .filter(todo -> !currentUser.getId().equals(todo.getAssignee().getId()))
                .collect(Collectors.toList());
    }

    private void verifyCurrentUserIsCreatorOrAssignedToTask(Todo todo) {
        Long currentUserId = authenticationService.getAuthenticatedUserId();
        if (!(currentUserId.equals(todo.getAssignee().getId()) ||
                currentUserId.equals(todo.getCreatedBy().getId()))) {
            throw ValidationExceptionBuilder.withErrorCode(TodoFailureReason.TODO_NO_PERMISSION_FOR_ACTION.name());
        }
    }
}
