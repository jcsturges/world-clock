import Autocomplete from 'react-autocomplete';
import React, { Component } from 'react';
import moment from 'moment-timezone';
import { connect } from 'react-redux'

import { addTimezone } from '../actions/index';
import './search-bar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', alertMessage: '' };
  }

  onFormSubmit(event) {
    event.preventDefault();

    // found: Boolean
    const found = moment.tz.names().includes(this.state.name);
    if (!found) {
      this.setState({ alertMessage: 'Time zone name does not exist' });
      return;
    }

    const isInList = this.props.timezones.find(tz => tz.name === this.state.name);
    if (isInList) {
      this.setState({ alertMessage: 'Time zone is already in the list' });
      return;
    }

    if (found && !isInList) {
      this.props.addTimezone(this.state.name);
      this.setState({ name: '', alertMessage: '' });
    }
  }

  render() {
    const { alertMessage } = this.state;

    const menuStyle = {
      borderRadius: '3px',
      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
      background: 'rgba(255, 255, 255, 0.9)',
      padding: '2px 0',
      fontSize: '90%',
      position: 'fixed',
      overflow: 'auto',
      maxHeight: '50%', // TODO: don't cheat, let it flow to the bottom
      zIndex: '998'
    };

    return (
      <div className="SearchBar">
        <form
          className="input-group search-form"
          onSubmit={this.onFormSubmit.bind(this)}>
          <Autocomplete
            getItemValue={item => item}
            items={moment.tz.names()}
            menuStyle={menuStyle}
            shouldItemRender={(item, value) => {
              return item.toLowerCase().includes(value.toLowerCase());
            }}
            renderItem={(item, isHighlighted) => (
              <div key={item}
                style={{ background: isHighlighted ? 'lightblue' : 'white', padding: '3px 7px', cursor: 'pointer' }}>
                {item}
              </div>
            )}
            value={this.state.name}
            onChange={event => this.setState({ name: event.target.value })}
            onSelect={value => this.setState({ name: value })}
            inputProps={{
              className: "form-control",
              placeholder: "Time zone"
            }}
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-primary">Add</button>
          </div>
        </form>
        {alertMessage && <div className="search-alert opacity-1">{alertMessage}</div>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ timezones: state.timezones });

export default connect(mapStateToProps, { addTimezone })(SearchBar);
