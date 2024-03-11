import { ReactNode } from "react";
import { Box as MuiBox, styled } from "@mui/material";


const CustomBox = styled(MuiBox)(({ theme }) => () => ({
	width: "100%",
	height: "55px",
	background: `linear-gradient(to bottom, #213740, #007668)`,
	borderRadius: "5px",
	padding: "15px 0px 10px 20px",
	marginBottom: "10px",
	cursor: "default",
	display:"flex",
	gap: '10px',
	position:"relative",
	boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
}));



const HeaderInfo = (props) => {
	return (
		<CustomBox>
			{props.children}
		</CustomBox>
	);
};

export default HeaderInfo;
