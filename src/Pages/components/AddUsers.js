import React from 'react'
import TextField from "@mui/material/TextField";
import {InputLabel, MenuItem, OutlinedInput, Select, useTheme} from "@mui/material";
import axios from "axios";
import {useAuthState} from "../../context/Auth";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import toast from "react-hot-toast";


export default function AddUsers({open, changeOpen}) {
    const { user } = useAuthState();
    const [data, setData] = React.useState({});

    const change = (index,value) => {
        if(value === "" || value === null || value === undefined){
            let form = data;
            delete form[index];
            setData(form);
        }else {
            let form = {...data};
            form[index] = value;
            setData(form);
        }
    }

    const submitUser = () => {
        axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/api/users/signup`,data,{
            headers: {
                'Authorization': `Bearer ${user}`
            }
        }).then(res => toast.success("Successfully Submitted")).catch(err => toast.error(err?.response?.data?.message));
    }

    return(
        <React.Fragment>
            <Dialog open={open} onClose={() => changeOpen(false)}>
                <DialogTitle>New Reclamation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <i>Note</i> : Only admin can add users
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        style={{
                            'margin-bottom': '3%'
                        }}
                        onChange={(e)=>change("name",e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="ConEmailtent"
                        type="email"
                        fullWidth
                        variant="standard"
                        style={{
                            'margin-bottom': '3%',
                            'height': '40%'
                        }}
                        onChange={(e)=>change("email",e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        style={{
                            'margin-bottom': '3%',
                            'height': '40%'
                        }}
                        onChange={(e)=>change("password",e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => changeOpen(false)}>Cancel</Button>
                    <Button onClick={submitUser}>Submit</Button>
                </DialogActions>
            </Dialog>

        </React.Fragment>
    )
}