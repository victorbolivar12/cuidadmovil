import React from 'react';
import * as yup from "yup";
import { useFormik } from "formik";
import {
    Paper,
    Box,
    Divider,
    Typography,
    TextField,
    Button,
    Snackbar
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HeaderInfo from '../../components/HeaderInfo';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { getAllUsers } from '../../../../api/services/auth';
import { createCustumer } from '../../../../api/services/customer';

const validationSchema = yup.object({
    Name: yup.string().required("El nombre es requerido"),
    Lastname: yup.string().required("El apellido es requerido"),
    BirthDate: yup.date().required("La fecha de nacimiento es requerida"),
    ID_Number: yup.string().required("La identidad es requerida"),
    UserID: yup.number().required("el usuario del cliente es requerido")
});

const FormCustomer = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState();
    const [authError, setAuthError] = useState(false);

    const getData = async () => {
        try {
            const { data } = await getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);


    const formik = useFormik({
        initialValues: {
            Name: '',
            Lastname: '',
            BirthDate: '',
            ID_Number: '',
            UserID: 0,
        },
        validationSchema: validationSchema,
        onSubmit: async values => {
            try {
                const { data, statusCode } = await createCustumer(values);
                if (statusCode === 200) {
                    setAuthError(false)
                    setOpen(true)
                    navigate("/dashboard/clientes")
                } else {
                    setAuthError(true)
                    setOpen(true)
                }
                setOpen(true);
            } catch (error) {
                console.error("Error al agregar cliente:", error);
                setOpen(true);
            }
        },
    });

    const handleClose = () => {
        setOpen(false);
    }

    const handleClick = () => {
        navigate("/dashboard/clientes")
    }

    return (
        <>
            <HeaderInfo>
                <PersonAddIcon sx={{ color: "#FFFFFF" }} />
                <Typography sx={{ color: "#FFFFFF" }}>AGREGAR CLIENTE</Typography>
            </HeaderInfo>
            <Paper elevation={3} sx={{ width: "100%", padding: 3 }}>
                <Box sx={{ display: "flex", marginBottom: 2 }}>
                    <AccountCircleIcon sx={{ color: "#007668", marginRight: "10px" }} />
                    <Typography sx={{ color: "#7B7A83", fontWeight: "600" }}>Detalles del cliente</Typography>
                </Box>
                <Divider sx={{ background: "#EAEAEA" }} />
                <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
                    <TextField
                        margin="normal"
                        variant="filled"
                        sx={{
                            "& .MuiInputBase-input": {
                                backgroundColor: "#FFFFFF",
                            },
                        }}
                        fullWidth
                        required
                        id="Name"
                        label="Nombre"
                        name="Name"
                        autoFocus
                        value={formik.values.Name}
                        onChange={formik.handleChange}
                        error={formik.touched.Name && Boolean(formik.errors.Name)}
                        helperText={formik.touched.Name && formik.errors.Name}
                    />
                    <TextField
                        margin="normal"
                        variant="filled"
                        fullWidth
                        required
                        id="Lastname"
                        label="Apellido"
                        sx={{
                            "& .MuiInputBase-input": {
                                backgroundColor: "#FFFFFF",
                            },
                        }}
                        name="Lastname"
                        value={formik.values.Lastname}
                        onChange={formik.handleChange}
                        error={formik.touched.Lastname && Boolean(formik.errors.Lastname)}
                        helperText={formik.touched.Lastname && formik.errors.Lastname}
                    />
                    <TextField
                        margin="normal"
                        variant="filled"
                        fullWidth
                        required
                        id="ID_Number"
                        label="Cedula"
                        sx={{
                            "& .MuiInputBase-input": {
                                backgroundColor: "#FFFFFF",
                            },
                        }}
                        name="ID_Number"
                        value={formik.values.ID_Number}
                        onChange={formik.handleChange}
                        error={formik.touched.ID_Number && Boolean(formik.errors.ID_Number)}
                        helperText={formik.touched.ID_Number && formik.errors.ID_Number}
                    />
                    <TextField
                        margin="normal"
                        variant="filled"
                        sx={{
                            marginBottom: "25px",
                            "& .MuiInputBase-input": {
                                backgroundColor: "#FFFFFF",
                            },
                        }}
                        fullWidth
                        required
                        id="BirthDate"
                        label="Fecha de Nacimiento"
                        name="BirthDate"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={formik.values.BirthDate}
                        onChange={formik.handleChange}
                        error={formik.touched.BirthDate && Boolean(formik.errors.BirthDate)}
                        helperText={formik.touched.BirthDate && formik.errors.BirthDate}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Usuario</InputLabel>
                        <Select
                            variant="filled"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name='UserID'
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
                            value={formik.values.UserID}
                            label="usuario"
                            onChange={formik.handleChange}
                        >
                            {users && users.length > 0 && users.map(user => (
                                <MenuItem key={user.id} value={user.id}>{user.username}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
                        <Button
                            variant="contained"
                            primary
                            onClick={handleClick}
                            sx={{
                                borderRadius: "px", height: '50px', backgroundColor: "#7B7A83", '&:hover': {
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
                                borderRadius: "4px",
                                height: '50px',
                                background: `linear-gradient(to bottom, #213740, #007668)`,
                                '&:hover': {
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
                message="Cliente creado con éxito"
            />
        </>

    )
}

export default FormCustomer;
