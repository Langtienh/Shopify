package com.example.ecommerce.exceptions;

import com.example.ecommerce.responses.ResponseError;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<ResponseError> handleGeneralException(Exception exception) {
        return ResponseEntity.internalServerError().body(
                ResponseError.builder()
                        .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                        .message(exception.getMessage())
                        .build()
        );
    }
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
        String regex = "Duplicate entry '(.*)' for key";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(e.getMessage());
        String error = "";
        if(matcher.find()){
            error = "Duplicate entry: " + matcher.group(1);
        }
        return ResponseEntity.badRequest().body(
                ResponseError.builder()
                        .status(HttpStatus.BAD_REQUEST.value())
                        .message(error)
                        .build()
        );
    }
    @ExceptionHandler(InvalidParamException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ResponseError> handleInvalidParamException(
            InvalidParamException e){
        return ResponseEntity.badRequest().body(
                ResponseError.builder()
                        .status(HttpStatus.BAD_REQUEST.value())
                        .message(e.getMessage())
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

    @ExceptionHandler(LoginWithGoogleException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ResponseError> handleLoginWithGoogleException(LoginWithGoogleException e){
        return ResponseEntity.badRequest().body(
                ResponseError.builder()
                        .status(HttpStatus.BAD_REQUEST.value())
                        .message(e.getMessage())
                        .build()
        );
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ResponseEntity<ResponseError> handleAccessDeniedException(AccessDeniedException e){
        return ResponseEntity.status(403).body(
                ResponseError.builder()
                        .status(HttpStatus.FORBIDDEN.value())
                        .message(e.getMessage())
                        .build()
        );
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ResponseError> handleMaxUploadSizeExceededException(MaxUploadSizeExceededException e){
        return ResponseEntity.badRequest().body(
                ResponseError.builder()
                        .status(HttpStatus.BAD_REQUEST.value())
                        .message("File too large!")
                        .build()
        );
    }

    @ExceptionHandler(InvalidFileTypeException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ResponseError> handleInvalidFileTypeException(InvalidFileTypeException e){
        return ResponseEntity.badRequest().body(
                ResponseError.builder()
                        .status(HttpStatus.BAD_REQUEST.value())
                        .message(e.getMessage())
                        .build()
        );
    }
}
