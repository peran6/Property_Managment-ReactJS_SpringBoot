package com.Propertymanager.Propertymanager.controller;

import com.Propertymanager.Propertymanager.exception.UserNotFoundException;
import com.Propertymanager.Propertymanager.models.User;
import com.Propertymanager.Propertymanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user-manager")
@CrossOrigin("http://localhost:3000")
public class UserController {

    @Autowired
   private UserRepository userRepository;

    @GetMapping("/users")
    public List <User> getUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/login/{username}/{password}")
    public ResponseEntity<User> loginUser(
            @PathVariable("username") String userName,
            @PathVariable("password") String password) throws UserNotFoundException{
        User user = userRepository.findByUsernameAndPassword(userName,password)
                .orElseThrow(() -> new UserNotFoundException("User not found ::"+ userName));
        return ResponseEntity.ok().body(user);
    }


    @GetMapping("/users/{userName}")
    public ResponseEntity<User> getUserByUsername(
            @PathVariable(value="userName") String userName
    ) throws UserNotFoundException {
        User user = userRepository.findByUsername(userName)
                .orElseThrow(() -> new UserNotFoundException("User not found ::"+ userName));
        return ResponseEntity.ok().body(user);
    }


    @GetMapping("/userName/{username}")
    public Boolean findByUsername(@PathVariable("username") String userName) {
        boolean exist = userRepository.existsUserByUsername(userName);
        return exist;
    }

    @PostMapping("/create")
    public User createUser(@RequestBody User user){
        boolean exist = userRepository.existsUserByUsername(user.getUsername());
        if(exist){
            return null;
        }else{
            return userRepository.save(user);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable(value = "id") Long userId,
            @RequestBody User userDetails
    ) throws UserNotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found ::"+ userId));
        user.setUsername(userDetails.getUsername());
        user.setPassword(userDetails.getPassword());
        final User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/delete/{id}")
    public Map<String, Boolean > deleteUser(
            @PathVariable(value="id") Long userId
    ) throws UserNotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found ::"+ userId));
        userRepository.delete(user);
        Map < String, Boolean > response = new HashMap< >();
        response.put("deleted", Boolean.TRUE);
        return response;
    }


}
