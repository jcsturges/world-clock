import React, {Component} from 'react';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import Clock from './clock';
import {loadCookie, sortTimezones} from '../actions/index'
import './clock-list.css'


const SortableItem = SortableElement(({ item, idx, update }) => (
  <li><Clock timezoneName={item.z} timezoneIndex={idx} timezoneNotes={item.n} update={update} /> </li>
));

const SortableList = SortableContainer(({ items, update }) => (
  <ul>
    {items.map((item, idx) => (
      <SortableItem key={`item-${idx}`} index={idx} idx={idx} item={item} update={update} />
    ))}
  </ul>
));

class ClockList extends Component {
  constructor(props) {
    super(props);

    // For rerendering children
    this.state = { now: Date.now() };
  }

  componentDidMount() {
    this.interval = setInterval(
      () => {
        this.setState({ now: Date.now() });
      },
      1000
    );
    this.props.loadCookie();
  }

  /*
  renderClocks() {
    return this.props.timezones.map((name) => {
      return <Clock key={name} timezoneName={name} update={this.state.now} />
    });
  }
  */

  onSortEnd({ oldIndex, newIndex }) {
    if (oldIndex !== newIndex) {
      this.props.sortTimezones(oldIndex, newIndex);
    }
  }

  render() {
    if (!this.props.timezones.length) {
      return (
        <div className="clock-list-loading">
          Clocks will be added here
        </div>
      );
    }

    return (
      <div className="container">
        <SortableList
          items={this.props.timezones}
          update={this.state.now}
          onSortEnd={this.onSortEnd.bind(this)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ timezones: state.timezones });

export default connect(mapStateToProps, { loadCookie, sortTimezones })(ClockList);
