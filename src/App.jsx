
import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [contacts, setContacts] = useState([])
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get("/api/contacts")
      //  console.log(res)
        setContacts(res.data)
      } catch (error) {
        console.error("res funktioniert nicht")
      }
    }
    fetchContacts()
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault()
    const name = e.target.elements.contact.value
    const email = e.target.elements.email.value
    const telefon = e.target.elements.telefon.value
    try {
      const res = await axios.post("/api/contacts", { name,email,telefon })
      console.log(res.data)
      setContacts([...contacts, res.data])
      e.target.reset()
    } catch (error) {
      setErrors(error.res.data.errors)
    }
  }

  const deleteContact = async (id) => {
    try {
      axios.delete(`/api/contacts/${id}`)
      setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  const updateContactHandle = async (id, completed) => {
    try {
      await axios.put(`/api/contacts/${id}`, { completed });
      const updateContacts = contacts.map((contact) => {
        if (contact.id === id) {

          return {
            ...contact,
            completed,
          };
        }
        return contact;
      });
      setContacts(updateContacts);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>CONTACT LIST</h1>
      <form onSubmit={handleSubmit}>
        <input id='contact' type="text" />
        <input id='email' type="text" />
        <input id='telefon' type="number" />

        <small>{errors?.title?.message}</small>
        <br />
        <button type='submit'>Submit</button>
      </form>

      {contacts?.map((contact) => {
        console.log(contact)
        return (

          <div className='myDiv' key={contact.id}>

            <p>{contact.name}</p>
            <p>{contact.email}</p>
            <p>{contact.telefon}</p>  

            <button onClick={() => deleteContact(contact.id)}>Delete</button>

          </div>
        )

      })}

    </>
  )
}

export default App