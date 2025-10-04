"use client";

import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type User = {
  id: number;
  email: string;
};

export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
    fetch("http://localhost:5000/me", { credentials: "include" })
        .then(res => res.json())
        .then(data => {
            if (!data.loggedIn) navigate("/");
            else setUser(data.user);
        });
    }, [navigate]);

    const handleLogout = async () => {
        await fetch("http://localhost:5000/logout", {
            method: "POST",
            credentials: "include",
        });
        setUser(null);
        navigate("/");
    };

    if (!user) {
        return <h2>Loading...</h2>;
    }

    return(
        <Box sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h3" component="h3">
                Welcome!
            </Typography>
            <Button variant="contained" color="primary" onClick={handleLogout}>
                Logout
            </Button>
        </Box>
    );
}