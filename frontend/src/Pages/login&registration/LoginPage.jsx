import React, { useState } from "react";
import * as Components from "./Component";
import "./LoginPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { updateUserData, getUserData } from "../../store";

const LoginPage = () => {
    const user = getUserData();
    const [signIn, toggle] = React.useState(true);

    // Form fields state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");

    // Validation states
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [addressError, setAddressError] = useState("");

    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phoneNumber);
    };

    const handleLogOut = async () => {
        try {
            const result = await fetch("http://localhost:3001/auth/logout", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const response = await result.json();
            alert(response.message);
            updateUserData({
                isAuthenticated: false,
                isAdmin: false,
                name: "",
                email: "",
                userId: "",
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!name || !email || !password || !phoneNumber || !address) {
            alert("All fields are required");
            return;
        }

        if (name.length < 3) {
            setNameError("Name must be at least 3 characters");
            return;
        } else {
            setNameError("");
        }

        if (!validateEmail(email)) {
            setEmailError("Enter a valid email address");
            return;
        } else {
            setEmailError("");
        }

        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters");
            return;
        } else {
            setPasswordError("");
        }

        if (!validatePhoneNumber(phoneNumber)) {
            setPhoneNumberError("Enter a valid phone number (10 digits)");
            return;
        } else {
            setPhoneNumberError("");
        }

        try {
            const response = await axios.post(
                "http://localhost:3001/customer",
                {
                    name,
                    email,
                    password,
                    phoneNumber,
                    address,
                }
            );
            alert(response.data.message);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!email || !password) {
            alert("Email and password are required");
            return;
        }

        // Email validation
        if (!validateEmail(email)) {
            setEmailError("Enter a valid email address");
            return;
        } else {
            setEmailError("");
        }

        // Password validation
        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters");
            return;
        } else {
            setPasswordError("");
        }

        try {
            const result = await fetch("http://localhost:3001/auth/customer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });
            const response = await result.json();
            alert(response.message);
            updateUserData(response.userData);
            if (response.message === "Login successful") {
                navigate("/");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="outerContainer">
            {!user.isAuthenticated && (
                <Components.Container>
                    <Components.SignUpContainer signinIn={signIn}>
                        <Components.Form onSubmit={handleSignUp}>
                            <Components.Title>Create Account</Components.Title>
                            <Components.Input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setNameError("");
                                }}
                            />
                            {nameError && (
                                <span className="error">{nameError}</span>
                            )}
                            <Components.Input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setEmailError("");
                                }}
                            />
                            {emailError && (
                                <span className="error">{emailError}</span>
                            )}
                            <Components.Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordError("");
                                }}
                            />
                            {passwordError && (
                                <span className="error">{passwordError}</span>
                            )}
                            <Components.Input
                                type="text"
                                placeholder="Phone number"
                                value={phoneNumber}
                                onChange={(e) => {
                                    setPhoneNumber(e.target.value);
                                    setPhoneNumberError("");
                                }}
                            />
                            {phoneNumberError && (
                                <span className="error">
                                    {phoneNumberError}
                                </span>
                            )}
                            <Components.Input
                                type="text"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => {
                                    setAddress(e.target.value);
                                    setAddressError("");
                                }}
                            />
                            {addressError && (
                                <span className="error">{addressError}</span>
                            )}
                            <Components.Button type="submit">
                                Sign Up
                            </Components.Button>
                        </Components.Form>
                    </Components.SignUpContainer>

                    <Components.SignInContainer signinIn={signIn}>
                        <Components.Form onSubmit={handleSignIn}>
                            <Components.Title>Sign in</Components.Title>
                            <Components.Input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setEmailError("");
                                }}
                            />
                            {emailError && (
                                <span className="error">{emailError}</span>
                            )}
                            <Components.Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordError("");
                                }}
                            />
                            {passwordError && (
                                <span className="error">{passwordError}</span>
                            )}
                            <Components.Anchor href="#">
                                Forgot your password?
                            </Components.Anchor>
                            <Components.Button type="submit">
                                Log In
                            </Components.Button>
                            <p className="admin-login-link">Are you an <a href="/auth/admin">Admin</a>?</p>
                        </Components.Form>
                    </Components.SignInContainer>

                    <Components.OverlayContainer signinIn={signIn}>
                        <Components.Overlay signinIn={signIn}>
                            <Components.LeftOverlayPanel signinIn={signIn}>
                                <Components.Title>
                                    Welcome Back!
                                </Components.Title>
                                <Components.Paragraph>
                                    To keep connected with us, please login with
                                    your personal info
                                </Components.Paragraph>
                                <Components.GhostButton
                                    onClick={() => toggle(true)}
                                >
                                    LogIn
                                </Components.GhostButton>
                            </Components.LeftOverlayPanel>

                            <Components.RightOverlayPanel signinIn={signIn}>
                                <Components.Title>
                                    Hello, Friend!
                                </Components.Title>
                                <Components.Paragraph>
                                    Enter Your personal details and start the
                                    journey with us
                                </Components.Paragraph>
                                <Components.GhostButton
                                    onClick={() => toggle(false)}
                                >
                                    Sign Up
                                </Components.GhostButton>
                            </Components.RightOverlayPanel>
                        </Components.Overlay>
                    </Components.OverlayContainer>
                </Components.Container>
            )}
            {user.isAuthenticated && (
                <div>
                    <h1>Hello {user.name}</h1>
                    <button onClick={handleLogOut}>Log Out</button>
                </div>
            )}
        </div>
    );
};

export default LoginPage;
