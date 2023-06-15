import React, { Component, Fragment} from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { withTheme, withStyles } from "@material-ui/core/styles";
import {
  Helmet,
  formatMessageWithValues,
  Form,
  withModulesManager,
  withHistory,
  ProgressOrError,
  journalize
} from "@openimis/fe-core";
import { bindActionCreators } from "redux";
import { fetchProgram } from "../actions";
import ProgramMasterPanel from "../components/ProgramMasterPanel";

const styles = (theme) => ({
  lockedPage: theme.page.locked,
});

class ProgramForm extends Component {
  state = {
    lockNew: false,
    reset: 0,
    program_name: null,
    program: this._newProgram(),
    newProgram: true,
  };

  _newProgram() {
    let program = {};
    return program;
  }

  componentDidMount() {
    if (this.props.program_name) {
      this.setState((state, props) => ({ program_name: props.program_name }));
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.fetchedProgram !== this.props.fetchedProgram &&
      !!this.props.fetchedProgram &&
      !!this.props.program
    ) {
      this.setState((state, props) => ({
        program: {
          ...props.program
        },
        program_name: props.program.nameProgram,
        lockNew: false,
        newProgram: false,
      }));
    } else if (prevState.program_name !== this.state.program_name) {
      this.props.fetchProgram(this.props.modulesManager, this.state.program_name);
    } else if (prevProps.program_name && !this.props.program_name) {
      this.setState({ program: this._newProgram(), lockNew: false, program_name: null });
    } else if (prevProps.submittingMutation && !this.props.submittingMutation) {
      this.props.journalize(this.props.mutation);
      this.setState((state) => ({ reset: state.reset + 1 }));
    }
  }

  _add = () => {
    this.setState(
      (state) => ({
        program: this._newProgram(),
        lockNew: false,
        newProgram: true,
        reset: state.reset + 1,
      }),
      (e) => {
        this.props.add();
        this.forceUpdate();
      },
    );
  };

  onEditedChanged = (program) => {
    this.setState({ program, newProgram: false });
  };

  canSave = () => {
    if (!this.state.program.nameProgram) return false;
    if (!this.state.program.validityDateFrom) return false;
    return true;
  };

  reload = () => {
    this.props.fetchProgram(
      this.props.modulesManager,
      this.state.program_name
    );
  };

  _save = (program) => {
    this.setState(
      { lockNew: !program.name }, // avoid duplicates
      (e) => this.props.save(program),
    );
  };

  render() {
    const {
      intl,
      modulesManager,
      classes,
      fetchingProgram,
      fetchedProgram,
      errorProgram,
      add,
      save,
      back
    } = this.props;

    const { program_name, lockNew, program, newProgram, reset, update } = this.state;

    return (
      <Fragment>
        <Helmet
          title={formatMessageWithValues(this.props.intl, "program", "edit.page.title", {
            name: this.state.program.nameProgram,
          })}
        />
        <ProgressOrError progress={fetchingProgram} error={errorProgram} />
        {(!!fetchedProgram || !program_name) && (
          <Fragment>
            <Form
              module="program"
              edited_id={program.id}
              edited={program}
              reset={reset}
              update={update}
              title="program.edit.title"
              titleParams={{ name: program.name }}
              back={back}
              add={!!add && !newProgram ? this._add : null}
              save={!!save ? this._save : null}
              canSave={this.canSave}
              reload={(program_name) && this.reload}
              readOnly={false}
              HeadPanel={ProgramMasterPanel}
              onEditedChanged={this.onEditedChanged}
            />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => ({
  program: state.program.program,
  fetchingProgram: state.program.fetchingProgram,
  fetchedProgram: state.program.fetchedProgram,
  errorProgram: state.program.errorProgram,
  submittingMutation: state.program.submittingMutation,
  mutation: state.program.mutation
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchProgram, journalize }, dispatch);
};

export default withHistory(
  withModulesManager(connect(mapStateToProps, mapDispatchToProps)(injectIntl(withTheme(withStyles(styles)(ProgramForm))))),
);
