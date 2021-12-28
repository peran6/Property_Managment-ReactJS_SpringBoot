package com.Propertymanager.Propertymanager.repository;

import java.util.List;
import java.util.Optional;
import com.Propertymanager.Propertymanager.models.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {

   List<Property> findByUserId(Long userId);
   Optional<Property> findByIdAndUserId(Long id, Long userId);

}
