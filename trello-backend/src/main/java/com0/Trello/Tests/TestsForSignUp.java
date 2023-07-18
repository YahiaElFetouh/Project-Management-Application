package com0.Trello.Tests;


import com0.Trello.model.User;
import com0.Trello.repository.UserRepository;
import com0.Trello.service.UserService;
import com0.Trello.service.implementation.UserImplementation;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;

public class TestsForSignUp {
    @Mock
    private UserRepository userRepository  ;
    @InjectMocks
    private  UserImplementation userService; // Instantiate the UserService implementation

    @Test
    public void testSignUp_ValidPassword_ReturnsUser() {
        // Arrange
        User user = new User();
        user.setPassword("Strong@123");

        // Act
        User result = userService.signUp(user);

        // Assert
        assertNotNull(result);
        assertEquals(user, result);
    }
    @Test
    public void create_user_test() throws Exception {
        // Create the User instance
        User user = new User();
        user.setId(5L);
        user.setEmail("foo@bar.ca");

        user.setPassword("P@assword01275");

        // Here we are "mocking" the repository. Basically, doing this allows us
        // to avoid communicating with the database.
        when(userRepository.save(user)).thenReturn(user);

        User savedUser = this.userService.signUp(user);
        assertEquals(user, savedUser);

        // Verify that the mock was executed with intended params
        verify(userRepository).save(user);
    }

}
