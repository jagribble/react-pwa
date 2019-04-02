import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Typograohy from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Markdown from 'react-markdown';

const styles = () => {
  return {
    page: {
      paddingTop: 1,
    },
    card: {
      margin: 25,

    },
    sneakPeak: {
      width: '100%',
      height: 100,
      overflowY: '-webkit-paged-y',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    description: {
      overflowY: 'hidden',
      textOverflow: 'ellipsis',
    },
    content: {
      padding: 25,
      height: 280,
    },
    contentMobile: {
      padding: 25,
    },
    chip: {
      marginRight: 5,
      marginTop: 5,
    },
    divider: {
      marginBottom: 5,
    },
    image: {
      height: 280,
      width: '100%',
    },
  };
};

const getDate = (string) => {
  return new Date(string).toLocaleDateString();
};


class BlogHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.getChips = this.getChips.bind(this);
    this.getImageURL = this.getImageURL.bind(this);
  }


  getChips(tags, id) {
    const { classes } = this.props;
    return tags ? tags.map((tag) => { return <Chip label={tag} key={`${tag}_${id}`} className={classes.chip} />; }) : '';
  }

  getImageURL(id) {
    const { images } = this.props;
    const imageAsset = images.find((asset) => { return asset.sys.id === id; });
    return imageAsset !== undefined ? imageAsset.fields.file.url : '';
  }


  render() {
    const { blogs, classes, history } = this.props;
    console.log(blogs);
    return (
      <div className={classes.page}>
        {blogs.map((blog) => {
          const {
            title, publishDate, description, shortDescription, tags, heroImage, slug,
          } = blog.fields;
          const heroImageUrl = `https:${this.getImageURL(heroImage.sys.id)}?fm=jpg&fl=progressive`;
          return (
            <Card className={classes.card} key={title} onClick={() => { history.push(`/blog/${slug}`); }}>

              <Hidden xsDown>
                <Grid container>
                  <Grid item sm={8} xs={12}>
                    <CardContent className={classes.content}>
                      <Typograohy variant="h3">{title}</Typograohy>

                      {/* <Typograohy>{author}</Typograohy> */}
                      <Typograohy
                        gutterBottom
                        noWrap
                        className={classes.description}
                      >
                        <i>{description}</i>

                      </Typograohy>
                      <Divider className={classes.divider} />

                      <Markdown source={shortDescription} className={classes.sneakPeak} />

                      <Typograohy>
Published on
                        {' '}
                        <i>{getDate(publishDate)}</i>
                      </Typograohy>
                      {this.getChips(tags, blog.sys.id)}
                    </CardContent>
                  </Grid>
                  <Grid item sm={4} xs={12}>
                    <CardMedia
                      className={classes.image}
                      image={heroImageUrl}
                      title={title}
                    />
                  </Grid>
                </Grid>
              </Hidden>
              <Hidden smUp>
                <Grid container direction="column">
                  <Grid item xs>
                    <CardContent className={classes.contentMobile}>
                      <Typograohy variant="h5">{title}</Typograohy>

                      {/* <Typograohy>{author}</Typograohy> */}
                      <Typograohy
                        gutterBottom
                        noWrap
                        className={classes.description}
                      >
                        <i>{description}</i>

                      </Typograohy>
                      <Divider className={classes.divider} />

                      <Markdown source={shortDescription} className={classes.sneakPeak} />

                      <Typograohy>
Published on
                        {' '}
                        <i>{getDate(publishDate)}</i>
                      </Typograohy>
                      {this.getChips(tags, blog.sys.id)}
                    </CardContent>
                  </Grid>
                  <Grid item xs>
                    <CardMedia
                      className={classes.image}
                      image={heroImageUrl}
                      title={title}
                    />
                  </Grid>
                </Grid>
              </Hidden>
            </Card>
          );
        })}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(BlogHomePage);
