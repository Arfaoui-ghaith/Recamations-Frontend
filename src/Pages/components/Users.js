import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import axios from "axios";
import {useAuthState} from "../../context/Auth";
import Button from '@mui/material/Button';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {MenuItem, OutlinedInput, Select} from "@mui/material";
import AddUsers from "./AddUsers";
import toast from "react-hot-toast";
import DisplayContent from "./DisplayContent";
function preventDefault(event) {
    event.preventDefault();
}

export default function Users() {
    const { user } = useAuthState();
    const [usersData, setUsersData] = React.useState([]);

    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/api/users`,{
            headers: {
                'Authorization': `Bearer ${user}`
            }
        }).then(res => setUsersData(res.data?.usersData)).catch(err => console.log(err));
    },[usersData, user]);

    const deleteUser = (id) => {
        axios.delete(`${process.env.REACT_APP_BACKEND_SERVER}/api/users/${id}`,{
            headers: {
                'Authorization': `Bearer ${user}`
            }
        }).then(res => toast.success("Successfully Deleted")).catch(err => toast.error(err?.response?.data?.message));
    }

    return (
        <React.Fragment>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                }}
            >
                <Title>Users</Title>
                <Button variant="contained" endIcon={<AddIcon />} onClick={() => setOpen(true)}>
                    Add
                </Button>
            </Box>

            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usersData?.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{(new Date(row.createdAt)).toLocaleString().slice(0, 10)}</TableCell>
                            <TableCell noWrap>{row.name}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell align="right">
                                <DeleteIcon onClick={() => deleteUser(row.id)} style={{'cursor': 'pointer'}} variant="contained" color="error"/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
            <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                {usersData?.length > 0 ? `${usersData?.length} records` : `No records found`}
            </Link>

            <AddUsers open={open} changeOpen={(open) => setOpen(open)}/>
        </React.Fragment>
    );
}