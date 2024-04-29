package com0.Trello;


import com0.Trello.model.User;
import com0.Trello.repository.UserRepository;
import com0.Trello.service.implementation.UserImplementation;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
@RunWith(MockitoJUnitRunner.class)
public class TestsForSignUp {
    @InjectMocks
    private UserImplementation userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserImplementation UserImplementation = new UserImplementation(userRepository);

    @Test
    public void testSignUp_ValidPassword_ReturnsUser() {
        // Arrange
        User user = new User();
        user.setPassword("Strong@123");

        // Act
        when(userRepository.save(user)).thenReturn(user);

        User savedUser = userService.signUp(user);

        // Assert
        assertNotNull(savedUser);
        assertEquals(user, savedUser);
    }
    @Test
    public void create_user_test() throws Exception {
        // Create the User instance
        int id = 5;
        User user = new User();
        user.setId(id);
        user.setEmail("foo@bar.ca");

        user.setPassword("P@assword01275");

        // Here we are "mocking" the repository. Basically, doing this allows us
        // to avoid communicating with the database.
        when(userRepository.save(user)).thenReturn(user);

        User savedUser = userService.signUp(user);
        assertEquals(user, savedUser);

        // Verify that the mock was executed with intended params
        verify(userRepository).save(user);
    }

}
