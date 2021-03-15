export interface Task {
    _id: string;
    owner: string;
    name: string;
    expired: boolean;
    created_at: Date;
    updated_at: Date;

}
