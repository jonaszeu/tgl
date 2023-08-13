import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { VALID_DURATION_FORMATS } from './settings.js';

import { 
    getDifferenceInTimeStringClassic,
    getDifferenceInTimeStringImproved,
    getDifferenceInTimeStringDecimal } from './utils/durationFormat.js';
import { startResultServer } from './utils/listServer.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename) + '/data';


class TglTable {
    /*
        Simple class to represent the tracked tgl entries in the table json
    */

    constructor(settings) {

        // Generic table path
        this.fileName = "table_" + settings.workspace.replace(/\s+/g, '') + ".json"
        this.filePath = path.join(__dirname, this.fileName);

        // Check if table already exists, then load all entries
        if (fs.existsSync(this.filePath)) {
            const raw_table = fs.readFileSync(this.filePath, 'utf-8');
            let table = JSON.parse(raw_table);

            this.workspace = table.workspace;
            this.projects = table.projects;
            this.entries = table.entries;
            this.id_counter = table.id_counter;
        } else {
            this.workspace = "";
            this.projects = [];
            this.entries = [];
            this.id_counter = 0;
        }

        // Set settings for current table instance
        this.durationFormat = settings.durationFormat
        
    }


    save() {
        // Save current table as json

        let table = {
            workspace: this.workspace,
            projects: this.projects,
            entries: this.entries,
            id_counter: this.id_counter
        }

        fs.writeFileSync(this.filePath, JSON.stringify(table, null, 4));
    }

    hasProject(project="") {
        if (project == "" || this.projects.includes(project)) { return true; }
        return false;
    }

    addProject(project="") {
        this.projects.push(project);
    }

    getOpenEntries() {
        return this.entries.filter(item => item.end === "");
    }

    addEntry(user="", description="", project="", tags=[]) {

        // Generate start time
        let cur_time = new Date();

        // Add project if not already tracked
        if(!this.hasProject(project)) { this.addProject(project); }

        this.id_counter += 1;

        let entry = {
            id: this.id_counter.toString(),
            user: user,
            start: cur_time.toISOString(),
            end: '',
            description: description,
            project: project,
            tags: tags
        };

        this.entries.push(entry);
        this.save();
    }

    stopEntry(entry) {
        
        let curDate = new Date();

        let _index = this.entries.findIndex(item => item.id == entry.id);
        this.entries[_index].end = curDate.toISOString();

        this.save();
    }

    deleteEntry(entry) {

        let _index = this.entries.findIndex(item => item.id == entry.id);
        
        if (_index !== -1) {
            this.entries.splice(_index, 1);
        } else {
            console.log(`Entry ${entry} not found.`);
        }

        this.save();
    }

    listAsString() {

        if (this.entries.length < 1) { return "Currently no entries ... Start adding entries with > tgl"; }

        let output = "\n";

        for (let entry of this.entries) {
            // Add: time
            let startDate = new Date(entry.start);
            let endDate = new Date();
            
            if (entry.end != "") {
                endDate = new Date(entry.end);    
            } else {
                output += "Ongoing - ";
            }

            switch (this.durationFormat) {
                case VALID_DURATION_FORMATS.IMPROVED:
                    output += getDifferenceInTimeStringImproved(startDate, endDate);
                    break;
                case VALID_DURATION_FORMATS.DECIMAL:
                    output += getDifferenceInTimeStringDecimal(startDate, endDate);
                    break;
                case VALID_DURATION_FORMATS.CLASSIC:
                    output += getDifferenceInTimeStringClassic(startDate, endDate);
                    break;
                default:
                    output += getDifferenceInTimeStringImproved(startDate, endDate);
                    break;
            }
            
            // Add: description # Tags 
            if (entry.description != "") { output += entry.description; }

            for (let tag of entry.tags) { output += " #" + tag; }

            output += "\n";

            // Add: @ Project
            if (entry.project != "") { output += "@" + entry.project + "\n"; }

            output += "\n";
        }

        return output;
    }

    async listAsHtmlServer() {
        await startResultServer(this); 
    }

    listAsConsoleLog() {
        console.log(this.listAsString());
    }
}

export default TglTable;