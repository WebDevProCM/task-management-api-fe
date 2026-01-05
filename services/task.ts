import { Task, UpdateTask } from "@/types/task";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const fetchTasks = async () => {
  const res = await fetch(`${API_URL}/tasks`, { cache: "no-store" });
  return res.json();
};
export const fetchTask = async (id:string) => {
  const res = await fetch(`${API_URL}/tasks/${id}`, { cache: "no-store" });
  return res.json();
};

export const createTask = async (data: Task) => {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
export const updateTask = async (data: UpdateTask, id:string) => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
export const deleteTask = async (id:string) => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  });
  return res.json();
};
