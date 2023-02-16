import React, { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContex = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setisLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    const response = await fetch(`/feedback?_sort=id&_order=desc`);
    const data = await response.json();
    console.log(data);
    setFeedback(data);
    setisLoading(false);
  };

  //to add feedback
   // Add feedback
   const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    })

    const data = await response.json()

    setFeedback([data, ...feedback])
  }


  //to delete a feedback
  const deleteFeedback = async (id) => {
  
    if (window.confirm("Are you sure you want to delete?")) {
     await fetch(`/feedback/${id}`, {method: 'DELETE' })
    
     setFeedback(feedback.filter((item)=>item.id !== id))
    }
  };

  //Set iten to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  //update the feedback
  const updateFeedback = async(id, updItem) => {

    const response = await fetch(`/feedback/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updItem),
    })

    const data = await response.json()
    
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
  };

  return (
    <FeedbackContex.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContex.Provider>
  );
};

export default FeedbackContex;
