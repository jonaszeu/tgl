// help command cli output

export function displayHelp() {
    console.log(`
    Usage: tgl [command] [options]

    Commands:
    (none)          General start. Prompts for command selection.
    start           Start a tgl entry.
    stop            Stop a tgl entry.
    list            List all tgl tracked entries.
    delete          Delete a specific tgl entry.
    help            Display this help overview.

    Example:
    $ tgl
    > ? Select command: ...

    start: 
    Initiate a tgl tracking entry. Optionally, add a description, project, or tags.

    Options for 'start':
    (description)   Describe what you're working on, e.g., "I'm working on...".
    @               Specify a project using '@'. Example: @ School.
    #               Add multiple tags using '#'. Example: # Programming # French.

    Examples for 'start':
    $ tgl start Working on my homework @ School # Programming # French

    stop:
    Stop the last active entry. If multiple entries are active, you'll be prompted to select one.

    list: 
    Provides an overview of all tracked tgl entries in the terminal.

    Options for 'list':
    -s           Starts server on http://localhost:3000/ with html represenation of table.

    delete: 
    Remove a specific entry from the list.

    For more information, visit ...
    `);
}
