import styles from '../../src/styles/styles.module.scss';
import React, { useState, useEffect } from 'react';
import { ListGroup, Form, Container, Row, Col } from 'react-bootstrap'
import { IMessage } from '../model/message'
import { Socket } from 'socket.io-client';

interface Props {
    socket: Socket;
};

const MsgList: React.FC<Props> = ({ socket }) => {

    const [messages, setMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        socket.on('responseMessage', (msg: IMessage) => {
            setMessages([...messages, msg]);
        })
    }, [socket, messages]);

    return (
        <Container>
            <Form.Label className={styles.label}>Mensagens</Form.Label>
            <ListGroup as='ul'>
                {messages.map((msg: IMessage) => (
                    msg.name === localStorage.getItem("userName") ? (
                        <ListGroup key={msg.id} as="li">
                            <Form.Label className={styles.member}>{msg.name}:</Form.Label>
                            <Row className="g-2">
                                <Col className="md">
                                    <Form.Label className={`${styles.text} ${styles.mine}`}>{msg.text}</Form.Label>
                                </Col>
                                <Col className="md">
                                    <Form.Label className={styles.text}>{msg.created_dt}</Form.Label>
                                </Col>
                            </Row>

                        </ListGroup>
                    ) : (
                        <ListGroup key={msg.id} as="li">
                            <Row className="g-2">
                                <Form.Label className={styles.member}>{msg.name}:</Form.Label>
                                <Col className="md">
                                    <Form.Label className={`${styles.text} ${styles.other}`}>{msg.text}</Form.Label>
                                </Col>
                                <Col className="md">
                                    <Form.Label className={styles.text}>{msg.created_dt}</Form.Label>
                                </Col>
                            </Row>
                        </ListGroup>
                    )
                ))}
            </ListGroup>
        </Container>
    );
}

export default MsgList;