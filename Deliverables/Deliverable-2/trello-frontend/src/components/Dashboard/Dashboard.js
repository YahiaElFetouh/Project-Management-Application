import {Box, Button, Container} from "@mui/material";
import {useState} from "react";
import AddWorkspace from "./AddWorkspace";
import WorkSpacesTable from "./WorkSpacesTable";


const Dashboard = () => {

    const [showAdd, setShowAdd] = useState(false);
    const [workspaces, setWorkSpaces] = useState([]);

    const handleAddWorkSpace = async (workspace) => {
      setWorkSpaces([...workspaces, {
        ...workspace,
        id: Date.now()
      }]);
      setShowAdd(false);

     const res =  await fetch(`http://localhost:8080/workspace/createWorkspace`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          workspace_name: workspace.name,
          workspace_type: workspace.type,
          workspace_desc: workspace.description,
          name: workspace.name,
          type: workspace.type,
          description: workspace.description
        })
      })
      if (res.status === 200) {
        alert('Create successfully!');
      }
    }

    return (
        <Container>
            <Box marginTop={"30px"}>
                <Button
                    variant={'contained'}
                    onClick={() => setShowAdd(true)}
                    color={'secondary'}>
                    Add New Workspace
                </Button>
            </Box>

            <AddWorkspace
                onSubmit={handleAddWorkSpace}
                onClose={() => {
                    setShowAdd(false);
                }}
                show={showAdd}/>

            <Box marginTop={'20px'}>
                <WorkSpacesTable workspaces={workspaces}/>
            </Box>
        </Container>
    )
}

export default Dashboard;