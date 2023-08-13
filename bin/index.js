#!/usr/bin/env node

import Settings from './settings.js';
import TglTable from './table.js';

import { parseArgv } from './utils/argvParser.js';

import { displayHelp } from './utils/help.js';
import { 
    questionCommand, 
    questionInputDescription,
    questionInputTags,
    questionInputProject,
    questionStopEntry,
    questionList,
    questionDeleteEntry } from './utils/questions.js';


export const VALID_COMMANDS = {
    START: 'start',
    STOP: 'stop',
    DELETE: 'delete',
    LIST: 'list',
    HELP: 'help'
}

// * Progres function runs for each command *

async function progress(argv, settings, table) {

    // == Get [command] and [options] ==

    let currentCommand = {};

    if (argv.length <= 0) {
        // No command entered, so ask questions

        let command = await questionCommand();
        currentCommand['command'] = command;

        if (command == VALID_COMMANDS.START) {
            // Ask questions for start
            currentCommand['description'] = await questionInputDescription();
            currentCommand['project'] = await questionInputProject();
            currentCommand['tags'] = await questionInputTags();
        } else if (command == VALID_COMMANDS.LIST) {
            currentCommand['by_server'] = await questionList();
        }

    } else {
        // Get input just from command and options
        currentCommand = parseArgv(argv);
    }


    // == Handle commands and input ==
    if (currentCommand.command == VALID_COMMANDS.START) {

        // Add new entry to the table
        table.addEntry(settings.user, currentCommand.description, currentCommand.project, currentCommand.tags);

    }else if (currentCommand.command == VALID_COMMANDS.STOP) {

        // Stop the last open entry. If more are open give a list and let the user select

        let openEntries = table.getOpenEntries();

        if (openEntries.length == 1) {
            table.stopEntry(openEntries[0]);
        } else if (openEntries.length >= 1) {
            // Let user select entry to stop
            table.stopEntry(await questionStopEntry(openEntries));
        }

    } else if (currentCommand.command == VALID_COMMANDS.LIST) {

        // List the tasks, either in terminal or html format

        if (currentCommand.by_server) {
            await table.listAsHtmlServer();
        } else {
            table.listAsConsoleLog();
        }

    } else if (currentCommand.command == VALID_COMMANDS.DELETE) {

        table.deleteEntry(await questionDeleteEntry(table.entries));
    
    } else if (currentCommand.command == VALID_COMMANDS.HELP) {

        // Show help information

        displayHelp();

    } else {

        // ERROR unknown command

        console.error("ERROR: Unknown command ... ");
        console.error(argv, currentCommand);
    }

}

// Get rid of the execution path from argv
const argv = process.argv.slice(2);

// Load settings and tgl table
let settings = new Settings();
let table = new TglTable(settings);

// Work with current input
await progress(argv, settings, table);

process.exit(1);