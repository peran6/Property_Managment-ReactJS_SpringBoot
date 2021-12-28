import { createContext } from "react";

export const UserContext = createContext({
    username: '',
    setUsername: () => {},
    password: '',
    setPassword: () => {},
    email: '',
    setEmail: () => {},
    userId: '',
    setUserId: () => {},
    user: '',
    setUser: () => {},

    status: '',
    setStatus: () => {},

    price: '',
    setPrice: () => {},
    location: '',
    setLocation: () => {},
    square_meter: '',
    setSquare_meter: () => {},
    sale_rent: '',
    setSale_rent: () => {},

    refresh: '',
    setRefresh: () => {},
  });