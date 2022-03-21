//Projekt

//variables

const websiteEl = document.getElementById("websites");
const websiteTable = document.getElementById("website_table");
const websiteForm = document.getElementById("website_form");

const urlInput = <HTMLInputElement>document.getElementById("url");
const descriptionInput = <HTMLInputElement>document.getElementById("description");

const websiteOutputEl = document.getElementById('websiteOutput');
const addWebsiteButtonEl = document.getElementById('submitWebsite');
const updateWebsiteButtonEl = document.getElementById('updateWebsite');

//GET Projects/websites
function getWebsites() {
    websiteTable.innerHTML = `<thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Link</th>
                        </tr>`;

    fetch("https://studenter.miun.se/~lias1700/writeable/projekt-webbtjanst/websites.php")
    .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error("Failed to fetch");
        }
    })
    .then(data => {
        if(!data.message) {
            data.forEach((website : {title: string, description: string, url: string}) => {
                websiteTable.innerHTML += 
                            `<tr>
                                <td>${website.title}</td>
                                <td>${website.description}</td>
                                <td><a href="${website.url}">To Project ></a></td>
                                </tr> `;
            
                               
            })
        } else {
            console.log("API: " + data.message);
        }
    })
    .catch(err => console.log(err));
}

window.addEventListener('load', getWebsites);