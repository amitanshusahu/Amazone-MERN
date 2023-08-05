'use client'

import styled from 'styled-components'
import Image from 'next/image';
import { Input, ConfigProvider, Typography, Button, message } from 'antd'
const { Link } = Typography;
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import theme from 'ui/AntdTheme';
import logo from '../public/logo.png';
import { useEffect, useRef, useState } from 'react';
import Fetch from 'fetch';
import { LoginParams } from 'types';
import { useRouter } from 'next/navigation';
import { loginurl } from 'config';

export default function Login() {

	const router = useRouter();
	const [input, setInput] = useState({
		username: '',
		email: '',
		password: '',
	});
	const [messageApi, contextHolder] = message.useMessage();

	useEffect(() => {
		if (localStorage.getItem('TOKEN')) {
			router.push('/')
		}
	},[]);

	const error = (content: string) => {
    messageApi.open({
      type: 'error',
      content: content,
    });
  };

	const handelInputChange = (e: { target: { name: string, value: string } }): void => {
		setInput({ ...input, [e.target.name]: e.target.value })
	}

	const handelSubmit = async (): Promise<void> => {
		const { username, password } = input;
		const payload: LoginParams = {
			username,
			password,
		};
		const api = new Fetch(payload, loginurl);

		const res = await api.postJson();
		if (res.status) {
			localStorage.setItem('TOKEN', res.token);
			router.push('./');
		}
		else error(res.msg);

	}

	return (
		<ConfigProvider theme={theme}>
			{contextHolder}
			<StyledDiv>
				<div className="form-wrapper">
					<Image src={logo} alt='logo' />
					<Input
						placeholder='Username'
						name='username'
						prefix={<UserOutlined />}
						required={true}
						onChange={handelInputChange}
						allowClear
					/>
					<Input
						type='email'
						placeholder='Email'
						name='email'
						prefix={<MailOutlined />}
						required={true}
						onChange={handelInputChange}
						allowClear
					/>
					<Input.Password
						placeholder='Password'
						name='password'
						required={true}
						onChange={handelInputChange}
					/>
					<Button
						type='primary'
						block size='large'
						onClick={handelSubmit}
					>
						Login to webship
					</Button>
					<Link href='/signup'> Don't have an account? </Link>
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
	background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1193%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='url(%26quot%3b%23SvgjsLinearGradient1194%26quot%3b)'%3e%3c/rect%3e%3cpath d='M854.496%2c199.651C899.605%2c199.346%2c945.528%2c180.594%2c965.991%2c140.392C985.109%2c102.833%2c967.095%2c59.565%2c943.613%2c24.568C923.238%2c-5.798%2c891.061%2c-25.314%2c854.496%2c-25.78C817.061%2c-26.257%2c782.422%2c-8.704%2c761.357%2c22.246C736.933%2c58.131%2c720.179%2c103.484%2c740.357%2c141.917C761.599%2c182.377%2c808.8%2c199.96%2c854.496%2c199.651' fill='rgba(49%2c 148%2c 255%2c 0.48)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M1480.851%2c336.996C1528.779%2c340.967%2c1579.977%2c325.208%2c1604.53%2c283.856C1629.488%2c241.823%2c1619.559%2c188.765%2c1593.376%2c147.484C1569.096%2c109.205%2c1526.12%2c86.517%2c1480.851%2c88.863C1439.183%2c91.023%2c1406.206%2c121.217%2c1386.865%2c158.187C1369.02%2c192.298%2c1370.305%2c231.857%2c1388.216%2c265.933C1407.623%2c302.855%2c1439.281%2c333.552%2c1480.851%2c336.996' fill='rgba(49%2c 148%2c 255%2c 0.48)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M1231.87 219.54 a164.99 164.99 0 1 0 329.98 0 a164.99 164.99 0 1 0 -329.98 0z' fill='rgba(49%2c 148%2c 255%2c 0.48)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M599.469%2c695.899C641.12%2c695.777%2c669.607%2c656.962%2c687.331%2c619.27C702.283%2c587.473%2c697.435%2c552.486%2c681.674%2c521.082C663.637%2c485.143%2c639.663%2c445.385%2c599.469%2c444.202C558.068%2c442.983%2c527.114%2c479.016%2c508.429%2c515.981C491.694%2c549.087%2c493.965%2c586.687%2c510.713%2c619.786C529.573%2c657.058%2c557.697%2c696.021%2c599.469%2c695.899' fill='rgba(49%2c 148%2c 255%2c 0.48)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M1060.83 337.54 a94.8 94.8 0 1 0 189.6 0 a94.8 94.8 0 1 0 -189.6 0z' fill='rgba(49%2c 148%2c 255%2c 0.48)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M415.71648910626647 106.90169358534213L379.42062049389097 233.48043003589243 505.9993569444413 269.776298648268 542.2952255568168 143.19756219771764z' fill='rgba(49%2c 148%2c 255%2c 0.48)' class='triangle-float1'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1193'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='15.28%25' y1='-39.29%25' x2='84.72%25' y2='139.29%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1194'%3e%3cstop stop-color='rgba(62%2c 157%2c 255%2c 1)' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(171%2c 208%2c 255%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3cstyle%3e %40keyframes float1 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-10px%2c 0)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float1 %7b animation: float1 5s infinite%3b %7d %40keyframes float2 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-5px%2c -5px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float2 %7b animation: float2 4s infinite%3b %7d %40keyframes float3 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(0%2c -10px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float3 %7b animation: float3 6s infinite%3b %7d %3c/style%3e%3c/defs%3e%3c/svg%3e");
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

		input {
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