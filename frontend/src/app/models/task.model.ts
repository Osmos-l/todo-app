export interface Task {
    _id: string;
    name: string;
    owner: string;
    expired: boolean;
    created_at: Date;
    updated_at: Date;
}
