import * as React from 'react';
import { MessageContextType, IMessage, IDirect } from '../model/message';

export const MessageContext = React.createContext<MessageContextType | null>(null);

interface Props {
    children: React.ReactNode;
}

const MessageProvider: React.FC<Props> = ({ children }) => {

    const [messages, setMessages] = React.useState<IMessage[]>([]);
    const [direct, setDirect] = React.useState<IDirect>();

    const saveDirect = (who: IDirect) => {
        if (who.destination != who.origin) {
            const newDirect: IDirect = {
                origin: who.origin,
                destination: who.destination
            };
            setDirect(newDirect);
        }
    };

    const saveMessage = (msg: IMessage) => {
        const newMsg: IMessage = {
            text: msg.text,
            name: msg.name,
            socketID: msg.socketID,
            id: msg.id,
            created_dt: msg.created_dt
        };
        setMessages([...messages, newMsg]);
    };

    return (
        <MessageContext.Provider value={{ messages, direct, saveMessage, saveDirect }}>
            {children}
        </MessageContext.Provider>
    )
};

export default MessageProvider;

