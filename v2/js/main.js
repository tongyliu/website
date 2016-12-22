var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var _ = require('lodash');

var TYPING_DELAY = 80;
var ENTER_DELAY = 160;
var THINKING_DELAY = 2000;

var messages = [ 
  'Hi, I\'m Tong!',
  'I\'m a software engineer & student at the University of Michigan.',
  'This summer, I\'ll be working at Cisco. I\'ve also worked on full-stack and mobile development at places including Weebly and Companion.',
  'This site is still under construction ' + String.fromCharCode(8212) + ' but you can view more on my resume, GitHub, or LinkedIn.',
  'Thanks for stopping by!'
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
  Cisco: 'https://www.cisco.com',
  Weebly: 'https://www.weebly.com',
  Companion: 'http://companionapp.io',
  GitHub: 'https://github.com/tongyliu',
  LinkedIn: 'https://www.linkedin.com/in/tong-liu-7a55489b',
  resume: 'resume.pdf'
});

var Teletype = React.createClass({
  getInitialState: function() {
    return { index: 0, message: '' };
  },

  render: function() {
    var content = Linkify.transform(this.state.message).concat(
      <span
        className={classNames('cursor', {
          'cursor--insert': this.state.insert,
          'blink': !this.state.typing 
        })}
        key='cursor'
      />
    );

    return (
      <div className='main-wrapper'>
        <div className='words'>{content}</div>
      </div>
    );
  },

  componentDidMount: function() {
    var that = this;
    this.timeout = setTimeout(function() {
      that.setState({ insert: true });
      that._displayMessage(1000);
    }, 3000);
  },

  _displayMessage: function(wait) {
    var message = messages[this.state.index];
    var chars = message.split('').concat(' ');
    if (this.state.index > 0) {
      chars.unshift('\n', '\n');
    }

    var that = this;
    setTimeout(function() {
      that.setState({ typing: true });
      that._recursiveAdd(chars);
    }, wait);
  },

  _recursiveAdd: function(arr) {
    var char = arr.shift();
    this.setState(function (prevState) {
      return { message: prevState.message + char };
    }, function () {
      if (arr.length) {
        var delay = (char == '\n')? ENTER_DELAY : TYPING_DELAY;
        setTimeout(this._recursiveAdd.bind(this, arr), delay);
      } else {
        this.setState(
          { index: this.state.index + 1, typing: false },
          this._nextMessage
        );
      }
    });
  },

  _nextMessage: function() {
    if (this.state.index < messages.length) {
      this._displayMessage(THINKING_DELAY);
    } else {
      setTimeout(this.setState.bind(this, { insert: false }), 3000);
    }
  }
});

ReactDOM.render(
  <Teletype />,
  document.getElementById('container')
);
