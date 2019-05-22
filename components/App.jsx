import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import isMobile from 'is-mobile';

import Template from './Template';
import Home from './Home';
import Container from './Container';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

const menuItems = [{ title: 'Home', url: '/' }];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  render() {
    const { open } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <>
            <Route>
              <>
                <Route
                  render={(props) => {
                    return (
                      <Template
                        open={open}
                        toggleDrawer={this.toggleDrawer}
                        title="PWA Demo"
                        navItems={menuItems}
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
                </Switch>
              </>
            </Route>
          </>

        </Router>

      </MuiThemeProvider>
    );
  }
}
