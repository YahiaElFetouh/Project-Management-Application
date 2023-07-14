import {IconButton, Paper, Table, TableCell, TableContainer, TableRow} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const WorkSpacesTable = ({workspaces = []}) => {

    return (
        <Paper>
            <TableContainer>
                <Table>
                    <TableRow>
                        <TableCell>
                            <strong>#</strong>
                        </TableCell>
                        <TableCell>
                            <strong>Workspace Name</strong>
                        </TableCell>
                        <TableCell>
                            <strong>Workspace Type</strong>
                        </TableCell>
                        <TableCell>
                            <strong>Workspace Description</strong>
                        </TableCell>
                        <TableCell>
                            <strong>Action</strong>
                        </TableCell>
                    </TableRow>
                    {workspaces.map((workspace, index) => {
                        return (
                            <TableRow key={workspace.id}>
                                <TableCell>
                                    {index + 1}
                                </TableCell>
                                <TableCell>
                                    {workspace.name}
                                </TableCell>
                                <TableCell>
                                    {workspace.type}
                                </TableCell>
                                <TableCell>
                                    {workspace.description}
                                </TableCell>
                                <TableCell>

                                    <IconButton color={'primary'}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color={'error'}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </Table>
            </TableContainer>
        </Paper>
    )
}
export default WorkSpacesTable;