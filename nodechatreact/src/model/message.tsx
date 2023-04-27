export interface IMessage {
    text: string;
    name: string;
    id: string;
    created_dt: string;
    socketID: string;
};

export interface IDirect {
    origin: string;
    destination: string;
};

export type MessageContextType = {
    messages: IMessage[];
    direct?: IDirect;
    saveMessage: (message: IMessage) => void;
    saveDirect: (message: IDirect) => void;
};

export class Message {
    static message(msg: IMessage) {
        return {
            text: msg.text,
            name: msg.name,
            id: msg.id,
            created_dt: msg.created_dt,
            socketID: msg.socketID
        }
    }
};

export class Direct {
    static message(who: IDirect) {
        return {
            origin: who.origin,
            destination: who.destination
        }
    }
}
