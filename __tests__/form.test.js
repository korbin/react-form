jest.autoMockOff();
describe('Form', function() {
  var Form = require('../lib/react-form/form');
  var React = require('react/addons');
  var TestUtils = React.addons.TestUtils;

  var formObject = {
    bar: 'baz'
  }

  var formProps = {
    for: 'foo',
    object: formObject
  };
    var mockChild = React.createClass({
      contextTypes: Form.childContextTypes,
      render: function() {
        return React.DOM.div();
      }
    });


  it('passes context to children', function() {
    var form = TestUtils.renderIntoDocument(React.createElement(Form, formProps));

    var childContext = form.getChildContext();

    expect(childContext.object).toEqual(formObject);
    expect(childContext.namePath.toArray()).toEqual([formProps.for]);
    expect(childContext.valuePath.toArray()).toEqual([]);
    expect(childContext.setPathValue).toBeDefined();
  });

  it('respects override of onSubmit handler', function() {
    var mockOnSubmit = jest.genMockFn();

    var form = TestUtils.renderIntoDocument(React.createElement(Form, {onSubmit: mockOnSubmit}));
    form._handleSubmit();

    expect(mockOnSubmit).toBeCalled();
  });

  it('calls onUpdate if present', function() {
    var mockOnUpdate = jest.genMockFn();

    var form = TestUtils.renderIntoDocument(React.createElement(Form, {onUpdate: mockOnUpdate}));
    form._handleUpdate('path', 'value');

    expect(mockOnUpdate).toBeCalledWith('path', 'value');
  });
});
