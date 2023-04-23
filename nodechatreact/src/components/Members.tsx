import 'bootstrap/dist/css/bootstrap.css';
import styles from './styles.module.scss';
import { ListGroup } from 'react-bootstrap';

import React from 'react';

type MemberProps = {
    _id: string;
    name: string;
    nickname: string;
};

const Member: React.FC<MemberProps> = props => {
    return (
        <ListGroup.Item as="li">
            {props.nickname}
        </ListGroup.Item>
    );
};

type MembersProps = {
    members: MemberProps[];
    loading: boolean
};

const Members: React.FC<MembersProps> = props => {
    return (
        <ListGroup as="ul">
            {props.members.map(member => (
                <Member key={member?._id} _id={member?._id} name={member.name} nickname={member.nickname} />
            ))};
        </ListGroup>
    );
};

export default Members;