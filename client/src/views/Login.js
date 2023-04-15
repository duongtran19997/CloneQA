//import SwaggerClient from 'swagger-client';
import React, { useEffect, useState } from "react";
import Form from "../components/LoginForm.js";
//import Spec from "../swaggerOriginal.json";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import { Button } from "@mui/material";
import RegisterForm from "../components/RegisterForm.js";

function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [openRegister, setOpenRegister] = useState(false)

    async function login(username, password) {
        const body = {
            "username": username,
            "password": password
        };
        let response = await fetch('/users/login', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        console.log('response', response);

        if (response.ok) { // if HTTP-status is 200-299
            // get the response body (the method explained below)
            let authResponse = await fetch('/users/auth', {
                method: 'POST',
                credentials: "include",
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': ''
                }
            });
            if (authResponse.ok) {
                let json = await response.json();
                console.log("json", json.data);
                sessionStorage.setItem('userData', JSON.stringify(json.data[0]));
                setData(json.data[0].user_nr);
            }
            else {
                console.log("HTTP-Error: " + authResponse.status );
            }
        } else {
            console.log("HTTP-Error: " + response.status );
        }
    }

    const handleOpenRegister =() =>{
        setOpenRegister(true)
    }

    useEffect(() => {
        console.log( "data", data);
        if (data) {
            navigate("/dashboard");
        }
    }, [data, navigate])

    return (
        <>
            <Form onSubmit={login}/>
            <br/>
            {/* TODO: Register and info when login failure*/}
            {/* <Link to={"../register"}>Register</Link> */}
            <Button onClick={handleOpenRegister}>Register</Button>
            {openRegister && <RegisterForm  openRegister={openRegister} setOpenRegister={setOpenRegister} />}
        </>
    )

}

export default Login;
