package com.jsglen.todo.models.dtos;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class UserLoginDto implements Serializable {

    private String email;
    private String password;
}
