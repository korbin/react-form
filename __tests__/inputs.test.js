jest.autoMockOff();
describe('Inputs', function() {
  var Inputs = require('../lib/react-form/inputs');
  var Immutable = require('immutable');
  var React = require('react/addons');
  var TestUtils = React.addons.TestUtils;

  var ctx = {
    object: {foo: [{}, {}]},
    namePath: Immutable.List(),
    valuePath: Immutable.List(),
    setPathValue: function(){}
  };

  var inputs = React.withContext(ctx, function() {
    return React.createElement(Inputs, {for:'foo'}, React.DOM.div({className:'mock'}));
  });

  it('duplicates children for each object array item', function() {
    var rendered = TestUtils.renderIntoDocument(inputs);

    expect(TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'mock').length).toEqual(2);
  });
});
