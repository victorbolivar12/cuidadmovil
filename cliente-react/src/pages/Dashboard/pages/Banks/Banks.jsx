import { Paper, Box, Typography, Divider, Button } from '@mui/material';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { getAllBank } from '../../../../api/services/bank';

const Banks = () => {
	const columns = [
		{ field: 'ID_bank', headerName: 'ID', width: 400 },
		{ field: 'name', headerName: 'Nombre del Banco', width: 300 },
		{ field: 'actions', headerName: 'Acciones', width: 300 },
	];

	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/dashboard/bancos/agregar-banco");
	};

	const [banks, setBanks] = useState([]);

	const getData = async () => {
		try {
			const { data } = await getAllBank();
			setBanks(data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<Paper elevation={3} sx={{ padding: 3 }}>
			<Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "20PX" }}>
				<Typography sx={{ fontSize: '25px', color: "#7B7A83" }}>Lista de Bancos</Typography>
				<Button
					onClick={handleClick}
					variant="contained"
					sx={{
						background: "#007668",
						"&:hover": {
							background: "#213740",
						},
					}}
					startIcon={<AddBusinessIcon />}
				>
					Agregar Banco
				</Button>
			</Box>
			<Divider />
			{banks.length > 0 ? (
				<DataGrid
					rows={banks}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: { page: 0, pageSize: 5 },
						},
					}}
					pageSizeOptions={[5, 10]}
					getRowId={(row) => row.ID_bank}
				/>
			) : (
				<p>No hay bancos para mostrar</p>
			)}
		</Paper>
	);
};

export default Banks;
