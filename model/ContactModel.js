import fs from "node:fs/promises"
import {v4 as uuidv4 } from "uuid"

const FILEPATH = "./data/contacts.json"

export let contacts = [];

const firstConfig = async () => {
    try{
        const buffer = await fs.readFile(FILEPATH)
        contacts = JSON.parse(buffer)
    }catch(error){
        console.error("Error reading contacts from file", error)
    }
}

firstConfig();

const saveToFile = async () => {
    try {
        await fs.writeFile(FILEPATH, JSON.stringify(contacts))
    } catch (error) {
        console.error("Error saving contacts to file", error)
    }
}

export const addContact = async (contact,email,telefon) => {
    const newContact = { ...contact,...email,...telefon, id: uuidv4() }
    contacts.push(newContact)
    await saveToFile()
    return newContact;
}

// hier wird die ID gesucht
const findByIndex = (id) => {
    return contacts.findIndex((contact) => contact.id === id)
}

export const updateContact = async (id, contact) => {
    const contactIndex = findByIndex(id)
    if (contactIndex !== -1) {
        const updatedContact = { ...contacts[contactIndex], ...contact }
        contacts[contactIndex] = updatedContact
        await saveToFile();
        return updatedContact;
    }
    return null;
}

export const deleteContact = async (id) => {
    const contactIndex = findByIndex(id)
    if (contactIndex !== -1) {
        contacts.splice(contactIndex, 1)
        await saveToFile()
        return true
    }
    return false
}