import React from 'react';
import { Parallax } from 'react-parallax';
import { isMobile } from 'react-device-detect';

import PageContent from './Home';
import Container from './Container';

const headerStyle = {
  background: 'white',
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
        <Parallax bgImage={image} strength={500}>
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

export default BlogPage;
