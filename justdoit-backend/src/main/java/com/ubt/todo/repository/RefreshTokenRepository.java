package com.ubt.todo.repository;

import com.ubt.todo.model.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    RefreshToken getRefreshTokenByToken(String token);
}
