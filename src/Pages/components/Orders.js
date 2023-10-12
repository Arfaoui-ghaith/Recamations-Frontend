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
import AddReclamations from "./AddReclamations";
import toast from "react-hot-toast";
import DisplayContent from "./DisplayContent";
function preventDefault(event) {
    event.preventDefault();
}

export default function Orders() {
    const { user } = useAuthState();
    const [reclamations, setReclamations] = React.useState([]);

    const [open, setOpen] = React.useState(false);

    const [reclamation, setReclamation] = React.useState(null);

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/api/reclamations`,{
            headers: {
                'Authorization': `Bearer ${user}`
            }
        }).then(res => setReclamations(res.data?.reclamations)).catch(err => console.log(err));
    },[reclamations, user]);

    const deleteReclamation = (id) => {
        axios.delete(`${process.env.REACT_APP_BACKEND_SERVER}/api/reclamations/${id}`,{
            headers: {
                'Authorization': `Bearer ${user}`
            }
        }).then(res => toast.success("Successfully Submitted")).catch(err => toast.error(err?.response?.data?.message));
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
                <Title>Reclamations</Title>
                <Button variant="contained" endIcon={<AddIcon />} onClick={() => setOpen(true)}>
                    Add
                </Button>
            </Box>

            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Subject</TableCell>
                        <TableCell>SentBy</TableCell>
                        <TableCell>Target</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reclamations.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{(new Date(row.createdAt)).toLocaleString().slice(0, 10)}</TableCell>
                            <TableCell noWrap>{row.subject}</TableCell>
                            <TableCell>{row.sendBy.name}</TableCell>
                            <TableCell>{row.sendTo.name}</TableCell>
                            <TableCell align="right">
                                <PreviewIcon onClick={() => {
                                    setReclamation(row);
                                }} style={{'cursor': 'pointer'}} variant="contained" color="success"/>

                                <DeleteIcon onClick={() => deleteReclamation(row.id)} style={{'cursor': 'pointer'}} style={{'cursor': 'pointer'}} variant="contained" color="error"/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                { reclamation !== null ?
                    <DisplayContent
                        open2={true}
                        reclamation={reclamation}
                        changeReclamation={(reclamation) => setReclamation(reclamation)}
                    /> : ''
                }
            </Table>
            <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                {reclamations.length > 0 ? `${reclamations.length} records` : `No records found`}
            </Link>

            <AddReclamations open={open} changeOpen={(open) => setOpen(open)}/>
        </React.Fragment>
    );
}