import { VALID_COMMANDS } from "../index.js";

export function parseArgv(argv) {

    const command = argv[0];

    // Handling 'stop' command:
    if (command === VALID_COMMANDS.STOP) {
        return { command, };
    }

     // Handling 'help' command:
     if (command === VALID_COMMANDS.HELP) {
        return { command, };
    }

    // Handling 'delete' command:
    if (command === VALID_COMMANDS.DELETE) {
        let id = "";
        if (argv.length > 1) {
            id = argv[1];
        }
        return {
            command,
            id
        };
    }

    // Handling 'list' command:
    if (command === VALID_COMMANDS.LIST) {
        let by_server = false;
        if (argv.length > 1) {
            by_server = true;
        }
        return {
            command,
            by_server
        };
    }
    
    // Handling 'start' command:
    if (command === VALID_COMMANDS.START) {
        let description = '';
        let project = '';
        let tags = [];
        let mode = 'description';

        for (let i = 1; i < argv.length; i++) {
            const arg = argv[i];
            if (arg === '@') {
                mode = 'project';
            } else if (arg === '#') {
                mode = 'tags';
            } else {
                switch (mode) {
                case 'description':
                    description += (description ? ' ' : '') + arg;
                    break;
                case 'project':
                    project += (project ? ' ' : '') + arg;
                    break;
                case 'tags':
                    tags.push(arg);
                    break;
                }
            }
        }

        return {
            command,
            description,
            project,
            tags
        };
    }

    console.error("ERROR: unknown command to parse || Use help for more information on how to use tgl > tgl help ", argv);
    process.exit(1);
}