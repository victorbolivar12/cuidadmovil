import React, { useEffect, useState } from 'react';
import { Paper, Box, Typography, Divider, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { getAllVehicle } from '../../../../api/services/vehicle';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard/vehiculos/agregar-vehiculo");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getAllVehicle();
        setVehicles(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const columns = [
    { field: 'Model', headerName: 'Modelo', width: 300 },
    { field: 'Brand', headerName: 'Marca', width: 200 },
    { field: 'Year', headerName: 'Año', width: 250 },
    { field: 'Plate', headerName: 'Placa', width: 200 },
  ];

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <Typography sx={{ fontSize: '25px', color: "#7B7A83" }}>Lista de Vehículos</Typography>
        <Button
          onClick={handleClick}
          variant="contained"
          sx={{
            background: "#007668",
            "&:hover": {
              background: "#213740",
            },
          }}
          startIcon={<AddCircleOutlineIcon />}
        >
          Agregar Vehículo
        </Button>
      </Box>
      <Divider />
      {vehicles && vehicles.length > 0 ? (
        <DataGrid
          rows={vehicles}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row.ID_Vehicle}
        />
      ) : (
        <p>No hay vehículos para mostrar</p>
      )}
    </Paper>
  );
};

export default Vehicles;
