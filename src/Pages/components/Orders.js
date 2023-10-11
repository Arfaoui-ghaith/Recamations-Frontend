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

import PreviewIcon from '@mui/icons-material/Preview';
import DeleteIcon from '@mui/icons-material/Delete';
function preventDefault(event) {
    event.preventDefault();
}

export default function Orders() {
    const { user } = useAuthState();
    const [reclamations, setReclamations] = React.useState([]);

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/api/reclamations`,{
            headers: {
                'Authorization': `Bearer ${user}`
            }
        }).then(res => setReclamations(res.data?.reclamations)).catch(err => console.log(err));
    },[reclamations, user])
    return (
        <React.Fragment>
            <Title>Reclamations</Title>
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
                            <TableCell>{row.subject}</TableCell>
                            <TableCell>{row.sendBy.name}</TableCell>
                            <TableCell>{row.sendTo.name}</TableCell>
                            <TableCell align="right">
                                <PreviewIcon variant="contained" color="success"/>
                                <DeleteIcon variant="contained" color="error"/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                See more orders
            </Link>
        </React.Fragment>
    );
}