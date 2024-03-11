import { AuthContext } from '../../application/AuthContext';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from "../../assets/bg-register.png"
import { useFormik } from "formik";
import Snackbar from '@mui/material/Snackbar';
import * as yup from "yup";
import {
	Paper,
	Box,
	Grid,
	Typography,
	FormControlLabel,
	TextField,
	InputAdornment,
	IconButton,
	OutlinedInput,
	Button,
	Collapse,
	Alert,
	AlertTitle,
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Link from '@mui/material/Link';
import { signUp } from "../../api/services/auth"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const validationSchema = yup.object({
	username: yup.string(),
	rol: yup.string(),
	email: yup
		.string()
		.email("Debes ingresar un email para continuar")
		.matches(
			/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			"Ingresa un email válido"
		)
		.required("Email es requerido"),
	password: yup
		.string()
		.required("Debes ingresar una contraseña para continuar")
});


export const Register = ({ }) => {

	const { login } = useContext(AuthContext);
	const navigate = useNavigate();
	const [authError, setAuthError] = useState(false);
	const [open, setOpen] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	}

	const formik = useFormik({
		initialValues: {
			username: '',
			rol: '',
			email: '',
			password: '',
		},
		validationSchema: validationSchema,
		onSubmit: async values => {
			const { data, statusCode } = await signUp(values);
			if (statusCode === 200) {
				setAuthError(false)
				setOpen(true)
				login({username: values.username, role: values.rol})
				navigate("/dashboard/*")
			} else {
				setAuthError(true)
				setOpen(true)
			}
		},
	});
	
	return (
		<Grid container component="main" sx={{ height: "100vh", padding: 0 }}>
			<Grid item xs={12} sm={8} md={6} sx={{ background: `linear-gradient(to bottom, #213740, #007668)`, padding: '40px' }}>
				<Typography sx={{ color: '#ffffff', fontWeight: '700', marginBottom: "40px" }}>Ciudad Movil</Typography>
				<Box
					sx={{
						width: "100%",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center"
					}}
				>
					<Typography sx={{ color: '#ffffff', fontWeight: '100', fontSize: "30px" }}>REGISTRO</Typography>
					<form onSubmit={formik.handleSubmit} style={{ width: "80%" }}>
						<TextField
							margin="normal"
							variant="filled"
							InputProps={{
								sx: {
									"& .MuiInputBase-input": {
										backgroundColor: "#F4F5F9",
										borderRadius: "4px",
									},
								},
								disableUnderline: true,
							}}
							required
							fullWidth
							id="username"
							label="Nombre"
							name="username"
							autoFocus
							value={formik.values.username}
							onChange={formik.handleChange}
							error={formik.touched.username && Boolean(formik.errors.username)}
							helperText={formik.touched.username && formik.errors.username}
						/>
						<TextField
							margin="normal"
							variant="filled"
							InputProps={{
								sx: {
									"& .MuiInputBase-input": {
										backgroundColor: "#F4F5F9",
										borderRadius: "4px",
									},
								},
								disableUnderline: true,
							}}
							required
							fullWidth
							id="email"
							label="Email"
							name="email"
							autoComplete="email"
							autoFocus
							value={formik.values.email}
							onChange={formik.handleChange}
							error={formik.touched.email && Boolean(formik.errors.email)}
							helperText={formik.touched.email && formik.errors.email}
						/>
						<TextField
							margin="normal"
							variant="filled"
							sx={{
								marginBottom: '25px',
								"& .MuiInputBase-input": {
									backgroundColor: "#F4F5F9",
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
							InputProps={{
								disableUnderline: true,
								endAdornment: (
									<InputAdornment position="end" sx={{ ml: 0 }}>
										<IconButton
											onClick={handleClickShowPassword}
											edge="end"
											sx={{
												position: "absolute",
												p: 0,
												right: 30,
												top: "calc(50% - 12px)", // Center vertically
											}}
										>
											{showPassword ? <VisibilityOff color="#007668" /> : <Visibility color="#007668" />}
										</IconButton>
									</InputAdornment>
								),
							}}
							required
							fullWidth
							name="password"
							label="Contraseña"
							type={showPassword ? "text" : "password"}
							id="password"
							value={formik.values.password}
							onChange={formik.handleChange}
							error={formik.touched.password && Boolean(formik.errors.password)}
							helperText={formik.touched.password && formik.errors.password}
						/>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Tipo de usuario</InputLabel>
							<Select
								variant="filled"
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								name='rol'
								sx={{
									"& .MuiInputBase-input": {
										backgroundColor: "#F4F5F9",
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
								value={formik.values.rol}
								label="Tipo de usuario"
								onChange={formik.handleChange}
							>
								<MenuItem value={"client"}>Cliente</MenuItem>
								<MenuItem value={"driver"}>Chofer</MenuItem>
							</Select>
						</FormControl>

						<Button
							type="submit"
							//disabled={isLoading}
							//loading={isLoading}
							fullWidth
							variant="contained"
							primary
							sx={{
								mt: 5, mb: 5, borderRadius: "px", height: '50px', marginBottom: '40px', backgroundColor: "#AA8C4E", '&:hover': {
									backgroundColor: "#213740",
								},
							}}
						>
							Registro
						</Button>
					</form>
					<Snackbar
						open={open}
						autoHideDuration={5000}
						onClose={handleClose}
						message={!authError? "Inicio de sesion exitoso" : "Datos incorrectos"}
					/>
				</Box>
			</Grid>
			<Grid
				item
				xs={false}
				sm={4}
				md={6}
				sx={{
					backgroundImage: `url(${bg})`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "100% 100%",
					backgroundPosition: "center",
				}}
			/>
		</Grid>
	)
};

