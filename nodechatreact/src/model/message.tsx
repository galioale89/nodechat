export interface IMessage {
    text: string;
    nickname: string;
    created_dt: Date;
};

export type MessageContextType = {
    messages: IMessage[];
    saveMessage: (msg: IMessage) => void;
};