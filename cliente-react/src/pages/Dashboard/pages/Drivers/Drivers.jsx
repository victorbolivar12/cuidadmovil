import { Grid, Paper, Box, Typography, Divider, Button } from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { getAllDriver } from '../../../../api/services/driver'; // Asumiendo que tienes un método similar para obtener conductores
import { useEffect, useState } from 'react';

const Drivers = () => {

	const columns = [
		{ field: 'ID_Driver', headerName: 'ID', width: 70 },
		{ field: 'Name', headerName: 'Nombre', width: 150 },
		{ field: 'Lastname', headerName: 'Apellido', width: 150 },
		{ field: 'BirthDate', headerName: 'Fecha de Nacimiento', width: 150 },
		{ field: 'ID_Number', headerName: 'Número de Identificación', width: 200 },
		{ field: 'BankEntity', headerName: 'Entidad Bancaria', width: 200 },
		{ field: 'AccountNumber', headerName: 'Número de Cuenta', width: 200 },
		{ field: 'PsychologicalRating', headerName: 'Calificación Psicológica', width: 200 },
		{ field: 'PsychologicalEvaluationDate', headerName: 'Fecha de Evaluación Psicológica', width: 250 },
		{ field: 'EmergencyContact1', headerName: 'Contacto de Emergencia 1', width: 200 },
		{ field: 'EmergencyContact2', headerName: 'Contacto de Emergencia 2', width: 200 },
		{ field: 'UserID', headerName: 'ID de Usuario', width: 150 },
		{ field: 'Actions', headerName: 'Acciones', width: 100 },
	];

	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/dashboard/choferes/agregar-chofer"); // Actualiza la ruta según sea necesario
	};

	const [drivers, setDrivers] = useState([]);

	const getData = async () => {
		try {
			const { data } = await getAllDriver(); // Utiliza el método para obtener conductores
			setDrivers(data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div>
			<Paper elevation={3} sx={{ padding: 3 }}>
				<Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
					<Typography sx={{ fontSize: '25px', color: "#7B7A83" }}>Lista de Conductores</Typography>
					<Button
						onClick={handleClick}
						variant="contained"
						sx={{
							background: "#007668",
							"&:hover": {
								background: "#213740",
							},
						}}
						startIcon={<PersonAddAlt1Icon />}
					>
						Agregar Conductor
					</Button>
				</Box>
				<Divider />
				{drivers && drivers.length > 0 ? (
					<DataGrid
						rows={drivers}
						columns={columns}
						initialState={{
							pagination: {
								paginationModel: { page: 0, pageSize: 5 },
							},
						}}
						pageSizeOptions={[5, 10]}
						getRowId={(row) => row.ID_Driver}
					/>
				) : (
					<p>No hay conductores para mostrar</p>
				)}
			</Paper>
		</div>
	);
};

export default Drivers;
