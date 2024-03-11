package com.jsglen.todo.services;

import com.jsglen.todo.models.entities.TaskModel;
import com.jsglen.todo.models.entities.UserModel;
import com.jsglen.todo.repositories.ITaskRepository;
import com.jsglen.todo.repositories.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private ITaskRepository taskRepository;

    @Autowired
    private IUserRepository userRepository;


    // get allTask
    public ArrayList<TaskModel> getTasks (){
        return (ArrayList<TaskModel>) this.taskRepository.findAll();
    }


    // post createTaskToUser
    public TaskModel createTaskToUser(Long user_id,TaskModel taskModel){
        Optional<UserModel> userFind = userRepository.findById(user_id);
        if (userFind.isPresent()) {
            TaskModel newTask = new TaskModel();
            newTask.setUser(userFind.get());
            newTask.setName(taskModel.getName());
            newTask.setDescription(taskModel.getDescription());
            return this.taskRepository.save(newTask);
        }
        return null;
    }


    // get tasksByIdUser
    public ArrayList<TaskModel> getTasksByUser (Long user_id){
        return (ArrayList<TaskModel>) taskRepository.findByUserId(user_id);
    }


    // delete TaskById
    public boolean deleteTaskById(Long id) {
        Optional<TaskModel> taskOptional = taskRepository.findById(id);
        if (taskOptional.isPresent()) {
            taskRepository.deleteById(id);
            return true ;
        }
        return false;
    }


    // update TaskById
    public TaskModel updateTaskById (Long id,TaskModel taskModel){
        Optional<TaskModel> taskFind = taskRepository.findById(id);
        if(taskFind.isPresent()){
            TaskModel existingTask = taskFind.get();
            existingTask.setName(taskModel.getName());
            existingTask.setDescription(taskModel.getDescription());
            return taskRepository.save(existingTask);
        }
        return null;
    }


    // update partially TaskById
    public TaskModel partiallyUpdateTaskById(Long id, TaskModel taskModel) {
        Optional<TaskModel> taskOptional = taskRepository.findById(id);
        if (taskOptional.isPresent()) {
            TaskModel existingTask = taskOptional.get();

            // Actualiza los campos solo si se proporcionaron en taskModel
            if (taskModel.getName() != null) {
                existingTask.setName(taskModel.getName());
            }
            if (taskModel.getDescription() != null) {
                existingTask.setDescription(taskModel.getDescription());
            }

            // Guarda los cambios en la base de datos
            return taskRepository.save(existingTask);
        }
        return null;
    }


}
