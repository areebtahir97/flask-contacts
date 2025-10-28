import { useEffect, useState } from 'react'
import './App.css'
import ContactList from './components/ContactList'
import ContactForm from './components/ContactForm'

function App() {
  const [contacts,setContacts]=useState([])
  const [isModalOpen,setISModalOpen]=useState(false)
  const [currentContact, setCurrentContact] = useState({})

  useEffect(()=>{
    fetchContacts()     //to make sure the contacts are fecthed as soon as the compnent is rendered
  },[])

  const fetchContacts= async()=>{
    const respons=await fetch("http://127.0.0.1:5000/contacts")
    const data=await respons.json()   //conver the response into json
    setContacts(data.contacts)
    console.log(data.contacts)
  }
  function closeModal(){
    setISModalOpen(false)
    setCurrentContact({})
  }

  function openCreateModal(){
    if (!isModalOpen){
      setISModalOpen(true)
    }
  }

   const openEditModal = (contact) => {
    if (isModalOpen) return
    setCurrentContact(contact)
    setISModalOpen(true)
  }
  const onUpdate = () => {
    closeModal()
    fetchContacts()
  }


  return (
    <>
      <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate} />
      <button onClick={openCreateModal}>Create New Contact</button>
      {isModalOpen && <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <ContactForm existingContact={currentContact} updateCallback={onUpdate}  />
        </div>
      </div>
      }
      
    </>
  )
}

export default App
