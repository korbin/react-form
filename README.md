# react-form
[![npm version](https://badge.fury.io/js/react-form.svg)](http://badge.fury.io/js/react-form)
[![Build Status](https://travis-ci.org/korbin/react-form.svg?branch=master)](https://travis-ci.org/korbin/react-form)

## Synposis
**react-form** is a lightweight, opinionated form-building system for [React](https://github.com/facebook/react). The react-form DSL was designed to produce clean code that directly resembles an underlying object hierarchy.

## Design Goals
- Consistent, clean, fun-to-use DSL.
- Server-side rendering is assumed.
- Input components are pluggable.
- HTTP POST backward compatibility.

## Quick Start
Install react-form, react-form-inputs:
```Shell
npm install --save react-form react-form-inputs
```
Basic usage example (JSX+ES6):

```JavaScript
var React = require('react');
var {Form, Input} = require('react-form');
var {Password, Text} = require('react-form-inputs');

var LoginForm = React.createClass({
  render() {
    return (
      <Form {...this.props} for="user">
        <h1>Login</h1>
        <Input type={Text} for="username" placeholder="Username" />
        <Input type={Password} for="password" placeholder="Password" />
        <input type="submit" value="Login" />
      </Form>
    );
  }
});

var user = {
  username: null,
  password: null
};

React.render(<LoginForm object={user} />, document.getElementById('login'));
```

react-form ships with an example application - try it out:

```Shell
cd example
npm install
npm link ../
node app
#Open http://localhost:3000
```

## Technical
### Object mapping
react-form uses a context-based materialized path system to track and propagate object changes.

The *Form*, *Inputs*, and *Input* components expose interfaces to easily reference nodes anywhere in an object hierarchy. Each of the aforementioned components represents a "path segment."

Each of these components exposes 

### Components
#### Form
Form is a required outer container component. Form components are responsible for maintaining state and propagating changes. Form exposes event interfaces for advanced integration with a parent application, Store, component, etc.

Form has several configurable props:
- **for** `String` - Namespace for a Form instance. Used to generate input names. Defaults to "object."
- **object** `Object` - Object used to hydrate input fields. Defaults to "{}."
- **onSubmit** `Function(event)` - Called when Form instance is submitted.
- **onUpdate** `Function(path, value)` - Called when a nested Input at *path* undergoes a value change to *value*. NOTE: Supplying this handler disables internal Form state management; onUpdate must replace props.object to trigger a rerender.
- Unmentioned props are applied to the resulting form tag.

**Tip:** When implementing a custom onUpdate or onSubmit handler, use objectPath and
this.getValue() to negotiate object changes.

#### Inputs
Inputs is a nested container element. Inputs is required to reference nested objects and arrays of objects. **Inputs is not utilized in simple, single-tier models.**

When referencing an Array of objects, all children are duplicated and mapped to each array element.

Inputs has two user-configurable props:
- **for** `String` - Required path segment. Must reference an object or array of objects.
- **forName** `String` - Optionally used to override "name" attributes of nested components.

Example:
```JavaScript
var {Form, Inputs} = require('react-form');
var gizmo = { //path: []
    widgets: [ //path: [widgets] <-- INPUTS
        { color: "Red" }, //path: [widgets, 0, color]
        { color: "Blue" } //path: [widgets, 1, color]
//...
<Form for="gizmo" object={gizmo}>
  <Inputs for="widgets"> //in this example, children will be duplicated twice
```

#### Input
Input is the most commonly-used component. Input is used to render form controls, each varying in function and complexity.

Input requires API-compliant, pluggable components known as "types." For flexibility, no Input types ship with react-form. A number of useful, common components can be found in [react-form-inputs](https://github.com/korbin/react-form-inputs).

Input has three universally-applicable props:
- **type** `Input type` - Required, API-compliant component to render.
- **for** `String` - Required path segment. Must reference a value appropriate for given Input type.
- **forName** `String` - Optionally used to override generated Input "name."

See type-specific documentation for respective Input types for additional, configurable props.

Example:
```JavaScript
var React = require('react');
var {Form} = require('react-form');
var Text = require('react-form-inputs/text');

var gizmo = { //path: []
    name: "Foo" //path: [name]
//...
<rf.Form for="gizmo" object={gizmo}>
    <rf.Input type={Text} for="name" /> //Initial value of "Foo"
```

### Addons
Documentation regarding the built-in addon system will be provided in an upcoming release. Optional addons enabling conformity with Rails-conventions, field label generation, and error handling are in development.

## Developing
Presently, react-form APIs are highly unstable, untested, and explosive!

Run tests:
```Shell
npm test
```

Link a dependent project:
```Shell
#Within dependent project directory...
npm link ~/path-to-react-form/
```

## Contributing
- [Fork](https://github.com/korbin/react-form/fork) the project.
- Create a descriptively-named branch for your changes. *(fix_whatever, add_this)*
- Commit your change.
- Add appropriate documentation, test coverage.
- Test with "npm test" (requires jest-cli).
- Issue a [pull request](https://github.com/korbin/react-form/pulls) for your branch.

## Thanks
The react-form DSL was **heavily** inspired by (stolen from) [Formtastic](https://github.com/justinfrench/formtastic). 

## License
react-form is released under the [MIT License](https://github.com/korbin/react-form/blob/master/LICENSE).
