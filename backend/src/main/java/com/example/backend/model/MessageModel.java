package com.example.backend.model;

public class MessageModel {
    private String message;
    private String fromLogin;

    public String getMessage()
    {
        return message;
    }
    public void setMessage(String message)
    {
        this.message = message;
    }

    public String getFromLogin()
    {
        return fromLogin;
    }
    public void setFromLogin(String fromLogin)
    {
        this.fromLogin = fromLogin;
    }


    public String toString()
    {
        return "MessageModel{" + '\n' + "message: " + message + '\n' + "fromLogin: " + fromLogin + '\n' + "]";
    }
}
