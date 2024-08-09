import React, { useState } from 'react';
import { AppBar, Toolbar, styled, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home'; // Import Home icon
import InfoIcon from '@mui/icons-material/Info'; // Import Info icon
import ContactMailIcon from '@mui/icons-material/ContactMail'; // Import Contact icon
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Import Logout icon

const Component = styled(AppBar)(({ show, theme }) => ({
    background: 'linear-gradient(to right, #FF6F61, #FF8E53)',
    color: 'white',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    padding: '10px 20px',
    marginBottom: '20px',
    display: show ? 'flex' : 'none',
    [theme.breakpoints.down('sm')]: {
        padding: '5px 10px', // Adjust padding for mobile
        marginBottom: '10px',
    },
}));

const Container = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'left',
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
    },
}));

const LeftContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
        order: -1, // Move this container to the bottom on mobile
        width: '100%',
        justifyContent: 'left',
        gap:'105px' // Center align on mobile
    },
}));

const RightContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'centre',
    [theme.breakpoints.down('sm')]: {
        order: 1, // Move this container to the top on mobile
        width: '100%',
        justifyContent: 'left', // Center align on mobile
    },
}));

const LinkStyled = styled(Link)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    color: '#FFF',
    textDecoration: 'none',
    fontSize: '18px',
    transition: 'color 0.3s ease, transform 0.3s ease',
    '&:hover': {
        color: '#FFEB3B',
        transform: 'scale(1.1)',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '14px', // Adjust font size for mobile
        padding: '8px 10px', // Adjust padding for mobile
      
    },
    '& svg': {
        marginRight: '8px', // Adjust space between icon and text
    },
}));

const LogoutButton = styled(Button)(({ theme }) => ({
    borderColor: '#FFF',
    color: '#FFF',
    borderRadius: '10px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    '&:hover': {
        backgroundColor: '#FFEB3B',
        color: '#FF6F61',
    },
    [theme.breakpoints.down('sm')]: {
        marginTop: '10px',
        fontSize: '12px', // Adjust font size for mobile
        width: '30%',
        marginLeft:'90px' // Make button full-width on mobile
    },
}));

const ToggleButton = styled(Button)(({ theme }) => ({
    position: 'fixed',
    top: '10px',
    right: '10px',
    zIndex: 1000,
    [theme.breakpoints.down('sm')]: {
        top: '5px',
        right: '5px',
    },
}));

const Header = () => {
    const [showHeader, setShowHeader] = useState(true);
    const navigate = useNavigate();

    const logout = async () => {
        try {
            // Simulate logout process if applicable
            // await API.logout(); // Example if you have a logout API call
            navigate('/account');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const toggleHeader = () => {
        setShowHeader(prev => !prev);
    };

    return (
        <>
            <ToggleButton variant="contained" onClick={toggleHeader}>
                {showHeader ? 'Hide Header' : 'Show Header'}
            </ToggleButton>
            <Component show={showHeader}>
                <Container>
                    <LeftContainer>
                        <LinkStyled to='/'>
                            <HomeIcon /> HOME
                        </LinkStyled>
                        <LinkStyled to='/about'>
                            <InfoIcon /> ABOUT
                        </LinkStyled>
                    </LeftContainer>
                    <RightContainer>
                        <LinkStyled to='/contact'>
                            <ContactMailIcon /> CONTACT
                        </LinkStyled>
                        <LogoutButton onClick={logout} variant="outlined">
                            <ExitToAppIcon /> LOGOUT
                        </LogoutButton>
                    </RightContainer>
                </Container>
            </Component>
        </>
    );
};

export default Header;
