import './style.css'
import { MdDashboard, FaUsers, TbSteeringWheel, FaCarAlt, CiBank, FaRegAddressCard, BiTransfer } from 'react-icons/all'
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import { Link, Route, Routes } from "react-router-dom";
import { AuthContext } from './../../application/AuthContext';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Typography, IconButton, Menu, MenuItem, Button, Box } from "@mui/material";
import PaymentsIcon from '@mui/icons-material/Payments';
import Customers from './pages/Customers/Customers';
import Banks from './pages/Banks/Banks';
import Payments from './pages/Payments/Payments';
import Transfers from './pages/Transfers/Transfers';
import Rechargues from './pages/Rechargues/Rechargues';
import Vehicles from './pages/Vehicles/Vehicles';
import Home from './pages/Home/Home'
import Users from './pages/Users/Users';
import Drivers from './pages/Drivers/Drivers';
import FormUser from './pages/Users/FormUser';
import FormCustomer from './pages/Customers/formCustomer';
import FormBank from './pages/Banks/FormBank';
import FormDriver from './pages/Drivers/FormDriver';
import FormRecharge from './pages/Rechargues/FormRecharge';
import FormTrasfers from './pages/Transfers/formTrasfers';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import FormVehicle from './pages/Vehicles/FormVehicle';

const AvatarActions = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { logout } = useContext(AuthContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  const deletePaymentMethod = async () => {
    handleClose();
  };


  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <AccountCircleIcon sx={{ color: "#213740", fontSize: "40px" }} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            navigate("formcontract/detail");
            handleClose();
          }}
        >
          Configuracion
        </MenuItem>
        <MenuItem
          onClick={() => {
            logout()
            navigate("/");
            handleClose();
          }}
        >
          Cerrar session
        </MenuItem>
      </Menu>
    </div>
  );
}

export const Dashboard = () => {

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  let options = { day: 'numeric', month: 'long', year: 'numeric' }
  let CurrentDate = new Date().toLocaleDateString('es-ES', options);

  const menuLinks = [
    { title: 'Dashboard', path: '*', icon: MdDashboard, rol: ['superadmin', 'admin', 'client', 'driver'], component: Home },
    { title: 'Usuarios', path: 'usuarios', rol: ['superadmin', 'admin'], icon: FaUsers, component: Users },
    { title: 'Clientes', path: 'clientes', rol: ['superadmin', 'admin'], icon: FaRegAddressCard, component: Customers },
    { title: 'Choferes', path: 'choferes', rol: ['superadmin', 'admin'], icon: TbSteeringWheel, component: Drivers },
    { title: 'Vehiculos', path: 'vehiculos', rol: ['driver'], icon: FaCarAlt, component: Vehicles },
    { title: 'Traslados', path: 'traslados', rol: ['client', "driver"], icon: BiTransfer, component: Transfers },
    { title: 'Bancos', path: 'bancos', rol: ['superadmin', 'admin'], icon: CiBank, component: Banks },
    { title: 'Pagos', path: 'pagos', rol: ['superadmin', 'admin'], icon: PaymentsIcon, component: Payments },
    { title: 'Recargas', path: 'recargas', rol: ['client'], icon: PriceChangeIcon, component: Rechargues },
  ]

  // Filtrar los enlaces del menú basados en el rol del usuario
  const filteredMenuLinks = menuLinks.filter(link => user && user.role && link.rol.includes(user.role));

  const roles = {
    superadmin: "Super Administrador",
    admin: "Usuario Administrador",
    client: "Cliente",
    driver: "Chofer"
  }

  const handleClick = () => {
    navigate("/dashboard/traslados/nuevo-viaje");
  };

  return (

    <div className="page">
      {/* ---Header Dashboard--- */}
      <header style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: '18px', color: '#007668', fontWeight: '600' }}>BIENVENIDO AL PANEL DE CONTROL</h1>
          <p>{CurrentDate}</p>
        </div>

        <Box sx={{ display: "flex" }}>
          {user.role === 'client' && (
            <IconButton color="secondary" onClick={handleClick}>
              <DriveEtaIcon sx={{ color: "#213740", fontSize: "37px" }} />
            </IconButton>
          )}
          <AvatarActions />
        </Box>

      </header>

      {/* ---Aside Dashboard--- */}
      <aside>
        <h1 className='title-aside'>CUIDAD MOVIL</h1>
        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "15px", flexDirection: "column" }}>
          <AccountCircleIcon sx={{ fontSize: "100px", color: "#FFFFFF" }} />
          <Typography sx={{ color: "#FFFFFF" }}>{roles[user.role]}</Typography>
          <Typography sx={{ color: "#AA8C4E" }}>{user.username}</Typography>
        </div>
        <ul className='list_dashboard'>
          {
            filteredMenuLinks.map((link) => {
              return (
                <Link to={link.path}><li><a><link.icon />{link.title}</a></li></Link>
              )
            })
          }
        </ul>
      </aside>

      {/* ---Main Dashboard--- */}
      <main className="overflow-auto" style={{ height: '600px', padding: '0px' }}>
        <Routes>
          {
            filteredMenuLinks.map((link) => {
              return (
                <Route path={'/' + link.path} element={<link.component />} />
              )
            })
          }
          <Route path='usuarios/agregar-usuario' element={<FormUser />} />
          <Route path='clientes/agregar-cliente' element={<FormCustomer />} />
          <Route path='bancos/agregar-banco' element={<FormBank />} />
          <Route path='choferes/agregar-chofer' element={<FormDriver />} />
          <Route path='recargas/agregar-recarga' element={<FormRecharge />} />
          <Route path='recargas/agregar-recarga' element={<FormRecharge />} />
          <Route path='traslados/nuevo-viaje' element={<FormTrasfers />} />
          <Route path='vehiculos/agregar-vehiculo' element={<FormVehicle />} />
        </Routes>
      </main>
    </div>
  )
}
