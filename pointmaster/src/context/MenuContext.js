import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useNavigation

// Create the MenuContext
const MenuContext = createContext();

// Custom hook to access MenuContext values
export const useMenu = () => {
  return useContext(MenuContext);
};

// Provide MenuContext to children components
export const MenuProvider = ({ children }) => {
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const [role, setRole] = useState("");
  const [branchID, setBranchID] = useState(null);
  const { isAuthenticated } = useAuth();
  const [onAddingBranch, setOnAddingBranch] = useState(false);
  const navigate = useNavigate(); // Updated useNavigate hook here

  const [decodedToken, setDecodedToken] = useState({});

  useEffect(() => {
    if (Object.keys(decodedToken).length === 0) {
      decodeToken();
    }
    console.log("decodedToken", decodedToken);

    if (decodedToken.owner) {
      setRole("owner");
      navigate("/dashboard");
    } else if (decodedToken.employee?.employee_role === "branchmanager") {
      setRole("branchmanager");
      navigate("/dashboard");
    } else if (decodedToken.employee?.employee_role === "Cashier") {
      // Redirect to the cashiers domain
      console.log("Redirect to the cashiers domain");
      const accessToken = localStorage.getItem("accessToken");
      const cashierUrl = `http://localhost:3002/?token=${accessToken}`;
      window.open(cashierUrl, '_blank');
      navigate("/cashier-login-success");
    }
  }, [decodedToken]);

  const decodeToken = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return;
    }
    const decodedToken = JSON.parse(atob(accessToken.split(".")[1]));
    setDecodedToken(decodedToken);
    console.log("decodedToken", decodedToken);
  };

  useEffect(() => {
    decodeToken();
  }, [isAuthenticated]);

  useEffect(() => {
    console.log("MenuProvider: selectedMenu", selectedMenu);
  }, [selectedMenu]);

  return (
    <MenuContext.Provider
      value={{
        branchID,
        setBranchID,
        selectedMenu,
        setSelectedMenu,
        role,
        setRole,
        onAddingBranch,
        setOnAddingBranch,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
