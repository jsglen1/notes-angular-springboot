package com.jsglen.todo.services;
import com.jsglen.todo.models.dtos.UserDto;
import com.jsglen.todo.models.dtos.UserLoginDto;
import com.jsglen.todo.models.entities.TaskModel;
import com.jsglen.todo.models.entities.UserModel;
import com.jsglen.todo.repositories.IUserRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Optional;

@Service
public class UserService  {

    @Autowired
    IUserRepository userRepository;


    // get allUsers
    public ArrayList<UserDto> getUsers (){
        ArrayList<UserModel> userArrayList = (ArrayList<UserModel> ) this.userRepository.findAll();
        ArrayList<UserDto> userDtoList = new ArrayList<>();

        for (UserModel userModel : userArrayList) {
            UserDto userDto = new UserDto(userModel.getId(), userModel.getName(), userModel.getEmail());
            userDtoList.add(userDto);
        }

        return userDtoList;
    }


    // post createUser
    public UserDto saveUser(UserModel userModel){
        Optional<UserModel> useFind = userRepository.findByEmail(userModel.getEmail());
        if(useFind.isPresent()){
            return null;
        }else{
            UserModel userSaved =  this.userRepository.save(userModel);
            return (new UserDto(userSaved.getId(),userSaved.getName(),userSaved.getEmail())) ;
        }
    }


    // get userById
    public UserDto getUserById(Long id){
        Optional<UserModel>  userFind =  userRepository.findById(id);
        return userFind.map(userModel -> new UserDto(userModel.getId(), userModel.getName(), userModel.getEmail())).orElse(null);

    }


    // update partially UserById
    public UserDto partiallyUpdateUserById(Long id,UserModel userModel){
        Optional<UserModel> userFind = this.userRepository.findById(id);
        if( userFind.isPresent()){

            UserModel saved = userFind.get();

            if(userModel.getName() != null){
                saved.setName(userModel.getName());
            }

            if(userModel.getEmail() != null){
                saved.setEmail(userModel.getEmail());
            }

            userRepository.save(saved);
            return new UserDto(saved.getId(),saved.getName(),saved.getEmail());
        }

        return null;
    }


    // update UserById
    public UserDto updateUserById(Long id, UserModel userModel){
        Optional<UserModel> userFind = this.userRepository.findById(id);
        if( userFind.isPresent()){

            UserModel saved = userFind.get();

            saved.setName(userModel.getName());
            saved.setEmail(userModel.getEmail());

            userRepository.save(saved);
            return new UserDto(saved.getId(),saved.getName(),saved.getEmail());
        }
        return null;
    }


    // delete UserById
    public boolean deleteUserById(Long id) {
        Optional<UserModel> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            userRepository.deleteById(id);
            return true ;
        }
        return false;
    }

    // userLogin
    public UserDto userLogin(UserLoginDto userLoginDto){
        Optional<UserModel> userFind = this.userRepository.findByEmail((userLoginDto.getEmail()));
        if(userFind.isPresent()){
            UserModel data = userFind.get();
            if(data.getPassword().equals(userLoginDto.getPassword())){
                return new UserDto(data.getId(), data.getName(),data.getEmail());
            }
        }
        return null;
    }


}
