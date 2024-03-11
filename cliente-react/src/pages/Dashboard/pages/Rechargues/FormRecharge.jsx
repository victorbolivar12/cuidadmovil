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
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import HeaderInfo from '../../components/HeaderInfo';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState, useContext } from 'react';
import { getAllBank } from '../../../../api/services/bank';
import { AuthContext } from './../../../../application/AuthContext';
import { createRecharge } from '../../../../api/services/recharges';
import { getIdClientbyIduser } from '../../../../api/services/auth';

const validationSchema = yup.object({
    CustomerID: yup.number().required("El ID del cliente es requerido"),
    RechargeDate: yup.date().required("La fecha de recarga es requerida"),
    ReferenceNumber: yup.string().required("El número de referencia es requerido"),
    Bank: yup.string().required("El nombre del banco es requerido"),
    Amount: yup.number().required("El monto es requerido"),
});

const FormRecharge = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [idClient, setIdclient] = useState();
    const [banks, setBanks] = useState([]);
    const [error, setError] = useState(false);

    const getData = async () => {
		try {
			const { data } = await getAllBank();
			setBanks(data);
		} catch (error) {
			console.error(error);
		}
	};

    const getid = async () => {
		try {
			const { data } = await getIdClientbyIduser(user.id);
			setIdclient(data);
		} catch (error) {
			console.error(error);
		}
	};

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

    useEffect(() => {
        getData();
        getid()
    }, []);

    const { user } = useContext(AuthContext);


    const formik = useFormik({
        initialValues: {
            CustomerID: 1,
            RechargeDate: formattedDate,
            ReferenceNumber: '',
            Bank: '',
            Amount: '',
        },
        validationSchema: validationSchema,
        onSubmit: async values => {
            console.log(values)
            try {
                const { data, statusCode } = await createRecharge(values);
                if (statusCode === 200) {
                    setError(false);
                    setOpen(true);
                    navigate("/dashboard/recargas");
                } else {
                    setError(true);
                    setOpen(true);
                }
            } catch (error) {
                console.error("Error al agregar recarga:", error);
                setError(true);
                setOpen(true);
            }
        },
    });

    const handleClose = () => {
        setOpen(false);
    }

    const handleClick = () => {
        navigate("/dashboard/recargas");
    }

    return (
        <>
            <HeaderInfo>
                <AccountBalanceWalletIcon sx={{ color: "#FFFFFF" }} />
                <Typography sx={{ color: "#FFFFFF" }}>AGREGAR RECARGA</Typography>
            </HeaderInfo>
            <Paper elevation={3} sx={{ width: "100%", padding: 3 }}>
                <Box sx={{ display: "flex", marginBottom: 2 }}>
                    <AccountBalanceWalletIcon sx={{ color: "#007668", marginRight: "10px" }} />
                    <Typography sx={{ color: "#7B7A83", fontWeight: "600" }}>Detalles de la recarga</Typography>
                </Box>
                <Divider sx={{ background: "#EAEAEA" }} />
                <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
                    <TextField
                        margin="normal"
                        variant="filled"
                        fullWidth
                        required
                        id="ReferenceNumber"
                        label="Número de Referencia"
                        name="ReferenceNumber"
                        value={formik.values.ReferenceNumber}
                        onChange={formik.handleChange}
                        error={formik.touched.ReferenceNumber && Boolean(formik.errors.ReferenceNumber)}
                        helperText={formik.touched.ReferenceNumber && formik.errors.ReferenceNumber}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Banco</InputLabel>
                        <Select
                            variant="filled"
                            labelId="demo-simple-select-label"
                            id="Bank"
                            name='Bank'
                            sx={{marginTop:"15px"}}
                            value={formik.values.Bank}
                            label="Banco"
                            onChange={formik.handleChange}
                        >
                            {banks && banks.length > 0 && banks.map(user => (
                                <MenuItem key={user.ID_Bank} value={user.name}>{user.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        margin="normal"
                        variant="filled"
                        fullWidth
                        required
                        id="Amount"
                        label="Monto"
                        name="Amount"
                        type="number"
                        value={formik.values.Amount}
                        onChange={formik.handleChange}
                        error={formik.touched.Amount && Boolean(formik.errors.Amount)}
                        helperText={formik.touched.Amount && formik.errors.Amount}
                    />
                    <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
                        <Button
                            variant="contained"
                            onClick={handleClick}
                            sx={{
                                borderRadius: "4px",
                                height: '50px',
                                backgroundColor: "#7B7A83",
                                '&:hover': {
                                    backgroundColor: "#213740",
                                },
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
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
                message={error ? "Error al agregar recarga" : "Recarga creada con éxito"}
            />
        </>

    )
}

export default FormRecharge;
