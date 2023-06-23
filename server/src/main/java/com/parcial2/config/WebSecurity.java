package com.parcial2.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;


@Configuration
@EnableWebSecurity
public class WebSecurity {
	/*
	@Bean
	public SecurityFilterChain FilterChain(HttpSecurity http) throws Exception{
	     http
	        .httpBasic().and().csrf().disable();
	//Ya hemos desabilitado el login que ya nos genera

	return http.build();
	}*/

}
