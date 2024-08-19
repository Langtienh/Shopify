package com.example.ecommerce.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.context.support.ResourceBundleMessageSource;

import java.util.Locale;

@Configuration
public class Translator {
    private static ResourceBundleMessageSource messageSource;

    @Autowired
    public Translator(ResourceBundleMessageSource messageSource){
        Translator.messageSource = messageSource;
    }

    public static String toLocale(String message){
        Locale locale = LocaleContextHolder.getLocale();
        return messageSource.getMessage(message, null, locale);
    }
}
