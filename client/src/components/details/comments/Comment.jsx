import React, { useContext } from 'react';
import { Typography, Box, styled } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { API } from '../../../service/api';
import { DataContext } from '../../../context/DataProvider';

const Component = styled(Box)(({ theme }) => ({
    marginTop: '15px',
    background: '#F5F5F5',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    [theme.breakpoints.down('sm')]: {
        padding: '8px',
    },
}));

const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
}));

const Name = styled(Typography)(({ theme }) => ({
    fontWeight: '600',
    fontSize: '18px',
    marginRight: '20px',
    [theme.breakpoints.down('sm')]: {
        fontSize: '16px',
        marginRight: '10px',
    },
}));

const StyledDate = styled(Typography)`
    font-size: 14px;
    color: #878787;
`;

const DeleteIcon = styled(Delete)(({ theme }) => ({
    marginLeft: 'auto',
    cursor: 'pointer',
    color: '#dc3545',
    transition: 'color 0.3s ease',
    '&:hover': {
        color: '#c82333',
    },
    [theme.breakpoints.down('sm')]: {
        marginLeft: 0,
        marginTop: '10px',
    },
}));

const Comment = ({ comment, setToggle }) => {
    const { account } = useContext(DataContext);

    const removeComment = async () => {
        try {
            await API.deleteComment(comment._id);
            setToggle(prev => !prev);
        } catch (error) {
            console.error('Failed to delete comment:', error);
        }
    };

    return (
        <Component>
            <Container>
                <Name>{comment.name}</Name>
                <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
                {comment.name === account.username && <DeleteIcon onClick={removeComment} />}
            </Container>
            <Typography>{comment.comments}</Typography>
        </Component>
    );
};

export default Comment;
