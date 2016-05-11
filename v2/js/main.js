var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

var TYPING_DELAY = 100;
var BACKSPACE_DELAY = 80;
var DISPLAY_DURATION = 6400;
var THINKING_DURATION = 1600;

var getThinkingDuration = function() {
  return THINKING_DURATION * (Math.random() * 2 + 1);
};

var messages = [
  'Computer science engineering student @ UMich',
  'Summer 2016 software engineering intern @ Cisco',
  'Engineering intern @ Weebly, summer 2015',
  'Software developer @ Companion',
  'Full stack & mobile developer'
];

var Linkify = (function() {
  exports = {};

  var _linkMappings;

  exports.init = function(mappings) {
    _linkMappings = mappings || {};
  };

  exports.transform = function(str) {
    var delimiters = [];
    _.forEach(_linkMappings, function(v, k) {
      delimiters.push('(' + k + ')');
    });

    var regex = new RegExp(delimiters.join('|'));
    var parts = str.split(regex);

    var matchCount = 0;
    return _.chain(parts).filter().map(function(str) {
      if (_linkMappings[str]) {
        var key = str + matchCount++;
        return <a key={key} href={_linkMappings[str]}>{str}</a>;
      } else {
        return str;
      }
    }).value();
  };

  return exports;
})();

Linkify.init({
  Cisco: 'https://cisco.com',
  Weebly: 'https://weebly.com',
  Companion: 'http://companionapp.io'
});

var Teletype = React.createClass({
  getInitialState: function() {
    return { 'message': '' };
  },

  render: function() {
    var content = Linkify.transform(this.state.message).concat(
      <span
        className={this.state.typing ? 'cursor' : 'cursor blink'}
        key='cursor'
      />
    );

    return (
      <div>
        <div className='name'>
          <h1>Tong Liu</h1>
        </div>
        <div className='words'>{content}</div>
        <nav className='buttons'>
          <ul>
            <li><a className='button' href='resume'>Resume</a></li>
            <li><a className='button' href='contact'>Contact</a></li>
          </ul>
        </nav>
      </div>
    );
  },

  componentDidMount: function() {
    setTimeout(this._displayMessage, getThinkingDuration());
  },

  _displayMessage: function() {
    var message, callback;
    if (messages.length) {
      var idx = Math.floor(Math.random() * messages.length);
      message = messages[idx]; 
      messages.splice(idx, 1);
      callback = this._removeMessage;
    } else {
      message = 'Thanks for reading, see more below';
      callback = null;
    }

    var chars = message.split('').concat(' ');
    this.setState({ typing: true });
    this._recursiveAdd(chars, callback);
  },

  _removeMessage: function() {
    this.setState({ typing: true });
    this._recursiveRemove();
  },

  _recursiveAdd: function(arr, finishCallback) {
    this.setState(function (prevState) {
      return { message: prevState.message + arr.shift() };
    }, function () {
      if (arr.length) {
        setTimeout(
          this._recursiveAdd.bind(this, arr, finishCallback),
          TYPING_DELAY
        );
      } else {
        this.setState({ typing: false });
        if (finishCallback) {
          setTimeout(finishCallback, DISPLAY_DURATION);
        }
      }
    });
  },

  _recursiveRemove: function() {
    var text = this.state.message.slice(0, -1);
    this.setState({ message: text }, function() {
      if (text.length) {
        setTimeout(this._recursiveRemove, BACKSPACE_DELAY);
      } else {
        this.setState({ typing: false });
        setTimeout(this._displayMessage, getThinkingDuration());
      }
    });
  }
});

ReactDOM.render(
  <Teletype />,
  document.getElementById('container')
);
