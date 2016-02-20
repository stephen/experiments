const React = require('react');
const PropTypes = React.PropTypes;
const ReactMotion = require('react-motion');
const Motion = ReactMotion.Motion;
const spring = ReactMotion.spring;

const ActionDropdown = React.createClass({

  propTypes: {
    actions: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
  },

  getInitialState() {
    return {
      actionsPresentation: this.props.actions.map(action => {
        return {
          translateY: 0,
          translateX: 0,
        };
      }),
      leaveWait: null,
    };
  },

  onMouseEnter() {
    if (this.state.leaveWait) {
      clearTimeout(this.state.leaveWait);
      this.setState({
        leaveWait: null,
      });
    }

    this.setState({
      actionsPresentation: this.state.actionsPresentation.map((_, i) => {
        return {
          translateY: i * 5.5,
          translateX: i + (i === 0 ? 0 : Math.pow(2, i) / 100 ),
        };
      }),
    });
  },

  onMouseLeave() {
    this.setState({
      leaveWait: setTimeout(() => {
        this.setState(this.getInitialState());
      }, 100),
    });
  },

  render() {
    const actions = this.props.actions.map((action, i) => {
      const computedStyle = {
        translateX: spring(this.state.actionsPresentation[i].translateX),
        translateY: spring(this.state.actionsPresentation[i].translateY),
      };

      return (
        <Motion key={ action.key } style={ computedStyle }>
          {
            style => (
              <div style={
                {
                  transform: `translateY(${ style.translateY }rem) translateX(${ style.translateX }rem)`,
                }
              } className="ActionDropdown-action">
                { action.label }
              </div>
            )
          }
        </Motion>
      )
    });

    return (
      <div className="ActionDropdown" onMouseEnter={ this.onMouseEnter } onMouseLeave={ this.onMouseLeave }>
        { actions }
      </div>
    );
  }
});

module.exports = ActionDropdown;
