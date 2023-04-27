import 'bootstrap/dist/css/bootstrap.css';
import styles from '../../styles/styles.module.scss';

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Socket } from 'socket.io-client';

import MsgInput from '../../components/MsgInput';
import MsgList from '../../components/MsgList';
import Members from '../../components/Member';

interface Props {
    socket: Socket;
};

const ChatPage: React.FC<Props> = ({ socket }) => {

    return (
        <Container>
            <Row>
                <Col xs={7}>
                    <Form className={styles.container}>
                        <MsgList socket={socket} />
                    </Form>
                </Col>
                <Col xs={5}>
                    <Form className={styles.container}>
                        <Form.Group className="mb-3">
                            <Members socket={socket} />
                        </Form.Group>
                        <MsgInput socket={socket} />
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ChatPage;


