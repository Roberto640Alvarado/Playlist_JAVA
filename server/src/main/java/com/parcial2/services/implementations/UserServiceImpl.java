package com.parcial2.services.implementations;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.parcial2.models.dtos.PasswordDTO;
import com.parcial2.models.dtos.SaveDTO;
import com.parcial2.models.entities.Token;
import com.parcial2.models.entities.User;
import com.parcial2.repositories.TokenRepository;
import com.parcial2.repositories.UserRepository;
import com.parcial2.services.UserService;
import com.parcial2.utils.JWTTools;

import jakarta.transaction.Transactional;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	public PasswordEncoder passwordEncoder;

	@Autowired
	private JWTTools jwtTools;

	@Autowired
	private TokenRepository tokenRepository;

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void register(SaveDTO info) throws Exception {
		User newUser = new User();

		newUser.setUsername(info.getUsername());
		newUser.setEmail(info.getEmail());
		newUser.setPassword(passwordEncoder.encode(info.getPassword()));

		userRepository.save(newUser);
	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void deleteById(String id) throws Exception {
		try {
			UUID userId = UUID.fromString(id);
			userRepository.deleteById(userId);
		} catch (IllegalArgumentException e) {
			// Si el ID no es válido
			throw new Exception("Invalid song ID");
		} catch (Exception e) {
			// Manejar otras excepciones
			throw new Exception("Failed to delete user");
		}
	}

	@Override
	public User findOneById(UUID id) {
		try {
			return userRepository.findById(id).orElse(null);
		} catch (Exception e) {
			return null;
		}
	}

	@Override
	public List<User> findAll() {
		return userRepository.findAll();
	}

	@Override
	public User findByUsernameOrEmailAndPassword(String username, String email, String password) {
		return userRepository.findByUsernameOrEmailAndPassword(username, email, password);
	}

	@Override
	public void changePassword(UUID id, PasswordDTO info) throws Exception {
		User user = findOneById(id);
		System.out.println(info.getOldPassword());
		if (user != null) {
			// Password exists
			if (user.getPassword().equals(info.getOldPassword())) {
				user.setPassword(info.getNewPassword());
				userRepository.save(user);
			} else {
				throw new Exception("Contraseña es distinta");
			}
		} else {
			throw new Exception("User not found papito");
		}

	}

	@Override
	public User findByUsernameOrEmail(String username, String email) {
		return userRepository.findByUsernameOrEmail(username, email);
	}

	@Override
	public User findOneByUsername(String username) {
		try {
			Optional<User> userOptional = userRepository.findByUsername(username);
			return userOptional.orElse(null);
		} catch (Exception e) {
			return null;
		}
	}

	@Override
	public User findOneByEmail(String email) {
		try {
			Optional<User> userOptional = userRepository.findByEmail(email);
			return userOptional.orElse(null);
		} catch (Exception e) {
			return null;
		}
	}

	@Override
	public User findOneByIdentifier(String identifier) {
		return userRepository.findOneByUsernameOrEmail(identifier, identifier);
	}

	@Override
	public Boolean comparePassword(String toCompare, String current) {
		return passwordEncoder.matches(toCompare, current);
	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public Token registerToken(User user) throws Exception {
		cleanTokens(user);
		String tokenString = jwtTools.generateToken(user);
		Token token = new Token(tokenString, user);
		tokenRepository.save(token);
		return token;
	}

	@Override
	public Boolean isTokenValid(User user, String token) {
		try {
			cleanTokens(user);
			List<Token> tokens = tokenRepository.findByUserAndActive(user, true);
			tokens.stream().filter(tk -> tk.getContent().equals(token)).findAny().orElseThrow(() -> new Exception());
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void cleanTokens(User user) throws Exception {
		List<Token> tokens = tokenRepository.findByUserAndActive(user, true);
		tokens.forEach(token -> {
			if (!jwtTools.verifyToken(token.getContent())) {
				token.setActive(false);
				tokenRepository.save(token);
			}
		});
	}

	@Override
	public User findUserAuthenticated() {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		return userRepository.findOneByUsernameOrEmail(username, username);
	}

}
