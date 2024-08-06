package com.example.ecommerce.exceptions;

public class InvalidFileTypeException extends RuntimeException{
    public InvalidFileTypeException(String message){
        super(message);
    }
}
