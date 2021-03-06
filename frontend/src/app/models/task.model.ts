export class Task {
    _id: string;
    owner: string;
    name: string;
    expired: boolean;
    created_at: Date;
    updated_at: Date;

    constructor( _id: string, owner: string,
                 name: string, expired: boolean,
                 created_at: Date, updated_at: Date) {
        this._id = _id;
        this.owner = owner;
        this.name = name;
        this.expired = expired;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    getName(): string {
        return this.name;
    }
    getExpired(): boolean {
        return this.expired;
    }
    
}
