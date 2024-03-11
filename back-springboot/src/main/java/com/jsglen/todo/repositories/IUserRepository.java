package com.jsglen.todo.repositories;

import com.jsglen.todo.models.entities.TaskModel;
import com.jsglen.todo.models.entities.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<UserModel,Long> {
    Optional<UserModel> findByName(String name);

    Optional<UserModel> findByEmail(String email);

}
