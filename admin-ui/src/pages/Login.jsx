import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorMessage from "../utils/Messages/ErrorMessage";

function Login() {
  const API = import.meta.env.VITE_API_URL;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorObj, setErrorObj] = useState(null);
  const loginSubmit = async () => {
    try {
      const res = await axios.post(`${API}/auth/login`, {
        username,
        password,
      });

      const token = res.data.token;
      if (!token) { 
        return;
      }

      localStorage.setItem("access_token", token);
      navigate("/dashboard");
    } catch (error) {
      setErrorObj({
        key: Math.random(),
        text: error.response.data.message
      })

    }
  };

  return (
    <div className="bg-[#FBF7F2] flex items-center">
      <div className="h-screen w-1/2 object-contain flex items-center">
        <img
          className="select-none"
          draggable="false"
          src="/images/login_lineart.png"
          alt="loginimage"
        />
      </div>
      <div className="h-screen w-1/2 flex flex-col justify-center items-center">
        <div className="flex flex-col items-end mb-5 select-none">
          <h1 className="flex items-center text-3xl">
            <img
              src="/images/logo_bw.png"
              className="w-10 h-10 mr-2 select-none"
              alt=""
              draggable="false"
            />
            Zakob's Potfolio 
          </h1>
          <span className="text-sm text-gray-500">Control Panel</span>
        </div>
        <Form
          name="basic"
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          autoComplete="off"
          onFinish={loginSubmit}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              placeholder="Username"
              style={{ width: "350px" }}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Password"
              style={{ width: "350px" }}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Form.Item>

          <Form.Item label={null}>
            <Button className="my-btn active:scale-90" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>

      <ErrorMessage errMessage={errorObj} />
    </div>
  );
}

export default Login;
