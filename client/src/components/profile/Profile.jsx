import React, { useState } from 'react';
import { styled, Box, IconButton } from '@mui/material';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import { API } from '../../service/api'; // Ensure this imports your API service

const ImageContainer = styled(Box)`
    width: 100%;
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(${props => props.backgroundImage}) center/cover no-repeat;
    position: relative;
`;

const EditButton = styled(IconButton)`
    position: absolute;
    bottom: 16px;
    right: 16px;
    background-color: #000;
    color: #fff;
    &:hover {
        background-color: #333;
    }
`;

const ProfilePicture = () => {
    const [image, setImage] = useState('https://example.com/default-profile.jpg'); // Default image URL

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await API.uploadProfile(formData);
            if (response.isSuccess) {
                setImage(response.data); // Update image URL with the response data
            } else {
                console.error(response.msg);
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return (
        <ImageContainer backgroundImage={image}>
            <EditButton component="label">
                <FlipCameraIosIcon />
                <input type="file" hidden onChange={handleImageChange} />
            </EditButton>
        </ImageContainer>
    );
};

export default ProfilePicture;
