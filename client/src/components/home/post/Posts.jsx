import React, { useEffect, useState } from 'react';
import { Grid, Box, CircularProgress } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { API } from '../../../service/api';
import Post from './Post';
import styled from '@emotion/styled';

const SpinnerContainer = styled(Box)({
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
});

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => { 
            setLoading(true); // Start loading
            try {
                let response = await API.getAllPosts({ category: category || '' });
                if (response.isSuccess) {
                    setPosts(response.data);
                } else {
                    setError('Failed to load posts.');
                }
            } catch (error) {
                setError('An error occurred while fetching posts.');
            } finally {
                setLoading(false); // Stop loading
            }
        }
        fetchData();
    }, [category]);

    if (loading) {
        return (
            <SpinnerContainer>
                <CircularProgress size={60} />
            </SpinnerContainer>
        );
    }

    return (
        <>
            {error && <Box style={{ color: 'red', margin: '30px', fontSize: 18 }}>{error}</Box>}
            {posts.length ? (
                posts.map(post => (
                    <Grid item lg={3} sm={4} xs={12} key={post._id}>
                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`details/${post._id}`}>
                            <Post post={post} />
                        </Link>
                    </Grid>
                ))
            ) : (
                <Box style={{ color: '878787', margin: '30px 80px', fontSize: 18 }}>
                    No data is available for selected category
                </Box>
            )}
        </>
    );
};

export default Posts;
