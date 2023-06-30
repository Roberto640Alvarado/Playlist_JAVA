package com.parcial2.controllers;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.parcial2.models.dtos.MessageDTO;
import com.parcial2.models.dtos.PageDTO;
import com.parcial2.models.dtos.SaveSongDTO;
import com.parcial2.models.entities.Song;
import com.parcial2.services.SongService;
import com.parcial2.utils.RequestErrorHandler;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/song")
@CrossOrigin("*")
public class SongController {
	
	@Autowired
	private  SongService songService;
	
	private RequestErrorHandler errorHandler;
	
	@PostMapping("/save")
	public ResponseEntity<?>saveSong(@RequestBody @Valid SaveSongDTO info, BindingResult validations){
		
		if(validations.hasErrors()) {
			return new ResponseEntity<>(
					errorHandler.mapErrors(validations.getFieldErrors()), 
					HttpStatus.BAD_REQUEST);
			
		}
		try {
			
			songService.save(info.getTitle(), info.getDuration());
			return new ResponseEntity<>(
					new MessageDTO("Song added" + info), HttpStatus.CREATED);
			
		}catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(
					new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	@PatchMapping("/update/{id}")
	public ResponseEntity<?>updateSong(@PathVariable(name = "id") UUID id, @RequestBody @Valid SaveSongDTO info, BindingResult validations){
			Song song = songService.findOneById(id);
			
			if(validations.hasErrors()) {
				System.out.println(info);
				return new ResponseEntity<>(
						errorHandler.mapErrors(validations.getFieldErrors()), 
						HttpStatus.BAD_REQUEST);
				
			}
		    if(song == null) {
		    	return new ResponseEntity<>(
		    		new MessageDTO("Song not found"),
		    		HttpStatus.NOT_FOUND);
		    }
		    try {
				songService.update(id, info);
				return new ResponseEntity<>(
						new MessageDTO("Song added" + info), HttpStatus.CREATED);
			}catch (Exception e) {
				e.printStackTrace();
				return new ResponseEntity<>(
						new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
			}
		    //return new ResponseEntity<>(song, HttpStatus.OK);
		}
	@GetMapping("/{id}")
	public ResponseEntity<?> getSongById(@PathVariable(name = "id") UUID id) {
	    Song song = songService.findOneById(id);
	    
	    
	    if(song == null) {
	    	return new ResponseEntity<>(
	    		new MessageDTO("Song not found"),
	    		HttpStatus.NOT_FOUND);
	    }
	    return new ResponseEntity<>(song, HttpStatus.OK);
		
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteSongById(@PathVariable(name = "id") UUID id) {
	    try {
	        songService.deleteById(id.toString());
	        return new ResponseEntity<>(
	                new MessageDTO("Song deleted"),
	                HttpStatus.OK);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return new ResponseEntity<>(
	                new MessageDTO("Internal Server Error"),
	                HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}

	
	@GetMapping("/song")
	public ResponseEntity<?> findAllSongs(@RequestParam(defaultValue = "1") int page,
	                                      @RequestParam(defaultValue = "6") int size,
	                                      @RequestParam(defaultValue = "") String title) {

	    Page<Song> songs;
	    List<Song> songsMatch = new ArrayList<>();

	    if (!title.isEmpty()) {
	        songs = songService.findAll(page - 1, size); // Restamos 1 a la página para ajustar a la indexación base 0
	        for (Song song : songs.getContent()) {
	            String songTitle = song.getTitle();
	            if (songTitle.toUpperCase().contains(title.toUpperCase())) {
	                songsMatch.add(song);
	            }
	        }
	        PageDTO<Song> songPageDTO = new PageDTO<>(songsMatch, page, size, songs.getTotalElements(), songs.getTotalPages());
	        return new ResponseEntity<>(songPageDTO, HttpStatus.OK);
	    } else {
	        songs = songService.findAll(page - 1, size); // Restamos 1 a la página para ajustar a la indexación base 0
	        PageDTO<Song> songPageDTO = new PageDTO<>(songs.getContent(), page, size, songs.getTotalElements(), songs.getTotalPages());
	        return new ResponseEntity<>(songPageDTO, HttpStatus.OK);
	    }
	}






}
