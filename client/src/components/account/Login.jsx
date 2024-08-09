import React, { useState, useEffect, useContext } from 'react';
import { TextField, Box, Button, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Component = styled(Box)`
    width: 100%;
    max-width: 400px;
    margin: auto;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    overflow: hidden;
    background: linear-gradient(135deg, #f5a623, #f53d3d);
    animation: fadeIn 1s ease-in-out;
    padding: 20px;
`;

const Image = styled('img')({
    width: '100%',
    height: 'auto',
    display: 'block',
    margin: 'auto',
    borderRadius: '10px',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.05)',
    }
});

const Wrapper = styled(Box)`
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    animation: slideIn 0.5s ease-in-out;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 25px;
    width: 100%;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    transition: background 0.3s ease, transform 0.3s ease;
    &:hover {
        background: #e63e1c;
        transform: scale(1.05);
    }
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 25px;
    width: 100%;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    transition: background 0.3s ease, transform 0.3s ease;
    &:hover {
        background: #f1f1f1;
        transform: scale(1.05);
    }
`;

const Text = styled(Typography)`
    color: #333;
    font-size: 14px;
`;

const Error = styled(Typography)`
    font-size: 12px;
    color: #ff6161;
    line-height: 1.5;
    margin-top: 10px;
    font-weight: 600;
    animation: shake 0.5s ease;
`;

const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    name: '',
    username: '',
    password: '',
};

const Login = ({ isUserAuthenticated }) => {
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState('');
    const [account, toggleAccount] = useState('login');

    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext);

    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    useEffect(() => {
        showError('');
    }, [login]);

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    };

    const loginUser = async () => {
 const styles={
    footer: {
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#333',
        color: '#fff',
        marginTop: '40px',
        position: 'fixed',
        width: '100%',
        bottom: 0,
    },
 }


        try {
            let response = await API.userLogin(login);
            if (response.isSuccess) {
                showError('');

                sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
                sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
                setAccount({ name: response.data.name, username: response.data.username });

                isUserAuthenticated(true);
                setLogin(loginInitialValues);
                navigate('/');
            } else {
                showError('Something went wrong! Please try again later.');
            }
        } catch (error) {
            showError('An error occurred during login. Please try again later.');
        }
    };

    const signupUser = async () => {
        try {
            let response = await API.userSignup(signup);
            if (response.isSuccess) {
                showError('');
                setSignup(signupInitialValues);
                toggleAccount('login');
            } else {
                showError('Something went wrong! Please try again later.');
            }
        } catch (error) {
            showError('An error occurred during signup. Please try again later.');
        }
    };

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    };

    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="blog" />
                {
                    account === 'login' ?
                        <Wrapper>
                            <TextField
                                variant="outlined"
                                value={login.username}
                                onChange={onValueChange}
                                name='username'
                                label='Enter Username'
                                fullWidth
                                style={{ borderRadius: '20px' }}
                            />
                            <TextField
                                variant="outlined"
                                type='password'
                                value={login.password}
                                onChange={onValueChange}
                                name='password'
                                label='Enter Password'
                                fullWidth
                                style={{ borderRadius: '20px' }}
                            />

                            {error && <Error>{error}</Error>}

                            <LoginButton variant="contained" onClick={loginUser}>Login</LoginButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <SignupButton onClick={toggleSignup}>Create an account</SignupButton>
                        </Wrapper> :
                        <Wrapper>
                            <TextField
                                variant="outlined"
                                onChange={onInputChange}
                                name='name'
                                label='Enter Name'
                                fullWidth
                                style={{ borderRadius: '20px' }}
                            />
                            <TextField
                                variant="outlined"
                                onChange={onInputChange}
                                name='username'
                                label='Enter Username'
                                fullWidth
                                style={{ borderRadius: '20px' }}
                            />
                            <TextField
                                variant="outlined"
                                type='password'
                                onChange={onInputChange}
                                name='password'
                                label='Enter Password'
                                fullWidth
                                style={{ borderRadius: '20px' }}
                            />

                            <SignupButton onClick={signupUser}>Signup</SignupButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <LoginButton variant="contained" onClick={toggleSignup}>Already have an account</LoginButton>
                        </Wrapper>
                }
            </Box>



            <Box className='footer' style={{ padding: '20px',
        textAlign: 'center',
        backgroundColor: '#333',
        color: '#fff',
        marginTop: '40px',

        position: 'fixed',
        width: '100%',
        bottom: 0,}}>
                <Typography variant="body2">All rights reserved &copy; Abhay Yadav</Typography>
            </Box>
        </Component>
    );
};

export default Login;
