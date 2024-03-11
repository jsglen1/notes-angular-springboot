package com.jsglen.todo.controllers;

import com.jsglen.todo.models.entities.TaskModel;
import com.jsglen.todo.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/task")
public class TaskController {

    @Autowired
    private TaskService taskService;


    // get all task
    @GetMapping
    public ArrayList<TaskModel> getTasks (){
        return this.taskService.getTasks();
    }


    // create a task assigned to its respective user Required
    @PostMapping("/{user_id}/user")
    public ResponseEntity<TaskModel> addTaskToUser (
            @PathVariable(value = "user_id") Long user_id,
            @RequestBody TaskModel taskModel
    ){
        TaskModel savedTask = this.taskService.createTaskToUser(user_id,taskModel);
        return ResponseEntity.ok(savedTask);
    }


    // get all tasks one user
    @GetMapping("/{user_id}/user")
    public ResponseEntity<ArrayList<TaskModel>> saveTask (
            @PathVariable(value = "user_id") Long user_id
    ){
        ArrayList<TaskModel> data = this.taskService.getTasksByUser(user_id);
        return ResponseEntity.ok(data) ;
    }


    // delete one task by id-task
    @DeleteMapping("/{id}")
    public boolean deleteTaskById(@PathVariable Long id){
        return this.taskService.deleteTaskById(id);
    }


    // update one task by id-task
    @PutMapping("/{id}")
    public ResponseEntity<TaskModel> updateTaskById(@PathVariable("id") Long id, @RequestBody TaskModel taskModel) {
        TaskModel updatedTask = taskService.updateTaskById(id, taskModel);
        return ResponseEntity.ok(updatedTask);
    }


    // update partially one task by id-task
    @PatchMapping("/{id}")
    public ResponseEntity<TaskModel> partiallyUpdateTask(@PathVariable("id") Long id, @RequestBody TaskModel taskModel) {
        TaskModel updatedTask = taskService.partiallyUpdateTaskById(id, taskModel);
        return ResponseEntity.ok(updatedTask);
    }


}
