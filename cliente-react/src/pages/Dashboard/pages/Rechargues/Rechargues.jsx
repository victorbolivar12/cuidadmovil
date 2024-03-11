import { Grid, Paper, Box, Typography, Divider, Button } from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { getAllRecharges } from '../../../../api/services/recharges';
import { useEffect, useState } from 'react';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';


const Recharges = () => {
  const columns = [
    { field: 'ID_Recharge', headerName: 'ID', width: 100 },
    { field: 'RechargeDate', headerName: 'Fecha de Recarga', width: 200 },
    { field: 'ReferenceNumber', headerName: 'Número de Referencia', width: 200 },
    { field: 'Bank', headerName: 'Banco', width: 200 },
    { field: 'Amount', headerName: 'Monto', width: 200 },
  ];

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard/recargas/agregar-recarga");
  };

  const [recharges, setRecharges] = useState([]);
  

  const getData = async () => {
    try {
      const { data } = await getAllRecharges();
      setRecharges(data);
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
        <Typography sx={{ fontSize: '25px', color: "#7B7A83" }}>Lista de Recargas</Typography>
        <Button
          onClick={handleClick}
          variant="contained"
          sx={{
            background: "#007668",
            "&:hover": {
              background: "#213740",
            },
          }}
          startIcon={<AccountBalanceWalletIcon />}
        >
          Agregar Recarga
        </Button>
      </Box>
      <Divider />
      {recharges && recharges.length > 0 ? (
        <DataGrid
          rows={recharges}
          columns={columns}
          pageSize={5}
		  getRowId={(row) => row.ID_Recharge}
        />
      ) : (
        <p>No hay recargas para mostrar</p>
      )}
    </Paper>
  );
};

export default Recharges;
