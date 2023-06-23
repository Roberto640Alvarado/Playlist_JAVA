package com.parcial2.services;

import java.util.List;
import java.util.UUID;

import com.parcial2.models.dtos.PasswordDTO;
import com.parcial2.models.dtos.SaveDTO;
import com.parcial2.models.entities.Token;
import com.parcial2.models.entities.User;

public interface UserService {
    void register(SaveDTO info) throws Exception;
    User findOneByIdentifier(String identifier);
    Boolean comparePassword(String toCompare, String current);
    void deleteById(String id) throws Exception;
    User findOneById(UUID id);
    List<User> findAll();
    User findOneByUsername(String username);
    User findOneByEmail(String email);
    User findByUsernameOrEmailAndPassword(String username, String email, String password);
    void changePassword(UUID id, PasswordDTO info) throws Exception;
    User findByUsernameOrEmail(String username, String email);
    
  //Token management
    Token registerToken(User user) throws Exception;
    Boolean isTokenValid(User user, String token);
    void cleanTokens(User user) throws Exception;
    
  //Find User authenticated
    User findUserAuthenticated();



}
