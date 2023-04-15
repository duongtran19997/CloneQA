import { Box, Button, FilledInput, FormControl, InputLabel, Modal } from "@mui/material";
import { useState } from "react";
import { Password } from "./LoginForm";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    // bgcolor: 'background.paper',
    backgroundColor: { xs: '#fff', md: '#f4f4f4' } ,
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

 const RegisterForm  = (props) =>{
    const {setOpenRegister, openRegister} = props; 
    const [infoNewUser, setInfoNewUser] = useState({})
    
    const handleClose = () =>{
        setOpenRegister(!setOpenRegister)
    }

    const handleCreateNewUser = async() => {
        try{
            const body = {
                ...infoNewUser
            };
            let response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            console.log('response', response);
        }catch(e){
            console.log(e)
        }
      }

    return <Modal
    open={openRegister}
    onClose={handleClose}
    aria-labelledby="parent-modal-title"
    aria-describedby="parent-modal-description">
       <Box sx={{ ...style, width: 200 }}>
            <h1>day la register</h1>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                    <InputLabel htmlFor ="filled-username">First Name</InputLabel>
                    <FilledInput
                        id="filled-username"
                        type={'text'}
                        onChange={
                            (event) => {
                                setInfoNewUser({...infoNewUser, firstname:event.target.value});
                            }
                        }                    
                    />
                </FormControl>    
            <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                    <InputLabel htmlFor="filled-username">Last Name</InputLabel>
                    <FilledInput
                        id="filled-username"
                        type={'text'}
                        onChange={
                            (event) => {
                                setInfoNewUser({...infoNewUser, lastname:event.target.value});
                            }
                        }                    
                    />
                </FormControl>    
            <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                    <InputLabel htmlFor="filled-username">Email</InputLabel>
                    <FilledInput
                        id="filled-username"
                        type={'text'}
                        onChange={
                            (event) => {
                                setInfoNewUser({...infoNewUser, email:event.target.value});
                            }
                        }                    
                    />
                </FormControl>    
            <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                    <InputLabel htmlFor="filled-username">Username</InputLabel>
                    <FilledInput
                        id="filled-username"
                        type={'text'}
                        onChange={
                            (event) => {
                                setInfoNewUser({...infoNewUser, username:event.target.value});
                            }
                        }                    
                    />
                </FormControl>    
           <Password onChangedValue={(e) =>{setInfoNewUser({...infoNewUser, password: e})}}/>    
            <Button onClick={handleClose}>Tat register</Button>
            <Button onClick={handleCreateNewUser}>OK</Button>
        </Box>
        </Modal>
};

export default RegisterForm;