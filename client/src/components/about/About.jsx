import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';

// Inline styles and keyframes for animation
const styles = {
    banner: {
        position: 'relative',
        backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/d/d1/Mount_Everest_as_seen_from_Drukair2_PLW_edit.jpg)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '50vh',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
    },
    bannerText: {
        position: 'relative',
        zIndex: 1,
        fontSize: '2rem',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        opacity: 0,
        transform: 'translateY(-20px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
    },
    wrapper: {
        padding: '40px',
        maxWidth: '800px',
        margin: 'auto',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        animation: 'fadeIn 1s ease-in-out',
    },
    text: {
        color: '#333',
        lineHeight: 1.6,
        marginTop: '20px',
        fontSize: '1.2rem',
    },
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
    link: {
        color: '#6495ED',
        textDecoration: 'none',
        fontWeight: 'bold',
        marginLeft: '5px',
        transition: 'color 0.3s ease, transform 0.3s ease',
    },
    linkHover: {
        color: '#4169E1',
        transform: 'scale(1.1)',
    },
};

const About = () => {
    return (
        <Box>
            <Box sx={styles.banner}>
                <Typography sx={styles.bannerText}>About Me</Typography>
            </Box>
            <Box sx={styles.wrapper}>
                <Typography variant="h3" gutterBottom>Creator</Typography>
                <Typography variant="h5" sx={styles.text}>
                    I'm a Software Engineer with a passion for building dynamic web and desktop applications. <br />
                    If you're interested in my work, check out some of my favorite projects here
                    <Link href="https://github.com/abhay9" target="_blank" sx={styles.link}>
                        <GitHub />
                    </Link>.
                </Typography>
                <Typography variant="h5" sx={styles.text}>
                    Need something built or simply want to have a chat? Reach out to me on
                    <Link href="https://www.instagram.com/abhay45ray" target="_blank" sx={styles.link}>
                        <Instagram />
                    </Link>
                    or send me an email
                    <Link href="mailto:yadavabhay8227@gmail.com?Subject=This is a subject" target="_blank" sx={styles.link}>
                        <Email />
                    </Link>.
                </Typography>
            </Box>
            <Box sx={styles.footer}>
                <Typography variant="body2">All rights reserved &copy; Abhay Yadav</Typography>
            </Box>
        </Box>
    );
};

export default About;
