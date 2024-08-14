package com.example.ecommerce.utils;

import org.apache.commons.lang3.StringUtils;

public class StringUtil {

    public static String normalizeString(String text){
        text = StringUtils.stripAccents(text);
        text = text.replace(" ", "-");
        return text;
    }
}
