var React = require('react');
var {Form, FormControl, FormGroup} = require('react-bootstrap-form');
var ValidationError = require('react-bootstrap-form').ValidationError;
var Result = require('Result');

var Underground = React.createClass({

  getInitialState() {
    return {
      undergroundColour: '',
      result: '',
    };
  },

  validateAnswer(answer) {
    if(answer.toLowerCase()==="brown"){
      this.setState({
        result: 'Correct - Your secret code is Gunnersbury'
      });
    } else {
      this.setState({
        result: 'Wrong! - So wrong it hurts'
      });
    }
     document.getElementById("myForm").reset();
  },

  handleChange(e) {
   e.preventDefault();
    this.setState({ undergroundColour: e.target.undergroundAnswer });
    const givenAnswer=e.target.undergroundAnswer.value
    console.log(givenAnswer);
    this.validateAnswer(givenAnswer);
  },

  render() {
    return (
    <div>
    <h2>What Colour is the Bakerloo Line</h2>
    <form id="myForm" onSubmit={this.handleChange}>
    <input type="text" name="undergroundAnswer" />
    </form>
    <Result result={this.state.result}/>
    </div>
    );
  },
});

module.exports= Underground;
