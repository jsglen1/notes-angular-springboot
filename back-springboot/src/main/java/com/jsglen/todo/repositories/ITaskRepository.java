package com.jsglen.todo.repositories;

import com.jsglen.todo.models.entities.TaskModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ITaskRepository extends JpaRepository<TaskModel,Long> {
    // List<TaskModel> findByUserId(Long userId);

    @Query("SELECT task FROM TaskModel task WHERE task.user.id = :userId")
    List<TaskModel> findByUserId(Long userId);

}
