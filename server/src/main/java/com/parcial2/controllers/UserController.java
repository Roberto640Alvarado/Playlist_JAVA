package com.parcial2.controllers;

import java.util.List;
import java.util.UUID;
import java.util.ArrayList;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.parcial2.utils.JWTTools;
import com.parcial2.utils.RequestErrorHandler;

import jakarta.validation.Valid;

import com.parcial2.models.dtos.LoginDTO;
import com.parcial2.models.dtos.MessageDTO;
import com.parcial2.models.dtos.PageDTO;
import com.parcial2.models.dtos.PasswordDTO;
import com.parcial2.models.entities.Playlist;
import com.parcial2.models.entities.Token;
import com.parcial2.models.entities.User;
import com.parcial2.models.dtos.SaveDTO;
import com.parcial2.models.dtos.SavePlaylistDTO;
import com.parcial2.models.dtos.TokenDTO;
import com.parcial2.services.PlaylistService;
import com.parcial2.services.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private PlaylistService playlistService;
	
	private RequestErrorHandler errorHandler;
	
	@Autowired
	private JWTTools jwtTools;
	
	@PostMapping("/save")
	public ResponseEntity<?> saveUser(@RequestBody @Valid SaveDTO info,  BindingResult validations){
		if(validations.hasErrors()) {
			return new ResponseEntity<>(
					errorHandler.mapErrors(validations.getFieldErrors()), 
					HttpStatus.BAD_REQUEST);
		}
		try {
			userService.register(info);
			return new ResponseEntity<>(
					new MessageDTO("User created" + info), HttpStatus.CREATED);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(
					new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	    
	}
	@GetMapping("/{id}")
public ResponseEntity<?> getUserById(@PathVariable(name = "id") UUID id) {
    User user = userService.findOneById(id);

    if (user == null) {
        return new ResponseEntity<>(
                new MessageDTO("User not found"),
                HttpStatus.NOT_FOUND);
    }

    return new ResponseEntity<>(user, HttpStatus.OK);
}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteUserById(@PathVariable(name = "id") UUID id) {
	    try {
	        userService.deleteById(id.toString());
	        return new ResponseEntity<>(
	                new MessageDTO("User deleted"),
	                HttpStatus.OK);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return new ResponseEntity<>(
	                new MessageDTO("Internal Server Error"),
	                HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	
	@GetMapping("/users")
	public ResponseEntity<?> findAllUsers(){
		List<User> users = userService.findAll();
		return new ResponseEntity<>(users,HttpStatus.OK);
	}
	
	@PatchMapping("/update/{id}")
	public ResponseEntity<?>updatePassword(@PathVariable(name = "id") UUID id, @RequestBody PasswordDTO info, BindingResult validations){
			User user = userService.findOneById(id);
			
			if(validations.hasErrors()) {
				return new ResponseEntity<>(
						errorHandler.mapErrors(validations.getFieldErrors()), 
						HttpStatus.BAD_REQUEST);
				
			}
		    if(user == null) {
		    	return new ResponseEntity<>(
		    		new MessageDTO("User not found"),
		    		HttpStatus.NOT_FOUND);
		    }
		    try {
				userService.changePassword(id,info);
				return new ResponseEntity<>(
						new MessageDTO("Password update" ), HttpStatus.CREATED);
			}catch (Exception e) {
				e.printStackTrace();
				return new ResponseEntity<>(
						new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
    
	@GetMapping("/playlist")
	public ResponseEntity<PageDTO<Playlist>> findAllPlaylistsByUser(
	        @RequestParam(defaultValue = "0") int page,
	        @RequestParam(defaultValue = "5") int size,
	        @RequestParam(name = "title", required = false) String title
	) {
	    User user = userService.findUserAuthenticated();

	    if (user == null) {
	        return new ResponseEntity<>(
	                new PageDTO<>(Collections.emptyList(), 0, 0, 0, 0),
	                HttpStatus.NOT_FOUND
	        );
	    }

	    List<Playlist> userPlaylists = user.getPlaylists();
	    List<Playlist> playlistsMatch = new ArrayList<>();

	    if (title != null && !title.isEmpty()) {
	        for (Playlist playlist : userPlaylists) {
	            String playlistTitle = playlist.getTitle();
	            if (playlistTitle.toUpperCase().contains(title.toUpperCase())) {
	                playlistsMatch.add(playlist);
	            }
	        }
	        return new ResponseEntity<>(
	                new PageDTO<>(playlistsMatch, 0, playlistsMatch.size(), playlistsMatch.size(), 1),
	                HttpStatus.OK
	        );
	    } else {
	        return new ResponseEntity<>(
	                new PageDTO<>(userPlaylists, 0, userPlaylists.size(), userPlaylists.size(), 1),
	                HttpStatus.OK
	        );
	    }
	}


	
    @PostMapping("/playlist")
    public ResponseEntity<?> savePlaylist(@RequestBody @Valid SavePlaylistDTO info, BindingResult validations) {

        if (validations.hasErrors()) {
            return new ResponseEntity<>(
                    errorHandler.mapErrors(validations.getFieldErrors()),
                    HttpStatus.BAD_REQUEST);
        }

        try {
            User user = userService.findUserAuthenticated();

            if (user == null) {
                return new ResponseEntity<>(
                        new MessageDTO("User not found"),
                        HttpStatus.NOT_FOUND);
            }
            
            Playlist play = playlistService.findOneTitle(info.getTitle());
            
            if(play != null) {
            	return new ResponseEntity<>(
                        new MessageDTO("Ya existe la playlist enlazada a dicho usuario"),
                        HttpStatus.CREATED);  	
            }

            playlistService.save(info, user);
            return new ResponseEntity<>(
                    new MessageDTO("Playlist created"),
                    HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(
                    new MessageDTO("Invalid user code format"),
                    HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(
                    new MessageDTO("Internal Server Error"),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




    
    

	
	
}



