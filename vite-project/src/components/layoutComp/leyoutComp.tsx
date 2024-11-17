import React ,{ useState}  from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getisAdminFromToken } from "../../auth/decodedToken";
import "./leyoutComp.css";

interface MainLayoutProps {
    children: React.ReactNode;
}



const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean | null>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            setIsAdmin(getisAdminFromToken(token));
            setIsLoggedIn(true);

        }
        else {
            setIsLoggedIn(false);
            setIsAdmin(false);
            localStorage.removeItem('token');
        }
    }, [{children}]);
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setIsAdmin(false);
        navigate("/login");
    };

    return (
        <div className="main-layout">
            <nav className="navbar">
                <div className="navbar-links">
                    <Link to="/candidates">Vote for Candidates</Link>
                    <Link to="/about-candidates">About Candidates</Link>
                    {isAdmin && <Link to="/chart">Admin Dashboard</Link>}
                </div>
                <div className="navbar-auth">
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    ) : (
                        <Link to="/login" className="login-button">Login</Link>
                    )}
                </div>
            </nav>

            <main className="main-content">
                {children}
            </main>

            <footer className="footer">
                <p>   Welcome to the official voting site for fans of some of the most legendary heroes in fantasy literature! Here, you can cast your vote and join thousands of fans supporting the courage, wisdom, and strength of their favorite characters: Geralt of Rivia, the Witcher; Drizzt Do’Urden, the Dark Elf; and Wulfgar, the mighty Barbarian. Each character represents timeless values of power, loyalty, and bravery that resonate with every fan.

Whether you stand by Geralt's sharp mind and wit, Drizzt's nobility and inner struggles, or Wulfgar’s primal strength, every vote here is a testament to your loyalty. Join us on this journey to honor these unforgettable heroes and give your chosen character the support they deserve!
<br /><br/>© All rights reserved. </p>
            </footer>
        </div>
    );
};

export default MainLayout;
