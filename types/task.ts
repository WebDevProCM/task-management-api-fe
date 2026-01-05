export interface Task {
    _id: string;
    title: string;
    description?: string;
    status: "pending" | "completed";
}

export interface UpdateTask {
    title: string;
    description?: string;
    status: "pending" | "completed";
}
