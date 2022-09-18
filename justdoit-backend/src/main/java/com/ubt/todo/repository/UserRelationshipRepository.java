package com.ubt.todo.repository;

import com.ubt.todo.model.UserRelationship;
import com.ubt.todo.model.UserRelationshipId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface UserRelationshipRepository extends JpaRepository<UserRelationship, Long> {

    @Query(value = "SELECT * FROM user_relationships WHERE" +
                    " (related_user_id = :user1_id AND" +
                    " relating_user_id = :user2_id) OR" +
                    " (related_user_id = :user2_id AND" +
                    " relating_user_id = :user1_id)" +
                    " LIMIT 1;",
            nativeQuery = true)
    UserRelationship findUserRelationship(@Param("user1_id") Long user1_id, @Param("user2_id") Long user2_id);

    @Query(value = "SELECT * FROM user_relationships WHERE" +
            " relating_user_id = :relatingUserId AND" +
            " related_user_id = :relatedUserId AND" +
            " relation_type = :type" +
            " LIMIT 1;",
            nativeQuery = true)
    UserRelationship findOneByRelatingUserIdAndRelatedUserIdAndType(@Param("relatingUserId") Long relatingUserId,
                                                                    @Param("relatedUserId") Long relatedUserId,
                                                                    @Param("type") String type);

    @Query(value = "SELECT * FROM user_relationships WHERE" +
            " related_user_id = :relatedUserId AND" +
            " relation_type = :type" +
            " ORDER BY requested_at DESC;",
            nativeQuery = true)
    ArrayList<UserRelationship> findAllByRelatedUserIdAndType(@Param("relatedUserId") Long relatedUserId,
                                                              @Param("type") String type);

    @Query(value = "SELECT * FROM user_relationships WHERE" +
            " relating_user_id = :relatingUserId AND" +
            " relation_type = :type" +
            " ORDER BY requested_at DESC;",
            nativeQuery = true)
    ArrayList<UserRelationship> findAllByRelatingUserIdAndType(@Param("relatingUserId") Long relatingUserId,
                                                              @Param("type") String type);

    @Query(value = "SELECT * FROM user_relationships WHERE" +
            " (related_user_id = :userId OR" +
            " relating_user_id = :userId) AND" +
            " relation_type = 'FRIENDS'" +
            " ORDER BY requested_at DESC;",
            nativeQuery = true)
    ArrayList<UserRelationship> findAllUserFriendships(@Param("userId") Long userId);

    @Query(value = "SELECT * FROM user_relationships WHERE " +
            " (related_user_id = :userId OR relating_user_id = :userId);",
            nativeQuery = true)
    ArrayList<UserRelationship> findAllUserRelationships(@Param("userId") Long userId);

    UserRelationship findUserRelationshipByUserRelationshipId(UserRelationshipId userRelationshipId);
}
