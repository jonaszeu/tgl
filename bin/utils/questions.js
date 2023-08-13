// CLI questions

// Inquirer - Input
import inquirer from 'inquirer';

export async function questionCommand() {
    const answer = await inquirer.prompt({
        name: 'questionCommand',
        type: 'list',
        message: 'Select command:\n',
        choices: [
            'start',
            'stop',
            'delete',
            'list',
            'help'
        ]
    });

    return answer.questionCommand;
}

export async function questionList() {
    const answer = await inquirer.prompt({
        name: 'questionList',
        type: 'list',
        message: 'List format:\n',
        choices: [
            'console log',
            'html'
        ]
    });

    return (answer.questionList == 'html');
}


export async function questionInputDescription() {
    const answer = await inquirer.prompt({
        name: 'description',
        type: 'input',
        message: "I'm working on ...",
        default() {
            return '';
        },
    });

    return answer.description;
}


export async function questionInputProject() {
    const answer = await inquirer.prompt({
        name: 'project',
        type: 'input',
        message: "@ Project: ",
        default() {
            return '';
        },
    });

    return answer.project;
}

export async function questionInputTags() {
    const answer = await inquirer.prompt({
        name: 'tags',
        type: 'input',
        message: "# Tag(s): ",
        default() {
            return '';
        },
    });

    return answer.tags.split("#").map(x => x.trim()).filter(item => item != "");
}


export async function questionStopEntry(entries=[]) {

    let choices = [];

    // TODO use representation of date from settings

    for (let entry of entries) {
        let selectText = entry.id + " - " + entry.start;
        if (entry.description != "") { selectText += " - " + entry.description; }

        choices.push(selectText);
    }

    const answer = await inquirer.prompt({
        name: 'stopEntry',
        type: 'list',
        message: 'Select command:\n',
        choices: choices
    });

    let _id = answer.stopEntry.split("-")[0].trim(); 

    return entries.filter(item => item.id == _id)[0];
}


export async function questionDeleteEntry(entries=[]) {

    let choices = [];

    // TODO use representation of date from settings

    for (let entry of entries) {
        let selectText = entry.id + " - " + entry.start;
        if (entry.description != "") { selectText += " - " + entry.description; }

        choices.push(selectText);
    }

    const answer = await inquirer.prompt({
        name: 'deleteEntry',
        type: 'list',
        message: 'Select entry to delete:\n',
        choices: choices
    });

    let _id = answer.deleteEntry.split("-")[0].trim(); 

    return entries.filter(item => item.id == _id)[0];
}