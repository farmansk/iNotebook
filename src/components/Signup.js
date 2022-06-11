import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const SignUp = () => {

    const host = "http://localhost:5000"
    var wrongpassline;
    let navigate = useNavigate();

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // Save the authtoken and redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/");
        }
        else {
            alert("Sorry, an user with this email already exists");
        }

    }

    if ( credentials.password.toString() === credentials.cpassword.toString() ) {
        wrongpassline = "none"
    }
    else {
        wrongpassline = "flex"
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={onChange} minLength={5} required />
                    <div id="cpasswordHelp" className="form-text" style={{ color: "red", display:`${wrongpassline}` }}>Both passwords are not the same.</div>
                </div>
                <button disabled={credentials.password.length < 5 || credentials.cpassword.length < 5} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default SignUp