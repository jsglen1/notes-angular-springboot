package com.jsglen.todo.controllers;
import com.jsglen.todo.models.dtos.UserDto;
import com.jsglen.todo.models.dtos.UserLoginDto;
import com.jsglen.todo.models.entities.UserModel;
import com.jsglen.todo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;

@RestController()
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;


    // get all user
    @GetMapping
    public ArrayList<UserDto> getUsers(){
        return this.userService.getUsers();
    }


    // create user
    @PostMapping
    public UserDto saveUser(@RequestBody UserModel userDto){
        return this.userService.saveUser(userDto);
    }


    // get userById
    @GetMapping("/{id}")
    public UserDto getUserById(@PathVariable Long id){
        return this.userService.getUserById(id);
    }


    // update partiallyUpdateUserById
    @PatchMapping("/{id}")
    public UserDto partiallyUpdateUserById(@PathVariable Long id, @RequestBody UserModel userModel){
        return this.userService.partiallyUpdateUserById(id,userModel);
    }


    // update one user by id-user
    @PutMapping("/{id}")
    public UserDto updateUserById(@PathVariable Long id,@RequestBody UserModel userModel){
        return this.userService.updateUserById(id,userModel);
    }


    // delete one user by id-user
    @DeleteMapping("/{id}")
    public boolean deleteUserById(@PathVariable Long id){
        return this.userService.deleteUserById(id);
    }


    // get user if exists
    @PostMapping("/login")
    public UserDto userLogin(@RequestBody UserLoginDto userLoginDto ){
        return  userService.userLogin(userLoginDto);
    }

}
