import {Box, Button, Drawer, MenuItem, TextField, Typography} from "@mui/material";
import {useState} from "react";


const AddWorkspace = ({show, onClose, onSubmit}) => {
   const [name, setName] = useState('');
   const [description, setDescription] = useState('');
   const [type, setType] = useState('');
   const handleSubmit = (e) => {
       e.preventDefault();
       onSubmit({
           name, description, type
       });
       setDescription('');
       setName('');
   }
   return (
       <Drawer
           open={show}
           onClose={onClose}
           anchor={'right'}>
           <Box padding={'30px'} width={'600px'}>
               <form onSubmit={handleSubmit}>
                   <Typography variant={'h2'}>Add Workspace</Typography>

                   <Box marginTop={'30px'}>
                       <h5>Workspace Name</h5>
                       <TextField
                           required
                           value={name}
                           onChange={e => setName(e.target.value)}
                           label={'Workspace Name'}
                           variant={'standard'}
                           fullWidth
                       />
                   </Box>

                   <Box marginTop={'30px'}>
                     <h5>Workspace Type</h5>
                     <TextField
                       required
                       select
                       value={type}
                       onChange={e => setType(e.target.value)}
                       label={'Workspace Type'}
                       variant={'standard'}
                       fullWidth
                     >
                       <MenuItem value={'Programm'}>Programm</MenuItem>
                       <MenuItem value={'Ui Design'}>Ui Design</MenuItem>
                     </TextField>
                   </Box>

                   <Box marginTop={'30px'}>
                       <h5>Workspace Description</h5>
                       <TextField
                           required
                           value={description}
                           onChange={e => setDescription(e.target.value)}
                           label={'Workspace Description'}
                           variant={'standard'}
                           fullWidth
                           multiline
                           rows={5}
                       />
                   </Box>


                   <Box marginTop={'40px'}>
                       <Button type={'submit'} style={{marginRight: '20px'}} variant={'contained'}>Submit</Button>
                       <Button
                           onClick={onClose}
                           variant={'contained'} color={'inherit'}>Close</Button>
                   </Box>
               </form>
           </Box>
       </Drawer>
   )
}

export default AddWorkspace;