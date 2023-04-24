import 'bootstrap/dist/css/bootstrap.css';
import styles from './styles.module.scss';

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

//import { useDispatch, useSelector } from 'react-redux';
import socketIOClient, { Socket } from 'socket.io-client';

import MsgInput from '../../components/MsgInput';
import MsgList from '../../components/MsgList';
import Members from '../../components/Members';

interface IRootState {
    auth: {
        isLogged: boolean;
        id: string | null;
        nickname: string | null;
        token: string | null
    },
    app: {
        inChannel: boolean;
        messages: [];
        members: [];
    }
};


const AppView: React.FC = () => {

    // const dispatch = useDispatch();
    // const userData = useSelector((state: IRootState) => state.auth);
    // const { inChannel, messages, members } = useSelector(
    //     (state: IRootState) => state.app
    // );
    const [loading, setLoading] = useState(false);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socket = socketIOClient("http://localhost:3200", { transports: ["websocket"] });
        setSocket(socket);
    }, []);

    const createMessage = async (text: string, date: string) => {
        if (!socket) return;
        socket?.emit('chat message', text);
    };

    return (
        <Container>
            <Row>
                <Col xs={8}>
                    <Form.Label className={styles.label}>Mensagens</Form.Label>
                    <Form className={styles.container}>

                        <MsgList />
                    </Form>
                </Col>
                <Col xs={4}>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Falar com:</Form.Label>
                        </Form.Group>
                        <MsgInput sendClick={createMessage} />
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AppView;


