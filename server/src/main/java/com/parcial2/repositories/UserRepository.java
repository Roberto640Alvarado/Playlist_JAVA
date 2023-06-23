package com.parcial2.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.repository.ListCrudRepository;

import com.parcial2.models.dtos.SaveDTO;
import com.parcial2.models.entities.User;

public interface UserRepository extends ListCrudRepository<User, UUID> {
	User findByUsernameOrEmail(String username, String email);
	public User findOneByUsernameOrEmail(String username, String email);
	User findByUsernameOrEmailAndPassword(String username, String email, String password);
	
	User save(SaveDTO info);
	Optional <User> findByUsername(String username);
	Optional <User> findByEmail(String email);

}
