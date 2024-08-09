
import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(http://mrtaba.ir/image/bg2.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px top -100px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;


const Contact = () => {
    return (
        <>   
        <Box>
            <Banner />
            <Wrapper>
                <Typography variant="h3">Getting in touch is easy!</Typography>    
                <Text variant="h5">
                    Reach out to me on
                    <Link href="https://www.instagram.com/abhay45ray/" color="inherit" target="_blank">
                        <Instagram/>
                    </Link>
                    or send me an Email 
                    <Link href="mailto:yadavabhay8227@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                        <Email />
                    </Link>.
                </Text>
            </Wrapper>
        </Box>

        <Box
        className="footer"
        style={{
          padding: "20px",
          textAlign: "center",
          backgroundColor: "#333",
          color: "#fff",
          marginTop: "40px",

          position: "fixed",
          width: "100%",
          height:"10px",
          bottom: 0,
        }}
      >
        <Typography variant="body2">
          All rights reserved &copy; Abhay Yadav
        </Typography>
      </Box>


        </>
        
        
    );
}

export default Contact;