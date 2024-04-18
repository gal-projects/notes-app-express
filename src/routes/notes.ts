import { Request, Response, Router } from 'express'
import * as fs from 'node:fs'
// const fs = require('fs')
import { getNotes, getNoteById, writeNotesToFile, addNote, updateNote, deleteNoteById } from '../services/data'
import { Note } from '../types/notes'


export const notesRouter = Router()

// CRUD - Create Read Update Delete
// PUT/PATCH, POST, GET, DELETE

// Create - POST
notesRouter.post('/', (req: Request, res: Response) => {

  // 1. Daten aus der Anfrage auslesen
  // Wir erwarten, dass wir Informationen zum title, content, user
  // Warum erwarten wir keine ID? Eine ID liegt in unserer Verantwortung

  // const { title, content, user } = req.body

  const title: string = req.body.title
  const content: string = req.body.content
  const user: string = req.body.user

  // 2. Daten möchten wir an unsere Datei anhängen
  // Merke: ID selber festlegen
  addNote(title, content, user)
  
  // 3. Rückmeldung geben, ob alles funktioniert hat

  res.status(204).send()
})

// Read - GET
// '/' return all saved notes
notesRouter.get('/', (req: Request, res: Response) => {

  // 1. Inhalte aus der Datei auslesen
  // 2. Daten zwischenspeichern und verarbeiten und vorbereiten

  const notes: Note[] = getNotes()

  // 3. Inhalte ausliefern

  res.status(200).send(notes)

  // 4. auf Postman Anfrage senden -> überprüfen, ob alles funktioniert

})

// '/:id' return only one result
notesRouter.get('/:id', (req: Request, res: Response) => {

  const id: number = parseInt(req.params.id)

  // 1. Inhalte aus der Datei auslesen
  // 2. Daten zwischenspeichern und verarbeiten und vorbereiten
  // nur die Notiz finden, die die verlangte ID hat

  const note: Note | undefined = getNoteById(id)
  // console.log(note)

  // 3. Inhalte ausliefern

  if (note === undefined) {
    // wenn wir keine passende Notiz gefunden haben
    res.status(404).send(`Note with ID ${id} was not found.`)
  } else {
    // notiz gefunden
    res.status(200).send(note)
  }

  // 4. auf Postman Anfrage senden -> überprüfen, ob alles funktioniert

})

// Update - PUT -> TODO: Beispiel
notesRouter.put('/:id', (req: Request, res: Response) => { 
  // 1. Daten aus der Anfrage auslesen
  // Wir erwarten, dass wir Informationen zum title, content, user

  // const { title, content, user } = req.body

  const title: string = req.body.title
  const content: string = req.body.content
  const user: string = req.body.user
  const id: number = parseInt(req.params.id)

  const oldNote: Note | undefined = getNoteById(id)

  if (oldNote === undefined) {
    res.status(404).send(`Die Notiz mit ID ${id} wurde nicht gefunden.`)
    return
  }

  //dieser Code wird nur dann asugefueht, wenn die alte Notiz existiert
  updateNote(id, title, content, user)

  // 3. Rückmeldung geben, ob alles funktioniert hat

  res.status(204).send()


})

// Update - PATCH -> TODO: Beispiel
notesRouter.patch('/:id', (req: Request, res: Response) => {
  // 1. Daten aus der Anfrage auslesen
  // Wir erwarten, dass wir Informationen zum title, content, user

  // const { title, content, user } = req.body
  const id: number = parseInt(req.params.id)

  const oldNote: Note | undefined = getNoteById(id)

  if (oldNote === undefined) {
    res.status(404).send(`Die Notiz mit ID ${id} wurde nicht gefunden.`)
    return
  }

  const title: string = req.body.title ?? oldNote.title
  const content: string = req.body.content ?? oldNote.content
  const user: string = req.body.user ?? oldNote.user

  //dieser Code wird nur dann asugefueht, wenn die alte Notiz existiert
  updateNote(id, title, content, user)

  // 3. Rückmeldung geben, ob alles funktioniert hat

  res.status(204).send()

 })

// Delete - DELETE
notesRouter.delete('/:id', (req: Request, res: Response) => { 

  const id: number = parseInt(req.params.id)

  const oldNote: Note | undefined = getNoteById(id)

  if (oldNote === undefined) {
    res.status(404).send(`Die Notiz mit ID ${id} wurde nicht gefunden.`)
    return
  }

  //dieser Code wird nur dann asugefueht, wenn die alte Notiz existiert
  deleteNoteById(id)

  // 3. Rückmeldung geben, ob alles funktioniert hat

  res.status(204).send()

})