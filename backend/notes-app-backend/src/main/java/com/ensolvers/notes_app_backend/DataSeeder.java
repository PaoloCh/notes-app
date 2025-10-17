package com.ensolvers.notes_app_backend;

import com.ensolvers.notes_app_backend.domain.model.User;
import com.ensolvers.notes_app_backend.domain.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;

    public DataSeeder(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override

    public void run(String... args) throws Exception {
        if (userRepository.findByUsername("admin").isEmpty()) {
            User defaultUser = new User();
            defaultUser.setUsername("admin");
            defaultUser.setPassword("admin123");
            userRepository.save(defaultUser);
            System.out.println("Default user 'admin' created.");
        }
    }
}
