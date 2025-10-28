import React, { useState } from 'react'

const ContactForm = ({existingContact={},updateCallback}) => {
    const [firstName, setFirstName] = useState(existingContact.firstName || "");            //we cheack if theres is an ezisting data if not we use empty string
    const [lastName, setLastName] = useState(existingContact.lastName || "");
    const [email, setEmail] = useState(existingContact.email || "");

    const updating = Object.entries(existingContact).length !== 0       //if the obj we have has lengh>0 means we are updating which means we alreadyhave data

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {          //define data
            firstName,
            lastName,
            email
        }
        const url = "http://127.0.0.1:5000/" + (updating ? `update_contact/${existingContact.id}` : "create_contact")    //define url based on create or update
        const options = {                           //setting opions for request
             method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"      //telling the browser the data is in json
            },
            body: JSON.stringify(data)              //convert to string
        }
        const response = await fetch(url, options)      //hiting the url/sending the request
        if (response.status !== 201 && response.status !== 200) {       //if the response was good
            const data = await response.json()
            alert(data.message)
        } else {
            updateCallback()            //its justs tells app.jsx that we update the contact
        }
    }

  return (  <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button type="submit">{updating ? "Update":"Create Contact"}</button>
        </form>
  )
}

export default ContactForm