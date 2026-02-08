import client from "./client";

export const csrf = () => client.get("/sanctum/csrf-cookie");

export const registerApi = (data) => client.post("/api/register", data);

export const loginApi = (data) => client.post("/api/login", data);

export const logoutApi = () => client.post("/api/logout");

export const meApi = () => client.get("/api/me");
