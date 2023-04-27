export interface IUser {
    userName:string;
    socketID: string;
}

export type UserContextType = {
    users: IUser[];
};