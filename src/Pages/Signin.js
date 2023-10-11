import * as React from 'react';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import toast from "react-hot-toast";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useAuthDispatch} from "../context/Auth";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import { Copyright } from '../utils/utils'


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {

    const dispatch = useAuthDispatch();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/api/users/signin`, {
            email: data.get('email'),
            password: data.get('password'),
        }).then(res => {
            dispatch({ type:'LOGIN', payload: res.data.token });
            toast.success("Successfully Accessed");
            navigate('/');
        }).catch( err => {
            toast.error(err?.response?.data?.message);
            console.error(err);
        })
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        <img alt="tek-up"
                             src="https://edx.tek-up.de/media/image?i=202306-1/14sWlJDvLh9O7HRRExEYpnIrQeM0nZm-UFtoBBGY.png"
                             style={{ width: '50%', height: '40%', "margin-left": "auto", "margin-right": "auto", display: "block" }}
                        />
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>

                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}