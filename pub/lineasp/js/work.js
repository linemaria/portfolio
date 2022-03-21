// //variables
//WORKS
var worksEl = document.getElementById("works");
var workTable = document.getElementById("work_table");
var workForm = document.getElementById("work_form");
var workplaceInput = document.getElementById("workplace");
var titleInput = document.getElementById("title");
var worksOutputEl = document.getElementById('worksOutput');
var addWorkButtonEl = document.getElementById('submitWork');
var updateWorkButtonEl = document.getElementById('updateWork');
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
                // <td class="noBoard"><button id="${work.id}" class="tdButt2" onclick="editWork('${work.workplace}', '${work.title}', '${work.start}', '${work.stop}', '${work.id}' )">Update</button></td>
                // <td class="noBoard"><button id="${work.id}" class="tdButt" onclick="deleteWork('${work.id}')">Delete</button></td>
            });
        }
        else {
            console.log("API: " + data.message);
        }
    })
        .catch(function (err) { return console.log(err); });
}
//Eventlistners
// form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     console.log("Form Submitted");
// })
window.addEventListener('load', getWorks);
// //ADD course
// function submitCourse() {
//     let coursename = coursenameInput.value;
//     let school = schoolInput.value;
//     let start = startInput.value;
//     let stop = stopInput.value;
//     let course = {'coursename': coursename, 'school': school, 'start': start, 'stop': stop};
//     fetch("http://localhost/test1/projekt-webbtjanst/courses.php", {
//         method: 'POST',
//         body: JSON.stringify(course),
//     })
//     .then(response => response.json())
//     .then(data => {
//         getCourses();
//     })
//     .catch(error => {
//         console.log("ERROR: ", error);
//     }) 
// }
// //DELETE course
// function deleteCourse(id: number) {
//     fetch("http://localhost/test1/projekt-webbtjanst/courses.php?id=" + id, {
//         method: 'DELETE',
//     })
//     .then(response => response.json())
//     .then(data => {
//         getCourses();
//     })
//     .catch(error => {
//         console.log("ERROR: ", error);
//     })
// }
//  //EDIT course 
// function editCourse(coursename: string, school: string, start: string, stop: number, id: number) {
//     editForm.innerHTML =
//         `
//         <form>
//             <label for="coursename-edit">Course Name: </label>
//             <input type="text" name="coursename-edit" id="coursename-edit" value="${coursename}">
//             <br>
//             <label for="school-edit">School: </label>
//             <input type="text" name="school-edit" id="school-edit" value="${school}">
//             <br>
//             <label for="start-edit">Start: </label>
//             <input type="text" name="start-edit" id="start-edit" value="${start}">
//             <br>
//             <label for="stop-edit">Stop: </label>
//             <input type="text" name="stop-edit" id="stop-edit" value="${stop}">
//             <br>
//             <button class="tdButt2" id="save">Save</button>
//             <button class="tdButt" onClick="abortEdit()">Cancel</button>
//         </form>
//         `;
//     let save = document.getElementById("save");
//     save.addEventListener("click", function (e) {
//         e.preventDefault();
//         updateCourse(id);
//     });
// }
// //UPDATE course, not working...
// function updateCourse(id: number) {
//    let coursenameInputEdit = <HTMLInputElement>document.getElementById("coursename-edit");
//    let schoolInputEdit = <HTMLInputElement>document.getElementById("school-edit");
//    let startInputEdit = <HTMLInputElement>document.getElementById("start-edit");
//    let stopInputEdit = <HTMLInputElement>document.getElementById("stop-edit");
//    let coursename = coursenameInputEdit.value;
//    let school = schoolInputEdit.value;
//    let start = startInputEdit.value;
//    let stop = stopInputEdit.value;
//     coursename.toString();
//     school.toString();
//     start.toString();
//     stop.toString();
//     let course = {'coursename': coursename, 'school': school, 'start': start, 'stop': stop};
//     fetch("http://localhost/test1/projekt-webbtjanst/courses.php?id=" + id, {
//         method: "PUT",
//         body: JSON.stringify(course),
//     })
//         .then(response => response.json())
//         .then(data => {
//             getCourses();
//         })
//         .catch(error => {
//             console.log("Error: ", error);
//         });
//     abortEdit();
// };
// function abortEdit() {
//     editForm.innerHTML = "";
// }
