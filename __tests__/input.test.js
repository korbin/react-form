jest.autoMockOff();
describe('Input', function() {
  var Input = require('../lib/react-form/input');
  var Immutable = require('immutable');
  var React = require('react/addons');
  var TestUtils = React.addons.TestUtils;

  var ctx = {
    object: {foo: 'bar'},
    namePath: Immutable.List(),
    valuePath: Immutable.List(),
    setPathValue: function(){}
  };

  var mockComponentRendered = jest.genMockFn();

  var mockComponentClass = React.createClass({
    render: function() {
      mockComponentRendered();
      return React.DOM.div();
    }
  });

  var input = React.withContext(ctx, function() {
    return React.createElement(Input, {for:'foo', type: mockComponentClass});
  });

  it('renders a component with given type class', function() {
    var rendered = TestUtils.renderIntoDocument(input);

    expect(mockComponentRendered).toBeCalled();
  });
});
