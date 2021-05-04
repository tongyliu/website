var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var _ = require('lodash');

var TYPING_DELAY = 60;
var ENTER_DELAY = 160;
var THINKING_DELAY = 2000;
var INITIAL_PAUSE = 1000;
var BLINK_PAUSE = 3000;

var COLORS = ['maize', 'blue', 'green', 'red', 'purple'];

var getRandomColor = function(avoidColor) {
  var color;
  var i = 0;
  do {
    color = COLORS[Math.floor(Math.random() * COLORS.length)];
    i += 1;
  } while (avoidColor && color == avoidColor && i < 5);
  return color;
};

var messages = [
  'I\'m currently a software engineer at Nextdoor.',
  'My interests include full-stack development, machine learning, and economics.',
  'I\'ve previously worked on full-stack and mobile projects at places including Cisco, Weebly, and Companion.',
  'Feel free to view more on my resume, GitHub, or LinkedIn.',
  'Thanks for stopping by!'
];

var ColoredLink = React.createClass({
  getInitialState: function() {
    return { color: getRandomColor() };
  },

  render: function() {
    return (
      <a
        className={this.state.color}
        href={this.props.href}
        onMouseEnter={this._changeColor}>
        {this.props.str}
      </a>
    );
  },

  _changeColor: function() {
    this.setState({ color: getRandomColor(this.state.color) });
  }
});

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
        return <ColoredLink key={key} href={_linkMappings[str]} str={str}/>;
      } else {
        return str;
      }
    }).value();
  };

  return exports;
})();

Linkify.init({
  Microsoft: 'https://www.microsoft.com/cognitive',
  Cisco: 'https://www.cisco.com',
  Weebly: 'https://www.weebly.com',
  Companion: 'http://companionapp.io',
  GitHub: 'https://github.com/tongyliu',
  LinkedIn: 'https://www.linkedin.com/in/tongyliu',
  resume: 'resume.pdf'
});

var Teletype = React.createClass({
  getInitialState: function() {
    return { index: 0, message: '', headingColor: getRandomColor() };
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
        <div
          className={classNames('heading', this.state.headingColor)}
          onClick={this._changeHeadingColor}>
          Hi, I'm Tong.
        </div>
        <div className='words'>{content}</div>
        <div
          className={classNames('skip-btn', {
            'transition-enabled': this.state.fullMessageShown,
            'hidden': this.state.finishedAnimating
          })}
          onClick={this._skipToEnd}>
          Skip
        </div>
      </div>
    );
  },

  componentDidMount: function() {
    var that = this;
    this.timeout = setTimeout(function() {
      that.setState({ insert: true });
      that._displayMessage(INITIAL_PAUSE);
    }, BLINK_PAUSE);
  },

  _changeHeadingColor: function() {
    this.setState({ headingColor: getRandomColor(this.state.headingColor) });
  },

  _displayMessage: function(wait) {
    var message = messages[this.state.index];
    var chars = message.split('').concat(' ');
    if (this.state.index > 0) {
      chars.unshift('\n', '\n');
    }

    var that = this;
    this.timeout = setTimeout(function() {
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
        this.timeout = setTimeout(this._recursiveAdd.bind(this, arr), delay);
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
      this.setState({ fullMessageShown: true });
      this.timeout = setTimeout(
        this.setState.bind(this, { insert: false, finishedAnimating: true }),
        BLINK_PAUSE
      );
    }
  },

  _skipToEnd: function() {
    clearTimeout(this.timeout);
    this.setState({
      message: messages.join('\n\n') + ' ',
      typing: false,
      insert: false,
      finishedAnimating: true
    });
  }
});

ReactDOM.render(
  <Teletype />,
  document.getElementById('container')
);
