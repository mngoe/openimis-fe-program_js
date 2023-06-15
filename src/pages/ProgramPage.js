import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { formatMessageWithValues, withModulesManager, withHistory, historyPush, journalize } from "@openimis/fe-core";
import ProgramForm from "../components/ProgramForm";
import { createProgram, updateProgram } from "../actions";

const styles = (theme) => ({
  page: theme.page,
});

class ProgramPage extends Component {

  add = () => {
    historyPush(this.props.modulesManager, this.props.history, "program.route.program");
  };

  save = (program) => {
    if (!program.idProgram) {
      this.props.createProgram(
        this.props.modulesManager,
        program,
        formatMessageWithValues(this.props.intl, "program", "CreateProgram.mutationLabel", { name: program.nameProgram }),
      );
    } else {
      this.props.updateProgram(
        this.props.modulesManager,
        program,
        formatMessageWithValues(this.props.intl, "program", "UpdateProgram.mutationLabel", { name: program.nameProgram }),
      );
    }
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ createProgram, updateProgram, journalize }, dispatch);
};

export default withHistory(
  withModulesManager(
    connect(mapStateToProps,mapDispatchToProps)(injectIntl(withTheme(withStyles(styles)(ProgramPage)))),
  ),
);
