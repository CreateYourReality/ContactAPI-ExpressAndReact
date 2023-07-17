import express from "express"
import cors from "cors"
import {addContact, contacts,updateContact,deleteContact} from "./model/ContactModel.js"

const app = express();
const PORT = 3001;

app.use(express.json())
app.use(cors())

app.get("/api/contacts", (req,res) => {
    res.send(contacts)
})

app.post("/api/contacts", async (req, res) => {
    const contact = req.body
    const newContact = await addContact(contact)
    res.send(newContact)
})

app.put("/api/contacts/:id", async (req, res) => {
    const { id } = req.params;
    const contact = req.body
    const updatedContact = await updateContact(id, contact)
    res.send(updatedContact)
})

app.delete("/api/contacts/:id", async (req, res) => {
    const { id } = req.params
    deleteContact(id)
    res.send("Kontakt wurde gelöscht")
})


app.listen(PORT, () => { console.log(`LETS GO${PORT}`) })