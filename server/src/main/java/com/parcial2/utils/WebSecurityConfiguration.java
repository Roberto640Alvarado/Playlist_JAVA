package com.parcial2.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import static org.springframework.security.config.Customizer.withDefaults;

import com.parcial2.models.entities.User;
import com.parcial2.services.UserService;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration {
	@Autowired
	public PasswordEncoder passwordEncoder;
	@Autowired
	private UserService userService;
	@Autowired
	private JWTTokenFIlter filter;

	@Bean
	AuthenticationManager authenticationManagerBean(HttpSecurity http) throws Exception {
		AuthenticationManagerBuilder managerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
		managerBuilder.userDetailsService(identifier -> {
			User user = userService.findOneByIdentifier(identifier);
			if (user == null)
				throw new UsernameNotFoundException("User: " + identifier + ", not found!");
			return user;
		}).passwordEncoder(passwordEncoder);
		return managerBuilder.build();
	}

	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		// Http login and cors disabled
		http.httpBasic(Customizer.withDefaults()).csrf(csrf -> csrf.disable());
		http.cors(Customizer.withDefaults());
		// Route filter
		http.authorizeHttpRequests(auth -> auth.requestMatchers("/auth/**").permitAll().anyRequest().authenticated());
		// Statelessness
		http.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		// UnAunthorized handler
		http.exceptionHandling(handling -> handling.authenticationEntryPoint((req, res, ex) -> {
			res.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Auth fail!");
		}));
		// JWT filter
		http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}


}