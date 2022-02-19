import React from 'react'
import LoginForm from './LoginForm'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search'
import TextField from '@mui/material/TextField'
import useValidate from "./hooks/useValidate";




function Header({handleSearch, userId, handleUserIdUpdate, handleModal}) {
  const { status } = useValidate(userId);
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {status === 'success' ? 
              <Button startIcon={<AddIcon/>} id="add-btn" onClick={() => handleModal({name: 'jobForm', job: null})}>Add Job Posting</Button> : 
              <Button id="new-account" onClick={() => handleModal({name: 'newUserForm'})}>
                Need an account?
              </Button>
            }
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              AppTrack
            </Typography>
            <LoginForm userId={userId} handleUserIdUpdate={handleUserIdUpdate} handleModal={handleModal} />
          </Toolbar>
        </AppBar>
        
      
        <div className="search-bar b-radius" style={{border: "2px solid black"}}>
            <TextField className="text" label="search" variant='standard' onChange={handleSearch}  ></TextField>
            <SearchIcon className="search-icon" />
        </div>
       
      </Box>

       
    )
}

export default Header