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


export default function AddReclamations({open, changeOpen}) {
    const { user } = useAuthState();
    const [employees, setEmployees] = React.useState([]);
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

    const submitReclamation = () => {
        axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/api/reclamations`,data,{
            headers: {
                'Authorization': `Bearer ${user}`
            }
        }).then(res => toast.success("Successfully Submitted")).catch(err => toast.error(err?.response?.data?.message));
    }

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/api/users`,{
            headers: {
                'Authorization': `Bearer ${user}`
            }
        }).then(res => setEmployees(res.data?.users)).catch(err => console.log(err));
    },[user])

    return(
        <React.Fragment>
            <Dialog open={open} onClose={() => changeOpen(false)}>
                <DialogTitle>New Reclamation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <i>Note</i> : Only you and the admin who can read the content of your ticket.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Subject"
                        type="email"
                        fullWidth
                        variant="standard"
                        style={{
                            'margin-bottom': '3%'
                        }}
                        onChange={(e)=>change("subject",e.target.value)}
                    />
                    <InputLabel id="demo-simple-select-standard-label">Target</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={data.sendTo}
                        label="Target"
                        onChange={(e)=>change("sendTo",e.target.value)}
                        fullWidth
                    >
                        {
                            employees.filter(el => el.role == "USER").map(el => {
                                return (<MenuItem value={el.id}>{el.name}</MenuItem>)
                            })
                        }

                    </Select>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="content"
                        label="Content"
                        type="text"
                        fullWidth
                        variant="standard"
                        style={{
                            'margin-bottom': '3%',
                            'height': '40%'
                        }}
                        onChange={(e)=>change("content",e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => changeOpen(false)}>Cancel</Button>
                    <Button onClick={submitReclamation}>Submit</Button>
                </DialogActions>
            </Dialog>

        </React.Fragment>
    )
}