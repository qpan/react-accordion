(function() {
  'use strict';
  var ListItem = React.createClass({
    displayName: 'ListItem',

    whenListClicked: function whenListClicked() {
      this.props.whenListClicked(this.props.index);
    },
    render: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'button',
          { className: 'button', onClick: this.whenListClicked },
          'Section ',
          this.props.index + 1,
          ' ',
          React.createElement('span', { className: 'fa fa-caret-down' })
        ),
        React.createElement(
          'div',
          { className: 'list-item ' + (this.props.open[this.props.index] ? '' : 'hide') },
          this.props.description
        )
      );
    }
  });

  var Accordion = React.createClass({
    displayName: 'Accordion',

    getInitialState: function getInitialState() {
      return {
        open: []
      };
    },
    componentWillMount: function componentWillMount() {
      var open = this.props.descriptions.map(function (value, index) {
        return false;
      });

      this.setState({
        open: open
      });
    },
    handleListClick: function handleListClick(param_index) {
      var open = this.state.open.slice();
      var bool = !open[param_index];

      open.splice(param_index, 1, bool);

      for (var i = 0; i < open.length; i++) {
        if (i !== param_index) {
          open[i] = false;
        }
      }

      this.setState({
        open: open
      });
    },
    render: function render() {
      var descriptions = this.props.descriptions.map((function (value, index) {
        return React.createElement(ListItem, { description: value, index: index, whenListClicked: this.handleListClick, open: this.state.open });
      }).bind(this));

      return React.createElement(
        'div',
        { className: 'accordion' },
        descriptions
      );
    }

  });
  
  window.Accordion = Accordion;
})();