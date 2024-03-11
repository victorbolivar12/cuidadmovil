import React, { useEffect, useState } from 'react';
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
import { getAllUsers } from '../../../../api/services/auth';
import { getAllBank } from '../../../../api/services/bank';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { addDriver } from '../../../../api/services/driver';

const validationSchema = yup.object({
    Name: yup.string().required("El nombre es requerido"),
    Lastname: yup.string().required("El apellido es requerido"),
    BirthDate: yup.date().required("La fecha de nacimiento es requerida"),
    ID_Number: yup.string().required("La identidad es requerida"),
    BankEntity: yup.string().required("La entidad bancaria es requerida"),
    AccountNumber: yup.string().required("El número de cuenta es requerido"),
    PsychologicalRating: yup.number().required("La calificación psicológica es requerida"),
    PsychologicalEvaluationDate: yup.date().required("La fecha de evaluación psicológica es requerida"),
    EmergencyContact1: yup.string().required("El primer contacto de emergencia es requerido"),
    EmergencyContact2: yup.string().required("El segundo contacto de emergencia es requerido"),
    UserID: yup.number().required("El ID de usuario es requerido")
});

const FormDriver = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [authError, setAuthError] = useState(false);
    const [users, setUsers] = useState();
    const [banks, setBanks] = useState();

    const getData = async () => {
        try {
            const { data } = await getAllUsers();
            setUsers(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    const getData2 = async () => {
        try {
            const { data } = await getAllBank();
            setBanks(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getData();
        getData2();
    }, []);

    const formik = useFormik({
        initialValues: {
            Name: '',
            Lastname: '',
            BirthDate: '',
            ID_Number: '',
            BankEntity: '',
            AccountNumber: '',
            PsychologicalRating: '',
            PsychologicalEvaluationDate: '',
            EmergencyContact1: '',
            EmergencyContact2: '',
            UserID: 0,
        },
        validationSchema: validationSchema,
        onSubmit: async values => {
            try {
                const { data, statusCode } = await addDriver(values);
                if (statusCode === 200) {
                    setAuthError(false)
                    setOpen(true)
                    navigate("/dashboard/choferes")
                } else {
                    setAuthError(true)
                    setOpen(true)
                }
            } catch (error) {
                console.error("Error al agregar conductor:", error);
                setOpen(true);
            }
        },
    });

    const handleClose = () => {
        setOpen(false);
    }

    const handleClick = () => {
        navigate("/dashboard/choferes")
    }

    return (
        <>
            <HeaderInfo>
                <PersonAddIcon sx={{ color: "#FFFFFF" }} />
                <Typography sx={{ color: "#FFFFFF" }}>AGREGAR CONDUCTOR</Typography>
            </HeaderInfo>
            <Paper elevation={3} sx={{ width: "100%", padding: 3 }}>
                <Box sx={{ display: "flex", marginBottom: 2 }}>
                    <AccountCircleIcon sx={{ color: "#007668", marginRight: "10px" }} />
                    <Typography sx={{ color: "#7B7A83", fontWeight: "600" }}>Detalles del conductor</Typography>
                </Box>
                <Divider sx={{ background: "#EAEAEA" }} />
                <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
                    <TextField
                        margin="normal"
                        sx={{
                            "& .MuiInputBase-input": {
                                backgroundColor: "#FFFFFF",
                            },
                        }}
                        variant="filled"
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
                        sx={{
                            "& .MuiInputBase-input": {
                                backgroundColor: "#FFFFFF",
                            },
                        }}
                        fullWidth
                        required
                        id="Lastname"
                        label="Apellido"
                        name="Lastname"
                        value={formik.values.Lastname}
                        onChange={formik.handleChange}
                        error={formik.touched.Lastname && Boolean(formik.errors.Lastname)}
                        helperText={formik.touched.Lastname && formik.errors.Lastname}
                    />

                    <TextField
                        margin="normal"
                        sx={{
                            "& .MuiInputBase-input": {
                                backgroundColor: "#FFFFFF",
                            },
                        }}
                        variant="filled"
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

                    <TextField
                        margin="normal"
                        sx={{
                            marginBottom: "40px",
                            "& .MuiInputBase-input": {
                                backgroundColor: "#FFFFFF",
                            },
                        }}
                        variant="filled"
                        fullWidth
                        required
                        id="ID_Number"
                        label="Número de Identificación"
                        name="ID_Number"
                        value={formik.values.ID_Number}
                        onChange={formik.handleChange}
                        error={formik.touched.ID_Number && Boolean(formik.errors.ID_Number)}
                        helperText={formik.touched.ID_Number && formik.errors.ID_Number}
                    />

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Entidad Bancaria</InputLabel>
                        <Select
                            variant="filled"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name='BankEntity'
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
                            value={formik.values.BankEntity}
                            label="Entidad bancario"
                            onChange={formik.handleChange}
                        >
                            {banks && banks.length > 0 && banks.map(banks => (
                                <MenuItem key={banks.ID_Bank} value={banks.name}>{banks.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        margin="normal"
                        sx={{
                            "& .MuiInputBase-input": {
                                backgroundColor: "#FFFFFF",
                            },
                        }}
                        variant="filled"
                        fullWidth
                        required
                        id="AccountNumber"
                        label="Número de Cuenta"
                        name="AccountNumber"
                        value={formik.values.AccountNumber}
                        onChange={formik.handleChange}
                        error={formik.touched.AccountNumber && Boolean(formik.errors.AccountNumber)}
                        helperText={formik.touched.AccountNumber && formik.errors.AccountNumber}
                    />

                    <TextField
                        margin="normal"
                        sx={{
                            "& .MuiInputBase-input": {
                                backgroundColor: "#FFFFFF",
                            },
                        }}
                        variant="filled"
                        fullWidth
                        required
                        id="PsychologicalRating"
                        label="Calificación Psicológica"
                        name="PsychologicalRating"
                        value={formik.values.PsychologicalRating}
                        onChange={formik.handleChange}
                        error={formik.touched.PsychologicalRating && Boolean(formik.errors.PsychologicalRating)}
                        helperText={formik.touched.PsychologicalRating && formik.errors.PsychologicalRating}
                    />

                    <TextField
                        margin="normal"
                        sx={{
                            "& .MuiInputBase-input": {
                                backgroundColor: "#FFFFFF",
                            },
                        }}
                        variant="filled"
                        fullWidth
                        required
                        id="PsychologicalEvaluationDate"
                        label="Fecha de Evaluación Psicológica"
                        name="PsychologicalEvaluationDate"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={formik.values.PsychologicalEvaluationDate}
                        onChange={formik.handleChange}
                        error={formik.touched.PsychologicalEvaluationDate && Boolean(formik.errors.PsychologicalEvaluationDate)}
                        helperText={formik.touched.PsychologicalEvaluationDate && formik.errors.PsychologicalEvaluationDate}
                    />

                    <TextField
                        margin="normal"
                        sx={{
                            "& .MuiInputBase-input": {
                                backgroundColor: "#FFFFFF",
                            },
                        }}
                        variant="filled"
                        fullWidth
                        required
                        id="EmergencyContact1"
                        label="Contacto de Emergencia 1"
                        name="EmergencyContact1"
                        value={formik.values.EmergencyContact1}
                        onChange={formik.handleChange}
                        error={formik.touched.EmergencyContact1 && Boolean(formik.errors.EmergencyContact1)}
                        helperText={formik.touched.EmergencyContact1 && formik.errors.EmergencyContact1}
                    />

                    <TextField
                        margin="normal"
                        variant="filled"
                        sx={{
                            marginBottom: "40px",
                            "& .MuiInputBase-input": {
                                backgroundColor: "#FFFFFF",
                            },
                        }}
                        fullWidth
                        required
                        id="EmergencyContact2"
                        label="Contacto de Emergencia 2"
                        name="EmergencyContact2"
                        value={formik.values.EmergencyContact2}
                        onChange={formik.handleChange}
                        error={formik.touched.EmergencyContact2 && Boolean(formik.errors.EmergencyContact2)}
                        helperText={formik.touched.EmergencyContact2 && formik.errors.EmergencyContact2}
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
                message="Conductor creado con éxito"
            />
        </>
    )
}

export default FormDriver;
