"use server";
import { cookies } from "next/headers";
import axios from "./axios";

export const login = async (
  state: { status: string; message: string; token?: string },
  formData: FormData
) => {
  try {
    const cookieStore = await cookies();
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    const res = await axios.post("/auth/login", data);
    const token = res.data.access_token;

    cookieStore.set("access_token", token, {
      expires: new Date(Date.now() + 60 * 60 * 1000 * 24 * 30),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return {
      status: "success",
      message: res.data.message || "Login successful!",
      token,
    };
  } catch (error: any) {
    return {
      status: "error",
      message: error.response?.data?.message || "Login failed!",
    };
  }
};

export const register = async (
  state: { status: string; message: string; token?: string },
  formData: FormData
) => {
  try {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirm_password: formData.get("confirm_password") as string,
    };
    const res = await axios.post("/auth/register", data);

    return {
      status: "success",
      message: res.data.message || "Registration successful!",
    };
  } catch (error: any) {
    return {
      status: "error",
      message: error.response?.data?.message || "Login failed!",
    };
  }
};

export const logout = async () => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    return {
      status: "success",
      message: "Logout successful!",
    };
  } catch (error) {
    console.error("Logout error:", error);
  }
};
