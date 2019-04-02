import React from 'react';
import { Parallax } from 'react-parallax';
import classNames from 'classnames';
import Markdown from 'react-markdown';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Typist from 'react-typist';


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

const bio = `Jules is a developer, from Reading, who has had an avid intrest in technology from a very young age
## Profile 
I am hardworking, enthusiastic and motivated. I strive to a high standard of work through persistence, teamwork and transparent communication. I am an experienced Web and IOS developer with strong practical experience.

## Education
__BSc Computer Science with Industrial Year University of Reading (1st Class Honours) - *September 2014 - July 2018*__
- Industrial year as a Developer at Eli Lilly, iterating cloud applications quickly using the SCRUMBan Agile methodoligy
- Final year project [Asset AR](https://github.com/jagribble/AssetAR)

__The Piggott School - *September 2005 - June 2014*__
- A Levels - Maths (B) Computing (B) Physics (C)
- 12 GCSE’s, Grades A-C (A’s in Maths, Science, English, Chinese, Electronics)

## Work Experience
__Apak Group (Software Developer)- *August 2018 - Present*__
- Driving architecture change towards container-based cloud systems, with React front end
- Leading Front End development with new technoligies, focusing on React

__Eli Lilly (Software Developer) - *July 2016-July2017*__
- Full-stack developer Scrumban Agile team
- Placement year as part of degree
- Learnt new tehcnolgies, such as React, NodeJS and cloud offerings such as Heroku, OpenShift and Salesforce
`;

const Home = (props) => {
  const { classes } = props;
  return (
    <>
      <Parallax bgImage="/img/home1.jpg" strength={500} style={{ marginTop: -10 }}>
        <div style={{ height: 500 }}>
          <div>
            <Typist startDelay={1000} cursor={{ hideWhenDone: true }}>
              <h1 className={classNames(classes.headerText)}>
Jules GHriubk
                <Typist.Backspace count={6} delay={500} />
                ribbke
                <Typist.Backspace count={2} delay={500} />
                le
                <Typist.Delay ms={500} />
                <br />
&nbsp;💻🎉
                <Typist.Delay ms={500} />
                😊
              </h1>

            </Typist>
            <img loop="50" className={classes.headerStyle} alt="img" src="/img/Jules.gif" />
          </div>
        </div>
      </Parallax>
      <Card className={classes.card}>
        <Typography variant="h2">Jules Gribble,</Typography>
        <Typography variant="h5">Developer</Typography>
        <Markdown source={bio} />
      </Card>
    </>

  );
};

export default withStyles(styles, { withTheme: true })(Home);
