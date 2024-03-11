import { Grid, Paper, Box, Typography, Divider, Button } from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { getAllUsers } from '../../../../api/services/auth';
import { useEffect, useState } from 'react';

const Users = ({ }) => {
	const columns = [
		{ field: 'id', headerName: 'ID', width: 70 },
		{ field: 'username', headerName: 'Nombre', width: 250 },
		{ field: 'email', headerName: 'Correo electrónico', width: 250 },
		{ field: 'rol', headerName: 'Rol', width: 250 },
		{ field: 'actions', headerName: 'Acciones', width: 150 },
	];

	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/dashboard/usuarios/agregar-usuario")
	}


	const [users, setUsers] = useState();

	const getData = async () => {
		try {
			const { data } = await getAllUsers();
			setUsers(data);
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	};

	// Llama a getData cuando el componente se monta o en cualquier otro momento apropiado
	useEffect(() => {
		getData();
	}, []);

	return (
		<Paper elevation={3} sx={{ padding: 3 }}>
			<Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "20PX" }}>
				<Typography sx={{ fontSize: '25px', color: "#7B7A83" }}>Lista de Usuarios</Typography>
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
					Agregar Usuario
				</Button>
			</Box>
			<Divider />
			{users && users.length > 0 ? (
				<DataGrid
				rows={users}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 5 },
					},
				}}
				pageSizeOptions={[5, 10]}
			/>
			) : (
				<p>No hay usuarios para mostrar</p>
			)}
		</Paper>
	);
};

export default Users;