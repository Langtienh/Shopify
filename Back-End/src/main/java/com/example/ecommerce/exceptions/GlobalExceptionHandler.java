package com.example.ecommerce.exceptions;

import com.example.ecommerce.responses.ResponseError;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<ResponseError> handleDataNotFoundException(ResourceNotFoundException e){
        return ResponseEntity.badRequest().body(
                ResponseError.builder()
                        .status(HttpStatus.NOT_FOUND.value())
                        .message(e.getMessage())
                        .build()
        );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ResponseError> handleMethodArgumentNotValidException(MethodArgumentNotValidException e){
        List<String> errorMessages = e.getBindingResult().getFieldErrors()
                .stream()
                .map(FieldError::getDefaultMessage)
                .toList();
        return ResponseEntity.badRequest().body(
                ResponseError.builder()
                        .status(HttpStatus.BAD_REQUEST.value())
                        .message(String.join("; ", errorMessages))
                        .build()
        );
    }

    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ResponseError> handleSQLIntegrityConstraintViolationException(
            SQLIntegrityConstraintViolationException e){
        return ResponseEntity.badRequest().body(
                ResponseError.builder()
                        .status(HttpStatus.BAD_REQUEST.value())
                        .message(e.getMessage())
                        .build()
        );
    }
    @ExceptionHandler(InvalidParamException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ResponseError> handleInvalidParamException(
            InvalidParamException e){
        int start = e.getMessage().indexOf("attribute");
        int end = e.getMessage().indexOf("of") - 1;
        String message = "Could not find " + e.getMessage().substring(start, end);
        return ResponseEntity.badRequest().body(
                ResponseError.builder()
                        .status(HttpStatus.BAD_REQUEST.value())
                        .message(message)
                        .build()
        );
    }

    @ExceptionHandler(UnauthorizedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ResponseEntity<ResponseError> handleUnauthorizedException(UnauthorizedException e){
        return ResponseEntity.status(401).body(
                ResponseError.builder()
                        .status(HttpStatus.UNAUTHORIZED.value())
                        .message(e.getMessage())
                        .build()
        );
    }

    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ResponseEntity<ResponseError> handleBadCredentialsException(BadCredentialsException e){
        return ResponseEntity.status(401).body(
                ResponseError.builder()
                        .status(HttpStatus.UNAUTHORIZED.value())
                        .message(e.getMessage())
                        .build()
        );
    }
    @ExceptionHandler(ExpiredTokenException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ResponseEntity<ResponseError> handleExpiredTokenException(ExpiredTokenException e){
        return ResponseEntity.status(401).body(
                ResponseError.builder()
                        .status(HttpStatus.UNAUTHORIZED.value())
                        .message(e.getMessage())
                        .build()
        );
    }
}
