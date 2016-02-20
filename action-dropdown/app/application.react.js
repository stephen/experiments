const React = require('react');
const ActionDropdown = require('./action-dropdown.react');
require("./main.css");

module.exports = () => {
  const actions = [
    {
      key: 'bawk',
      label: 'bawk',
      modifier: 'green',
    },
    {
      key: 'hurk',
      label: 'hurk',
      modifier: 'red',
    },
    {
      key: 'hrm',
      label: 'hrm',
      modifier: 'yellow',
    },
    {
      key: 'mrh',
      label: 'mrh',
      modifier: 'purple',
    },
  ];

  return (
    <div>
      <ActionDropdown actions={ actions } />
    </div>
  );
};
