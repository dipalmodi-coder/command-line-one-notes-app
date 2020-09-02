// Import global packages
const yargs = require('yargs')
const chalk = require('chalk')
// Import local packages
const notes = require('./notes.js');

// Set the version for this app
yargs.version('1.1.0');

/**
 * Adds a note
 */
yargs.command({
    command: 'add',
    describe: 'Add a new note.',
    aliases: ['a'],
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "Note content",
            demandOption: true,
            type: 'string'
        }

    },
    handler: (argv) => {
        notes.addNote(argv.title, argv.body);
    }
});

/**
 * Removes a note
 */
yargs.command({
    command: 'remove',
    describe: 'Remove a note.',
    aliases: ['d'],
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.removeNote(argv.title);
    }
});

/**
 * Read a note
 */
yargs.command({
    command: 'read',
    describe: 'Read a note.',
    aliases: ['r'],
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        const myNotes = notes.readNote(argv.title);
        if (myNotes) {
            printNote(myNotes);
        } else {
            console.log(chalk.red("Note with title: " + chalk.blue(argv.title) + " does not exist!"));
        }
    }
});

yargs.command({
    command: 'list',
    describe: 'Lists all notes.',
    aliases: ['l'],
    handler: () => {
        const myNotes = notes.listNotes();
        console.log(chalk.inverse.bold.greenBright("Your Notes"));
        printNotes(myNotes);
    }
});

/**
 * Helper function to print notes
 * @param {*} note 
 */
const printNotes = (myNotes) => {
    console.log("--------------------------");
    myNotes.forEach((note) => {
        console.log(chalk.blue.bold(note.title));
    });
};

/**
 * Helper function to print notes
 * @param {*} note 
 */
const printNote = (note) => {
    console.log("--------------------------");
    console.log(chalk.blue.bold(note.title));
    console.log(chalk.yellow(note.body));
};


// Call parse method on yargs
yargs.parse();
