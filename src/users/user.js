import React, { useState, useEffect } from 'react';
import '../App.css';

import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listTodos  } from '../graphql/queries';
import { Form, Button, Card, CardDeck, Row, Col} from "react-bootstrap";
import { createTodo as createNoteMutation, deleteTodo as deleteNoteMutation } from '../graphql/mutations';
import styled from 'styled-components';
import { Amplify, API, Storage } from 'aws-amplify';
import config from '../aws-exports';
Amplify.configure(config);

const initialFormState = { name: '', description: '' }


const Styles = styled.div`

.card {
  width: 300px;
height: 160px;
}
`

function Userloggedin() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchNotes();
  }

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listTodos });
    const notesFromAPI = apiData.data.listTodos.items;
    await Promise.all(notesFromAPI.map(async note => {
      if (note.image) {
        const image = await Storage.get(note.image);
        note.image = image;
      }
      return note;
    }))
    setNotes(apiData.data.listTodos.items);
  }

  async function createNote() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createNoteMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setNotes([ ...notes, formData ]);
    setFormData(initialFormState);
  }

  async function deleteNote({ id }) {
    const newNotesArray = notes.filter(note => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }});
  }
  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }

  function LoadingButton() {
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
      if (isLoading) {
        simulateNetworkRequest().then(() => {
          setLoading(false);
        });
      }
    }, [isLoading]);

    const handleClick = () => setLoading(true);

    return (
      <Button
        variant="primary"
        disabled={isLoading}
        onClick={!isLoading ? handleClick : null}
      >
        {isLoading ? 'Loading…' : 'Click to load'}
      </Button>
    );
  }

  return (
    <div className="App">
      <h1>My Notes App</h1>
      <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Note Name</Form.Label>
    <Form.Control  onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Note name"
        value={formData.name} />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicEmail">
    <Form.Label>Description</Form.Label>
    <Form.Control  onChange={e => setFormData({ ...formData, 'description': e.target.value})}
        placeholder="Note description"
        value={formData.description} />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>
  <Form.Group>
    <Form.File   type="file"
  onChange={onChange}/>
  </Form.Group>
  <Button variant="primary" type="submit"  onClick={createNote} >
    Submit
  </Button>

  </Form>

      <div >
      <CardDeck>
      <Row>
      {
  notes.map(note => (
    <div key={note.id || note.name}>
 <Col>
 <Styles>
  <Card>
    <Card.Img variant="top" className="card" src={note.image}  />
    <Card.Body>
      <Card.Title>{note.name}</Card.Title>
      <Card.Text>
      {note.description}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
    <LoadingButton onClick={() => deleteNote(note)} />
    </Card.Footer>
  </Card>
  </Styles>
  </Col>



    </div>
  ))
}
</Row>
</CardDeck>
      </div>



      <AmplifySignOut />
      </div>


  );


}



export default withAuthenticator(Userloggedin);