import React, {useContext} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import {P_MENUS} from '../../utils/constants';
import {UserContext} from '../../store/context/userContext';
import bg from '../../assets/images/bgbrandnewnew.gif';
import setmeupicon from '../../assets/images/setmeupicon.png';
import subscribeicon from '../../assets/images/subscribeicon.png';
import reseticon from '../../assets/images/reseticon.png';
import travellericon from '../../assets/images/travellericon.png';
import {useRenderCounts} from  '../../hooks/api-hooks';

// import GridListTile from '@material-ui/core/GridListTile';
// import GridListTileBar from '@material-ui/core/GridListTileBar';
// import IconButton from '@material-ui/core/IconButton';
// import InfoIcon from '@material-ui/icons/Info';
function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link>
      {' team.'}
    </Typography>
  );
}
const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    padding: 0,
    marginTop: '12px',
    padding : '15px'
    // marginLeft: '10px',
    // marginRight:'10px'
    // paddingTop: theme.spacing(8),
    // paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '0px',
    background: 'transparent'
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    paddingTop: '40%',
    paddingBottom: '5%',
    color: '#fff',
    height: '100%',
  },
  cardContent: {
    // flexGrow: 1,
    // position: 'relative',
    // bottom: '127px'
    paddingTop: '56.25%', // 16:9
    paddingTop: '40%',
    paddingBottom: '5%',
    color: '#fff',
    height: '100%',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  text: {
    minHeight: '83px',
    color: '#03a9f4'
    // color: '#000'
  }
}));

const cards = P_MENUS;

export default function Album() {
  useRenderCounts('AppPages.js');  
  const classes = useStyles();
  const {handleNav} = useContext(UserContext);
  
  return (
    <React.Fragment>      
      {/* <main> */}
        {/* Hero unit */}        
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={1}>
            {cards.map((card, indx) => {
              let styleobj;
              switch (card.icon) {
                case 'setmeupicon':
                    styleobj = {backgroundImage: `url(${setmeupicon})`,
                    backgroundRepeat:'no-repeat',
                    backgroundPosition: 'top'}
                    break;
                case 'travellericon':
                    styleobj = {backgroundImage: `url(${travellericon})`,
                    backgroundRepeat:'no-repeat',
                    backgroundPosition: 'top'}
                    break;
                case 'subscribeicon':
                    styleobj = {backgroundImage: `url(${subscribeicon})`,
                    backgroundRepeat:'no-repeat',
                    backgroundPosition: 'top'}
                    break;
                case 'reseticon':
                    styleobj = {backgroundImage: `url(${reseticon})`,
                    backgroundRepeat:'no-repeat',
                    backgroundPosition: 'top'}
                    break;
                default:

              }
              return (
              <Grid item key={`${indx}-${card.page}`} xs={6} sm={6} md={4} style={styleobj}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent} 
                    onClick={() => handleNav(card.page === 'Home'?'SetMeup':card.page)}>
                  {/* // <CardMedia
                  //   className={classes.cardMedia}
                  //   // image="https://source.unsplash.com/random"
                  //   image={''}
                  //   title="Image title"
                  //   onClick={() => handleNav(card.page === 'Home'?'SetMeup':card.page)}
                  // > */}
                    <Button color="primary" className={`${classes.text} landing-navs`} style={{animationDelay: `${indx}s`}}>
                      <Typography gutterBottom variant="h6" component="h2" style={{fontWeight:'bold'}}>
                        {card.label === 'Home'?'Set me up':card.label}
                      </Typography>
                    </Button>
                    {/* // <Typography>
                    //   This is a media card. You can use this section to describe the content.
                    // </Typography> */}
                  </CardContent>
                  {/* <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the content.
                    </Typography>
                  </CardContent>                   */}
                </Card>
                {/* <GridListTile key={card}>
                  <img src="https://source.unsplash.com/random" alt="title" />
                  <GridListTileBar
                    title="{tile.title}"
                    subtitle={<span>by: Author</span>}
                    actionIcon={
                      <IconButton aria-label={`info about Title`} className={classes.icon}>
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </GridListTile> */}
              </Grid>
            )
              })}
          </Grid>
        </Container>
      {/* </main>      */}
    </React.Fragment>
  );
}