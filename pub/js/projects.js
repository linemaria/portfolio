//Projekt
//variables
var websiteEl = document.getElementById("websites");
var websiteTable = document.getElementById("website_table");
var websiteForm = document.getElementById("website_form");
var urlInput = document.getElementById("url");
var descriptionInput = document.getElementById("description");
var websiteOutputEl = document.getElementById('websiteOutput');
var addWebsiteButtonEl = document.getElementById('submitWebsite');
var updateWebsiteButtonEl = document.getElementById('updateWebsite');
//GET Projects/websites
function getWebsites() {
    websiteTable.innerHTML = "<thead>\n                        <tr>\n                            <th>Title</th>\n                            <th>Description</th>\n                            <th>Link</th>\n                        </tr>";
    fetch("https://studenter.miun.se/~lias1700/writeable/projekt-webbtjanst/websites.php")
        .then(function (response) {
        if (response.ok) {
            return response.json();
        }
        else {
            throw new Error("Failed to fetch");
        }
    })
        .then(function (data) {
        if (!data.message) {
            data.forEach(function (website) {
                websiteTable.innerHTML +=
                    "<tr>\n                                <td>" + website.title + "</td>\n                                <td>" + website.description + "</td>\n                                <td><a href=\"" + website.url + "\">To Project ></a></td>\n                                </tr> ";
            });
        }
        else {
            console.log("API: " + data.message);
        }
    })
        .catch(function (err) { return console.log(err); });
}
window.addEventListener('load', getWebsites);
