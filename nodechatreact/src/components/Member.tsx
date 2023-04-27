import styles from '../../src/styles/styles.module.scss';

import React, { useState, useEffect, useContext } from 'react';
import { Form, Container, ListGroup, FormLabel } from 'react-bootstrap';
import { Socket } from 'socket.io-client';
import { IUser } from '../model/user';
import { MessageContext } from '../context';
import { MessageContextType, Direct, IDirect } from '../model/message';

interface Props {
    socket: Socket;
};

const Members: React.FC<Props> = ({ socket }) => {

    const [users, setUsers] = useState<IUser[]>([]);

    const { saveDirect } = useContext(MessageContext) as MessageContextType;

    useEffect(() => {
        socket.on("newUser", (data) => {
            setUsers(data);
        });
    }, [socket, users]);


    const handleClick = (e: string) => {
        if (localStorage.getItem("userName")?.toString() != e.toString()) {
            const direct: IDirect = Direct.message({
                origin: localStorage.getItem("newUser")!,
                destination: e
            });
            saveDirect(direct);
        }
    };

    return (
        <Container>
            <FormLabel className={styles.label}>Usuários Conectado: {localStorage.getItem("userName")?.toString()}</FormLabel>
            <br/>
            <FormLabel className={styles.label}>Usuários Ativos</FormLabel>
            <ListGroup as='ul'>
                {users.map((usr: IUser) => (
                    <ListGroup key={usr.socketID} as="li">
                        <FormLabel onClick={e => (handleClick(`${usr.userName}`))} className={styles.members}>{usr.userName}</FormLabel>
                    </ListGroup>
                ))}
            </ListGroup>
        </Container>
    );
}

export default Members;

