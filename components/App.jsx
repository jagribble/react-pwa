import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createClient } from 'contentful';
import isMobile from 'is-mobile';

import Template from './Template';
import BlogPage from './BlogPage';
import Home from './Home';
import BlogHomePage from './BlogHomePage';
import Container from './Container';
import UnderConstruction from './UnderConstruction';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_TOKEN,
});

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});
console.log(process.env);
// const homeText = `
// # Home
// ---
// **Hello** World!`;
// const menuItems = [{ url: '/', title: 'Home' }, { url: '/test', title: 'test' }];
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false, blogs: [], menuItems: [], assets: [],
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.getBlogs = this.getBlogs.bind(this);
    this.getImageURLs = this.getImageURLs.bind(this);
    this.getMenuItems = this.getMenuItems.bind(this);
    this.getImageURL = this.getImageURL.bind(this);
  }

  componentWillMount() {
    this.getBlogs();
  }

  getBlogs() {
    client.getEntries({
      content_type: 'blogPost',
    })
      .then((response) => {
        this.setState({ blogs: response.items, assets: response.includes.Asset }, () => {
          this.getMenuItems();
        });
      })
      .catch(console.error);
  }

  getMenuItems() {
    this.setState({ menuItems: [{ title: 'Blogs', url: '/Blog' }] });
  }

  getImageURL(id) {
    const { assets } = this.state;
    const imageAsset = assets.find((asset) => { return asset.sys.id === id; });
    return imageAsset !== undefined ? imageAsset.fields.file.url : '';
  }

  getImageURLs() {
    const { blogs } = this.state;
    return blogs.map((blog) => {
      const { fields } = blog;
      const imageURL = this.getImageURL(fields.heroImage.sys.id);
      return { blog: blog.id, imageURL };
    });
  }

  toggleDrawer() {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  render() {
    const {
      menuItems, open, blogs, assets,
    } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div>
            <Route>
              <div>
                <Route
                  render={(props) => {
                    return (
                      <Template
                        open={open}
                        toggleDrawer={this.toggleDrawer}
                        title="Jules Gribble"
                        navItems={menuItems}
                        blogs={blogs}
                        {...props}
                      />
                    );
                  }}
                />
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={(props) => {
                      return (
                        <Container
                          open={open}
                          mobile={isMobile()}
                        >
                          <Home
                            {...props}
                          />
                        </Container>
                      );
                    }}
                  />
                  <Route
                    exact
                    path="/under-contruction"
                    render={(props) => {
                      return (
                        <Container
                          open={open}
                          mobile={isMobile()}
                        >
                          <UnderConstruction
                            {...props}
                          />
                        </Container>
                      );
                    }}
                  />
                  <Route
                    exact
                    path="/blog"
                    render={(props) => {
                      return (
                        <Container
                          open={open}
                          mobile={isMobile()}
                        >
                          <BlogHomePage
                            blogs={blogs}
                            images={assets}
                            {...props}
                          />
                        </Container>
                      );
                    }}
                  />
                  <Route

                    path="/blog/:slug"
                    render={(props) => {
                      return (

                        <BlogPage
                          blogs={blogs}
                          images={assets}
                          open={open}
                          {...props}
                        />

                      );
                    }}
                  />
                  {/* {this.renderRoutes()} */}
                </Switch>

              </div>
            </Route>
          </div>

        </Router>

      </MuiThemeProvider>
    );
  }
}
