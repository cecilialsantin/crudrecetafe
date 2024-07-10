/*import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import configurl from '../../configurl';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${configurl.apiUrl}/auth/me`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('token');
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${configurl.apiUrl}/auth/login`, { username, password });
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      setUser(response.data.user);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const register = async (username, password) => {
    try {
      await axios.post(`${configurl.apiUrl}/auth/register`, { username, password });
      await login(username, password);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);*/ 

import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import configurl from '../../configurl';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${configurl.apiUrl}/auth/me`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${configurl.apiUrl}/auth/login`, { username, password });
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      setUser(response.data.user);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const register = async (username, password) => {
    try {
      await axios.post(`${configurl.apiUrl}/auth/register`, { username, password });
      await login(username, password);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

