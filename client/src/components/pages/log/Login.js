import React from "react";
import Form from "react-bootstrap/Form";

const Login = () => {
  return (
    <div className=" h-screen w-2/4 flex justify-center items-center">
      <div className=" w-full h-full relative">
        <div className=" h-2/6 w-2/6 absolute bottom-2/4 left-2/4 bg-rosa rounded-full"></div>
        <div className=" h-2/6 w-2/6 absolute top-2/4 right-3/4 bg-azulgris rounded-full"></div>
        <div className=" h-2/6 w-2/6 absolute bottom-3/4 right-1/4 bg-azulgrisclaro rounded-full"></div>
      </div>
      <div className=" flex-col p-7 fixed">
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
              className=" font-medium h-14"
              type="email"
              placeholder="Your email"
            />
          </Form.Group>
          <Form.Group className=" mt-5">
            <Form.Label className=" text-2xl font-medium text-black">
              Password
            </Form.Label>
            <Form.Control
              className="  font-medium h-14"
              type="password"
              placeholder="Your password"
            />
          </Form.Group>
          <div className="flex justify-center items-center ">
            <button className=" mt-20 text-center bg-azulgrisclaro hover:bg-azulgris text-2xl font-medium text-white px-5 py-1 rounded-full">
              Button
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
