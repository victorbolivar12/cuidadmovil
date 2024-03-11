import React from 'react';
import * as yup from "yup";
import { useFormik } from "formik";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import {
    Paper,
    Box,
    Divider,
    Typography,
    TextField,
    Button,
    Snackbar
} from "@mui/material";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HeaderInfo from '../../components/HeaderInfo';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { addBank } from '../../../../api/services/bank';

const validationSchema = yup.object({
    name: yup.string().required("El nombre es requerido")
});

const FormBank = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [authError, setAuthError] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema: validationSchema,
        onSubmit: async values => {
            try {
                const {statusCode } = await addBank(values);
                if (statusCode === 200) {
                    setAuthError(false)
                    setOpen(true)
                    navigate("/dashboard/bancos")
                } else {
                    setAuthError(true)
                    setOpen(true)
                }
                console.log(values);
                setOpen(true);
                //navigate("/dashboard/bancos");
            } catch (error) {
                console.error("Error al agregar banco:", error);
                setOpen(true);
            }
        },
    });

    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = () => {
        navigate("/dashboard/bancos");
    };

    return (
        <>
            <HeaderInfo>
                <AddBusinessIcon sx={{ color: "#FFFFFF" }} />
                <Typography sx={{ color: "#FFFFFF" }}>AGREGAR BANCO</Typography>
            </HeaderInfo>
            <Paper elevation={3} sx={{ width: "100%", padding: 3 }}>
                <Box sx={{ display: "flex", marginBottom: 2 }}>
                    <AccountBalanceIcon sx={{ color: "#007668", marginRight: "10px" }} />
                    <Typography sx={{ color: "#7B7A83", fontWeight: "600" }}>Detalles del banco</Typography>
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
                            },
                        }}
                        id="name"
                        label="Nombre del banco"
                        name="name"
                        autoFocus
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
                        <Button
                            variant="contained"
                            primary
                            onClick={handleClick}
                            sx={{
                                borderRadius: "4px", height: '50px', backgroundColor: "#7B7A83", '&:hover': {
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
                message="Banco creado con éxito"
            />
        </>
    );
}

export default FormBank;
