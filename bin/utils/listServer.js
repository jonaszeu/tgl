import http from 'http';

import { getDifferenceInTimeStringImproved } from './durationFormat.js';

function createHtmlContent(table) {

  let entriesHtmlContent = "";

  for (let entry of table.entries) {

    let startDate = new Date(entry.start);
    let endDate = new Date();
    
    if (entry.end != "") {
        endDate = new Date(entry.end);    
    }

    let description = "";

    if (entry.description != "") {
      description = entry.description;
    }

    for (let tag of entry.tags) {
      description += " #" + tag; 
    }


    if (description == "") {
      description = "+ Add description";
    }

    let project = entry.project;

    if (project == "") {
      project = "• No project";
    }

    let user = entry.user;

    if (user != "") { user = "(" + user + ")"; }


    entriesHtmlContent += `
      <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
        <div class="d-flex gap-2 w-100 justify-content-between">
          <div>
            <h6 class="mb-0">${description} ${user}</h6>
            <p class="mb-0 opacity-75">${project}</p>
          </div>
          <small class="opacity-50 text-nowrap">${getDifferenceInTimeStringImproved(startDate, endDate)}</small>
        </div>
      </a>`;
  }
  return `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Tgl Overview</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    </head>
    <head><title>Tgl Overview</title></head>
    <body>
      <div class="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
        <h1>Workspace ${table.workspace}</h1>  
      </div>
      <div class="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
        <div class="list-group">
        ${entriesHtmlContent}
        </div>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
    </body>
  </html>
  `;
}

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}


export async function startResultServer(table) {

  const htmlContent = createHtmlContent(table);

  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlContent);
  }); 

  server.listen(3000, () => {
      console.log('List results on server running at http://localhost:3000/');
      console.log('Close server with Ctrl + C');
      console.log('Otherwise server closes in 20 sec.');
  });

  await sleep(20000);

}