package com.Propertymanager.Propertymanager.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.hibernate.validator.constraints.Range;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "properties")
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Range(min=50, max=5000000, message = "Price must be [50 - 5.000.000]")
    private int price;
    @NotBlank(message = "Location is mandatory")
    private String location;
    @NotBlank(message = "Availability is mandatory")
    private String sale_rent;
    @Range(min=20, max=1000, message = "Square_meter must be [20 - 1.000]")
    private int square_meter;

    @ManyToOne()
    @JoinColumn(name = "user_id")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    private User user;

    public Property() {
    }

    public Property(int price, String location, String sale_rent, int square_meter) {
        this.price = price;
        this.location = location;
        this.sale_rent = sale_rent;
        this.square_meter = square_meter;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getSale_rent() {
        return sale_rent;
    }

    public void setSale_rent(String sale_rent) {
        this.sale_rent = sale_rent;
    }

    public int getSquare_meter() {
        return square_meter;
    }

    public void setSquare_meter(int square_meter) {
        this.square_meter = square_meter;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Property [id=" + id + ", price=" + price + ", location=" + location + ", square meter=" + square_meter + ", sale/rent=" + sale_rent +"]";
    }
}
