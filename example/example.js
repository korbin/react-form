var objectPath = require('object-path');
var React = require('react/addons');
var rf = require('react-form');
    rfi = require('react-form-inputs');

var gizmo = {
  'name':'foo',
  'description': 'Hello world!\nHow are you?',
  'owner':{
    'name':'Foo Barrington'
  },
  'widgets':[
    {
      'name':'Baz',
      'type': 'Knickknack',
      'color': 'Red'
    },
    {
      'name':'Qux'
    }
  ]
};

var handleSubmit = function(e) {
  e.preventDefault();
  console.log('Captured submit for form, object:', this.getValue());
};

var handleUpdate = function(path, value) {
  console.log('Captured update for path: "' + path.toArray() + '", value: "' + value + '"');
  objectPath.set(gizmo, path.toArray(), value);
  React.render(<Example object={gizmo} />, document.getElementById('example'));
};

var newWidget = function() {
  gizmo.widgets.push({});
  React.render(<Example object={gizmo} />, document.getElementById('example'));
  console.log('Blank widget added');
};

var Example = React.createClass({
  render() {
    return (
      <rf.Form {...this.props} onUpdate={handleUpdate} onSubmit={handleSubmit}>
        <h1>Edit Gizmo</h1>
        <rf.Input type={rfi.Text} for="name" placeholder="Name" />
        <rf.Input type={rfi.Textarea} for="description" placeholder="Description" />

        <rf.Inputs for="owner">
          <h4>Owner</h4>
          <rf.Input type={rfi.Text} for="name" placeholder="Owner Name" />
          <hr />
        </rf.Inputs>

        <rf.Inputs for="widgets">
          <h4>Widget</h4>
          <rf.Input type={rfi.Text} for="name" placeholder="Widget Name" />
          <rf.Input type={rfi.Datalist} for="color" collection={['Red', 'Green', 'Blue']} placeholder="Color" />
          <rf.Input type={rfi.Radio} for="type" collection={['Doodad', 'Knickknack']} />
          <hr />
        </rf.Inputs>

        <input type="button" value="New Widget" onClick={newWidget} />
        <input type="submit" value="Submit" />
      </rf.Form>
    );
  }
});

React.render(<Example object={gizmo} />, document.getElementById('example'));
