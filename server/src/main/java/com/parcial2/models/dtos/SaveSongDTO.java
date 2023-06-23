package com.parcial2.models.dtos;

import java.sql.Time;
import java.time.Duration;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class SaveSongDTO {
	@NotEmpty(message = "The title song is required!")
	private String title;
	@NotEmpty
	@Pattern(regexp = "^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$")
	private String duration;
}
