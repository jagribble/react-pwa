import React, { Component } from 'react';
import { Parallax } from 'react-parallax';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import isMobile from 'is-mobile';
import Markdown from 'react-markdown';
import Container from './Container';

const styles = () => {
  return {
    card: {
      margin: 25,
      padding: 25,
      marginTop: 15,
    },
    header: {
      color: 'white',
      textShadow: '2px 2px #000000',
      padding: 20,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
    },
    headerContainer: {
      height: 500,
    },
  };
};

const Image = (props) => {
  return <img {...props} alt="img" style={{ maxWidth: '100%', maxHeight: 450 }} />;
};

const Blockquote = (props) => {
  return (
    <blockquote
      {...props}
      style={{
        background: '#f9f9f9',
        borderLeft: '10px solid #ccc',
        margin: '1.5em 10px',
        padding: '0.5em 10px',
        quotes: '"\\201C""\\201D""\\2018""\\2019"',
      }}
    />
  );
};

const mobileStyle = (drawerWidth) => {
  return {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  };
};

class BlogPage extends Component {
  constructor(props) {
    super(props);
    this.state = { blog: false };
    this.getBlog = this.getBlog.bind(this);
    this.getImageURL = this.getImageURL.bind(this);
  }

  componentDidMount() {
    this.getBlog();
  }

  shouldComponentUpdate(nextProps) {
    const { location } = this.props;
    return (nextProps.blogs.length > 0 || nextProps.location.pathname !== location.pathname);
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    const { blogs, location } = this.props;
    if (blogs !== prevProps.blogs || prevProps.location.pathname !== location.pathname) {
      this.getBlog();
    }
  }

  getBlog() {
    const { blogs, match } = this.props;
    const { params } = match;
    if (blogs.length > 0) {
      const blog = blogs.find((b) => { return b.fields.slug === params.slug; });

      this.setState({ blog });
    }
  }

  getImageURL(id) {
    const { images } = this.props;
    const imageAsset = images.find((asset) => { return asset.sys.id === id; });
    return imageAsset !== undefined ? imageAsset.fields.file.url : '';
  }

  render() {
    const { open, classes } = this.props;
    const { blog } = this.state;
    if (blog) {
      const {
        heroImage = '', title, body,
      } = blog.fields;
      const heroImageUrl = `https:${this.getImageURL(heroImage.sys.id)}`;
      return (
        <React.Fragment>
          <div style={open && !isMobile() ? mobileStyle(240) : {}}>
            <Parallax bgImage={`${heroImageUrl}?fm=jpg&fl=progressive`} strength={500}>
              <div className={classes.headerContainer}>
                <div className={classes.header}><h1>{title}</h1></div>
              </div>
            </Parallax>
          </div>
          <Container blog open={open} mobile={isMobile()}>
            <Card className={classes.card}>
              <Markdown source={body} renderers={{ image: Image, blockquote: Blockquote }} />
            </Card>
          </Container>
        </React.Fragment>
      );
    }
    return <></>;
  }
}


export default withStyles(styles, { withTheme: true })(BlogPage);
