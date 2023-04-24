import React, { useContext } from 'react';
import { MessageContextType, IMessage } from '../model/message';
import { FormGroup, ListGroup } from 'react-bootstrap'
import { MessageContext } from '../context';

const MsgList: React.FC = () => {
    const { messages } = useContext(MessageContext) as MessageContextType;
    return (
            <ListGroup as='ul'>
                {messages.map((msg: IMessage) => (
                    <ListGroup key={msg.created_dt.toUTCString()} as="li">
                        <h6>{msg.nickname} - {msg.text} - {msg.created_dt.toUTCString()}</h6>
                    </ListGroup>
                ))}
            </ListGroup>
    );
}

export default MsgList;