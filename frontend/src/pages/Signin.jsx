import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
    const navigate = useNavigate();
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"} />
                    <SubHeading
                        label={"Enter your credentials to access your account"}
                    />
                    <InputBox
                        onChange={(e) => {
                            setusername(e.target.value);
                        }}
                        placeholder="karan@gmail.com"
                        label={"Email"}
                    />
                    <InputBox
                        onChange={(e) => {
                            setpassword(e.target.value);
                        }}
                        placeholder="123456"
                        label={"Password"}
                    />
                    <div className="pt-4">
                        <Button
                            onClick={() => {
                              axios.post('http://localhost:3000/api/v1/user/signin', {
                                username,
                                password
                              })
                              .then(function (response) {
                                localStorage.setItem("token" , response.data.token);
                                navigate('/')
                              })
                              .catch(function (error) {
                                console.log(error);
                              });
                            }}
                            label={"Sign in"}
                        />
                    </div>
                    <BottomWarning
                        label={"Don't have an account?"}
                        buttonText={"Sign up"}
                        to={"/signup"}
                    />
                </div>
            </div>
        </div>
    );
};

export default Signin;
