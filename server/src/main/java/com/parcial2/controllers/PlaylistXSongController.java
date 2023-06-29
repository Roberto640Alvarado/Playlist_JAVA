package com.parcial2.controllers;

import java.time.Duration;
import java.util.List;
import java.util.UUID;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.parcial2.models.dtos.MessageDTO;
import com.parcial2.models.dtos.SavePlaylistXSongDTO;
import com.parcial2.models.dtos.TodoPlaylist;
import com.parcial2.models.dtos.SongDTO;
import com.parcial2.models.entities.Playlist;
import com.parcial2.models.entities.PlaylistXSong;
import com.parcial2.models.entities.Song;
import com.parcial2.services.PlaylistService;
import com.parcial2.services.PlaylistXSongService;
import com.parcial2.services.SongService;
import com.parcial2.utils.RequestErrorHandler;


@RestController
@RequestMapping("/playlist_song")
@CrossOrigin("*")
public class PlaylistXSongController {
	
	@Autowired
	private PlaylistXSongService playlistXSongService;
	
	@Autowired
	private PlaylistService playlistService;
	
	@Autowired
	private SongService songService;
	
	private RequestErrorHandler errorHandler;
	
	public class SongDurationConverter {
	    public static Duration convertDuration(String durationString) {
	        String[] timeParts = durationString.split(":");
	        long minutes = Long.parseLong(timeParts[0]);
	        long seconds = Long.parseLong(timeParts[1]);

	        return Duration.ofMinutes(minutes).plusSeconds(seconds);
	    }
	}
	

	
	//Añadir cancciones a la playlist
	@PostMapping("/playlist/{id}")
	public ResponseEntity<?>saveSongsInPlaylist(@PathVariable(name = "id") UUID id, @RequestBody SavePlaylistXSongDTO info, BindingResult validations){
		if(validations.hasErrors()) {
			
			return new ResponseEntity<>(
					errorHandler.mapErrors(validations.getFieldErrors()), 
					HttpStatus.BAD_REQUEST);
			
		}
		try {
			
			//Verificando si el code de playlist existe
			if (playlistService.findOneById(id) == null) {
				return new ResponseEntity<>(
	                    new MessageDTO("Playlist not found"),
	                    HttpStatus.NOT_FOUND);
			}
			
			//Verificando que el code de song exista
			//UUID songCode = UUID.fromString(info.getSong_code());
			//System.out.println(songService.findOneById(songCode));
			if (songService.findOneById(info.getSong_code()) == null) {
				return new ResponseEntity<>(
	                    new MessageDTO("Song not found"),
	                    HttpStatus.NOT_FOUND);
			}
			/*
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date date = format.parse(info.getDate_added());
			Timestamp timestamp = new Timestamp(date.getTime());
			*/
			List<PlaylistXSong>allPlaylist = playlistService.findOneById(id).getPlaylistxsong();
			
			for(PlaylistXSong playlist: allPlaylist) {
				if (playlist.getSong_code().equals(songService.findOneById(info.getSong_code()))) {
					return new ResponseEntity<>(
		                    new MessageDTO("This song was already added to this playlist"),
		                    HttpStatus.BAD_REQUEST);
				}
			}
			
			//Si todo está correcto
			info.setPlaylist_code(id);
			playlistXSongService.save(info);
			return new ResponseEntity<>(
					new MessageDTO("Song added to playlist "), HttpStatus.CREATED);
			
		}catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(
					new MessageDTO("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/playlist/{id}")
	public ResponseEntity<?> findAllSongByPlaylist(@PathVariable(name = "id") UUID id) {
	    Playlist playlist = playlistService.findOneById(id);

	    if (playlist == null) {
	        return new ResponseEntity<>(
	                new MessageDTO("Playlist not found!"),
	                HttpStatus.NOT_FOUND
	        );
	    }

	    List<PlaylistXSong> playlistXSongList = playlist.getPlaylistxsong();
	    
	    List<SongDTO> songDTOList = new ArrayList<>();
	    Duration totalDuration = Duration.ZERO;
	    
	    for (PlaylistXSong playlistXSong : playlistXSongList) {
	        Song song = playlistXSong.getSong_code();
	        String title = song.getTitle();
	        String durationString = song.getDuration();
	        
	        SongDTO songDTO = new SongDTO();
	        songDTO.setTitle(title);
	        songDTO.setDuration(durationString);
	        songDTO.setDateAdded(playlistXSong.getDateAdded());
	        songDTOList.add(songDTO);
	        
	        Duration songDuration = SongDurationConverter.convertDuration(durationString);
	        totalDuration = totalDuration.plus(songDuration);
	    }
	    
	    String totalDurationString = formatDuration(totalDuration);
	    
	    TodoPlaylist todoPlaylist = new TodoPlaylist();
	    todoPlaylist.setPlaylist(playlist);
	    todoPlaylist.setSongs(songDTOList);
	    todoPlaylist.setTotal(totalDurationString);
	    
	    return new ResponseEntity<>(todoPlaylist, HttpStatus.OK);
	}

	private String formatDuration(Duration duration) {
	    long minutes = duration.toMinutes();
	    long seconds = duration.getSeconds() % 60;

	    return String.format("%02d:%02d", minutes, seconds);
	}


	
	
	@GetMapping("/allPlaylist")
	public ResponseEntity<?>getAllPlaylist(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size){ 
		Page<PlaylistXSong> playlists = playlistXSongService.findAll(page,size);
		return new ResponseEntity<>(playlists, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?>getById(@PathVariable(name = "id") String code){
		
		try {
			UUID playlistCode = UUID.fromString(code);
			PlaylistXSong playlist = playlistXSongService.findOneById(playlistCode);
			
			if (playlist == null) {
                return new ResponseEntity<>(
                        new MessageDTO("Playlist not found"),
                        HttpStatus.NOT_FOUND);
            }
            
            return new ResponseEntity<>(playlist, HttpStatus.OK);
		} catch (Exception e) {
			 return new ResponseEntity<>(
	                    new MessageDTO("Invalid playlist ID format"),
	                    HttpStatus.BAD_REQUEST);
		}
		
	}
	//Se busca eliminar la la canción añadida a la playlist
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteSongFromPlaylist(@PathVariable(name = "id") UUID id){
		try {
	        playlistXSongService.delete(id.toString());
	        return new ResponseEntity<>(
	                new MessageDTO("Song deleted from playlist "),
	                HttpStatus.OK);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return new ResponseEntity<>(
	                new MessageDTO("Internal Server Error"),
	                HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
}
