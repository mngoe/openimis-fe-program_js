import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import React, { useState, Component, Fragment } from 'react';
import { useModulesManager, useTranslations, useGraphqlQuery, Autocomplete, withModulesManager, ControlledField, TextInput, formatPageQueryWithCount, graphql, formatMutation, decodeId, toISODate, ConfirmDialog, formatMessage, Searcher, formatMessageWithValues, formatDateFromISO, withHistory, withTooltip, historyPush, PublishedComponent, FormPanel, Helmet, ProgressOrError, Form, journalize, dispatchMutationResp, dispatchMutationErr, dispatchMutationReq, parseData, formatGraphQLError, pageInfo } from '@openimis/fe-core';
import _debounce from 'lodash/debounce';
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import _inherits from '@babel/runtime/helpers/inherits';
import { injectIntl } from 'react-intl';
import { Grid, Tooltip, IconButton, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { withTheme, withStyles } from '@material-ui/core/styles';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tab, Delete } from '@material-ui/icons';

var messages_en = {
	"program.ProgramPicker.placeholder": "Select Program",
	"program.programSummaries": "{count} program(s) found",
	"program.program.name": "Program Name",
	"program.ProgramForm.code": "Program code",
	"program.program.code": "Program code",
	"program.program.validity": "Validity",
	"program.validityDateFrom": "Validity date From",
	"program.deleteDialog.title": "Delete program",
	"program.openNewTab": "Open in new tab",
	"program.deleteDialog.message": "Are you sure you want to delete this program?",
	"program.addNewProgram.tooltip": "Add new program",
	"program.deleteProgram.tooltip": "Delete this program",
	"program.ProgramOverview.newTitle": "New Program",
	"program.label": "Program",
	"program.programPicker.placeholder": "Select Program",
	"program.edit.page.title": "Program {name}",
	"program.edit.title": "Program {name}",
	"program.ProgramForm.name": "Name of program",
	"program.CreateProgram.mutationLabel": "Create program {name}",
	"program.updateProgram.mutationLabel": "Update program {name}",
	"program.DeleteProgram.mutationLabel": "Delete program {name}",
	"program.deleteProgramDialog.title": "Delete program - {label}?",
	"program.deleteProgramDialog.message": "Are you sure you want to delete program {label}?"
};

var messages_fr = {
	"program.ProgramPicker.placeholder": "Selectionner un programme",
	"program.programSummaries": "{count} programme(s) trouvé",
	"program.program.name": "Nom du Programme",
	"program.ProgramForm.code": "Code du Programme",
	"program.program.code": "Code du programme",
	"program.program.validity": "Validité",
	"program.validityDateFrom": "Valide du",
	"program.deleteDialog.title": "Supprimer un programme",
	"program.openNewTab": "Ouvrir dans un nouvel onglet",
	"program.deleteDialog.message": "êtes sûre de vouloir supprimer ce programme?",
	"program.addNewProgram.tooltip": "Ajouter un nouveau programme",
	"program.deleteProgram.tooltip": "Supprimer ce programme",
	"program.ProgramOverview.newTitle": "Nouveau Programme",
	"program.label": "Programme",
	"program.programPicker.placeholder": "Selectionner un programme",
	"program.edit.page.title": "Programme {name}",
	"program.edit.title": "Programme {name}",
	"program.ProgramForm.name": "Nom du programme",
	"program.createProgram.mutationLabel": "Creation du programme {name}",
	"program.updateProgram.mutationLabel": "Mise à jour du programme {name}",
	"program.DeleteProgram.mutationLabel": "Supprimer le programme {name}",
	"program.deleteProgramDialog.title": "Supprimer le programme - {label}?",
	"program.deleteProgramDialog.message": "Etes-vous sure de vouloir supprimer le programme {label}?"
};

var ProgramPicker = function ProgramPicker(props) {
  var _data$program$edges$m, _data$program;
  var _onChange = props.onChange,
    readOnly = props.readOnly,
    required = props.required,
    _props$withLabel = props.withLabel,
    withLabel = _props$withLabel === void 0 ? true : _props$withLabel,
    withPlaceholder = props.withPlaceholder,
    value = props.value,
    label = props.label,
    filterOptions = props.filterOptions,
    filterSelectedOptions = props.filterSelectedOptions,
    placeholder = props.placeholder,
    multiple = props.multiple,
    extraFragment = props.extraFragment;
    props.hfFilter;
  var modulesManager = useModulesManager();
  var _useTranslations = useTranslations("claim", modulesManager),
    formatMessage = _useTranslations.formatMessage;
  var _useState = useState(""),
    _useState2 = _slicedToArray(_useState, 2);
    _useState2[0];
    var setSearchString = _useState2[1];
  var _useGraphqlQuery = useGraphqlQuery("\n      query ProgramPicker {\n          program(first: 10) {\n              edges {\n                  node {\n                      id\n                      code\n                      idProgram\n                      nameProgram\n                      validityDateFrom\n                      ".concat(extraFragment !== null && extraFragment !== void 0 ? extraFragment : "", "\n                    }\n                }\n            }\n        }\n        ")),
    isLoading = _useGraphqlQuery.isLoading,
    data = _useGraphqlQuery.data,
    error = _useGraphqlQuery.error;
  return /*#__PURE__*/React.createElement(Autocomplete, {
    multiple: multiple,
    required: required,
    placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : formatMessage("program.programPicker.placeholder"),
    label: label !== null && label !== void 0 ? label : formatMessage("program.label"),
    error: error,
    withLabel: withLabel,
    withPlaceholder: withPlaceholder,
    readOnly: readOnly,
    options: (_data$program$edges$m = data === null || data === void 0 || (_data$program = data.program) === null || _data$program === void 0 ? void 0 : _data$program.edges.map(function (edge) {
      return edge.node;
    })) !== null && _data$program$edges$m !== void 0 ? _data$program$edges$m : [],
    isLoading: isLoading,
    value: value,
    getOptionLabel: function getOptionLabel(option) {
      return "".concat(option.nameProgram);
    },
    onChange: function onChange(option) {
      return _onChange(option, option ? "".concat(option.nameProgram) : null);
    },
    filterOptions: filterOptions,
    filterSelectedOptions: filterSelectedOptions,
    onInputChange: setSearchString
  });
};

function _callSuper$5(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$5() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct$5() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$5 = function _isNativeReflectConstruct() { return !!t; })(); }
var styles$4 = function styles(theme) {
  return {
    dialogTitle: theme.dialog.title,
    dialogContent: theme.dialog.content,
    form: {
      padding: "0 0 10px 0",
      width: "100%"
    },
    item: {
      padding: theme.spacing(1)
    },
    paperDivider: theme.paper.divider
  };
};
var ProgramFilter = /*#__PURE__*/function (_Component) {
  function ProgramFilter() {
    var _this;
    _classCallCheck(this, ProgramFilter);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper$5(this, ProgramFilter, [].concat(args));
    _defineProperty(_this, "debouncedOnChangeFilter", _debounce(_this.props.onChangeFilters, _this.props.modulesManager.getConf("fe-admin", "debounceTime", 800)));
    _defineProperty(_this, "filterValue", function (k) {
      var filters = _this.props.filters;
      return !!filters && !!filters[k] ? filters[k].value : null;
    });
    _defineProperty(_this, "onChangeShowHistory", function () {
      var filters = [{
        id: "showHistory",
        value: !_this.state.showHistory,
        filter: "showHistory: ".concat(!_this.state.showHistory)
      }];
      _this.props.onChangeFilters(filters);
      _this.setState(function (state) {
        return {
          showHistory: !state.showHistory
        };
      });
    });
    return _this;
  }
  _inherits(ProgramFilter, _Component);
  return _createClass(ProgramFilter, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        classes = _this$props.classes;
        _this$props.onChangeFilters;
      return /*#__PURE__*/React.createElement("section", {
        className: classes.form
      }, /*#__PURE__*/React.createElement(Grid, {
        container: true
      }, /*#__PURE__*/React.createElement(ControlledField, {
        module: "program",
        id: "programFilter.programName",
        field: /*#__PURE__*/React.createElement(Grid, {
          item: true,
          xs: 3,
          className: classes.item
        }, /*#__PURE__*/React.createElement(TextInput, {
          module: "program",
          label: "program.name",
          name: "name",
          value: this.filterValue("nameProgram"),
          onChange: function onChange(v) {
            return _this2.debouncedOnChangeFilter([{
              id: "nameProgram",
              value: v,
              filter: "nameProgram_Icontains: \"".concat(v, "\"")
            }]);
          }
        }))
      }), /*#__PURE__*/React.createElement(ControlledField, {
        module: "program",
        id: "programFilter.code",
        field: /*#__PURE__*/React.createElement(Grid, {
          item: true,
          xs: 3,
          className: classes.item
        }, /*#__PURE__*/React.createElement(TextInput, {
          module: "program",
          label: "program.code",
          name: "code",
          value: this.filterValue("code"),
          inputProps: {
            maxLength: 3
          },
          onChange: function onChange(v) {
            return _this2.debouncedOnChangeFilter([{
              id: "code",
              value: v,
              filter: "code_Icontains: \"".concat(v, "\"")
            }]);
          }
        }))
      })));
    }
  }]);
}(Component);
var ProgramFilter$1 = withModulesManager(injectIntl(withTheme(withStyles(styles$4)(ProgramFilter))));

var PROGRAM_SUMMARY_PROJECTION = ["id", "idProgram", "nameProgram", "validityDateFrom", "code"];
function fetchProgramsSummaries(mm, filters) {
  var payload = formatPageQueryWithCount("program", filters, PROGRAM_SUMMARY_PROJECTION);
  return graphql(payload, "PROGRAM_PROGRAMS_SUMMARIES");
}
function fetchProgram(mm, programName) {
  var filters = ["nameProgram: \"".concat(programName, "\"")];
  var projections = ["id", "idProgram", "nameProgram", "validityDateFrom", "code"];
  var payload = formatPageQueryWithCount("program", filters, projections);
  return graphql(payload, "PROGRAM_PROGRAM");
}
function deleteProgram(mm, program, clientMutationLabel) {
  var mutation = formatMutation("deleteProgram", formatProgramGQL(mm, program), clientMutationLabel);
  var requestedDateTime = new Date();
  program.clientMutationId = mutation.clientMutationId;
  return graphql(mutation.payload, ["PROGRAM_PROGRAM_MUTATION_REQ", "PROGRAM_PROGRAM_DELETE_RESP", "PROGRAM_PROGRAM_MUTATION_ERR"], {
    clientMutationId: mutation.clientMutationId,
    clientMutationLabel: clientMutationLabel,
    requestedDateTime: requestedDateTime
  });
}
function formatProgramGQL(mm, program) {
  return "\n    ".concat(program.id !== undefined && program.id !== null ? "id: ".concat(decodeId(program.id)) : "", "\n    ").concat(program.idProgram !== undefined && program.idProgram !== null ? "idProgram: \"".concat(program.idProgram, "\"") : "", "\n      nameProgram: \"").concat(program.nameProgram, "\"\n      validityDateFrom: \"").concat(toISODate(program.validityDateFrom), "\"\n      code: \"").concat(program.code, "\"\n    ");
}
function createProgram(mm, program, clientMutationLabel) {
  var mutation = formatMutation("createProgram", formatProgramGQL(mm, program), clientMutationLabel);
  var requestedDateTime = new Date();
  return graphql(mutation.payload, ["PROGRAM_PROGRAM_MUTATION_REQ", "PROGRAM_PROGRAM_CREATE_RESP", "PROGRAM_PROGRAM_MUTATION_ERR"], {
    clientMutationId: mutation.clientMutationId,
    clientMutationLabel: clientMutationLabel,
    requestedDateTime: requestedDateTime
  });
}
function updateProgram(mm, program, clientMutationLabel) {
  var mutation = formatMutation("updateProgram", formatProgramGQL(mm, program), clientMutationLabel);
  var requestedDateTime = new Date();
  program.clientMutationId = mutation.clientMutationId;
  return graphql(mutation.payload, ["PROGRAM_PROGRAM_MUTATION_REQ", "PROGRAM_PROGRAM_UPDATE_RESP", "PROGRAM_PROGRAM_MUTATION_ERR"], {
    clientMutationId: mutation.clientMutationId,
    clientMutationLabel: clientMutationLabel,
    requestedDateTime: requestedDateTime
  });
}

function _callSuper$4(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$4() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct$4() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$4 = function _isNativeReflectConstruct() { return !!t; })(); }
var PROGRAM_SEARCHER_CONTRIBUTION_KEY = "program.ProgramSearcher";
var getHeaders = function getHeaders() {
  return ["program.program.code", "program.program.name", "program.program.validity", ""];
};
var getSorts = function getSorts() {
  return [["code", true][true], ["validityDateFrom", false]];
};
var getAligns = function getAligns() {
  var aligns = getHeaders().map(function () {
    return null;
  });
  aligns.splice(-1, 1, "right");
  return aligns;
};
var ProgramSearcher = /*#__PURE__*/function (_Component) {
  function ProgramSearcher() {
    var _this;
    _classCallCheck(this, ProgramSearcher);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper$4(this, ProgramSearcher, [].concat(args));
    _defineProperty(_this, "state", {
      deleteProgram: null,
      params: {}
    });
    _defineProperty(_this, "fetch", function (params) {
      _this.setState({
        params: params
      });
      _this.props.fetchProgramsSummaries(_this.props.modulesManager, params);
    });
    _defineProperty(_this, "filtersToQueryParams", function (state) {
      var prms = Object.keys(state.filters).filter(function (contrib) {
        return !!state.filters[contrib].filter;
      }).map(function (contrib) {
        return state.filters[contrib].filter;
      });
      prms.push("first: ".concat(state.pageSize));
      if (state.afterCursor) {
        prms.push("after: \"".concat(state.afterCursor, "\""));
      }
      if (state.beforeCursor) {
        prms.push("before: \"".concat(state.beforeCursor, "\""));
      }
      if (state.orderBy) {
        prms.push("orderBy: [\"".concat(state.orderBy, "\"]"));
      }
      return prms;
    });
    _defineProperty(_this, "deleteProgram", function (isConfirmed) {
      if (!isConfirmed) {
        _this.setState({
          deleteProgram: null
        });
      } else {
        var program = _this.state.deleteProgram;
        _this.setState({
          deleteProgram: null
        }, /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.props.deleteProgram(_this.props.modulesManager, program, formatMessageWithValues(_this.props.intl, "program", "DeleteProgram.mutationLabel", {
                  name: program.nameProgram
                }));
              case 2:
                _this.fetch(_this.state.params);
              case 3:
              case "end":
                return _context.stop();
            }
          }, _callee);
        })));
      }
    });
    _defineProperty(_this, "itemFormatters", function () {
      var formatters = [function (p) {
        return p.code;
      }, function (p) {
        return p.nameProgram;
      }, function (p) {
        return formatDateFromISO(_this.props.modulesManager, _this.props.intl, p.validityDateFrom);
      }, function (p) {
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Tooltip, {
          title: formatMessage(_this.props.intl, "program", "openNewTab")
        }, /*#__PURE__*/React.createElement(IconButton, {
          onClick: function onClick() {
            return _this.props.onDoubleClick(p, true);
          }
        }, /*#__PURE__*/React.createElement(Tab, null))), /*#__PURE__*/React.createElement(Tooltip, {
          title: formatMessage(_this.props.intl, "program", "deleteProgram.tooltip")
        }, /*#__PURE__*/React.createElement(IconButton, {
          onClick: function onClick() {
            return _this.setState({
              deleteProgram: p
            });
          }
        }, /*#__PURE__*/React.createElement(Delete, null))));
      }];
      return formatters;
    });
    return _this;
  }
  _inherits(ProgramSearcher, _Component);
  return _createClass(ProgramSearcher, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        intl = _this$props.intl,
        programs = _this$props.programs,
        programsPageInfo = _this$props.programsPageInfo,
        fetchingPrograms = _this$props.fetchingPrograms,
        fetchedPrograms = _this$props.fetchedPrograms,
        errorPrograms = _this$props.errorPrograms,
        cacheFiltersKey = _this$props.cacheFiltersKey,
        onDoubleClick = _this$props.onDoubleClick;
      return /*#__PURE__*/React.createElement(React.Fragment, null, this.state.deleteProgram && /*#__PURE__*/React.createElement(ConfirmDialog, {
        confirm: {
          title: formatMessage(intl, "program", "deleteDialog.title"),
          message: formatMessage(intl, "program", "deleteDialog.message")
        },
        onConfirm: this.deleteProgram
      }), /*#__PURE__*/React.createElement(Searcher, {
        module: "program",
        cacheFiltersKey: cacheFiltersKey,
        FilterPane: ProgramFilter$1,
        items: programs,
        itemsPageInfo: programsPageInfo,
        fetchingItems: fetchingPrograms,
        fetchedItems: fetchedPrograms,
        errorItems: errorPrograms,
        contributionKey: PROGRAM_SEARCHER_CONTRIBUTION_KEY,
        tableTitle: formatMessageWithValues(intl, "program", "programSummaries", {
          count: programsPageInfo.totalCount
        }),
        fetch: this.fetch,
        rowIdentifier: function rowIdentifier(r) {
          return r.uuid;
        },
        filtersToQueryParams: this.filtersToQueryParams,
        headers: getHeaders,
        aligns: getAligns,
        itemFormatters: this.itemFormatters,
        sorts: getSorts,
        rowDisabled: function rowDisabled(_, i) {
          return i.validityTo || i.clientMutationId;
        },
        rowLocked: function rowLocked(_, i) {
          return i.clientMutationId;
        },
        onDoubleClick: onDoubleClick
      }));
    }
  }]);
}(Component);
var mapStateToProps$2 = function mapStateToProps(state) {
  return {
    programs: state.program.programsSummaries.items,
    programsPageInfo: state.program.programsSummaries.pageInfo,
    fetchingPrograms: state.program.programsSummaries.isFetching,
    fetchedPrograms: state.program.programsSummaries.fetched,
    errorPrograms: state.program.programsSummaries.error
  };
};
var mapDispatchToProps$2 = function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchProgramsSummaries: fetchProgramsSummaries,
    deleteProgram: deleteProgram
  }, dispatch);
};
var ProgramSearcher$1 = withModulesManager(connect(mapStateToProps$2, mapDispatchToProps$2)(injectIntl(ProgramSearcher)));

function _callSuper$3(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$3() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct$3() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$3 = function _isNativeReflectConstruct() { return !!t; })(); }
var styles$3 = function styles(theme) {
  return {
    page: theme.page,
    fab: theme.fab
  };
};
var ProgramsPage = /*#__PURE__*/function (_Component) {
  function ProgramsPage() {
    var _this;
    _classCallCheck(this, ProgramsPage);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper$3(this, ProgramsPage, [].concat(args));
    _defineProperty(_this, "onDoubleClick", function (u) {
      historyPush(_this.props.modulesManager, _this.props.history, "program.route.program", [u.nameProgram]);
    });
    _defineProperty(_this, "onAdd", function () {
      historyPush(_this.props.modulesManager, _this.props.history, "program.route.program");
    });
    return _this;
  }
  _inherits(ProgramsPage, _Component);
  return _createClass(ProgramsPage, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        classes = _this$props.classes;
        _this$props.rights;
        var intl = _this$props.intl;
      return /*#__PURE__*/React.createElement("div", {
        className: classes.page
      }, /*#__PURE__*/React.createElement(ProgramSearcher$1, {
        cacheFiltersKey: "programsPageFiltersCache",
        onDoubleClick: this.onDoubleClick
      }), withTooltip(/*#__PURE__*/React.createElement("div", {
        className: classes.fab
      }, /*#__PURE__*/React.createElement(Fab, {
        color: "primary",
        onClick: this.onAdd
      }, /*#__PURE__*/React.createElement(AddIcon, null))), formatMessage(intl, "program", "addNewProgram.tooltip")));
    }
  }]);
}(Component);
var ProgramsPage$1 = injectIntl(withModulesManager(withHistory(withTheme(withStyles(styles$3)(ProgramsPage)))));

function ownKeys$3(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$3(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$3(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper$2(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$2() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct$2() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$2 = function _isNativeReflectConstruct() { return !!t; })(); }
var styles$2 = function styles(theme) {
  return {
    item: theme.paper.item
  };
};
var ProgramMasterPanel = /*#__PURE__*/function (_FormPanel) {
  function ProgramMasterPanel() {
    _classCallCheck(this, ProgramMasterPanel);
    return _callSuper$2(this, ProgramMasterPanel, arguments);
  }
  _inherits(ProgramMasterPanel, _FormPanel);
  return _createClass(ProgramMasterPanel, [{
    key: "render",
    value: function render() {
      var _this = this;
      var _this$props = this.props,
        intl = _this$props.intl,
        classes = _this$props.classes,
        edited = _this$props.edited,
        onEditedChanged = _this$props.onEditedChanged,
        reset = _this$props.reset,
        _this$props$readOnly = _this$props.readOnly,
        readOnly = _this$props$readOnly === void 0 ? false : _this$props$readOnly;
      console.log(edited);
      return /*#__PURE__*/React.createElement(Grid, {
        container: true
      }, /*#__PURE__*/React.createElement(ControlledField, {
        module: "program",
        id: "program.code",
        field: /*#__PURE__*/React.createElement(Grid, {
          item: true,
          xs: 4,
          className: classes.item
        }, /*#__PURE__*/React.createElement(TextInput, {
          module: "program",
          label: "ProgramForm.code",
          name: "code",
          value: edited.code,
          readOnly: readOnly,
          reset: reset,
          required: true,
          inputProps: {
            maxLength: 3
          },
          onChange: function onChange(v, s) {
            return _this.updateAttribute("code", v);
          }
        }))
      }), /*#__PURE__*/React.createElement(ControlledField, {
        module: "program",
        id: "program.name",
        field: /*#__PURE__*/React.createElement(Grid, {
          item: true,
          xs: 4,
          className: classes.item
        }, /*#__PURE__*/React.createElement(TextInput, {
          module: "program",
          label: "ProgramForm.name",
          name: "name",
          value: edited.nameProgram,
          readOnly: readOnly,
          reset: reset,
          required: true,
          onChange: function onChange(v, s) {
            return _this.updateAttribute("nameProgram", v);
          }
        }))
      }), /*#__PURE__*/React.createElement(ControlledField, {
        module: "program",
        id: "Program.validityDateFrom",
        field: /*#__PURE__*/React.createElement(Grid, {
          item: true,
          xs: 4,
          className: classes.item
        }, /*#__PURE__*/React.createElement(PublishedComponent, {
          pubRef: "core.DatePicker",
          value: edited === null || edited === void 0 ? void 0 : edited.validityDateFrom,
          required: true,
          module: "program",
          reset: reset,
          label: formatMessage(intl, "program", "validityDateFrom"),
          readOnly: readOnly,
          onChange: function onChange(validityDateFrom) {
            return onEditedChanged(_objectSpread$3(_objectSpread$3({}, edited), {}, {
              validityDateFrom: validityDateFrom
            }));
          }
        }))
      }));
    }
  }]);
}(FormPanel);
var ProgramMasterPanel$1 = withModulesManager(injectIntl(withTheme(withStyles(styles$2)(ProgramMasterPanel))));

function ownKeys$2(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$2(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$2(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper$1(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$1() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct$1() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct$1 = function _isNativeReflectConstruct() { return !!t; })(); }
var styles$1 = function styles(theme) {
  return {
    lockedPage: theme.page.locked
  };
};
var ProgramForm = /*#__PURE__*/function (_Component) {
  function ProgramForm() {
    var _this;
    _classCallCheck(this, ProgramForm);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper$1(this, ProgramForm, [].concat(args));
    _defineProperty(_this, "state", {
      lockNew: false,
      reset: 0,
      program_name: null,
      program: _this._newProgram(),
      newProgram: true
    });
    _defineProperty(_this, "_add", function () {
      _this.setState(function (state) {
        return {
          program: _this._newProgram(),
          lockNew: false,
          newProgram: true,
          reset: state.reset + 1
        };
      }, function (e) {
        _this.props.add();
        _this.forceUpdate();
      });
    });
    _defineProperty(_this, "onEditedChanged", function (program) {
      _this.setState({
        program: program,
        newProgram: false
      });
    });
    _defineProperty(_this, "canSave", function () {
      if (!_this.state.program.nameProgram) return false;
      if (!_this.state.program.validityDateFrom) return false;
      if (!_this.state.program.code) return false;
      return true;
    });
    _defineProperty(_this, "reload", function () {
      _this.props.fetchProgram(_this.props.modulesManager, _this.state.program_name);
    });
    _defineProperty(_this, "_save", function (program) {
      _this.setState({
        lockNew: !program.name
      },
      // avoid duplicates
      function (e) {
        return _this.props.save(program);
      });
    });
    return _this;
  }
  _inherits(ProgramForm, _Component);
  return _createClass(ProgramForm, [{
    key: "_newProgram",
    value: function _newProgram() {
      var program = {};
      return program;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.program_name) {
        this.setState(function (state, props) {
          return {
            program_name: props.program_name
          };
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.fetchedProgram !== this.props.fetchedProgram && !!this.props.fetchedProgram && !!this.props.program) {
        this.setState(function (state, props) {
          return {
            program: _objectSpread$2({}, props.program),
            program_name: props.program.nameProgram,
            lockNew: false,
            newProgram: false
          };
        });
      } else if (prevState.program_name !== this.state.program_name) {
        this.props.fetchProgram(this.props.modulesManager, this.state.program_name);
      } else if (prevProps.program_name && !this.props.program_name) {
        this.setState({
          program: this._newProgram(),
          lockNew: false,
          program_name: null
        });
      } else if (prevProps.submittingMutation && !this.props.submittingMutation) {
        this.props.journalize(this.props.mutation);
        this.setState(function (state) {
          return {
            reset: state.reset + 1
          };
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props;
        _this$props.intl;
        _this$props.modulesManager;
        _this$props.classes;
        var fetchingProgram = _this$props.fetchingProgram,
        fetchedProgram = _this$props.fetchedProgram,
        errorProgram = _this$props.errorProgram,
        add = _this$props.add,
        save = _this$props.save,
        back = _this$props.back;
      var _this$state = this.state,
        program_name = _this$state.program_name;
        _this$state.lockNew;
        var program = _this$state.program,
        newProgram = _this$state.newProgram,
        reset = _this$state.reset,
        update = _this$state.update;
      return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Helmet, {
        title: formatMessageWithValues(this.props.intl, "program", "edit.page.title", {
          name: this.state.program.nameProgram
        })
      }), /*#__PURE__*/React.createElement(ProgressOrError, {
        progress: fetchingProgram,
        error: errorProgram
      }), (!!fetchedProgram || !program_name) && /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Form, {
        module: "program",
        edited_id: program.id,
        edited: program,
        reset: reset,
        update: update,
        title: "program.edit.title",
        titleParams: {
          name: program.name
        },
        back: back,
        add: !!add && !newProgram ? this._add : null,
        save: !!save ? this._save : null,
        canSave: this.canSave,
        reload: program_name && this.reload,
        readOnly: false,
        HeadPanel: ProgramMasterPanel$1,
        onEditedChanged: this.onEditedChanged
      })));
    }
  }]);
}(Component);
var mapStateToProps$1 = function mapStateToProps(state, props) {
  return {
    program: state.program.program,
    fetchingProgram: state.program.fetchingProgram,
    fetchedProgram: state.program.fetchedProgram,
    errorProgram: state.program.errorProgram,
    submittingMutation: state.program.submittingMutation,
    mutation: state.program.mutation
  };
};
var mapDispatchToProps$1 = function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchProgram: fetchProgram,
    journalize: journalize
  }, dispatch);
};
var ProgramForm$1 = withHistory(withModulesManager(connect(mapStateToProps$1, mapDispatchToProps$1)(injectIntl(withTheme(withStyles(styles$1)(ProgramForm))))));

function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var styles = function styles(theme) {
  return {
    page: theme.page
  };
};
var ProgramPage = /*#__PURE__*/function (_Component) {
  function ProgramPage() {
    var _this;
    _classCallCheck(this, ProgramPage);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, ProgramPage, [].concat(args));
    _defineProperty(_this, "add", function () {
      historyPush(_this.props.modulesManager, _this.props.history, "program.route.program");
    });
    _defineProperty(_this, "save", function (program) {
      if (!program.idProgram) {
        _this.props.createProgram(_this.props.modulesManager, program, formatMessageWithValues(_this.props.intl, "program", "CreateProgram.mutationLabel", {
          name: program.nameProgram
        }));
      } else {
        _this.props.updateProgram(_this.props.modulesManager, program, formatMessageWithValues(_this.props.intl, "program", "UpdateProgram.mutationLabel", {
          name: program.nameProgram
        }));
      }
    });
    return _this;
  }
  _inherits(ProgramPage, _Component);
  return _createClass(ProgramPage, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        modulesManager = _this$props.modulesManager,
        history = _this$props.history,
        classes = _this$props.classes,
        program_name = _this$props.program_name;
      return /*#__PURE__*/React.createElement("div", {
        className: classes.page
      }, /*#__PURE__*/React.createElement(ProgramForm$1, {
        program_name: program_name,
        back: function back(e) {
          return historyPush(modulesManager, history, "program.programs");
        },
        add: this.add,
        save: this.save
      }));
    }
  }]);
}(Component);
var mapStateToProps = function mapStateToProps(state, props) {
  return {
    program_name: props.match.params.program_name
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createProgram: createProgram,
    updateProgram: updateProgram,
    journalize: journalize
  }, dispatch);
};
var ProgramPage$1 = withHistory(withModulesManager(connect(mapStateToProps, mapDispatchToProps)(injectIntl(withTheme(withStyles(styles)(ProgramPage))))));

function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    programsSummaries: {
      items: [],
      isFetching: false,
      isFetched: false,
      fetched: null,
      pageInfo: {
        totalCount: 0
      },
      error: null
    },
    programs: {
      items: [],
      isFetching: false,
      isFetched: false,
      error: null
    },
    fetchingProgram: false,
    fetchedProgram: false,
    program: null,
    errorProgram: null,
    submittingMutation: false,
    mutation: {}
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case "PROGRAM_PROGRAMS_SUMMARIES_REQ":
      return _objectSpread$1(_objectSpread$1({}, state), {}, {
        programsSummaries: _objectSpread$1(_objectSpread$1({}, state.programsSummaries), {}, {
          isFetching: true,
          isFetched: false,
          error: null
        })
      });
    case "PROGRAM_PROGRAMS_SUMMARIES_RESP":
      return _objectSpread$1(_objectSpread$1({}, state), {}, {
        programsSummaries: _objectSpread$1(_objectSpread$1({}, state.programsSummaries), {}, {
          isFetching: false,
          isFetched: true,
          fetched: action.meta,
          pageInfo: pageInfo(action.payload.data.program),
          items: parseData(action.payload.data.program),
          error: formatGraphQLError(action.payload)
        })
      });
    case "PROGRAM_PROGRAMS_SUMMARIES_ERR":
      return _objectSpread$1(_objectSpread$1({}, state), {}, {
        programsSummaries: _objectSpread$1(_objectSpread$1({}, state.programsSummaries), {}, {
          isFetching: false,
          isFetched: true,
          fetched: null,
          items: [],
          error: formatGraphQLError(action.payload)
        })
      });
    case "PROGRAM_PROGRAM_REQ":
      return _objectSpread$1(_objectSpread$1({}, state), {}, {
        fetchingProgram: true,
        fetchedProgram: false,
        program: null,
        errorProgram: null
      });
    case "PROGRAM_PROGRAM_RESP":
      var prgrms = parseData(action.payload.data.program);
      return _objectSpread$1(_objectSpread$1({}, state), {}, {
        fetchingProgram: false,
        fetchedProgram: true,
        program: !!prgrms && prgrms.length > 0 ? prgrms[0] : null,
        errorProgram: formatGraphQLError(action.payload)
      });
    case "PROGRAM_PROGRAM_ERR":
      return _objectSpread$1(_objectSpread$1({}, state), {}, {
        fetchingProgram: false,
        errorProgram: formatServerError(action.payload)
      });
    case "PROGRAM_PROGRAM_MUTATION_REQ":
      return dispatchMutationReq(state, action);
    case "PROGRAM_PROGRAM_MUTATION_ERR":
      return dispatchMutationErr(state, action);
    case "PROGRAM_PROGRAM_DELETE_RESP":
      return dispatchMutationResp(state, "deleteProgram", action);
    case "PROGRAM_PROGRAM_UPDATE_RESP":
      return dispatchMutationResp(state, "updateProgram", action);
    case "PROGRAM_PROGRAM_CREATE_RESP":
      return dispatchMutationResp(state, "createProgram", action);
    default:
      return state;
  }
}

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var ROUTE_PROGRAM_PROGRAM = "program/program";
var ROUTE_PROGRAM_PROGRAMS = "program/programs";
var ROUTE_PROGRAM_PROGRAM_OVERVIEW = "programs/overview";
var ROUTE_PROGRAM_PROGRAM_NEW = "program/programs/new";
var DEFAULT_CONFIG = {
  "translations": [{
    key: "en",
    messages: messages_en
  }, {
    key: "fr",
    messages: messages_fr
  }],
  "reducers": [{
    key: 'program',
    reducer: reducer
  }],
  "refs": [{
    key: "program.ProgramPicker",
    ref: ProgramPicker
  }, {
    key: "program.route.program",
    ref: ROUTE_PROGRAM_PROGRAM
  }, {
    key: "program.programs",
    ref: ROUTE_PROGRAM_PROGRAMS
  }, {
    key: "program.programNew",
    ref: ROUTE_PROGRAM_PROGRAM_NEW
  }, {
    key: "program.programOverview",
    ref: ROUTE_PROGRAM_PROGRAM_OVERVIEW
  }],
  "core.Router": [{
    path: ROUTE_PROGRAM_PROGRAM_NEW,
    component: ProgramPage$1
  }, {
    path: ROUTE_PROGRAM_PROGRAMS,
    component: ProgramsPage$1
  }, {
    path: ROUTE_PROGRAM_PROGRAM + "/:program_name?",
    component: ProgramPage$1
  }]
};
var ProgramModule = function ProgramModule(cfg) {
  return _objectSpread(_objectSpread({}, DEFAULT_CONFIG), cfg);
};

export { ProgramModule };
//# sourceMappingURL=index.es.js.map
