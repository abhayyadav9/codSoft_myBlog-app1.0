import React, { useState } from 'react';
import { styled, Box, Typography, Button, Input } from '@mui/material';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';

// Styled components
const Image = styled(Box)(({ imageUrl }) => ({
  width: '100%',
  background: `url(${imageUrl}) center/55% repeat-x #000`,
  height: '50vh',
  marginTop:"85px",
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
}));

const Heading = styled(Typography)`
  font-size: 70px;
  color: #FFFFFF;
  line-height: 1;
`;

const SubHeading = styled(Typography)`
  font-size: 20px;
  background: #FFFFFF;
`;

const EditButton = styled(Button)`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const Banner = () => {
  const [imageUrl, setImageUrl] = useState('https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg');
  const [fileInputKey, setFileInputKey] = useState(Date.now()); // To reset input

  // Function to handle image change
  const handleChangeImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result); // Set the new image URL
      };
      reader.readAsDataURL(file); // Convert image to base64 URL
    }
  };

  return (
    <Box>
      <Image imageUrl={imageUrl}>
        <Heading>BLOG</Heading>
        <SubHeading>Make Your Own Blog</SubHeading>
        <EditButton
          variant="contained"
          color="primary"
          onClick={() => document.getElementById('file-input').click()}
        >
                  <FlipCameraIosIcon/>

        </EditButton>
        <Input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleChangeImage}
          sx={{ display: 'none' }} // Hide the file input
          key={fileInputKey} // Reset input when necessary
        />
      </Image>
    </Box>
  );
};

export default Banner;
