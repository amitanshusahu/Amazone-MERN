'use client'

import styled from 'styled-components'
import Image from 'next/image';
import { Input, ConfigProvider, Typography, Button } from 'antd'
const  { Link } = Typography;
import { UserOutlined, MailOutlined} from '@ant-design/icons';
import theme from 'ui/AntdTheme';
import logo from '../webship.png';

export default function Login() {
	return (
		<ConfigProvider theme={theme}>
			<StyledDiv>
			<div className="form-wrapper">
				<Image src={logo} alt='logo'/>
				<Input placeholder='Username' prefix={<UserOutlined />} required={true} />
				<Input type='email' placeholder='Email' prefix={<MailOutlined />} required={true}/>
				<Input.Password placeholder='Password' required={true}/>
				<Button type='primary' block size='large' > Login to Amazone </Button>
				<Link href='/signup'> Already have an account? </Link>
			</div>
		</StyledDiv>
		</ConfigProvider>
	)
}

const StyledDiv = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1267%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='url(%26quot%3b%23SvgjsLinearGradient1268%26quot%3b)'%3e%3c/rect%3e%3cpath d='M1130.35%2c393.808C1152.698%2c395.417%2c1175.684%2c387.289%2c1187.67%2c368.359C1200.444%2c348.185%2c1201.062%2c322.007%2c1188.775%2c301.533C1176.809%2c281.594%2c1153.587%2c271.946%2c1130.35%2c272.843C1108.649%2c273.681%2c1089.052%2c286.383%2c1079.248%2c305.761C1070.274%2c323.498%2c1075.762%2c343.828%2c1085.74%2c361.02C1095.669%2c378.127%2c1110.622%2c392.388%2c1130.35%2c393.808' fill='rgba(49%2c 148%2c 255%2c 0.48)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M898.983%2c318.608C957.168%2c320.733%2c1013.384%2c291.906%2c1042.575%2c241.528C1071.84%2c191.022%2c1069.093%2c127.779%2c1038.284%2c78.2C1009.075%2c31.195%2c954.23%2c7.222%2c898.983%2c10.452C848.878%2c13.381%2c810.214%2c49.419%2c785.298%2c92.989C760.598%2c136.18%2c750.089%2c187.23%2c772.478%2c231.663C797.156%2c280.638%2c844.179%2c316.606%2c898.983%2c318.608' fill='rgba(49%2c 148%2c 255%2c 0.48)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M1253.796978614254 51.16831447734311L1181.4141150629798-11.753148852940974 1118.4926517326958 60.62971469833305 1190.87551528397 123.55117802861713z' fill='rgba(49%2c 148%2c 255%2c 0.48)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M337.22 372.43 a118.32 118.32 0 1 0 236.64 0 a118.32 118.32 0 1 0 -236.64 0z' fill='rgba(49%2c 148%2c 255%2c 0.48)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M468.3%2c636.451C504.618%2c637.879%2c539.796%2c617.526%2c556.086%2c585.035C571.075%2c555.138%2c556.692%2c521.933%2c540.344%2c492.757C523.469%2c462.641%2c502.817%2c428.87%2c468.3%2c428.367C433.272%2c427.857%2c408.442%2c459.396%2c392.528%2c490.605C378.251%2c518.604%2c377.217%2c550.683%2c391.707%2c578.573C407.519%2c609.009%2c434.028%2c635.104%2c468.3%2c636.451' fill='rgba(49%2c 148%2c 255%2c 0.48)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M379.4546684566066 389.76169327209107L405.71010795157383 276.03689053091307 291.98530521039584 249.7814510359458 265.72986571542856 363.5062537771238z' fill='rgba(49%2c 148%2c 255%2c 0.48)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M789.652%2c548.765C830.13%2c549.02%2c865.908%2c523.676%2c885.413%2c488.206C904.213%2c454.019%2c902.121%2c413.032%2c882.992%2c379.028C863.455%2c344.299%2c829.499%2c318.023%2c789.652%2c317.979C749.738%2c317.935%2c715.3%2c343.91%2c695.95%2c378.82C677.211%2c412.628%2c677.294%2c453.163%2c695.957%2c487.013C715.314%2c522.12%2c749.563%2c548.513%2c789.652%2c548.765' fill='rgba(49%2c 148%2c 255%2c 0.48)' class='triangle-float1'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1267'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='15.28%25' y1='-39.29%25' x2='84.72%25' y2='139.29%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1268'%3e%3cstop stop-color='rgba(62%2c 157%2c 255%2c 1)' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(171%2c 208%2c 255%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3cstyle%3e %40keyframes float1 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-10px%2c 0)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float1 %7b animation: float1 5s infinite%3b %7d %40keyframes float2 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-5px%2c -5px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float2 %7b animation: float2 4s infinite%3b %7d %40keyframes float3 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(0%2c -10px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float3 %7b animation: float3 6s infinite%3b %7d %3c/style%3e%3c/defs%3e%3c/svg%3e");
	background-size: cover;

	.form-wrapper{
		width: 350px;
		padding: 30px;
		display: flex;
		gap: 15px;
		flex-direction: column;
		align-items: center;
		border-radius: 10px;
		background-color: white;

		input{
			font-size: 13px !important;
			font-weight: bold !important;
			padding: 10px !important;
		}

		img{
			width: auto;
			height: 50px;
			margin-bottom: 15px;
		}
	}
`