import client from "../providers/client";

export const login = (data) => client.post("/login", data);

export const signup = (data) => client.post("/signup", data)

export const updateProfile = (id, data) => client.patch(`/users/${id}`, data)

export const createPetwitte = (data) => client.post("/twitte", data)

export const deletePetwitte = (id) => client.delete(`/twitte/${id}`)

export const getFromStorage = (key) => JSON.parse(localStorage.getItem(key));

export const setInStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));
