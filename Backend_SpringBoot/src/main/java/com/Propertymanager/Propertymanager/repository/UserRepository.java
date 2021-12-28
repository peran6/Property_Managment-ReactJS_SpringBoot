package com.Propertymanager.Propertymanager.repository;

import com.Propertymanager.Propertymanager.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String userName);

    Optional<User> findByUsernameAndPassword(String userName, String password);

    boolean existsUserByUsername(String userName);
}
