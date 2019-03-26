import React from 'react';
import PropTypes from 'prop-types';
import { Parallax } from 'react-parallax';
import { isMobile } from 'react-device-detect';

import PageContent from './Home';
import Container from './Container';

const headerStyle = {
  color: 'white',
  textShadow: '2px 2px #3f51b5',
  padding: 20,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
};


const mobileStyle = (drawerWidth) => {
  return {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  };
};

const BlogPage = (props) => {
  const {
    image, title, body, open,
  } = props;
  return (
    <React.Fragment>
      <div style={open && !isMobile ? mobileStyle(240) : {}}>
        <Parallax bgImage={`${image}?fm=jpg&fl=progressive`} strength={500}>
          <div style={{ height: 500 }}>
            <div style={headerStyle}><h1>{title}</h1></div>
          </div>
        </Parallax>
      </div>
      <Container open={open} mobile={isMobile}>
        <PageContent text={body} />
      </Container>
    </React.Fragment>
  );
};

BlogPage.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
};

export default BlogPage;
