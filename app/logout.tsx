

import React, { useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';

const LogoutScreen = ({ setIsLoggedIn, setUserRole }: any) => {

    useEffect(() => {
        handleLogout();
    }, []);
    
  const handleLogout = () => {
   
    setUserRole(null);
    setIsLoggedIn(false); 
  };

  return null;
};

export default LogoutScreen;
