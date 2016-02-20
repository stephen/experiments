const React = require('react');
const ActionDropdown = require('./action-dropdown.react');
require("./main.css");

module.exports = () => {
  const actions = [
    {
      key: 'a',
      label: 'mrh',
    },
    {
      key: 'b',
      label: 'bawk',
    },
    {
      key: 'c',
      label: 'womp',
    },
    {
      key: 'd',
      label: 'mrh',
    },
    {
      key: 'e',
      label: 'bawk',
    },
    {
      key: 'f',
      label: 'womp',
    },
  ];
  return (
    <div>
      <ActionDropdown actions={ actions } />
    </div>
  );
};