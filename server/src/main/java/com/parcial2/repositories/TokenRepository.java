package com.parcial2.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.repository.ListCrudRepository;

import com.parcial2.models.entities.Token;
import com.parcial2.models.entities.User;

public interface TokenRepository extends ListCrudRepository<Token, UUID>{
	List<Token> findByUserAndActive(User user, Boolean active);

}

