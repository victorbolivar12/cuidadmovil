import { Grid, Paper, Box, Typography, Divider, Button } from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState, useContext} from 'react';
import { getAllTransfer, getAllTransferByidDriver, getAllTransferByidUser } from '../../../../api/services/transfer';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import CustomModal from '../../components/CustomModal';
import { AuthContext } from '../../../../application/AuthContext';

const Transfers = () => {
	const { user } = useContext(AuthContext);
	const [open, setOpen] = useState(false);
	const [id, setId] = useState(0);

	const handleOpen = (params) => {
		setOpen(true);
		setId(params.ID_Transfer)
	};

	const columns = [
		{ field: 'ID_Transfer', headerName: 'ID', width: 100 },
		{ field: 'TransferDate', headerName: 'Fecha de Traslado', width: 200 },
		{ field: 'Origin', headerName: 'Origen', width: 200 },
		{ field: 'Destination', headerName: 'Destino', width: 200 },
	];

	if (user.role !== "client") {
		columns.push({
			headerName: 'Acciones',
			width: 300,
			renderCell: (params) => (
				<Button variant="contained" onClick={() => handleOpen(params.row)}>
					Acaptar
				</Button>
			)
		});
	}


	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/dashboard/traslados/nuevo-viaje");
	};

	const [transfers, setTransfers] = useState([]);

	const getData = async () => {
		try {
			let data;
			if (user.role === "client") {
				({ data } = await getAllTransferByidUser(1));
			} else {
				({ data } = await getAllTransfer());
			}
			setTransfers(data);
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<Paper elevation={3} sx={{ padding: 3 }}>
			<Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
				<Typography sx={{ fontSize: '25px', color: "#7B7A83" }}>{user.role === "client" ? "Lista de tralados pendientes" : "Lista de traslado por aceptar"}</Typography>

				{user.role === "client" && (
					<Button
						onClick={handleClick}
						variant="contained"
						sx={{
							background: "#007668",
							"&:hover": {
								background: "#213740",
							},
						}}
						startIcon={<DriveEtaIcon />}
					>
						Nuevo viaje
					</Button>
				)}

			</Box>
			<Divider />
			{transfers && transfers.length > 0 ? (
				<DataGrid
					rows={transfers}
					columns={columns}
					pageSize={5}
					getRowId={(row) => row.ID_Transfer}
				/>
			) : (
				<p>No hay traslados para mostrar</p>
			)}
			<CustomModal id={id} open={open} setOpen={setOpen}/>
		</Paper>
	);
};

export default Transfers;
