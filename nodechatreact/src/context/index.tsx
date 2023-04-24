import * as React from 'react';
import { MessageContextType, IMessage } from '../model/message';

export const MessageContext = React.createContext<MessageContextType | null>(null);

interface Props {
    children: React.ReactNode;
}

const MessageProvider: React.FC<Props> = ({children}) => {
    const [messages, setMessages] = React.useState<IMessage[]>([
        {
            nickname: "",
            text: "Aguardando primeira mensagem",
            created_dt: new Date()
        }
    ]);

    const saveMessage = (msg: IMessage) => {
        const newMsg: IMessage = {
            text: msg.text,
            nickname: msg.nickname,
            created_dt: msg.created_dt
        };
        setMessages([...messages, newMsg]);
    };

    return (
        <MessageContext.Provider value={{messages, saveMessage}}>
            {children}
        </MessageContext.Provider>
    )
};

export default MessageProvider;

