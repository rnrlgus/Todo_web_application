// HTTP 응답으로 사용할 DTO

package com.example.demo.dto;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ResponseDTO<T> { // Generic 사용
	private String error;
	private List<T> data;
	
	
	
	
}
