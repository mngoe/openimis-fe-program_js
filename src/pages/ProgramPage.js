import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { withModulesManager, withHistory, historyPush } from "@openimis/fe-core";
import ProgramForm from "../components/ProgramForm";

const styles = (theme) => ({
  page: theme.page,
});

class ProgramPage extends Component {

  add = () => {
    historyPush(this.props.modulesManager, this.props.history, "program.route.program");
  };

  save = (program) => {
  };

  render() {
    const { modulesManager, history, classes, program_name } = this.props;
    return (
      <div className={classes.page}>
        <ProgramForm
          program_name={program_name}
          back={(e) => historyPush(modulesManager, history, "program.programs")}
          add={this.add}
          save={this.save}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  program_name: props.match.params.program_name,
});

export default withHistory(
  withModulesManager(
    connect(mapStateToProps)(injectIntl(withTheme(withStyles(styles)(ProgramPage)))),
  ),
);
