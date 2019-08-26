import React, { Component } from "react";

import Input from "./Input";
import TextArea from "./TextArea";
import Button from "./Button";
import ReviewNote from './ReviewNote/ReviewNote';

class CreateStructuredNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      structuredNote: {
        name: "",
        date: "",
        pincode: "",
        owner: "",
        surroundingarea: "",
        constructionquality: "",
        villadecor: ""
      },
      isSubmitted: false
    };
    this.handleTextArea = this.handleTextArea.bind(this);
    this.handlePincode = this.handlePincode.bind(this);
    this.handleFullName = this.handleFullName.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  /* This lifecycle hook gets executed when the component mounts */

  handleFullName(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        structuredNote: {
          ...prevState.structuredNote,
          name: value
        }
      }),
      () => console.log(this.state.structuredNote)
    );
  }

  handlePincode(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        structuredNote: {
          ...prevState.structuredNote,
          pincode: value
        }
      }),
      () => console.log(this.state.structuredNote)
    );
  }

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(
      prevState => ({
        structuredNote: {
          ...prevState.structuredNote,
          [name]: value
        }
      }),
      () => console.log(this.state.structuredNote)
    );
  }

  handleTextArea(e) {
    let value = e.target.value;
      let name = e.target.name;
    this.setState(
      prevState => ({
        structuredNote: {
          ...prevState.structuredNote,
          [name]: value,
          [name]: value,
          [name]: value
        }
      }),
      () => console.log(this.state.structuredNote)
    );
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.setState({isSubmitted: true});
    const userData = this.state.structuredNote;
    localStorage.setItem('userNotes', JSON.stringify(userData) );
    this.setState({structuredNote: userData});
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      structuredNote: {
        name: "",
        date: "",
        pincode: "",
        owner: "",
        surroundingarea: "",
        constructionquality: "",
        villadecor: ""
      },
      isSubmitted: false
    });
  }


  render() {
    return (
      <div>
    
    {!this.state.isSubmitted && <form className="container-fluid" onSubmit={this.handleFormSubmit}>
       <h3> Please create a structured note about the Villa </h3>
        <Input
          inputtype={"text"}
          title={"Name of the villa"}
          name={"name"}
          value={this.state.structuredNote.name}
          placeholder={"Enter name of the villa"}
          required = {"required"}
          handlechange={this.handleInput} />
          <Input
          inputtype={"date"}
          title={"Date of visit"}
          name={"date"}
          value={this.state.structuredNote.date}
          placeholder={"Date of Visit"}
          required = {"required"}
          handlechange={this.handleInput} />
        <Input
          inputtype={"number"}
          name={"pincode"}
          title={"Pincode"}
          value={this.state.structuredNote.pincode}
          placeholder={"Enter the pincode"}
          required = {"required"}
          handlechange={this.handlePincode} />
          <Input
          inputtype={"text"}
          title={"Owner's Name (Optional)"}
          name={"owner"}
          value={this.state.structuredNote.owner}
          placeholder={"Enter name of the villa"}
          handlechange={this.handleInput} />
        <TextArea
          title={"How was the surrounding area of the villa"}
          rows={3}
          value={this.state.structuredNote.surroundingarea}
          name={"surroundingarea"}
          handlechange={this.handleTextArea}
          required = {"required"}
          placeholder={"A note about the surrounding area of the villa"} />
          <TextArea
          title={"How was the construction quality of the villa"}
          rows={3}
          value={this.state.structuredNote.constructionquality}
          name={"constructionquality"}
          handlechange={this.handleTextArea}
          required = {"required"}
          placeholder={"A note about the construction quality of the villa"} />
          <TextArea
          title={"How was the villa decor"}
          rows={3}
          value={this.state.structuredNote.villadecor}
          name={"villadecor"}
          handlechange={this.handleTextArea}
          required = {"required"}
          placeholder={"A note about the villa decor"} />
  
        <Button
          cls={"primary"}
          title={"Save"}
          style={buttonStyle}
          type={"submit"} />

        <Button
          action={this.handleClearForm}
          cls={"secondary"}
          title={"Clear"}
          style={buttonStyle} />

      </form>}
     
         {this.state.isSubmitted && <ReviewNote data= {this.state.structuredNote} submitted = {this.state.isSubmitted} />}
      
      </div>

    );
  }
}

const buttonStyle = {
  margin: "10px 10px 10px 10px"
};

export default CreateStructuredNote;
