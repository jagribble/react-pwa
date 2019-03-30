import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const styles = (theme) => {
  return {
    content: {
      flexGrow: 1,
      marginTop: 64,
      padding: 25,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: 0,
    },
    contentShift: {
      marginTop: 64,
      padding: 25,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    },
  };
};

const Container = (props) => {
  const {
    classes, open, mobile, children,
  } = props;

  return (
    <div className={(!open && !mobile) || mobile ? classes.content : classes.contentShift}>
      {children}
    </div>);
};

export default withStyles(styles, { withTheme: true })(Container);
