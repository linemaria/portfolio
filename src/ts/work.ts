//WORKS

//variables
const worksEl = document.getElementById("works");
const workTable = document.getElementById("work_table");
const workForm = document.getElementById("work_form");

const workplaceInput = <HTMLInputElement>document.getElementById("workplace");
const titleInput = <HTMLInputElement>document.getElementById("title");

const worksOutputEl = document.getElementById('worksOutput');
// const addWorkButtonEl = document.getElementById('submitWork');
// const updateWorkButtonEl = document.getElementById('updateWork');

//WORKS GET
function getWorks() {
    workTable.innerHTML = `<thead>
                        <tr>
                            <th>Workplace</th>
                            <th>Title</th>
                            <th>Start</th>
                            <th>Stop</th>
                        </tr>`;

    fetch("https://studenter.miun.se/~lias1700/writeable/projekt-webbtjanst/works.php")
    .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error("Failed to fetch");
        }
    })
    .then(data => {
        if(!data.message) {
            data.forEach((work : {workplace: string, title: string, start: string, stop: number, id: number}) => {
                workTable.innerHTML += 
                            `<tr>
                                <td>${work.workplace}</td>
                                <td>${work.title}</td>
                                <td>${work.start}</td>
                                <td>${work.stop}</td>
                                </tr> `;

            })
        } else {
            console.log("API: " + data.message);
        }
    })
    .catch(err => console.log(err));
}

window.addEventListener('load', getWorks);


