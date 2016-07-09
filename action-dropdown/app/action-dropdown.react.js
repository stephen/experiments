const React = require('react');
const PropTypes = React.PropTypes;
const ReactMotion = require('react-motion');
const Motion = ReactMotion.Motion;
const spring = ReactMotion.spring;
const classNames = require('classnames');

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
      actionsPresentation: this.state.actionsPresentation.map((_, index) => {
        const i = (this.state.actionsPresentation.length - index - 1);
        return {
          translateY: i * 5.5,
          translateX: (i === 0 ? 0 : Math.exp(i) / 15),
        };
      }),
    });
  },

  onMouseLeave() {
    this.setState({
      leaveWait: setTimeout(() => {
        this.setState(this.getInitialState());
      }, 200),
    });
  },

  render() {
    const actions = Array.from(this.props.actions).reverse().map((action, i) => {
      const computedStyle = {
        translateX: spring(this.state.actionsPresentation[i].translateX),
        translateY: spring(this.state.actionsPresentation[i].translateY),
      };

      const classes = classNames('ActionDropdown-action', {
        [action.modifier]: action.modifier,
      });

      return (
        <Motion key={ action.key } style={ computedStyle }>
          {
            (style) => (
              <div style={
                {
                  transform: `translateY(${ style.translateY }rem) translateX(${ style.translateX }rem)`,
                }
              } className={ classes }>
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
