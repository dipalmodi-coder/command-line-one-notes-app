const chalk = require('chalk')
const fs = require('fs');

/**
 * Returns all the notes
 */
const listNotes = () => {
    const myNotes = loadNotes();
    return myNotes;
};

/**
 * Returns a note
 * @param {*} title 
 */
const readNote = (title) => {
    const myNotes = loadNotes();
    const matchedNotes = myNotes.find((note) => {
        return (note.title === title);
    });

    // if there are no matcing notes, throw error
    if (matchedNotes) {
        return matchedNotes;
    }
}

/**
 * Helper function to check if array is empty
 * @param {*} obj 
 */
const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
}

/**
 * Adds note to notes.json file storage
 * @param {*} title 
 * @param {*} body 
 */
const addNote = (title, body) => {
    // Load notes from the notes.json file
    const myNotes = loadNotes();

    // Check for duplicate notes
    // Using find function of Arrays, that returns first found note
    const duplicateNotes = myNotes.find((myNote) => {
        return (myNote.title === title);
    });

    // if no duplicate, push a note to array
    if (!duplicateNotes) {
        myNotes.push({
            title: title,
            body: body
        });

        // Save notes
        saveNotes(myNotes);
        console.log("Added a note with title " + chalk.blue(title))
    } else {
        console.log(chalk.red("A note with title " + chalk.blue(title) + " already exists.."));
        return;
    }
};

/**
 * Common function to load notes from file storage
 * Returns an array of notes
 */
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const notesJson = dataBuffer.toString();
        return JSON.parse(notesJson);
    } catch (err) {
        return [];
    }
}

/**
 * Saves notes to notes.json file storage
 * @param {*} myNotes 
 */
const saveNotes = (myNotes) => {
    const notesJson = JSON.stringify(myNotes);
    fs.writeFile('notes.json', notesJson, (err) => {
        if (err) throw err;
    });
}

/**
 * Remove a note
 * @param {*} title 
 */
const removeNote = (title) => {
    // load all notes
    const myNotes = loadNotes();
    // filter notes
    const filteredNotes = myNotes.filter((myNote) => {
        return (myNote.title !== title)
    });
    if (filteredNotes.length !== myNotes.length) {
        saveNotes(filteredNotes);
        console.log(chalk.red("Note with title " + chalk.blue(title) + " deleted!"));
    } else {
        console.log(chalk.red("Note with title " + chalk.blue(title) + " not found!"));
    }
}

// Export all the functions as an obj
module.exports = {
    listNotes: listNotes,
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote
}