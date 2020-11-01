import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const MatchObject = ({ meetings }) => {
  return <Fragment></Fragment>;
};

MatchObject.propTypes = {
  meetings: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  meetings: state.profile.listofpeoplemet;
};

export default connect(mapStateToProps, null)(MatchObject);
