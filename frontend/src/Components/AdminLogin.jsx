import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData, updateUserData } from "../store";
//import "./AdminLogin.css";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const user = getUserData();

    useEffect(() => {
        if (user.isAuthenticated && user.isAdmin) {
            navigate("/admin");
        }
    }, []);

    const handleLogin = () => {
        fetch("http://localhost:3001/auth/admin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                updateUserData(data.userData);
                if (data && data.message == "Login successful") {
                    navigate("/admin");
                } else {
                    setErrorMessage("Invalid Email or Password");
                }
            });
    };

    return (
        <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-dark">
            <div className="col-md-6">

                  <div className="card">
                    <div className="card-header">
                    <h2 className="text-center">Admin Login</h2>
                    </div>
                    <div className="card-body">

                    <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            value={email} required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password} required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleLogin}
                        className="btn btn-info w-100"
                    >
                        Login
                    </button>
                </form>
                    </div>

                  </div>

                {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                )}
            </div>
        </div>
    );
};

export default AdminLogin;
