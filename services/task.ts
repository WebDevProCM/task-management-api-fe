import { getToken } from "@/lib/auth";
import { Task } from "@/types/task";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

// Centralized fetch wrapper
async function apiFetch(url: string, options: RequestInit = {}) {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${API_URL}${url}`, { ...options, headers });

  if (res.status === 401) {
    // token expired or unauthorized
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken"); // clear token
      window.location.href = "/login"; // redirect
    }
    throw new Error("Session expired");
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Request failed");
  }

  return res.json();
}

// task API functions
export const fetchTasks = (page: number, limit: number) =>
  apiFetch(`/api/tasks?page=${page}&limit=${limit}`, { cache: "no-store" });

export const fetchTask = (id: string) =>
  apiFetch(`/api/tasks/${id}`, { cache: "no-store" });

export const createTask = (data: Task) =>
  apiFetch(`/api/tasks`, { method: "POST", body: JSON.stringify(data) });

export const updateTask = (id: string, data: Task) =>
  apiFetch(`/api/tasks/${id}`, { method: "PUT", body: JSON.stringify(data) });

export const deleteTask = (id: string) =>
  apiFetch(`/api/tasks/${id}`, { method: "DELETE" });
