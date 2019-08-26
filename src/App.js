import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CreateStructuredNote from './components/CreateStructuredNote/CreateStructuredNote';
import ReviewNote from './components/CreateStructuredNote/ReviewNote/ReviewNote';

class App extends Component {

  render() {
    return (
     <div className="col-md-6">
     {localStorage.getItem("userNotes") === null && <CreateStructuredNote />} 
       {localStorage.getItem("userNotes") !== null && <ReviewNote />}  
      </div>
    );
  }
}

export default App;
