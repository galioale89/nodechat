import react, { useState, useContext, FormEvent, ChangeEvent } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { MessageContext } from '../context';
import { MessageContextType, IMessage } from '../model/message';
import { FormControl } from 'react-bootstrap';
import { FormControlProps } from 'react-bootstrap';

type Props = {
    sendClick: (msg: string, date: string) => void;
};

const MsgInput: React.FC<Props> = props => {
    const { saveMessage } = useContext(MessageContext) as MessageContextType;
    const [formData, setFormData] = useState<IMessage | {}>();

    const handlerForm = (e: ChangeEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value,
        });
    };

    const handleSaveMessage = (e: FormEvent, formData: IMessage | any) => {
        e.preventDefault();
        props.sendClick(formData, new Date().toUTCString());
        saveMessage(formData);
    };

    return (
        <Form>
            <InputGroup size="sm">
                <InputGroup.Text id="inputGroup-sizing-sm" >Digite sua mensagem</InputGroup.Text>
                <Form.Control as="textarea" aria-describedby='inputGroup-sizing-sm' onChange={handlerForm}></Form.Control>
                <Button variant="primary" size="sm" onClick={(e) => handleSaveMessage(e, formData)}>
                    Enviar
                </Button>
            </InputGroup>
        </Form>
    );
};

export default MsgInput;