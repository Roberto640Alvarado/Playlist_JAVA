package com.parcial2.models.dtos;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class SongDTO {
	
	
	private String title;
	
	private Timestamp dateAdded;
	
	private String duration;

}
