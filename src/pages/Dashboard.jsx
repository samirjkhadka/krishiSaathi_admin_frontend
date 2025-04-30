import React from "react";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../utils/auth";

const Dashboard = () => {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<LogoutIcon />}
        onClick={logout}
      >
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;
