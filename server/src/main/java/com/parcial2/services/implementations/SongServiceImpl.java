package com.parcial2.services.implementations;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.parcial2.models.dtos.SaveSongDTO;
import com.parcial2.models.entities.Song;
import com.parcial2.repositories.SongRepository;
import com.parcial2.services.SongService;

import jakarta.transaction.Transactional;

@Service
public class SongServiceImpl implements SongService {

	@Autowired
	private SongRepository songRepository;
	
	@Override
	@Transactional(rollbackOn = Exception.class)
	public void save(String title, String duration) throws Exception {
		Song newSong = new Song(
				title,
				duration
			);
	songRepository.save(newSong);
		
	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void deleteById(String id) throws Exception {
	    try {
	        UUID songId = UUID.fromString(id);
	        songRepository.deleteById(songId);
	    } catch (IllegalArgumentException e) {
	        // Si el ID no es válido
	        throw new Exception("Invalid song ID");
	    } catch (Exception e) {
	        // Manejar otras excepciones
	        throw new Exception("Failed to delete song");
	    }
	}

	@Override
	public Song findOneById(UUID id) {
		try {
			return songRepository.findById(id)
					.orElse(null);
		} catch (Exception e) {
			return null;
		}
	}

	@Override
	public Page<Song> findAll(int page, int size) {
		// TODO Auto-generated method stub
		Pageable pageable = PageRequest.of(page, size);
		return songRepository.findAll(pageable);
	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void update(UUID id, SaveSongDTO updatedSong) throws Exception {
		// TODO Auto-generated method stub
		Song song = findOneById(id);
		
		if(song == null) {
			 // Si el ID no es válido
	        throw new Exception("Song doesnt exist");
		}
		song.setTitle(updatedSong.getTitle());
		song.setDuration(updatedSong.getDuration());
		
		songRepository.save(song);
	}

	@Override
	public List<Song> getAll() {
		// TODO Auto-generated method stub
		return songRepository.findAll();
	}

	@Override
    public Page<Song> findAll(PageRequest pageRequest) {
        return songRepository.findAll(pageRequest);
    }

    @Override
    public long count() {
        return songRepository.count();
    }

	
}
