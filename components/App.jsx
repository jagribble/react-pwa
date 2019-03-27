import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createClient } from 'contentful';
import isMobile from 'is-mobile';

import Template from './Template';
import BlogPage from './BlogPage';
import Home from './Home';
import Container from './Container';
import UnderConstruction from './UnderConstruction';


const client = createClient({
  space: 'z8eeiao1aitz',
  accessToken: '169681cf555eb02d1298b7918d6b7c97c2999ebc4878dfce1b04d96cfa676c1a',
});

// const homeText = `
// # Home
// ---
// **Hello** World!`;
// const menuItems = [{ url: '/', title: 'Home' }, { url: '/test', title: 'test' }];
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true, home: {}, blogs: [], menuItems: [], assets: [],
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.getHomeContent = this.getHomeContent.bind(this);
    this.getBlogs = this.getBlogs.bind(this);
    this.renderRoutes = this.renderRoutes.bind(this);
    this.getMenuItems = this.getMenuItems.bind(this);
    this.getImageURL = this.getImageURL.bind(this);
  }

  componentWillMount() {
    this.getHomeContent();
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

  getHomeContent() {
    client.getEntries({
      content_type: 'home',
    })
      .then((response) => {
        this.setState({ home: response.items[0].fields, assets: response.includes.Asset });
      })
      .catch(console.error);
  }

  getMenuItems() {
    // const { blogs } = this.state;
    // const menuItems = blogs.map((blog) => {
    //   return { title: blog.fields.title, url: `/blog/${blog.fields.slug}` };
    // });
    this.setState({ menuItems: [{ title: 'comming soon', url: 'under-contruction' }] });
  }

  getImageURL(id) {
    const { assets } = this.state;
    const imageAsset = assets.find((asset) => { return asset.sys.id === id; });
    return imageAsset !== undefined ? imageAsset.fields.file.url : '';
  }

  toggleDrawer() {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  renderRoutes() {
    const { blogs, open } = this.state;
    return blogs.map((blog) => {
      const { fields } = blog;
      const imageURL = this.getImageURL(fields.heroImage.sys.id);
      return (<Route key={fields.slug} path={`/blog/${fields.slug}`} component={() => { return (<BlogPage image={imageURL} open={open} title={fields.title} body={`${fields.body}`} />); }} />);
    });
  }

  render() {
    const { home, menuItems, open } = this.state;
    const imageURL = home.heroImage ? this.getImageURL(home.heroImage.sys.id) : '';
    return (
      <MuiThemeProvider>
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
                        {...props}
                      />
                    );
                  }}
                />

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
                {/* {this.renderRoutes()} */}


              </div>
            </Route>
          </div>

        </Router>

      </MuiThemeProvider>
    );
  }
}
