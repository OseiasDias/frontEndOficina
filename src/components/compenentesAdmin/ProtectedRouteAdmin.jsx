import { Navigate } from 'react-router-dom';


// eslint-disable-next-line react/prop-types
const ProtectedRouteAdmin = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem("authToken");
    const role = localStorage.getItem("role");
  
    return isAuthenticated && role === "admin" ? children : <Navigate to="/acessoAdministrador" />;
  };
  
  export default ProtectedRouteAdmin;
  