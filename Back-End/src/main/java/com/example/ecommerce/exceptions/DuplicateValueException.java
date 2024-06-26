package com.example.ecommerce.exceptions;

public class DuplicateValueException extends RuntimeException{
    public DuplicateValueException(String message){
        super(message);
    }
}