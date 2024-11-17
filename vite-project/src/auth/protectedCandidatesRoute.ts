import React from "react";
import { useNavigate } from "react-router-dom";
import { getisExpiredFromToken } from "./decodedToken";


interface ProtectedRouteProps {
    
    children: React.ReactNode;
}


const ProtectedRoute: React.FC<ProtectedRouteProps> = ( {children }) => {
    const navigate = useNavigate();
    
    const isAthenticated = getisExpiredFromToken(localStorage.getItem('token')!);
    
    if (!isAthenticated) {
        navigate("/login");
        alert("You must be logged in to access this page.");
        return;
        
    }

    return children;
};

export default ProtectedRoute;
