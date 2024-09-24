import React, { createContext, useState, useContext, useEffect } from "react";

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


useEffect(() => {
    console.log("MenuProvider: selectedMenu", selectedMenu);
    }, [selectedMenu]);

  return (
    <MenuContext.Provider value={{ selectedMenu, setSelectedMenu, role, setRole }}>
      {children}
    </MenuContext.Provider>
  );
};