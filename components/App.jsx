import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router } from 'react-router';
import { Route } from 'react-router-dom';
import { createClient } from 'contentful';
import createBrowserHistory from 'history/createBrowserHistory';

import Template from './Template';
import BlogPage from './BlogPage';


const client = createClient({
  space: 'z8eeiao1aitz',
  accessToken: '169681cf555eb02d1298b7918d6b7c97c2999ebc4878dfce1b04d96cfa676c1a',
});

const history = createBrowserHistory();
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
    const { blogs } = this.state;
    const menuItems = blogs.map((blog) => {
      return { title: blog.fields.title, url: `/blog/${blog.fields.slug}` };
    });
    this.setState({ menuItems });
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
        <Router history={history}>
          <div>
            <Route>
              <div>
                <Route
                  component={() => {
                    return (
                      <Template
                        open={open}
                        toggleDrawer={this.toggleDrawer}
                        title="Devs in Berkshire"
                        navItems={menuItems}
                        history={history}
                      />
                    );
                  }}
                />

                <Route
                  exact
                  path="/"
                  component={() => {
                    return (
                      <BlogPage
                        image={imageURL}
                        open={open}
                        title={home.title}
                        body={`${home.body}`}
                      />
                    );
                  }}
                />
                {this.renderRoutes()}


              </div>
            </Route>
          </div>

        </Router>

      </MuiThemeProvider>
    );
  }
}
