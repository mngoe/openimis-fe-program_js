import React from "react";
import { withTheme, withStyles } from "@material-ui/core/styles";
import {
  ControlledField,
  PublishedComponent,
  formatMessage,
  FormPanel,
  TextInput,
  withModulesManager,
} from "@openimis/fe-core";
import { injectIntl } from "react-intl";
import { Grid } from "@material-ui/core";

const styles = (theme) => ({
  item: theme.paper.item,
});

class ProgramMasterPanel extends FormPanel {

  render() {
    const { intl, classes, edited, onEditedChanged, reset, readOnly = false } = this.props;

    console.log(edited);

    return (
      <Grid container>
        <ControlledField
          module="program"
          id="program.name"
          field={
            <Grid item xs={4} className={classes.item}>
              <TextInput
                module="program"
                label="ProgramForm.name"
                name="name"
                value={edited.nameProgram}
                readOnly={readOnly}
                reset={reset}
                required={true}
                onChange={(v, s) => this.updateAttribute("nameProgram", v)}
              />
            </Grid>
          }
        />
        <ControlledField
          module="program"
          id="Program.validityDate"
          field={
            <Grid item xs={4} className={classes.item}>
              <PublishedComponent
                pubRef="core.DatePicker"
                value={edited?.validityDate}
                required
                module="program"
                reset={reset}
                label={formatMessage(intl, "program", "validityDate")}
                readOnly={readOnly}
                onChange={(validityDate) => onEditedChanged({ ...edited, validityDate })}
              />
            </Grid>
          }
        />
      </Grid>
    );
  }
}

export default withModulesManager(injectIntl(withTheme(withStyles(styles)(ProgramMasterPanel))));
