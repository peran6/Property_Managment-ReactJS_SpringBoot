package com.Propertymanager.Propertymanager.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank(message = "Username is mandatory")
    @Column(unique=true)
    private String username;
    @NotBlank(message = "Password is mandatory")
    @Column(unique=true)
    private String password;
    @NotBlank(message = "Password is mandatory")
    @Column(unique=true)
    private String email;

    @OneToMany(mappedBy = "user", orphanRemoval=true)
    private List < Property > properties;

    public User() {
    }

    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List < Property > getProperties() {
        return properties;
    }

    public void setProperties(List < Property > properties) {
        this.properties = properties;
    }
}
