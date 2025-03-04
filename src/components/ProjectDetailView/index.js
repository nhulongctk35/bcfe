import React from 'react';
import { Route, Link, Switch, Redirect, withRouter } from 'react-router-dom';
import SecuredRoute from '../../routers/SecuredRoute';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import NoSsr from '@material-ui/core/NoSsr';

import ProjectOverView from './ProjectOverView';
import ProjectBidders from './ProjectBidders';
import ProjectFiles from './ProjectFiles';
import ProjectMessages from './ProjectMessages';
import ProjectProposals from './ProjectProposals';
import ProjectTemplates from './ProjectTemplates';
import ProposalsCompare from './ProposalsCompare';

import { getProjectData } from '../../actions';
import { dispatch } from 'rxjs/internal/observable/range';
import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const styles = theme => ({
	root: {
		flexGrow: 1,
		height: "calc(100vh - 64px - 56px - 20px)",
		margin: "10px",
	},
	backBtn: {
		color: theme.palette.primary.dark
	},
	toolbarstyle: {
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.primary.dark,
		flexGrow: 1,
	},
	waitingSpin: {
		position: "relative",
		left: "calc(50% - 10px)",
		top: "calc(40vh)",
	},
});

class ConnectedProjectDetailView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		}
	}

	async componentDidMount() {
		const { match } = this.props;

		await this.props.getProjectData(match.params.id);
	}

	handleBack = () => {
		const { match } = this.props;
		if (match.url.includes("g_cont"))
			this.props.history.push("/g_cont");
		else if (match.url.includes("a_pros"))
			this.props.history.push("/a_pros");
	}

	render() {
		const { classes, match, project, location } = this.props;
		const owner = match.url.includes('/g_cont');

		const tabNo = [
			match.url + '/overview',
			match.url + '/bidders',
			match.url + '/files',
			match.url + '/messages',
			match.url + '/proposals',
			match.url + '/templates',
			match.url + '/compare'
		];

		let curTabPos = 0;

		for (let i = 0; i < tabNo.length; i++) {
			if (tabNo[i] === location.pathname) {
				curTabPos = i;
				break;
			}
		}

		if (location.pathname === match.url)
			curTabPos = 0;

		if (project === null)
			return <div />;

		return (

			<NoSsr>
				<div className={classes.root}>
					<Paper square >
						<div style={{ display: 'flex' }}>
							<IconButton className={classes.backBtn} onClick={this.handleBack}>
								<ArrowBackIcon />
							</IconButton>
							<Tabs
								value={curTabPos}
								variant="scrollable"
								indicatorColor="primary"
								textColor="primary"
								scrollButtons="off"
								className={classes.toolbarstyle}
							>
								<Tab component={Link} to={`${match.url}/overview`} label="Overview" />
								<Tab component={Link} to={`${match.url}/bidders`} label="Bidders" />
								<Tab component={Link} to={`${match.url}/files`} label="Files" />
								<Tab component={Link} to={`${match.url}/messages`} label="Messages" />
								<Tab component={Link} to={`${match.url}/proposals`} label="Proposals" />
								<Tab component={Link} to={`${match.url}/templates`} label="Templates" />
								{owner && <Tab component={Link} to={`${match.url}/compare`} label="Compare" />}
							</Tabs>
						</div>

						<Switch>
							<SecuredRoute path={`${match.url}/overview`} component={ProjectOverView} />
							<SecuredRoute path={`${match.url}/bidders`} /* component={ProjectBidders} */ render={() => <div />} />
							<SecuredRoute path={`${match.url}/files`} component={ProjectFiles} />
							<SecuredRoute path={`${match.url}/messages`} /*component={ProjectMessages}*/ render={() => <div />} />
							<SecuredRoute path={`${match.url}/proposals`} component={ProjectProposals} />
							<SecuredRoute path={`${match.url}/templates`} component={ProjectTemplates} />
							{owner && <SecuredRoute path={`${match.url}/compare`} component={ProposalsCompare} />}
							<Redirect path={`${match.url}`} to={`${match.url}/overview`} />
						</Switch>
					</Paper>
				</div></NoSsr>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getProjectData: (id) => dispatch(getProjectData(id))
	}
};

const mapStateToProps = state => {
	return {
		project: state.global_data.project,
	};
};

const ProjectDetailView = connect(mapStateToProps, mapDispatchToProps)(ConnectedProjectDetailView);

ProjectDetailView.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ProjectDetailView));