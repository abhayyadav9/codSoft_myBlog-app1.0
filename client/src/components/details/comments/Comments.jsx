import React, { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';
import { DataContext } from '../../../context/DataProvider';
import { API } from '../../../service/api';
import Comment from './Comment';

const Container = styled(Box)(({ theme }) => ({
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        alignItems: 'center',
    },
}));

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%',
    marginRight: '10px',
});

const StyledTextArea = styled(TextareaAutosize)(({ theme }) => ({
    height: '100px !important',
    width: '100%',
    margin: '10px 0',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    boxSizing: 'border-box',
    [theme.breakpoints.up('md')]: {
        margin: '0 20px',
    },
}));

const ButtonStyled = styled(Button)`
    height: 40px;
    margin-top: 10px;
`;

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}

const Comments = ({ post }) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png';

    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [error, setError] = useState(''); // State for validation error

    const { account } = useContext(DataContext);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await API.getAllComments(post._id);
                if (response.isSuccess) {
                    setComments(response.data);
                } else {
                    console.error('Failed to fetch comments');
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        }
        getData();
    }, [toggle, post]);

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value
        });
    }

    const addComment = async () => {
        if (comment.comments.trim() === '') {
            setError('Comment cannot be empty.'); // Set error message
            return;
        }
        setError(''); // Clear error message if input is valid
        try {
            await API.newComment(comment);
            setComment(initialValue);
            setToggle(prev => !prev);
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    }

    return (
        <Box>
            <Container>
                <Image src={url} alt="dp" />
                <StyledTextArea
                    rowsMin={5}
                    placeholder="What's on your mind?"
                    onChange={handleChange}
                    value={comment.comments}
                    required
                />
                {error && <Box color="error.main" mb={2}>{error}</Box>} {/* Display error message */}
                <ButtonStyled
                    variant="contained"
                    color="primary"
                    size="medium"
                    onClick={addComment}
                >
                    Post
                </ButtonStyled>
            </Container>
            <Box mt={2}>
                {comments && comments.length > 0 && comments.map(comment => (
                    <Comment key={comment._id} comment={comment} setToggle={setToggle} />
                ))}
            </Box>
        </Box>
    );
}

export default Comments;
