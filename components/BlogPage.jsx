import React, { Component } from 'react';
import { Parallax } from 'react-parallax';
import isMobile from 'is-mobile';
import Markdown from 'react-markdown';
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
    if (nextProps.blogs.length > 0) return true;
    return false;
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    const { blogs } = this.props;
    if (blogs !== prevProps.blogs) {
      this.getBlog();
    }
  }

  getBlog() {
    const { blogs, match } = this.props;
    const { params } = match;
    if (blogs.length > 0) {
      const blog = blogs.find((b) => { return b.fields.slug === params.slug; });
      console.log(blog);
      this.setState({ blog });
    }
  }

  getImageURL(id) {
    const { images } = this.props;
    const imageAsset = images.find((asset) => { return asset.sys.id === id; });
    return imageAsset !== undefined ? imageAsset.fields.file.url : '';
  }

  render() {
    const { open } = this.props;
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
              <div style={{ height: 500 }}>
                <div style={headerStyle}><h1>{title}</h1></div>
              </div>
            </Parallax>
          </div>
          <Container open={open} mobile={isMobile()}>
            <Markdown source={body} />
          </Container>
        </React.Fragment>
      );
    }
    return <>Testing</>;
  }
}


export default BlogPage;
