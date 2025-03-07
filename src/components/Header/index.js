import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import auth0Client from '../../auth0/auth';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
		fontWeight: 600,
		fontSize: '2.1rem'
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
	appbarstyle: {
		backgroundColor: theme.palette.primary.main
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	profilemenu: {
		top: '50px'
	}
});

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			anchorEl: null,
			mobileMoreAnchorEl: null,
		}
	}

	handleProfileMenuOpen = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleMenuClose = () => {
		this.setState({ anchorEl: null });
		this.handleMobileMenuClose();
	};

	handleMobileMenuOpen = event => {
		this.setState({ mobileMoreAnchorEl: event.currentTarget });
	};

	handleMobileMenuClose = () => {
		this.setState({ mobileMoreAnchorEl: null });
	};

	handleUserLogIn = () => {
		auth0Client.signIn();
	}

	handleUserLogOut = () => {
		auth0Client.signOut();
		this.handleMenuClose();
		this.props.history.replace('/');
	}

	render() {
		const { anchorEl, mobileMoreAnchorEl } = this.state;
		const { classes } = this.props;
		const isMenuOpen = Boolean(anchorEl);
		const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

		const renderMenu = (
			<Menu
				className={classes.profilemenu}
				anchorEl={anchorEl}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={isMenuOpen}
				onClose={this.handleMenuClose}>

				<MenuItem className={classes.menuItem} component={Link} to='/profile' onClick={this.handleMenuClose}>
					<ListItemIcon className={classes.icon}>
						<AccountCircle />
					</ListItemIcon>
					<ListItemText inset primary="Profile" />
				</MenuItem>
				<MenuItem className={classes.menuItem} component={Link} to='/settings' onClick={this.handleMenuClose}>
					<ListItemIcon className={classes.icon}>
						<SettingsIcon />
					</ListItemIcon>
					<ListItemText inset primary="Settings" />
				</MenuItem>
				<MenuItem className={classes.menuItem} onClick={this.handleUserLogOut}>
					<ListItemIcon className={classes.icon}>
						<ExitToAppIcon />
					</ListItemIcon>
					<ListItemText inset primary="LogOut" />
				</MenuItem>
			</Menu>
		);

		const renderMobileMenu = (
			<Menu
				anchorEl={mobileMoreAnchorEl}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={isMobileMenuOpen}
				onClose={this.handleMenuClose}
			>
				<MenuItem onClick={this.handleMobileMenuClose}>
					<IconButton color="inherit">
						<Badge badgeContent={11} color="secondary">
							<NotificationsIcon />
						</Badge>
					</IconButton>
					<p>Notifications</p>
				</MenuItem>
				<MenuItem onClick={this.handleProfileMenuOpen}>
					<IconButton color="inherit">
						<AccountCircle />
					</IconButton>
					<p>Profile</p>
				</MenuItem>
			</Menu>
		);

		const rightApp = auth0Client.isAuthenticated() ? (
			<div>
				<div className={classes.sectionDesktop}>
					<IconButton color="inherit">
						<Badge badgeContent={17} color="secondary">
							<NotificationsIcon />
						</Badge>
					</IconButton>
					<IconButton
						aria-owns={isMenuOpen ? 'material-appbar' : undefined}
						aria-haspopup="true"
						onClick={this.handleProfileMenuOpen}
						color="inherit"
					>
						<AccountCircle />
					</IconButton>
				</div>
				<div className={classes.sectionMobile}>
					<IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
						<MoreIcon />
					</IconButton>
				</div></div>
		) : (
				<Button color="inherit" onClick={this.handleUserLogIn}>Login</Button>
			);

		return (
			<div className={classes.root}>
				<AppBar position="static" className={classes.appbarstyle}>
					<Toolbar>
						<Typography variant="h6" color="inherit" className={classes.grow}>
							Logo
                  		</Typography>
						<div className={classes.grow} />
						{rightApp}
					</Toolbar>
				</AppBar>
				{renderMenu}
				{renderMobileMenu}
			</div>
		);
	}

}

Header.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Header));