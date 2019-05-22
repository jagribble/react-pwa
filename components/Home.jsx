import React from 'react';
import { Parallax } from 'react-parallax';
import Markdown from 'react-markdown';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

const styles = () => {
  return {
    headerStyle: {
      color: 'white',
      textShadow: '2px 2px #000000',
      padding: 20,
      position: 'absolute',
      top: '50%',
      left: '74%',
      width: '60%',
      transform: 'translate(-50%,-50%)',
    },
    headerText: {
      color: 'white',
      textShadow: '2px 2px #000000',
      padding: 20,
      position: 'absolute',
      top: '50%',
      textAlign: 'center',
      width: '100%',
      zIndex: 100,
    },
    card: {
      margin: 25,
      padding: 25,
    },
  };
};

const bio = `
# PWA Demo

This site is a simple demo of how a PWA works.
`;

const Home = (props) => {
  const { classes } = props;
  return (
    <>
      <Parallax bgImage="/img/home1.jpg" strength={500} style={{ marginTop: -10 }}>
        <div style={{ height: 500 }}>
          <Typography className={classes.headerText} variant="h1">PWA Demo</Typography>
        </div>
      </Parallax>
      <Card className={classes.card}>
        <Markdown source={bio} />
      </Card>
    </>

  );
};

export default withStyles(styles, { withTheme: true })(Home);
