package com.Propertymanager.Propertymanager.controller;

import com.Propertymanager.Propertymanager.exception.UserNotFoundException;
import com.Propertymanager.Propertymanager.models.Property;
import com.Propertymanager.Propertymanager.repository.PropertyRepository;
import com.Propertymanager.Propertymanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/property-manager")
public class PropertyController {

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users/{userId}/properties")
    public List<Property> getPropertiesByUser(@PathVariable(value = "userId") Long userId){
        return propertyRepository.findByUserId(userId);
    }

    @PostMapping("/users/{userName}/properties")
    public Property createProperty(
            @PathVariable(value="userName") String userName,
             @RequestBody Property property
    ) throws UserNotFoundException{
        return userRepository.findByUsername(userName).map(user -> {
            property.setUser(user);
            return propertyRepository.save(property);
        }).orElseThrow(() -> new UserNotFoundException("User not found ::"+ userName));
    }

    @PutMapping("/users/{userId}/properties/{propertyId}")
    public Property updateProperty(
            @PathVariable(value="userId") Long userId,
            @PathVariable(value="propertyId") Long propertyId,
            @RequestBody Property propertyRequest
    ) throws UserNotFoundException{
        if(!userRepository.existsById(userId)){
            throw new UserNotFoundException("User not found ::"+ userId);
        }
        return propertyRepository.findById(propertyId).map(property -> {
            property.setPrice(propertyRequest.getPrice());
            property.setLocation(propertyRequest.getLocation());
            property.setSale_rent(propertyRequest.getSale_rent());
            property.setSquare_meter(propertyRequest.getSquare_meter());
            return propertyRepository.save(property);
        }).orElseThrow(() -> new UserNotFoundException("property id not found ::" + propertyId));
    }

    @DeleteMapping("users/{userId}/properties/{propertyId}")
    public ResponseEntity<?> deleteProperty(
            @PathVariable(value="userId") Long userId,
            @PathVariable(value="propertyId") Long propertyId
    ) throws UserNotFoundException{
        return propertyRepository.findByIdAndUserId(propertyId,userId).map(property -> {
            propertyRepository.delete(property);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new UserNotFoundException("Property not found with id " + propertyId + " and instructorId " + userId));
       }

}
