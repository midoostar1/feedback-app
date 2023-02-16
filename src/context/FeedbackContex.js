import React, { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContex = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: "this item is feedback1",
      rating: 7,
    },

    {
        id: 2,
        text: "this item is feedback2",
        rating: 10,
      },

      {
        id: 3,
        text: "this item is feedback3",
        rating: 5,
      },

  ]);

  const [feedbackEdit, setFeedbackEdit] = useState({
      item: {},
      edit: false
  })

  //to add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  //to delete a feedback
  const deleteFeedback = (id) => {
    console.log("reached deleteFeedback");
    if (window.confirm("Are you sure you want to delete?")) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  //Set iten to be updated
  const editFeedback = (item) => { 
     setFeedbackEdit({
         item,
         edit: true
     })  
 }

 //update the feedback
 const  updateFeedback = (id, updItem)=> {
setFeedback(feedback.map((item) => item.id ===id? {...item, ...updItem} : item)
)}


  return (
    <FeedbackContex.Provider
      value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback
      }}
    >
      {children}
    </FeedbackContex.Provider>
  );
};

export default FeedbackContex;
