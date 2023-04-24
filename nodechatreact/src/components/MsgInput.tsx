import react, { useState, useContext, FormEvent, ChangeEvent } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { MessageContext } from '../context';
import { MessageContextType, IMessage } from '../model/message';

type Props = {
    sendClick: (msg: IMessage) => void;
};

const MsgInput: React.FC<Props> = props => {

    const { saveMessage } = useContext(MessageContext) as MessageContextType;
    const [msg, setMsg] = useState<string>("");
    const [formData, setFormData] = useState<IMessage | {}>();

    const handlerForm = (e: ChangeEvent<HTMLInputElement>): void => {
        setMsg(e.currentTarget.value);
    };

    const handleSaveMessage = (e: FormEvent) => {
        e.preventDefault();
        const newMsg: IMessage = {
            nickname: "teste",
            text: msg,
            created_dt: new Date()
        };
        setFormData(newMsg);
        props.sendClick(newMsg);
        saveMessage(newMsg);
    };

    return (
        <Form>
            <InputGroup size="sm">
                <InputGroup.Text id="inputGroup-sizing-sm" >Digite sua mensagem</InputGroup.Text>
                <Form.Control as="textarea" aria-describedby='inputGroup-sizing-sm' onChange={handlerForm}></Form.Control>
                <Button variant="primary" size="sm" onClick={(e) => handleSaveMessage(e)}>
                    Enviar
                </Button>
            </InputGroup>
        </Form>
    );
};

export default MsgInput;