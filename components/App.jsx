// src/routes.js

import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router } from 'react-router';
import { Route } from 'react-router-dom';
import { createClient } from 'contentful';
import createBrowserHistory from 'history/createBrowserHistory';

import Template from './Template';
import Container from './Container';
import Home from './Home';

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
      open: true, homeText: '', blogs: [], menuItems: [],
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.getHomeContent = this.getHomeContent.bind(this);
    this.getBlogs = this.getBlogs.bind(this);
    this.renderRoutes = this.renderRoutes.bind(this);
    this.getMenuItems = this.getMenuItems.bind(this);
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
        this.setState({ blogs: response.items }, () => {
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
        this.setState({ homeText: response.items[0].fields.body });
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

  toggleDrawer() {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  renderRoutes() {
    const { blogs } = this.state;
    return blogs.map((blog) => {
      const { fields } = blog;
      return <Route key={fields.slug} path={`/blog/${fields.slug}`} component={() => { return (<Home text={`${fields.body}`} />); }} />;
    });
  }

  render() {
    const { homeText, menuItems, open } = this.state;
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
                <Container
                  open={open}
                >
                  <Route exact path="/" component={() => { return (<Home text={`${homeText}`} />); }} />
                  {this.renderRoutes()}
                </Container>

              </div>
            </Route>
          </div>

        </Router>

      </MuiThemeProvider>
    );
  }
}
