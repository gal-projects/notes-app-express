/**
 * Represents a note in the system.
 * 
 * This class provides a structure for storing note information, including
 * an identifier, title, content, and the user associated with the note.
 */
export class Note {
  /** Unique identifier for the note */
  id: number;

  /** Title of the note */
  title: string;

  /** Content or body of the note */
  content: string;

  /** User who created or owns the note */
  user: string;

  /**
   * Constructs a new Note instance.
   * 
   * @param id - The unique identifier for the note.
   * @param title - The title of the note.
   * @param content - The detailed content of the note.
   * @param user - The user associated with the note.
   */
  constructor(id: number, title: string, content: string, user: string) {
      this.id = id;
      this.title = title;
      this.content = content;
      this.user = user;
  }
}

/**
* Represents the raw data structure of notes data, containing an array of notes,
* to extract the notes from the raw JSON object.
*/
export type NotesRaw = {
 notes: Note[]
}