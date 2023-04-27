import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, FormLabel, FormControl, FormGroup, Container } from 'react-bootstrap';
import { Socket } from 'socket.io-client';

interface Props {
    socket: Socket;
};

const Home: React.FC<Props> = ({socket}) => {

    const navigate = useNavigate();
    const [userName, setUserName] = useState<string>("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        localStorage.setItem("userName", userName);
        socket.emit("newUser", { userName, socketID: socket.id });
        navigate("/chat");
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <h2>Sign in to Open Chat</h2>
                <FormGroup className='mb-3'>
                    <FormLabel htmlFor='username'>Username</FormLabel>
                    <FormControl name="username" id="username" value={userName} onChange={e => setUserName(e.target.value)}></FormControl>
                    <Form.Text className="text-muted">Please, enter your username</Form.Text>
                </FormGroup>
                <Button variant="primary" size="sm" type="submit">Enter</Button>
            </Form>
        </Container>
    );
}

export default Home;

