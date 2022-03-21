// Courses

//scroll
function scrollToTop() {
    window.scrollTo(0, 0)
}

//variables
const coursesEl = document.getElementById("courses");
const table = document.getElementById("course_table");
const form = document.getElementById("course_form");

const codeInput = <HTMLInputElement>document.getElementById("code");
const coursenameInput = <HTMLInputElement>document.getElementById("coursename");
const schoolInput = <HTMLInputElement>document.getElementById("school");
const startInput = <HTMLInputElement>document.getElementById("start");
const stopInput = <HTMLInputElement>document.getElementById("stop");
const submit = <HTMLInputElement>document.getElementById("submit");
const id = <HTMLInputElement>document.getElementById("id");

const editForm = document.getElementById("edit-form");
const idInput = document.getElementById('id');
const coursesOutputEl = document.getElementById('coursesOutput');
const addCourseButtonEl = document.getElementById('submitCourse');
const updateCourseButtonEl = document.getElementById('updateCourse');

//Eventlistners
// form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     console.log("Form Submitted");
// })
window.addEventListener('load', getCourses);
// submit.addEventListener("click", submitCourse);


//GET all courses
 function getCourses() {
    table.innerHTML = `<thead>
                        <tr>
                            <th>Course Name</th>
                            <th>School</th>
                            <th>Start</th>
                            <th>Stop</th>
                        </tr>`;

    fetch("https://studenter.miun.se/~lias1700/writeable/projekt-webbtjanst/courses.php")
    .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error("Failed to fetch");
        }
    })
    .then(data => {
        if(!data.message) {
            data.forEach((course : {coursename: string, school: string, start: string, stop: number, id: number}) => {
                table.innerHTML += 
                            `<tr>
                            
                                <td>${course.coursename}</td>
                                <td>${course.school}</td>
                                <td>${course.start}</td>
                                <td>${course.stop}</td>
                            
                            </tr>`;
                          
            })
        } else {
            console.log("API: " + data.message);
        }
    })
    .catch(err => console.log(err));
}

//ADD course
function submitCourse() {
    let coursename = coursenameInput.value;
    let school = schoolInput.value;
    let start = startInput.value;
    let stop = stopInput.value;

    let course = {'coursename': coursename, 'school': school, 'start': start, 'stop': stop};

    fetch("https://studenter.miun.se/~lias1700/writeable/projekt-webbtjanst/courses.php", {
        method: 'POST',
        body: JSON.stringify(course),
    })
    .then(response => response.json())
    .then(data => {
        getCourses();
    })
    .catch(error => {
        console.log("ERROR: ", error);
    }) 

}


//DELETE course
function deleteCourse(id: number) {

    fetch("https://studenter.miun.se/~lias1700/writeable/projekt-webbtjanst/courses.php?id=" + id, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        getCourses();
    })
    .catch(error => {
        console.log("ERROR: ", error);
    })
}



 //EDIT course 

function editCourse(coursename: string, school: string, start: string, stop: number, id: number) {

    editForm.innerHTML =
        `
        <form>
            <label for="coursename-edit">Course Name: </label>
            <input type="text" name="coursename-edit" id="coursename-edit" value="${coursename}">
            <br>
            <label for="school-edit">School: </label>
            <input type="text" name="school-edit" id="school-edit" value="${school}">
            <br>
            <label for="start-edit">Start: </label>
            <input type="text" name="start-edit" id="start-edit" value="${start}">
            <br>
            <label for="stop-edit">Stop: </label>
            <input type="text" name="stop-edit" id="stop-edit" value="${stop}">
            <br>
            <button class="tdButt2" id="save">Save</button>
            <button class="tdButt" onClick="abortEdit()">Cancel</button>
        </form>
        `;

    let save = document.getElementById("save");

    save.addEventListener("click", function (e) {
        e.preventDefault();
        updateCourse(id);
    });
}

//UPDATE course, not working...
function updateCourse(id: number) {


   let coursenameInputEdit = <HTMLInputElement>document.getElementById("coursename-edit");
   let schoolInputEdit = <HTMLInputElement>document.getElementById("school-edit");
   let startInputEdit = <HTMLInputElement>document.getElementById("start-edit");
   let stopInputEdit = <HTMLInputElement>document.getElementById("stop-edit");


   let coursename = coursenameInputEdit.value;
   let school = schoolInputEdit.value;
   let start = startInputEdit.value;
   let stop = stopInputEdit.value;

    coursename.toString();
    school.toString();
    start.toString();
    stop.toString();

    let course = {'coursename': coursename, 'school': school, 'start': start, 'stop': stop};

    fetch("https://studenter.miun.se/~lias1700/writeable/projekt-webbtjanst/courses.php?id=" + id, {
        method: "PUT",
        body: JSON.stringify(course),
    })
        .then(response => response.json())
        .then(data => {
            getCourses();
        })
        .catch(error => {
            console.log("Error: ", error);
        });

    abortEdit();
};


function abortEdit() {
    editForm.innerHTML = "";
}