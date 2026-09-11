export interface Ticket {
    id: number;
    subject: string;
    description: string;
    priority: "low" | "medium" | "high";
    status: "open" | "closed";
    createdAt: string;
}

// nest g interface tickets/ticket --flat(used flat to ignore folder)