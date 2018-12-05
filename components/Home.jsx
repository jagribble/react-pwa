import React from 'react';
import Markdown from 'react-markdown';

const Home = (props) => {
  const { text } = props;
  return (<Markdown source={text} />);
};

export default Home;
