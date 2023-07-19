import React, { useState } from 'react';
import { data } from './data.js';
import { Form, InputGroup } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';



export default function Boards() {

    const [cards, setCards] = useState([]);
    const [search, setSearch] = useState('');

    const addCard = () => {
      const createNewCards = [...cards, <div key={cards.length} >New Card</div>];
      setCards(createNewCards);
    };
    
// in this code, new divs are created when the button is clicked. New divs are basically cards, which will later on
// have tasks in it
  return (
    <><Form>
      <InputGroup className='my-3'>

        {/* onChange for search */}
        <Form.Control
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search contacts' />
      </InputGroup>
    </Form>
    <Table striped bordered hover>
          <thead>
            <tr>
              <th>Task</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((item) => {
                return search.toLowerCase() === ''
                  ? item
                  : item.tasks.toLowerCase().includes(search);
              })
              .map((item, index) => (
                <tr key={index}>
                  <td>{item.tasks}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
          </tbody>
        </Table>
    
    <div>
        <button class="div-wrapper" onClick={addCard}>Create a new card</button>

        {/* I have used the following resources to learn about map():
    1) https://stackoverflow.com/questions/69065759/create-div-using-button-react
    2) https://www.w3schools.com/js/js_maps.asp */}
        {cards.map((cards) => cards)}
      </div></>
  );
}
   


    
    
