package com.ubt.todo.utils;

import com.ubt.todo.validation.ValidationError;
import com.ubt.todo.validation.ValidationException;

public class ValidationExceptionBuilder {

    public ValidationExceptionBuilder() {
    }

    public static ValidationException withErrorCode(String errorCode) {
        ValidationException exception = new ValidationException();
        ValidationError error = new ValidationError("", "", errorCode);
        exception.add(error);
        return exception;
    }
}