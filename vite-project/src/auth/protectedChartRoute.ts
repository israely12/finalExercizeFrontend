import React from "react";
import { useNavigate } from "react-router-dom";
import { getisAdminFromToken } from "./decodedToken";

interface ProtectedRouteProps {
    
    children: React.ReactNode;
}


const ProtectedAdminRoute: React.FC<ProtectedRouteProps> = ( {children }) => {
    const navigate = useNavigate();
    
    const isAdmin = getisAdminFromToken(localStorage.getItem('token')!);
    
    if (!isAdmin) {
        navigate("/login");
        alert("You must be an admin to access this page.");
        return;
        
    }

    return children;
};

export default ProtectedAdminRoute;
