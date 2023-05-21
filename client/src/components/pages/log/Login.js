import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { socket } from "../../../config/socket";
import Notification from "../../utils/messages/Notification";

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [response, setResponse] = useState("");
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onResponse(data) {
      const { response, message } = data;
      setResponse(response);
      setMessage(message);
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    }
    socket.on("Login response", (data) => onResponse(data));
    return () => {
      socket.off("Login response", (data) => onResponse(data));
    };
  }, [visible, response, message]);

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
    console.log(login);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = login;
    if (email !== "" || password !== "") {
      socket.emit("Login", {
        email: email,
        password: password,
      });
    } else {
      setResponse("Preventive");
      setMessage("Incomplete fields, please try again");
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    }
  };

  return (
    <div className=" h-screen w-2/4 flex justify-center items-center">
      <div className=" w-full h-full relative">
        <div className=" h-2/6 w-2/6 absolute bottom-2/4 left-2/4 bg-rosa rounded-full" />
        <div className=" h-2/6 w-2/6 absolute top-2/4 right-3/4 bg-azulgris rounded-full" />
        <div className=" h-2/6 w-2/6 absolute bottom-3/4 right-1/4 bg-azulgrisclaro rounded-full" />
      </div>

      <div className=" flex-col p-7 fixed">
        <Notification response={response} visible={visible} message={message} />
        <h1 className=" text-6xl font-bold text-black">Welcome Back!</h1>
        <h3 className=" text-2xl font-medium text-gray-400">
          Login your account
        </h3>
        <Form className="mt-16">
          <Form.Group className=" mt-5 text-xl">
            <Form.Label className=" text-2xl font-medium text-black">
              Email address
            </Form.Label>
            <Form.Control
              name="email"
              className=" font-medium h-14"
              type="email"
              placeholder="Your email"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className=" mt-5">
            <Form.Label className=" text-2xl font-medium text-black">
              Password
            </Form.Label>
            <Form.Control
              name="password"
              className="  font-medium h-14"
              type="password"
              placeholder="Your password"
              onChange={handleChange}
            />
          </Form.Group>
          <div className="flex justify-center items-center ">
            <button
              onClick={handleSubmit}
              className=" mt-20 text-center bg-azulgrisclaro hover:bg-azulgris text-2xl font-medium text-white px-5 py-1 rounded-full"
            >
              Button
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
