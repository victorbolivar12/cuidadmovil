import { Grid, Paper, Box, Typography, Divider } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import SwapCallsIcon from '@mui/icons-material/SwapCalls';
import PaidIcon from '@mui/icons-material/Paid';
import { DataGrid } from '@mui/x-data-grid';
import { useContext, useState, useEffect } from 'react';
import { getAllTransfer, getAllTransferByidDriver, getAllTransferByidUser } from '../../../../api/services/transfer';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { AuthContext } from './../../../../application/AuthContext';
import { getBalance } from '../../../../api/services/customer';
import { getIdClientbyIduser } from '../../../../api/services/auth';


const Home = () => {

	const { user } = useContext(AuthContext);
	const [balance, setBalance] = useState(0);
	const [trasfers, setTrasfer] = useState(0);
	const [countTranfer, setcountTranfer] = useState(0);
	const [idClient, setIdclient] = useState();

	
	const getData = async () => {
		try {
			const { data } = await getBalance(1);
			console.log(data.Balance);
			setBalance(data.Balance);
		} catch (error) {
			console.error(error);
		}
	};

	const getTransfer = async () => {
		try {
			let response;
			if (user.role === "client") {
				const { data } = await getAllTransferByidUser(1);
				response = data;
			} else {
				const { data } = await getAllTransferByidDriver(1);
				response = data;
			}
			setTrasfer(response);
			console.log(response);
			response ? setcountTranfer(response.length) : setcountTranfer(0);
		} catch (error) {
			console.error(error);
		}
	};
	


	useEffect(() => {
		getData();
		getTransfer()
	}, []);


	// useEffect(async ()=> {
	// 	const { data } = await getAllTransfer();
	// },[])

	const values = [
		{ title: "Los usuarios de hoy", rol: 'admin', icon: GroupIcon, value: 3, description: "+3% que el mes pasado" },
		{ title: "Los traslados de hoy", rol: 'admin', icon: SwapCallsIcon, value: 50, description: "+3% que el mes pasado" },
		{ title: "Monto total pagado", rol: 'admin', icon: PaidIcon, value: 2.157, description: "+3% que el mes pasado" },
		{ title: "Saldo Actual", rol: 'client', icon: PaidIcon, value: balance, description: "+3% que el mes pasado" },
		{ title: "Los traslados realizados", rol: ['client', 'driver'], icon: SwapCallsIcon, value: countTranfer, description: "+3% que el mes pasado" },
	];

	// Filtrar los enlaces del menú basados en el rol del usuario
	const filteredMenuLinks = values.filter(link => user && user.role && link.rol.includes(user.role));

	const columns = [
		{ field: 'DriverID', headerName: 'Chofer', width: 130 },
		{ field: 'CustomerID', headerName: 'Cliente', width: 130 },
		{ field: 'TransferDate', headerName: 'Fecha', width: 180 },
		{ field: 'Origin', headerName: 'Origen', width: 180 },
		{ field: 'Destination', headerName: 'Destino', width: 180 },
		{ field: 'Cost', headerName: 'Costo', type: 'number', width: 80 },
	];


	return (
		<>
			<Grid container spacing={7} sx={{ marginBottom: 3 }}>
				{filteredMenuLinks.map((item, index) => (
					<Grid item xs={4} key={index}>
						<Paper elevation={3} sx={{ maxWidth: 300, height: 180, padding: 3 }}>
							<Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
								<Typography sx={{ color: "#007668", fontWeight: "600" }}>{item.title}</Typography>
								<item.icon sx={{ color: "#007668" }} />
							</Box>
							<Typography sx={{ fontSize: 40, fontWeight: '600' }}>{item.value}</Typography>
							<Divider sx={{ marginBottom: 2 }} />
							<Typography sx={{ fontWeight: "100" }}>{item.description}</Typography>
						</Paper>
					</Grid>
				))}
			</Grid>
			<Paper elevation={3} sx={{ width: "100%", padding: 3 }}>
				<Box sx={{ display: "flex", marginBottom: 2 }}>
					<SwapCallsIcon sx={{ color: "#007668", marginRight: 2 }} />
					<Typography sx={{ color: "#007668", fontWeight: "600" }}>Traslados de hoy</Typography>
				</Box>
				{trasfers && trasfers.length > 0 ? (
					<DataGrid
						rows={trasfers}
						columns={columns}
						pageSize={5}
						getRowId={(row) => row.ID_Transfer}
					/>
				) : (
					<p>No hay traslados para mostrar</p>
				)}
			</Paper>
		</>
	);
};

export default Home;
