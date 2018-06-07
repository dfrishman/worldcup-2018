import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import MailFolderListItems  from './tileData';
import logo from '../images/nav-logo.png'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  logo: {
    width: '20%',
    cursor: 'pointer'
  },
  navBtns: {
    textAlign: 'right',
    flex: 1
  },
  smDown: {
    width: '100%'
  },
  menuIcon: {
    width: '100%',
    textAlign: 'right'
  }
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { classes, theme, history } = this.props;

    const drawer = (
      <div>
        <List><MailFolderListItems /></List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <img className={classes.logo} src={logo} alt='' onClick={() => history.push(`/`)}/>
            <Hidden mdUp>
              <div className={classes.menuIcon}>
                <MenuIcon onClick={this.handleDrawerToggle}/>
              </div>
              </Hidden>
            <Hidden className={classes.smDown} smDown implementation="css">
              <div className={classes.navBtns}>
                <Button color="inherit" onClick={() => history.push(`/fixtures`)}>Fixtures</Button>
                <Button color="inherit">Results</Button>
                <Button color="inherit">Standings</Button>
                <Button color="inherit" onClick={() => history.push(`/teams`)}>Teams</Button>
              </div>
              </Hidden>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'left' : 'right'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withRouter(withStyles(styles, { withTheme: true })(ResponsiveDrawer));
