import React, { Component } from "react"; 

import Input from "../Input";
import Button from "../Button";
import CreateStructuredNote from '../CreateStructuredNote';


const buttonStyle = {
  margin: "10px 10px 10px 10px"
};

const smbuttonStyle = {
  position:"absolute",
   top:"200px",
  backgroundImage: 'url(./../edit-button.jpg)',
  backgroundRepeat: 'no-repeat'
};

const saveReviewStyle = {
  position:"absolute",
   top:"200px",
   left: "250px"
}

const inpStyle = {
  width: "300px",
  height: "50px"
}


class ReviewNote extends Component {
  constructor(props) {
    super(props);
    const userData = JSON.parse(localStorage.getItem("userNotes"));
    this.state = {structuredNote: userData, showEdit: false, showReviewBox: false, saveReview: [{comments: "", selectedtext: ""}]}
 
    this.deleteNotes = this.deleteNotes.bind(this);
    this.onTextSelection = this.onTextSelection.bind(this); 
    this.onEditClk = this.onEditClk.bind(this);
    this.onSaveReview = this.onSaveReview.bind(this);
    this.highlightSelection = this.highlightSelection.bind(this);
    this.highlightRange = this.highlightRange.bind(this);
    this.deletenode = this.deletenode.bind(this);
   /* this.buildrangeAgain = this.buildrangeAgain.bind(this);*/
  }

componentDidMount(){
 if (typeof localStorage.getItem("highlightedData") !== 'undefined' && localStorage.getItem("highlightedData") !== null){
    const loadData = JSON.parse(localStorage.getItem("highlightedData")) ;
    this.setState({ showEdit: false, showReviewBox: false, saveReview: loadData});  
     /*  this.buildrangeAgain();*/
  }
  
}

 deleteNotes(e) {
    e.preventDefault();
   this.setState({
      structuredNote: {
        name: "",
        date: "",
        pincode: "",
        owner: "",
        surroundingarea: ""
      },
      isSubmitted: false
    });

    localStorage.removeItem("userNotes");
    localStorage.removeItem("highlightedData");
    localStorage.removeItem("selectedValue");
  }

onTextSelection(){
  const {showEdit} = this.state;

  if(window.getSelection().toString().length>0){
    this.setState({showEdit: true});
  }
}


onEditClk(){
  
  this.highlightSelection();

  let selectedValue= this.highlightSelection().selString;
  console.log(selectedValue);

  localStorage.setItem("selectedValue", selectedValue);
  this.setState({showReviewBox: true});
  /*this.setState(
      prevState => ({
        ...prevState,
        saveReview: [{
          selectedtext: selectedValue
        }]
      }),
      () => console.log(this.state.saveReview)
    );*/

}

onSaveReview(e){
     e.preventDefault(); 

     const {saveReview} = this.state;
     const newReview = this.newReview.value;
     const newObj = {comments:newReview, selectedtext:localStorage.getItem("selectedValue")};
   // const selt = this.state.saveReview.selectedtext;
 /*this.setState(
      prevState => ({
        showEdit: false, onEditClk: false,
        saveReview: [{
          ...prevState,
          comments:newReview
        }]
      }),
      () => console.log(this.state.saveReview)
    );*/

   this.setState({ showEdit: false, showReviewBox: false, saveReview: [...this.state.saveReview, newObj]}, () => {
    const highlightedData = this.state.saveReview;
    localStorage.setItem('highlightedData', JSON.stringify(highlightedData) );
    console.log(this.state.saveReview)
  });

  /* this.setState({ showEdit: false, showReviewBox: false, saveReview: [...this.state.saveReview, {comments:newReview, selectedtext: this.state.saveReview.selectedtext  }]});
*/
}


highlightSelection() {
        var userSelection = window.getSelection();

       /* if (typeof localStorage.getItem("highlightedData") !== 'undefined' && localStorage.getItem("highlightedData") !== null){
            const loadData = JSON.parse(localStorage.getItem("highlightedData")) ;
            userSelection =  loadData[1].selectedtext;
            console.log(userSelection)
         }*/
        //Attempting to highlight multiple selections (for multiple nodes only + Currently removes the formatting)
        for(var i = 0; i < userSelection.rangeCount; i++) {
          //Copy the selection onto a new element and highlight it
          var node = this.highlightRange(userSelection.getRangeAt(i)/*.toString()*/);
          // Make the range into a variable so we can replace it
          var range = userSelection.getRangeAt(i);
          //Delete the current selection
          range.deleteContents();
          //Insert the copy
          range.insertNode(node);
        }
        
        //highlights 1 selection (for individual nodes only + Need to uncomment on the bootom)
        //highlightRange(userSelection.getRangeAt(0));
        
        //Save the text to a string to be used if yoiu want to

        // save range to local storage
        var startOffset = range.startOffset;  // where the range starts
        var endOffset = range.endOffset;      // where the range ends
/*
       localStorage.setItem('so', startOffset);
       localStorage.setItem('eo', endOffset);
*/
        var selString = range;     //      this.setState({saveReview: [{selectedtext: string1}]});
        return {selString:selString};
      

      /*    this.setState(
                prevState => ({
                  saveReview: {
                    ...prevState.saveReview,
                    selectedtext: string1
                  }
                }),
                () => console.log(this.state.structuredNote)
              );
        console.log(this.state);*/
      
      }
      
      /*
buildrangeAgain(){
  var range = document.createRange();

localStorage.getItem('so');
       localStorage.getItem('eo');

    range.setStart('p', localStorage.getItem('so'));
    range.setEnd('p', localStorage.getItem('eo'));
    return range;  
}
*/
      //Function that highlights a selection and makes it clickable
  highlightRange(range) {
          //Create the new Node
          var newNode = document.createElement("span");
          
          // Make it highlight
          newNode.setAttribute(
             'class',
             'highlighted-text'
          );
          
          //Make it "Clickable"
          newNode.onclick = function(){
                        alert(range);
        };
         
          //Add Text for replacement (for multiple nodes only)
          //newNode.innerHTML += range;
          newNode.appendChild(range.cloneContents());
          
          //Apply Node around selection (used for individual nodes only)
          //range.surroundContents(newNode);
          
          return newNode;
      }
      
      deletenode(node){
        var contents = document.createTextNode(node.innerText);
        node.parentNode.replaceChild( contents, node);
      }

render() {
    return (
        <div>{localStorage.getItem("userNotes") !== null &&  <div className="post-container">
               <h3> Review your note </h3>
                 <strong>Name of the villa: </strong><br/>
             <p onMouseUp={this.onTextSelection} >    {this.state.structuredNote.name}</p>
             <div><strong> Date of Visit:</strong><br/> {this.state.structuredNote.date}</div>
             <div><strong> Pincode:</strong><br/> {this.state.structuredNote.pincode}</div>
               <div><strong> Owners Name:</strong><br/> {this.state.structuredNote.owner}</div>
            <p onMouseUp={this.onTextSelection}> <strong>Surrounding Area:</strong> <br/> {this.state.structuredNote.surroundingarea}</p>
            <p onMouseUp={this.onTextSelection}> <strong>Construction quality:</strong> <br/> {this.state.structuredNote.constructionquality}</p>
            <p onMouseUp={this.onTextSelection}> <strong>Villa Decor:</strong> <br/> {this.state.structuredNote.villadecor}</p>
                <Button
                action={this.deleteNotes}
                cls={"secondary"}
                title={"Delete All"}
                style={buttonStyle} />
                  
                  {this.state.showEdit && <Button action={this.onEditClk} type={"button"} cls="btn btn-primary btn-sm" style={smbuttonStyle} title={"Write Review"} />} 

                  {this.state.showReviewBox && <form className="form-inline" onSubmit={this.onSaveReview}><div className="input-group mb-3" style={saveReviewStyle} >
                            <span><input ref={input=> this.newReview = input} inputtype={"text"} placeholder={"Record your review"} name={"comments"} style={inpStyle} /></span>
                              <Button className="btn btn-btn-primary" type={"submit"} title={"Save"} />
                          </div></form>} 

                </div> }
          {localStorage.getItem("userNotes") === null && <CreateStructuredNote />} 
        </div>


    	)
}
  }

  export default ReviewNote;
