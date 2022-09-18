package com.ubt.todo.repository;

import com.ubt.todo.model.Todo;
import com.ubt.todo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    ArrayList<Todo> findAllByAssigneeOrderByDueDateAsc(User assignee);

    ArrayList<Todo> findAllByAssigneeOrderByDueDateDesc(User assignee);

    ArrayList<Todo> findAllByCreatedByOrderByDueDateAsc(User createdBy);

    ArrayList<Todo> findAllByCreatedByOrderByDueDateDesc(User createdBy);

    Todo findOneById(Long id);
}
