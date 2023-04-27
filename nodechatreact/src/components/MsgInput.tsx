import styles from '../../src/styles/styles.module.scss';
import { useState, useContext, useEffect, FormEvent, useRef, ChangeEvent } from 'react';
import { Form, Button, FloatingLabel, Row, Col } from 'react-bootstrap';
import { MessageContext } from '../context';
import { Socket } from 'socket.io-client';
import { Message, IDirect, IMessage, MessageContextType, Direct } from '../model/message';
import { FormControl } from 'react-bootstrap';

interface Props {
    socket: Socket;
};

const MsgInput: React.FC<Props> = props => {

    const [message, setMessage] = useState<string>("");
    const { saveMessage, direct } = useContext(MessageContext) as MessageContextType;

    const refNewMessage = useRef<HTMLInputElement>(null);
    useEffect(() => {
        const msg: HTMLInputElement = document.querySelector("#newMessage")!;
        if (typeof direct?.destination != "undefined") {
            msg.value = `@${direct?.destination} `;
        }
        msg.focus();
    });

    const handleSendMessage = (e: FormEvent) => {
        e.preventDefault();
        const newMessage: IMessage = Message.message({
            text: message,
            name: localStorage.getItem("userName")!,
            id: `${props.socket.id}${Math.random()}`,
            created_dt: new Date().toUTCString(),
            socketID: props.socket.id
        });
        if (message.trim() && localStorage.getItem("userName")) {
            props.socket.emit("message", newMessage);
        }

        saveMessage(newMessage);

        setMessage("");
    };

    return (
        <Form className={styles.input}>
            <FloatingLabel className={styles.messageBox} label="Digite sua mensagem">
                <Form.Control aria-describedby='inputGroup-sizing-sm' ref={refNewMessage} id="newMessage" className="mb-3" onChange={e => setMessage(e.target.value)}></Form.Control>
                <Button variant="primary" size="sm" type="submit" onClick={handleSendMessage}>
                    Enviar
                </Button>
            </FloatingLabel>
        </Form>
    );
};

export default MsgInput;