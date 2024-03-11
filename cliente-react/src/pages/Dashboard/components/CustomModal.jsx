import React, { useState, useEffect, useContext} from 'react';
import { Button, Modal, Box, Typography, Divider, TextField } from '@mui/material';
import * as yup from "yup";
import { useFormik } from "formik";
import { getAllVehicle } from '../../../api/services/vehicle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { UpdateTransfer } from '../../../api/services/transfer';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './../../../application/AuthContext';

const validationSchema = yup.object({
  Cost: yup.string().required("El nombre es requerido"),
  vehicleID: yup.string().required("El nombre es requerido")
});

const CustomModal = ({ open, setOpen, id }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState([])
  const [authError, setAuthError] = useState(false);

  const formik = useFormik({
    initialValues: {
      DriverID: 1,
      Cost: 0,
      vehicleID: 0
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      console.log(values);
      try {
        const { statusCode } = await UpdateTransfer(id, values);
        if (statusCode === 200) {
          setAuthError(false)
          setOpen(false)
          navigate("/dashboard/*")
        } else {
          setAuthError(true)
          setOpen(false)
        }
        console.log(values);
        setOpen(false);
        //navigate("/dashboard/bancos");
      } catch (error) {
        console.error("Error al agregar banco:", error);
        setOpen(false);
      }
    },
  });

  const getData = async () => {
    try {
      const { data } = await getAllVehicle();
      setVehicle(data);
      console.log(vehicle);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Agregar monto del viaje
          </Typography>
          <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            <Typography id="modal-modal-description">
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
                id="Cost"
                label="Costo del viaje"
                name="Cost"
                type='number'
                autoFocus
                value={formik.values.Cost}
                onChange={formik.handleChange}
                error={formik.touched.Cost && Boolean(formik.errors.Cost)}
                helperText={formik.touched.Cost && formik.errors.Cost}
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Vehiculo</InputLabel>
                <Select
                  variant="filled"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name='vehicleID'
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
                  value={formik.values.vehicleID}
                  label="Vehiculo"
                  onChange={formik.handleChange}
                >
                  {vehicle && vehicle.length > 0 && vehicle.map(banks => (
                    <MenuItem key={banks.ID_Vehicle} value={banks.ID_Vehicle}>{banks.Model}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "5px" }}>
              <Button onClick={handleClose} variant="contained" sx={{ mt: 2 }}>
                Cancelar
              </Button>
              <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                Aceptar
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
