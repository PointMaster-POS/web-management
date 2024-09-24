import React, { createContext, useState, useContext, useEffect } from "react";


// Create the MenuContext
const MenuContext = createContext();


// Custom hook to access MenuContext values
export const useMenu = () => {
  return useContext(MenuContext);
};

//get access token from local strogae and decode it then log to the console
const accessToken = localStorage.getItem("accessToken");

//decode the access token using json decode
const decodedToken = accessToken ? JSON.parse(atob(accessToken.split(".")[1])) : null;

console.log("decodedToken", decodedToken);


// Provide MenuContext to children components
export const MenuProvider = ({ children }) => {
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const [role, setRole] = useState("");

useEffect(() => {
   
  if (decodedToken.owner) {
    setRole("owner");
  } else {
    setRole("employee");
  }
}
, [decodedToken]);



useEffect(() => {
    console.log("MenuProvider: selectedMenu", selectedMenu);
    }, [selectedMenu]);

  return (
    <MenuContext.Provider value={{ selectedMenu, setSelectedMenu, role, setRole }}>
      {children}
    </MenuContext.Provider>
  );
};