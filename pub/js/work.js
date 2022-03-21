//WORKS
//variables
var worksEl = document.getElementById("works");
var workTable = document.getElementById("work_table");
var workForm = document.getElementById("work_form");
var workplaceInput = document.getElementById("workplace");
var titleInput = document.getElementById("title");
var worksOutputEl = document.getElementById('worksOutput');
// const addWorkButtonEl = document.getElementById('submitWork');
// const updateWorkButtonEl = document.getElementById('updateWork');
//WORKS GET
function getWorks() {
    workTable.innerHTML = "<thead>\n                        <tr>\n                            <th>Workplace</th>\n                            <th>Title</th>\n                            <th>Start</th>\n                            <th>Stop</th>\n                        </tr>";
    fetch("https://studenter.miun.se/~lias1700/writeable/projekt-webbtjanst/works.php")
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
            data.forEach(function (work) {
                workTable.innerHTML +=
                    "<tr>\n                                <td>" + work.workplace + "</td>\n                                <td>" + work.title + "</td>\n                                <td>" + work.start + "</td>\n                                <td>" + work.stop + "</td>\n                                </tr> ";
            });
        }
        else {
            console.log("API: " + data.message);
        }
    })
        .catch(function (err) { return console.log(err); });
}
window.addEventListener('load', getWorks);
