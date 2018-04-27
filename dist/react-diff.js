'use strict';

var React = require('react');
var jsdiff = require('diff');

var fnMap = {
  'chars': jsdiff.diffChars,
  'words': jsdiff.diffWords,
  'sentences': jsdiff.diffSentences,
  'json': jsdiff.diffJson
};

module.exports = React.createClass({
  displayName: 'Diff',

  getDefaultProps: function getDefaultProps() {
    return {
      inputA: '',
      inputB: '',
      type: 'chars',
      addedLineClassName: 'new-line',
      removedLineClassName: 'removed-line',
      stableLineClassName: 'stable-line',
    };
  },

  propTypes: {
    inputA: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
    inputB: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
    type: React.PropTypes.oneOf(['chars', 'words', 'sentences', 'json'])
  },

  render: function render() {
    var diff = fnMap[this.props.type](this.props.inputA, this.props.inputB);
    var result = diff.map(function(part, index) {
      var className = part.added ? this.props.addedLineClassName : part.removed ? this.props.removedLineClassName : this.props.stableLineClassName;
      return <span key={index} className={className}>{part.value}</span>
    });
    return (
      <pre className='diff-result'>
      {result}
      </pre>
    );
  }
});

