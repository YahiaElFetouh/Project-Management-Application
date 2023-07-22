import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import {
  Container,Stack,TextField,Box,Typography} from "@mui/material";
  import React, { useState } from 'react';



export default function Boards() {

    

    const [cards, setCards] = useState([]);

    const addCard = () => {
      const createNewCards = [...cards, <div key={cards.length} >New Card</div>];
      setCards(createNewCards);
    };
    
// in this code, new divs are created when the button is clicked. New divs are basically cards, which will later on
// have tasks in it
  return (
    <div>
      <button class ="div-wrapper" onClick={addCard}>Create a new card</button>

      {/* I have used the following resources to learn about map():
      1) https://stackoverflow.com/questions/69065759/create-div-using-button-react
      2) https://www.w3schools.com/js/js_maps.asp */}
      {cards.map((cards) => cards)}
    </div>
  );
}
   


    
    
