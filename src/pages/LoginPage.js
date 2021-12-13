import { Form, Input, Button, Checkbox } from "antd";
import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router";
import { useGlobalContext } from "../config/context";
import "../styles/Login.css";

const LoginPage = () => {
    const { login } = useGlobalContext()
    const [isLogin, setIsLogin] = useState(false)
    const [error, setError] = useState("")

	const onFinish = (values) => {
		async function fetchToken() {
			const res = await axios.post(
				"https://dev.bein.az/login/send.php",
				values
			);
			if (res.data.Headers.ResponseStatus === "0") {
				localStorage.setItem("Token", res.data.Body.Token);
                login(true)
				setIsLogin(true);
			} else setError(res.data.Body);
		}
		fetchToken();
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};
	if (isLogin) {
		return <Navigate to="/" />;
	}

	return (
		<div className="container-form">
			<Form
				className="login-form"
				name="basic"
				labelCol={{
					span: 8,
				}}
				wrapperCol={{
					span: 16,
				}}
				initialValues={{
					remember: true,
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					label="Username"
					name="Login"
					rules={[
						{
							required: true,
							message: "Please input your login!",
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Password"
					name="Password"
					rules={[
						{
							required: true,
							message: "Please input your password!",
						},
					]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					name="remember"
					valuePropName="checked"
					wrapperCol={{}}
				>
					<Checkbox>Remember me</Checkbox>
				</Form.Item>

				<Form.Item wrapperCol={{}}>
					<Button
						className="submit-button"
						type="primary"
						htmlType="submit"
					>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default LoginPage;
