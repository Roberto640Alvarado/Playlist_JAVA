package com.parcial2.models.dtos;

import java.util.List;

import com.parcial2.models.entities.Playlist;

import lombok.Data;

@Data
public class TodoPlaylist {
	
	private Playlist playlist;
	
	private List<SongDTO> songs;
	
	private String total;

}
