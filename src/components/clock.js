import React, { Component } from 'react';
import moment from 'moment-timezone';
import { connect } from 'react-redux';

import { deleteTimezone, updateNotes } from '../actions/index'
import './clock.css'


const Fmt = {
  DATE: 'MM/DD',
  TIME: 'hh:mma',
  TIME24: 'HH:mm:ss',
  TZOFFSET: 'ZZ'
};

const USER_OFFSET = moment().format(Fmt.TZOFFSET);

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

  isMyTime() {
    // return moment.tz(this.props.timezoneName) === CURRENT_TIME.timezoneName;
    return moment.tz(this.props.timezoneName).format(Fmt.TZOFFSET) === USER_OFFSET;
  }

  onDeleteClick() {
    this.props.deleteTimezone(this.props.timezoneIndex);
  }

  onInputChange(e) {
    this.props.updateNotes(this.props.timezoneIndex, e.target.value);
  }

  render() {
    const myTz = this.isMyTime();

    return (
      <div className={`Clock clearfix row ${myTz ? 'user-time' : ''}`}>
        <div className="clock-name col-md-12 col-lg-1">{this.props.timezoneName} {myTz && <span className="badge badge-pill badge-primary">me</span>}</div>
        <div className="col-md-12 col-lg-6 col-xl-5">
          <div className="clock-time">{this.getCurrentTime(true)}</div>
          <div className="clock-date">
            {this.getCurrentDate()}<br />
            {this.getDST()}
          </div>
          <div className="clock-time muted">{this.getCurrentTime(false)}</div>
        </div>
        <div className="clock-notes col-md-12 col-lg-2 col-xl-3">
          <div className="input-group">
            <textarea className="form-control"
              rows={1}
              onChange={this.onInputChange.bind(this)}
              value={this.props.timezoneNotes || ''}>
            </textarea>
          </div>
        </div>
        <div className="clock-delete col-md-12 col-lg-1 col-xl-1">
          <button
            className="btn btn-sm btn-dark"
            onClick={this.onDeleteClick.bind(this)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default connect(null, { deleteTimezone, updateNotes })(Clock);
