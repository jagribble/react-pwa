import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';


const menuItems = {
  data: [{
    name: 'Home',
    url: '/',
  }, {
    name: 'All Blogs',
    url: '/blog',
  }],
};
const styles = {
  list: {
    width: 250,
  },
  links: {
    textDecoration: 'none',
  },
  menuHeader: {
    paddingLeft: '30px',
  },
  items: {
    marginLeft: 10,
  },
};
class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
    this.go = this.go.bind(this);
  }

  // this method sets the current state of a menu item
  // i.e whether it is in expanded or collapsed or a collapsed state
  handleClick(item) {
    this.setState((prevState) => {
      return { [item]: !prevState[item] };
    });
  }

  go(url) {
    const { history } = this.props;
    history.push(url);
  }

  // if the menu item doesn't have any child, this method simply returns a clickable
  // menu item that redirects to any location and if there is no child this method
  // uses recursion to go until the last level
  // of children and then returns the item by the first condition.
  handler(children, depth) {
    const { state } = this;
    const { classes } = this.props;
    return children.map((subOption) => {
      if (!subOption.children) {
        return (
          <div key={subOption.name}>
            <ListItem
              button
              key={subOption.name}
              onClick={() => { this.go(subOption.url); }}
            >

              <ListItemText
                className={depth > 0 ? classes.items : ''}
                inset
                primary={subOption.name}
              />

            </ListItem>
          </div>
        );
      }
      return (
        <div key={subOption.name}>
          <ListItem
            button
            onClick={() => { return this.handleClick(subOption.name); }}
          >
            <ListItemText
              inset
              primary={subOption.name}
            />
            { state[subOption.name]
              ? <ExpandLess />
              : <ExpandMore />
            }
          </ListItem>
          <Collapse
            in={state[subOption.name]}
            timeout="auto"
            unmountOnExit
          >
            { this.handler(subOption.children, depth + 1) }
          </Collapse>
        </div>
      );
    });
  }

  render() {
    const {
      blogs,
    } = this.props;
    const children = [];
    blogs.forEach((blog) => {
      children.push({ name: blog.fields.title, url: `/blog/${blog.fields.slug}` });
    });
    const blogMenu = { name: 'Blogs', children };
    if (!menuItems.data.find((item) => { return item.name === 'Blogs'; }) && children.length > 0) { menuItems.data.push(blogMenu); }
    return (

      <div>
        <List>
          { this.handler(menuItems.data, 0) }
        </List>
      </div>

    );
  }
}
export default withStyles(styles)(MenuBar);
