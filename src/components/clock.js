import React, { Component } from 'react';
import moment from 'moment-timezone';
import { connect } from 'react-redux';

import { deleteTimezone } from '../actions/index'
import './clock.css'


const Fmt = {
  DATE: 'MM/DD',
  TIME: 'hh:mma',
  TIME24: 'HH:mm:ss'
};

class Clock extends Component {
  getCurrentDate() {
    return moment.tz(this.props.timezoneName).format(Fmt.DATE);
  }

  getCurrentTime(use24 = false) {
    return moment.tz(this.props.timezoneName).format(use24 ? Fmt.TIME24 : Fmt.TIME);
  }

  getDST() {
    if (moment.tz(this.props.timezoneName).isDST()) {
      return <span className="clock-dst">DST</span>;
    }
  }

  onDeleteClick() {
    this.props.deleteTimezone(this.props.timezoneName);
  }

  render() {
    return (
      <div className="Clock clearfix">
        <div className="clock-name">{this.props.timezoneName}</div>
        <div className="clock-time">{this.getCurrentTime(true)}</div>
        <div className="clock-date">
          {this.getCurrentDate()}<br />
          {this.getDST()}
        </div>
        <div className="clock-time muted">{this.getCurrentTime(false)}</div>
        <div className="clock-delete">
          <button
            className="btn btn-dark float-right"
            onClick={this.onDeleteClick.bind(this)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default connect(null, {deleteTimezone})(Clock);
