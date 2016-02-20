const React = require('react');
const PropTypes = React.PropTypes;
const ReactMotion = require('react-motion');
const StaggeredMotion = ReactMotion.StaggeredMotion;

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
    const spring = value => ReactMotion.spring(value, {
      stiffness: 120,
      damping: 17,
    });

    const defaultSprings = this.props.actions.map(() => {
      return {
        translateX: 0,
        translateY: 0,
      }
    });

    const computeSprings = prevInterpolatedStyles => {
      const presentation = this.state.actionsPresentation;
      return this.props.actions.map((_, i) => {
        const goalX = presentation[i].translateX;
        const goalY = presentation[i].translateY;
        if (i === presentation.length - 1) {
          return {
            translateX: spring(goalX),
            translateY: spring(goalY),
          };
        } else {
          const forwardGoalX = presentation[i + 1].translateX;
          const forwardCurrentX = prevInterpolatedStyles[i + 1].translateX;
          const progressX = forwardGoalX === 0 ? 0 : forwardCurrentX / forwardGoalX;

          const forwardGoalY = presentation[i + 1].translateY;
          const forwardCurrentY = prevInterpolatedStyles[i + 1].translateY;
          const progressY = forwardGoalY === 0 ? 0 : forwardCurrentY / forwardGoalY;

          return {
            translateX: spring(progressX * goalX),
            translateY: spring(progressY * goalY),
          };
        }
      });
    };

    const renderActions = interpolatedStyles => {
      const renderedActions = this.props.actions.map((action, i) => {
        const interpolatedStyle = interpolatedStyles[i];
        const style = {
          transform: `translateY(${ interpolatedStyle.translateY }rem) translateX(${ interpolatedStyle.translateX }rem)`,
        };

        return (
          <div key={ action.key } style={ style } className="ActionDropdown-action">
            { action.label }
          </div>
        );
      });

      return (
        <div>
          { renderedActions }
        </div>
      )
    };

    return (
      <div className="ActionDropdown" onMouseEnter={ this.onMouseEnter } onMouseLeave={ this.onMouseLeave }>
        <StaggeredMotion defaultStyles={ defaultSprings } styles={ computeSprings }>
          { renderActions }
        </StaggeredMotion>
      </div>
    );
  }
});

module.exports = ActionDropdown;
