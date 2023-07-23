import com0.Trello.model.Task;
import com0.Trello.model.User;
import com0.Trello.repository.TaskRepository;
import com0.Trello.repository.UserRepository;
import com0.Trello.service.implementation.TaskServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class AssignMemberTest {
        @InjectMocks
        private TaskServiceImpl taskService;

        @Mock
        private TaskRepository taskRepository;

        @Mock
        private UserRepository userRepository;

        @Test
        public void testAssignMemberToTask() {
            Task task = new Task();
            task.setTaskId(1);
            task.setTaskName("Sample Task");

            User user = new User();
            user.setId(1L);
            user.setUserName("John Doe");

            when(taskRepository.findById(1)).thenReturn(Optional.of(task));
            when(userRepository.findById(1)).thenReturn(Optional.of(user));
            when(taskRepository.save(task)).thenReturn(task);

            Task assignedTask = taskService.assignMemberToTask(1, 1L);

            assertNotNull(assignedTask);
            assertEquals(1L, assignedTask.getTaskId().longValue());
            assertEquals(user, assignedTask.getUser());
        }

}
