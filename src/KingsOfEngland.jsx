var React = require('react');
var {Form, FormControl, FormGroup} = require('react-bootstrap-form');
var ValidationError = require('react-bootstrap-form').ValidationError;


var KingsOfEngland = React.createClass({

  getInitialState() {
    return {
      undergroundColour: '',
      result: '',
    };
  },

  validateAnswer(answer) {
    if(answer.toLowerCase()==="charles i"){
      console.log("Correct - Your secret code is Markle");
    } else {
      console.log("Pah! Off with your wee head!")
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
    <h2>Who has the second King England to be born in Scotland?</h2>
    <form id="myForm" onSubmit={this.handleChange}>
    <input type="text" name="undergroundAnswer" />
    </form>

    </div>
    );
  },
});

module.exports= KingsOfEngland;
