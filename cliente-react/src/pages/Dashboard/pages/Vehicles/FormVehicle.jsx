import React, { useEffect, useState ,useContext} from 'react';
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
import { createVehicle } from '../../../../api/services/vehicle';
import { AuthContext } from './/../../../../application/AuthContext';

const validationSchema = yup.object({
    Model: yup.string().required("El modelo es requerido"),
    Brand: yup.string().required("La marca es requerida"),
    Year: yup.number().required("El año es requerido"),
    Plate: yup.string().required("La placa es requerida"),
});

const FormVehicle = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [authError, setAuthError] = useState(false);
    const [drivers, setDrivers] = useState();

    const { user } = useContext(AuthContext);

    const formik = useFormik({
        initialValues: {
            Model: '',
            Brand: '',
            Year: '',
            Plate: '',
            DriverID:1,
        },
        validationSchema: validationSchema,
        onSubmit: async values => {
            console.log(values)
            try {
                const { data, statusCode } = await createVehicle(values);
                if (statusCode === 200) {
                    setAuthError(false)
                    setOpen(true)
                    navigate("/dashboard/vehiculos")
                } else {
                    setAuthError(true)
                    setOpen(true)
                }
            } catch (error) {
                console.error("Error al agregar vehículo:", error);
                setOpen(true);
            }
        },
    });

    const handleClose = () => {
        setOpen(false);
    }

    const handleClick = () => {
        navigate("/dashboard/vehiculos")
    }

    return (
        <>
            <HeaderInfo>
                <PersonAddIcon sx={{ color: "#FFFFFF" }} />
                <Typography sx={{ color: "#FFFFFF" }}>AGREGAR VEHÍCULO</Typography>
            </HeaderInfo>
            <Paper elevation={3} sx={{ width: "100%", padding: 3 }}>
                <Box sx={{ display: "flex", marginBottom: 2 }}>
                    <AccountCircleIcon sx={{ color: "#007668", marginRight: "10px" }} />
                    <Typography sx={{ color: "#7B7A83", fontWeight: "600" }}>Detalles del vehículo</Typography>
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
                        id="Model"
                        label="Modelo"
                        name="Model"
                        autoFocus
                        value={formik.values.Model}
                        onChange={formik.handleChange}
                        error={formik.touched.Model && Boolean(formik.errors.Model)}
                        helperText={formik.touched.Model && formik.errors.Model}
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
                        id="Brand"
                        label="Marca"
                        name="Brand"
                        value={formik.values.Brand}
                        onChange={formik.handleChange}
                        error={formik.touched.Brand && Boolean(formik.errors.Brand)}
                        helperText={formik.touched.Brand && formik.errors.Brand}
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
                        id="Year"
                        label="Año"
                        name="Year"
                        type="number"
                        value={formik.values.Year}
                        onChange={formik.handleChange}
                        error={formik.touched.Year && Boolean(formik.errors.Year)}
                        helperText={formik.touched.Year && formik.errors.Year}
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
                        id="Plate"
                        label="Placa"
                        name="Plate"
                        value={formik.values.Plate}
                        onChange={formik.handleChange}
                        error={formik.touched.Plate && Boolean(formik.errors.Plate)}
                        helperText={formik.touched.Plate && formik.errors.Plate}
                    />
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
                message="Vehículo creado con éxito"
            />
        </>
    )
}

export default FormVehicle;
