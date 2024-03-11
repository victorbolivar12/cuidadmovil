import React from 'react'
import * as yup from "yup";
import { useFormik } from "formik";
import {
    Paper,
    Box,
    Divider,
    Grid,
    Typography,
    FormControlLabel,
    TextField,
    InputAdornment,
    IconButton,
    OutlinedInput,
    Button,
    Collapse,
    Alert,
    AlertTitle,
    Snackbar
} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HeaderInfo from '../../components/HeaderInfo';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { signUp } from '../../../../api/services/auth';


const validationSchema = yup.object({
    username: yup.string(),
    rol: yup.string(),
    email: yup
        .string()
        .email("Debes ingresar un email para continuar")
        .matches(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Ingresa un email válido"
        )
        .required("Email es requerido"),
    password: yup
        .string()
        .required("Debes ingresar una contraseña para continuar")
});

const FormUser = () => {

    const navigate = useNavigate();
    const [authError, setAuthError] = useState(false);
    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const formik = useFormik({
        initialValues: {
            username: '',
            rol: '',
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async values => {
            const { data, statusCode } = await signUp(values);
            if (statusCode === 200) {
                setAuthError(false)
                setOpen(true)
                navigate("/dashboard/usuarios")
            } else {
                setAuthError(true)
                setOpen(true)
            }
        },
    });

    const handleClick = () => {
        navigate("/dashboard/usuarios")
    }


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    return (
        <>
            <HeaderInfo>
                <PersonAddIcon sx={{ color: "#FFFFFF" }} />
                <Typography sx={{ color: "#FFFFFF" }}>AGREGAR USUARIO</Typography>
            </HeaderInfo>
            <Paper elevation={3} sx={{ width: "100%", padding: 3 }}>
                <Box sx={{ display: "flex", marginBottom: 2 }}>
                    <AccountCircleIcon sx={{ color: "#007668", marginRight: "10px" }} />
                    <Typography sx={{ color: "#7B7A83", fontWeight: "600" }}>Detalles de usuario</Typography>
                </Box>
                <Divider sx={{ background: "#EAEAEA" }} />
                <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
                    <TextField
                        margin="normal"
                        variant="filled"
                        fullWidth
                        required
                        sx={{
                            "& .MuiInputBase-input": {
                                backgroundColor: "#FFFFFF",
                                borderRadius: "4px",
                            },
                            "& .MuiFilledInput-root": {
                                backgroundColor: "#F4F5F9",
                                borderRadius: "4px",
                                pr: 0,
                                ":hover": {
                                    backgroundColor: "#F4F5F9",
                                    pr: 0,
                                },
                            },
                        }}
                        id="username"
                        label="Nombre"
                        name="username"
                        autoFocus
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                    />
                    <TextField
                        margin="normal"
                        variant="filled"
                        sx={{
                            marginBottom: "30px",
                            "& .MuiInputBase-input": {
                                backgroundColor: "#FFFFFF",
                                borderRadius: "4px",
                            },
                            "& .MuiFilledInput-root": {
                                backgroundColor: "#F4F5F9",
                                borderRadius: "4px",
                                pr: 0,
                                ":hover": {
                                    backgroundColor: "#F4F5F9",
                                    pr: 0,
                                },
                            },
                        }}
                        fullWidth
                        required
                        id="email"
                        label="Correo"
                        name="email"
                        autoFocus
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Tipo de usuario</InputLabel>
                        <Select
                            variant="filled"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name='rol'
                            sx={{
                                "& .MuiInputBase-input": {
                                    backgroundColor: "#FFFFFF",
                                    borderRadius: "4px",
                                },
                                "& .MuiFilledInput-root": {
                                    backgroundColor: "#F4F5F9",
                                    borderRadius: "4px",
                                    pr: 0,
                                    ":hover": {
                                        backgroundColor: "#F4F5F9",
                                        pr: 0,
                                    },
                                },
                            }}
                            value={formik.values.rol}
                            label="Tipo de usuario"
                            onChange={formik.handleChange}
                        >
                            <MenuItem value={"client"}>Cliente</MenuItem>
                            <MenuItem value={"driver"}>Chofer</MenuItem>
                            <MenuItem value={"admin"}>Administrador</MenuItem>
                            <MenuItem value={"superadmin"}>Super Administrador</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        margin="normal"
                        variant="filled"
                        sx={{
                            "& .MuiInputBase-input": {
                                backgroundColor: "#FFFFFF",
                                borderRadius: "4px",
                            },
                            "& .MuiFilledInput-root": {
                                backgroundColor: "#F4F5F9",
                                borderRadius: "4px",
                                pr: 0,
                                ":hover": {
                                    backgroundColor: "#F4F5F9",
                                    pr: 0,
                                },
                            },
                        }}
                        InputProps={{
                            disableUnderline: true,
                            endAdornment: (
                                <InputAdornment position="end" sx={{ ml: 0 }}>
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                        sx={{
                                            position: "absolute",
                                            p: 0,
                                            right: 30,
                                            top: "calc(50% - 12px)", // Center vertically
                                        }}
                                    >
                                        {showPassword ? <VisibilityOff color="#007668" /> : <Visibility color="#007668" />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                        <Button
                            variant="contained"
                            primary
                            onClick={handleClick}
                            sx={{
                                height: '50px', backgroundColor: "#7B7A83", '&:hover': {
                                    backgroundColor: "#213740",
                                },
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            primary
                            sx={{
                                height: '50px', background: `linear-gradient(to bottom, #213740, #007668)`, '&:hover': {
                                    backgroundColor: "#213740",
                                },
                            }}
                        >
                            Guardar
                        </Button>
                    </Box>
                </form>
            </Paper>
            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                message={!authError ? "Usuario creado con exito" : "Datos incorrectos"}
            />
        </>

    )
}

export default FormUser