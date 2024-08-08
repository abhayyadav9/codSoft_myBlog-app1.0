import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import Comments from './comments/Comments';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px auto',
    padding: '0 20px',
    maxWidth: '800px',
    [theme.breakpoints.down('md')]: {
        margin: '20px auto',
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',
    }
});

const Icon = styled('div')(({ color }) => ({
    margin: '5px',
    padding: '5px',
    border: `1px solid ${color}`,
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    '&:hover': {
        backgroundColor: color,
        color: '#fff',
    },
}));

const EditIcon = styled(Edit)`
    color: #007bff;
`;

const DeleteIcon = styled(Delete)`
    color: #dc3545;
`;

const Heading = styled(Typography)`
    font-size: 2.5rem;
    font-weight: 600;
    text-align: center;
    margin: 30px 0;
    color: #333;
`;

const Author = styled(Box)(({ theme }) => ({
    color: '#555',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '20px 0',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
}));

const DetailView = () => {
    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    const [post, setPost] = useState({});
    const [error, setError] = useState('');
    const { account } = useContext(DataContext);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await API.getPostById(id);
                if (response.isSuccess) {
                    setPost(response.data);
                } else {
                    setError('Failed to load post.');
                }
            } catch (error) {
                setError('An error occurred while fetching the post.');
            }
        }
        fetchData();
    }, [id]);

    const deleteBlog = async () => {
        try {
            await API.deletePost(post._id);
            navigate('/');
        } catch (error) {
            setError('Failed to delete post.');
        }
    }

    return (
        <Container>
            {error && <Typography color="error">{error}</Typography>}
            <Image src={post.picture || url} alt="post" />
            <Box style={{ float: 'right' }}>
                {
                    account.username === post.username &&
                    <>
                        <Link to={`/update/${post._id}`}><Icon color="#007bff"><EditIcon /></Icon></Link>
                        <Icon color="#dc3545" onClick={deleteBlog}><DeleteIcon /></Icon>
                    </>
                }
            </Box>
            <Heading>{post.title}</Heading>

            <Author>
                <Link to={`/?username=${post.username}`} style={{ textDecoration: 'none', color: '#007bff' }}>
                    <Typography>Author: <span style={{ fontWeight: 600 }}>{post.username}</span></Typography>
                </Link>
                <Typography>{new Date(post.createdDate).toDateString()}</Typography>
            </Author>

            <Typography>{post.description}</Typography>
            <Comments post={post} />
        </Container>
    )
}

export default DetailView;
