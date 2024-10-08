package com.project.vsm.sercurity;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Data
@Configuration
@ConfigurationProperties("security.jwt")
public class JwtProperties {
	private String secretKey;
	
}
