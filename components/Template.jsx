import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import isMobile from 'is-mobile';
import MenuBar from './MenuBar';

const drawerWidth = 240;

const styles = (theme) => {
  return {
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginBottom: 64,
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 20,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 8px',
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  };
};

const Template = (props) => {
  const {
    classes, theme, open, toggleDrawer, title, history, blogs,
  } = props;
  // eslint-disable-next-line
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  return (
    <React.Fragment>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="default"
          className={!open || isMobile() ? classes.appBar : classes.appBarShift}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={toggleDrawer}
              className={!open ? classes.menuButton : classes.hide}
            >
              <MenuIcon />
            </IconButton>
            {title}
          </Toolbar>
        </AppBar>
        <Hidden xsDown>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={toggleDrawer}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <Divider />
            <MenuBar blogs={blogs} history={history} />
            {/* <List>
            <ListItem button key="Home" onClick={() => { return history.push('/'); }}>
              <ListItemText primary="Home" />
            </ListItem>
            {navItems.map((item) => {
              return (
                <ListItem button key={item.url} onClick={() => { return history.push(item.url); }}>
                  <ListItemText primary={item.title} />
                </ListItem>
              );
            })}
          </List> */}
          </Drawer>
        </Hidden>
        <Hidden smUp>
          <SwipeableDrawer
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
            onOpen={toggleDrawer}
            onClose={toggleDrawer}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={toggleDrawer}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <Divider />
            <MenuBar blogs={blogs} history={history} />
          </SwipeableDrawer>
        </Hidden>
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(Template);
