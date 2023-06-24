package com.parcial2.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parcial2.models.dtos.LoginDTO;
import com.parcial2.models.dtos.MessageDTO;
import com.parcial2.models.dtos.SaveDTO;
import com.parcial2.models.dtos.TokenDTO;
import com.parcial2.models.entities.Token;
import com.parcial2.models.entities.User;
import com.parcial2.services.UserService;
import com.parcial2.utils.RequestErrorHandler;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	private RequestErrorHandler errorHandler;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody @Valid LoginDTO loginDTO, BindingResult validations) {
		if (validations.hasErrors()) {
            return new ResponseEntity<>(
                    errorHandler.mapErrors(validations.getFieldErrors()),
                    HttpStatus.BAD_REQUEST);
        }

		User user = userService.findOneByIdentifier(loginDTO.getIdentifier());

		if (user == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		if(!userService.comparePassword(loginDTO.getPassword(),user.getPassword())) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
	
		try {
			Token token = userService.registerToken(user);
			return new ResponseEntity<>(new TokenDTO(token), HttpStatus.OK);
			} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			}
	}
	
	@PostMapping("/signup")
    public ResponseEntity<?> signUpUser(@RequestBody SaveDTO saveDTO, BindingResult validations) {
        if (validations.hasErrors()) {
            return new ResponseEntity<>(
                    errorHandler.mapErrors(validations.getFieldErrors()),
                    HttpStatus.BAD_REQUEST);
        }

        String username = saveDTO.getUsername();
        String email = saveDTO.getEmail();
        String password = saveDTO.getPassword();

        if (userService.findByUsernameOrEmail(username, email) != null) {
            return new ResponseEntity<>(
                    new MessageDTO("Username or email already exists"),
                    HttpStatus.BAD_REQUEST);
        }

        if (!isValidPassword(password)) {
            return new ResponseEntity<>(
                    new MessageDTO("Invalid password: must be at least 8 characters, and comply with: 1 uppercase, 1 lowercase, 1 number, 1 character special"),
                    HttpStatus.BAD_REQUEST);
        }

        try {
            userService.register(saveDTO);
            return new ResponseEntity<>(
                    new MessageDTO("User created"),
                    HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(
                    new MessageDTO("Internal Server Error"),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
    private boolean isValidPassword(String password) {
        String passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
        return password.matches(passwordRegex);
    }
    
    @GetMapping("/whoami")
    public ResponseEntity<User> whoAmI() {
        User user = userService.findUserAuthenticated();
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
