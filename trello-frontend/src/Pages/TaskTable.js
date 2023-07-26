import React from 'react';
import { Table } from 'react-bootstrap';

const TaskTable = ({ tasks }) => {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Task</th>
                <th>Description</th>
                <th>Due date</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {tasks.map((task, index) => (
                <tr key={index}>
                    <td>{task.text}</td>
                    <td>{task.description}</td>
                    <td>{task.dueDate}</td>
                    <td>{task.status}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default TaskTable;
