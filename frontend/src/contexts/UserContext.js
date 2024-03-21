import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    getCustomerInfo();
  }, []);

  const getCustomerInfo = async () => {

    try {

      const response = await fetch("http://localhost:3001/customer/info", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if(response.ok){

        // logged In user id
        const data = await response.json();
        console.log(data);
        setUserId(data.id);

      }

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <UserContext.Provider value={userId}>
      {children}
    </UserContext.Provider>
  );
};
