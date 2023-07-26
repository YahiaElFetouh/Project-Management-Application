import com0.Trello.model.User;
import com0.Trello.repository.UserRepository;
import com0.Trello.service.implementation.UserImplementation;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class TestUpdatePassword {
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserImplementation userService;

    @Test
    public void testResetPassword() {
        int userId = 1;
        String newPassword = "newPassword";
        String securityAnswer = "Halifax";

        // Mock the repository behavior
        User user = new User();
        user.setId(userId);
        user.setPassword("oldPassword");
        user.setSecurityAnswer(securityAnswer);
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userRepository.save(user)).thenReturn(user);

        // Call the service method
        userService.updatePassword(userId, securityAnswer, newPassword);

        // Verify that the user's password is updated
        verify(userRepository).findById(userId);
        verify(userRepository).save(user);

        // Assert the new password
        assertEquals(newPassword, user.getPassword());
    }
}
