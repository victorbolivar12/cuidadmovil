import { Grid, Paper, Box, Typography, Divider, Button } from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { getAllCustomers } from '../../../../api/services/customer';
import { useEffect, useState } from 'react';

const Customers = ({ }) => {

	const columns = [
		{ field: 'ID_Client', headerName: 'ID', width: 70 },
		{ field: 'Name', headerName: 'Nombre', width: 250 },
		{ field: 'Lastname', headerName: 'Apellido', width: 250 },
		{ field: 'BirthDate', headerName: 'Fecha de Nacimiento', width: 200 },
		{ field: 'Balance', headerName: 'Saldo', width: 120 },
		{ field: 'Actions', headerName: 'Acciones', width: 80 },
	];

	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/dashboard/clientes/agregar-cliente"); // Actualiza la ruta según sea necesario
	};

	const [customers, setCustomers] = useState();

	const getData = async () => {
		try {
			const { data } = await getAllCustomers(); // Utiliza el método para obtener clientes
			setCustomers(data);
			console.log(data);
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
					<Typography sx={{ fontSize: '25px', color: "#7B7A83" }}>Lista de Clientes</Typography>
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
						Agregar Cliente
					</Button>
				</Box>
				<Divider />
				{customers && customers.length > 0 ? (
					<DataGrid
						rows={customers}
						columns={columns}
						initialState={{
							pagination: {
								paginationModel: { page: 0, pageSize: 5 },
							},
						}}
						pageSizeOptions={[5, 10]}
						getRowId={(row) => row.ID_Client}
					/>
				) : (
					<p>No hay clientes para mostrar</p>
				)}
			</Paper>
		</div>
	);
};


export default Customers;