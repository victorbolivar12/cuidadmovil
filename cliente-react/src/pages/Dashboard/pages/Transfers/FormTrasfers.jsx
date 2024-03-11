import { useEffect, useState, useContext } from 'react';
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
import { createTrasfer } from '../../../../api/services/transfer';
import { AuthContext } from '../../../../application/AuthContext';
import { getIdClientbyIduser } from '../../../../api/services/auth';

const validationSchema = yup.object({
  TransferDate: yup.date().required("La fecha de transferencia es requerida"),
  Origin: yup.string().required("El origen es requerido"),
  Destination: yup.string().required("El destino es requerido")
});

const FormTrasfers = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [idClient, setIdclient] = useState(false);
  const [authError, setAuthError] = useState(false);

  const getData = async () => {
    try {
      const { data } = await getIdClientbyIduser(user.id);
      console.log(data)
      setIdclient(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);


  const formik = useFormik({
    initialValues: {
      CustomerID: 1,
      TransferDate: '',
      Origin: '',
      Destination: ''
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      try {
        const { data, statusCode } = await createTrasfer(values);
        if (statusCode === 200) {
          setAuthError(false)
          setOpen(true)
          navigate("/dashboard/traslados")
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
        <Typography sx={{ color: "#FFFFFF" }}>NUEVO VIAJE</Typography>
      </HeaderInfo>
      <Paper elevation={3} sx={{ width: "100%", padding: 3 }}>
        <Box sx={{ display: "flex", marginBottom: 2 }}>
          <AccountCircleIcon sx={{ color: "#007668", marginRight: "10px" }} />
          <Typography sx={{ color: "#7B7A83", fontWeight: "600" }}>Detalles del viaje</Typography>
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
            id="TransferDate"
            label="Fecha"
            name="TransferDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formik.values.TransferDate}
            onChange={formik.handleChange}
            error={formik.touched.TransferDate && Boolean(formik.errors.TransferDate)}
            helperText={formik.touched.TransferDate && formik.errors.TransferDate}
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
            id="Origin"
            label="Origen"
            name="Origin"
            value={formik.values.Origin}
            onChange={formik.handleChange}
            error={formik.touched.Origin && Boolean(formik.errors.Origin)}
            helperText={formik.touched.Origin && formik.errors.Origin}
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
            id="Destination"
            label="Destino"
            name="Destination"
            value={formik.values.Destination}
            onChange={formik.handleChange}
            error={formik.touched.Destination && Boolean(formik.errors.Destination)}
            helperText={formik.touched.Destination && formik.errors.Destination}
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
        message="Conductor creado con éxito"
      />
    </>
  )
}

export default FormTrasfers;
