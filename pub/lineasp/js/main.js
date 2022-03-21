//scroll
function scrollToTop() {
    window.scrollTo(0, 0);
}
//variables
var coursesEl = document.getElementById("courses");
var table = document.getElementById("course_table");
var form = document.getElementById("course_form");
var codeInput = document.getElementById("code");
var coursenameInput = document.getElementById("coursename");
var schoolInput = document.getElementById("school");
var startInput = document.getElementById("start");
var stopInput = document.getElementById("stop");
var submit = document.getElementById("submit");
var id = document.getElementById("id");
var editForm = document.getElementById("edit-form");
var idInput = document.getElementById('id');
var coursesOutputEl = document.getElementById('coursesOutput');
var addCourseButtonEl = document.getElementById('submitCourse');
var updateCourseButtonEl = document.getElementById('updateCourse');
//Eventlistners
// form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     console.log("Form Submitted");
// })
window.addEventListener('load', getCourses);
// submit.addEventListener("click", submitCourse);
//GET all courses
function getCourses() {
    table.innerHTML = "<thead>\n                        <tr>\n                            <th>Course Name</th>\n                            <th>School</th>\n                            <th>Start</th>\n                            <th>Stop</th>\n                        </tr>";
    fetch("https://studenter.miun.se/~lias1700/writeable/projekt-webbtjanst/courses.php")
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
            data.forEach(function (course) {
                table.innerHTML +=
                    "<tr>\n                            \n                                <td>" + course.coursename + "</td>\n                                <td>" + course.school + "</td>\n                                <td>" + course.start + "</td>\n                                <td>" + course.stop + "</td>\n                            \n                            </tr>";
                // <td class="noBoard"><button id="${course.id}" class="tdButt2" onclick="editCourse('${course.coursename}', '${course.school}', '${course.start}', '${course.stop}', '${course.id}' )">Update</button></td>
                // <td class="noBoard"><button id="${course.id}" class="tdButt" onclick="deleteCourse('${course.id}')">Delete</button></td>
            });
        }
        else {
            console.log("API: " + data.message);
        }
    })
        .catch(function (err) { return console.log(err); });
}
//ADD course
function submitCourse() {
    var coursename = coursenameInput.value;
    var school = schoolInput.value;
    var start = startInput.value;
    var stop = stopInput.value;
    var course = { 'coursename': coursename, 'school': school, 'start': start, 'stop': stop };
    fetch("https://studenter.miun.se/~lias1700/writeable/projekt-webbtjanst/courses.php", {
        method: 'POST',
        body: JSON.stringify(course),
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        getCourses();
    })
        .catch(function (error) {
        console.log("ERROR: ", error);
    });
}
//DELETE course
function deleteCourse(id) {
    fetch("https://studenter.miun.se/~lias1700/writeable/projekt-webbtjanst/courses.php?id=" + id, {
        method: 'DELETE',
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        getCourses();
    })
        .catch(function (error) {
        console.log("ERROR: ", error);
    });
}
//EDIT course 
function editCourse(coursename, school, start, stop, id) {
    editForm.innerHTML =
        "\n        <form>\n            <label for=\"coursename-edit\">Course Name: </label>\n            <input type=\"text\" name=\"coursename-edit\" id=\"coursename-edit\" value=\"" + coursename + "\">\n            <br>\n            <label for=\"school-edit\">School: </label>\n            <input type=\"text\" name=\"school-edit\" id=\"school-edit\" value=\"" + school + "\">\n            <br>\n            <label for=\"start-edit\">Start: </label>\n            <input type=\"text\" name=\"start-edit\" id=\"start-edit\" value=\"" + start + "\">\n            <br>\n            <label for=\"stop-edit\">Stop: </label>\n            <input type=\"text\" name=\"stop-edit\" id=\"stop-edit\" value=\"" + stop + "\">\n            <br>\n            <button class=\"tdButt2\" id=\"save\">Save</button>\n            <button class=\"tdButt\" onClick=\"abortEdit()\">Cancel</button>\n        </form>\n        ";
    var save = document.getElementById("save");
    save.addEventListener("click", function (e) {
        e.preventDefault();
        updateCourse(id);
    });
}
//UPDATE course, not working...
function updateCourse(id) {
    var coursenameInputEdit = document.getElementById("coursename-edit");
    var schoolInputEdit = document.getElementById("school-edit");
    var startInputEdit = document.getElementById("start-edit");
    var stopInputEdit = document.getElementById("stop-edit");
    var coursename = coursenameInputEdit.value;
    var school = schoolInputEdit.value;
    var start = startInputEdit.value;
    var stop = stopInputEdit.value;
    coursename.toString();
    school.toString();
    start.toString();
    stop.toString();
    var course = { 'coursename': coursename, 'school': school, 'start': start, 'stop': stop };
    fetch("https://studenter.miun.se/~lias1700/writeable/projekt-webbtjanst/courses.php?id=" + id, {
        method: "PUT",
        body: JSON.stringify(course),
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        getCourses();
    })
        .catch(function (error) {
        console.log("Error: ", error);
    });
    abortEdit();
}
;
function abortEdit() {
    editForm.innerHTML = "";
}
