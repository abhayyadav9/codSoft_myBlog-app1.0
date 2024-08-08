import React from 'react';
import { Box, Button, Table, TableHead, TableRow, TableCell, TableBody, styled } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { FaMusic, FaFilm, FaFutbol, FaLaptop, FaTshirt } from 'react-icons/fa';
import { categories } from '../../constants/data';

// Styled components
const StyledTable = styled(Table)(({ theme }) => ({
    border: '1px solid rgba(224, 224, 224, 1)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
        display: 'none', // Hide the table on mobile
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(2),
    width: '85%',
    background: '#6495ED',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '8px',
    '&:hover': {
        backgroundColor: '#4169E1',
        transition: 'background-color 0.3s ease',
    },
}));

const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    '&:hover': {
        color: '#6495ED',
        transition: 'color 0.3s ease',
    },
}));

const IconWrapper = styled('div')(({ theme }) => ({
    marginRight: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    '& svg': {
        fontSize: '20px',
    },
}));

const MobileContainer = styled(Box)(({ theme }) => ({
    display: 'none', // Hide the container by default
    [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
}));

const IconItem = styled(Link)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    cursor: 'pointer',
    textDecoration: 'none',
    color: theme.palette.text.primary,
}));

const Heading = styled('div')(({ theme }) => ({
    marginTop: theme.spacing(1),
    fontSize: '16px',
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
}));

const Categories = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    
    const getCategoryIcon = (type) => {
        switch (type) {
            case 'Music':
                return <FaMusic />;
            case 'Movies':
                return <FaFilm />;
            case 'Sports':
                return <FaFutbol />;
            case 'Tech':
                return <FaLaptop />;
            case 'Fashion':
                return <FaTshirt />;
            default:
                return null;
        }
    };

    return (
        <>
            <Link to={`/create?category=${category || ''}`} style={{ textDecoration: 'none' }}>
                <StyledButton variant="contained">Create Blog</StyledButton>
            </Link>
            
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <StyledLink to={"/"}>
                                <IconWrapper>
                                    <FaMusic /> {/* Example icon for "All Categories" */}
                                </IconWrapper>
                                All Categories
                            </StyledLink>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.map(cat => (
                        <TableRow key={cat.id}>
                            <TableCell>
                                <StyledLink to={`/?category=${cat.type}`}>
                                    <IconWrapper>
                                        {getCategoryIcon(cat.type)}
                                    </IconWrapper>
                                    {cat.type}
                                </StyledLink>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </StyledTable>

            <MobileContainer>
                {categories.map(cat => (
                    <IconItem key={cat.id} to={`/?category=${cat.type}`}>
                        {getCategoryIcon(cat.type)}
                        <Heading>{cat.type}</Heading>
                    </IconItem>
                ))}
            </MobileContainer>
        </>
    );
}

export default Categories;
