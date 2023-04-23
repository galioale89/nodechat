import 'bootstrap/dist/css/bootstrap.css';
import styles from './styles.module.scss';

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, ListGroup } from 'react-bootstrap';

import socketIOClient from 'socket.io-client';

import {useDispatch, useSelector} from 'react-redux';

import Members from '../../components/Members';
import { stat } from 'fs';

interface IRootState {
    auth: {
        isLogged: boolean;
        id: string | null;
        name: string | null;
        nick: string | null;
        token: string | null;
    },
    app: {
        inChannel: boolean;
        messages: [];
        members: [];
    }
}

const AppView: React.FC = () => {

    const dispatch = useDispatch();
    const userData = useSelector((state: IRootState) => state.auth);
    const {inChannel, messages, members} = useSelector((state: IRootState) => state.app);

    const [loading,setLoading] = useState(false);
    const [socket, setSocket] = useState<SocketIOCliente.Socket | null>(null);

    useEffect(() => {
        const socket = socketIOClient(process.env.REACT_APP_SOCKET_URL!, {transports: ['websocket']});
        socket.emit('new user', userData.id);
        setSoc
    })


    return (
        <Container>
            <Row>
                <Col xs={8}>
                    <Form>
                        <Form.Group className={styles.container} controlId="messages">
                            <Form.Label className={styles.label}>Mensagens</Form.Label>
                            <Form.Label className={styles.label}>Aguardando mensagens...</Form.Label>
                        </Form.Group>
                    </Form>
                </Col>
                <Col xs={4}>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Falar com:</Form.Label>
                        </Form.Group>

                        <InputGroup size="sm">
                            <InputGroup.Text id="inputGroup-sizing-sm">Digite sua mensagem</InputGroup.Text>
                            <Form.Control as="textarea" aria-describedby='inputGroup-sizing-sm'></Form.Control>
                            <Button variant="primary" size="sm" type="submit">
                                Enviar
                            </Button>
                        </InputGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AppView;


