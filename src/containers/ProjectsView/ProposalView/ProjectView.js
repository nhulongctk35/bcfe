import React from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import { Card, Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    padding: theme.spacing(1)
  },
  title: {
    fontSize: "1.8em",
    textAlign: "left",
    color: "#333",
    marginTop: "0",
    marginBottom: "0"
  },
  subtitle: {
    fontSize: "1.2em",
    textAlign: "left",
    color: "#333",
    marginTop: "0",
    paddingLeft: theme.spacing(1),
    marginBottom: "4px",
    fontWeight: "bold"
  },
  bottomLine: {
    borderBottom: "1px solid #dedede"
  },
  template: {
    display: "inline",
    fontSize: "1em",
    textAlign: "left",
    color: "#444",
    marginTop: "0",
    paddingLeft: theme.spacing(1)
  },
  desc: {
    fontSize: "1em",
    textAlign: "left",
    color: "#444",
    marginTop: "0",
    paddingLeft: theme.spacing(1)
  },
  budget: {
    display: "inline-block",
    position: "relative",
    left: theme.spacing(1),
    fontSize: "1em",
    textAlign: "left",
    fontWeight: "bold",
    color: "#666"
  },
  posttime: {
    display: "inline-block",
    position: "relative",
    left: theme.spacing(3),
    fontSize: "1em",
    textAlign: "left",
    fontWeight: "normal",
    color: "#666"
  },
  busy: {
    position: "absolute",
    left: "calc(50% - 10px)",
    top: "calc(50%-10px)"
  },
  status: {
    marginTop: theme.spacing(1),
    fontSize: "1em",
    textAlign: "left",
    fontWeight: "bold",
    color: "#060"
  },
  margin: theme.spacing(1),
  minWidth: 120,
  submitBtn: {
    border: "1px solid #4a148c",
    borderRadius: 0,
    backgroundColor: theme.palette.primary.light,
    color: "#FFFFFF",
    margin: 5,
    float: "right",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark
    },
    "&:disabled": {
      backgroundColor: "#FFFFFF"
    }
  }
});

const ProjectView = ({ classes, project }) => {
  const posttime = "Posted 10 minutes ago";
  return (
    <Card className={classes.root}>
      <Grid container spacing={3} id="project-description">
        {/* <Grid container item sm={12} md={9} spacing={2}> */}
        <Grid container item sm={12} spacing={2}>
          <Grid container item sm={12} className={classes.bottomLine}>
            <Grid item xs={12} sm={10} className="desc">
              <h1 className={classes.title}>{project.title}</h1>
            </Grid>
            <Grid item xs={12} sm={2}>
              <p className={classes.status}>
                {project.status && project.status.toUpperCase()}
              </p>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <div styles={{ display: "block" }}>
              <p className={classes.budget}>{project.budget}</p>
              <p className={classes.posttime}>{posttime}</p>
            </div>
            <Typography className={classes.desc}>
              {project.description}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography component='div' className={classes.desc}>
              {project.projectFiles && project.projectFiles.length > 0 && (
                project.projectFiles.map(file => (
                  <p key={file.id}>{file.name}</p>
                ))
              )}
            </Typography>
          </Grid>
        </Grid>
        {/* <Grid item sm={12} md={3}>
          <Grid container item sm={12} className={classes.bottomLine}>
            <p className={classes.subtitle}>Client Information</p>
          </Grid>
          <p className={classes.desc}>{project.genContractor.email}</p>
        </Grid> */}
      </Grid>
    </Card >
  );
};

ProjectView.propTypes = {
  classes: PropTypes.object.isRequired,
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    budget: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    status: PropTypes.string,
    genContractor: PropTypes.shape({
      id: PropTypes.string.isRequired
    }),
    projectFiles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      })
    ),
    projectTemplates: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        template: PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
          categoryList: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.string.isRequired,
              name: PropTypes.string.isRequired,
              type: PropTypes.string.isRequired,
              value: PropTypes.string.isRequired,
              optionList: PropTypes.arrayOf(PropTypes.object)
            })
          )
        })
      })
    )
  }).isRequired
};

// const mapStateToProps = (state) => ({
//   project: state.gen_data.selectedProject
// })

// const mapDispatchToProps = {

// }

// const ConnectedProjectView = connect(mapStateToProps)(ProjectView);
export default withStyles(styles)(ProjectView);
