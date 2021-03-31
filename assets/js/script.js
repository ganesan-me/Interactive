"use strict";


//                                    variable declaration

let employee,
  i,
  cardCollection = [],
  cardHtml = "",
  tableCollection = [],
  tableHtmlStart = `
<table>
  <tr>
    <th>Name</th>
    <th>Id</th>
    <th>Skills</th>
    <th>Project</th>
    <th>HCM</th>
    <th></th>
  </tr>
`,
  tableHtmlMiddle = "",
  tableHtmlEnd = `</table>`,
  cardView = true,
  //obj,
  json,
  data;


//                                    Template Class Declaration

class employeeTemplate {
  constructor(name, gender, id, skills, project, hcm) {
    this.Name = name;
    this.Gender = gender;
    this.ID = id;
    this.Skills = skills;
    this.Project = project;
    this.HCM = hcm;
  }
}


//                                      Main Functionality

loadDoc();
data = JSON.parse(json)


for (i = 0; i < data.Employees.length; i++) {
  employee = createEmployeeObj(i);
  cardCollection[i] = createCard(employee, i);
  tableCollection[i] = createTable(employee, i);
}


displayCard();


//              Function Declaration

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      json = this.responseText;
    }
  };
  xhttp.open("GET", "https://ganesan-me.github.io/Interactive/assets/js/empInfo.json", false);
  xhttp.send();
}


function createEmployeeObj(i){
  let emp = new employeeTemplate(
    data.Employees[i].Name,
    data.Employees[i].Gender,
    data.Employees[i].ID,
    data.Employees[i].Skills,
    data.Employees[i].Project,
    data.Employees[i].HCM
  );
  return emp;
}


function createCard(employee, i) {
  cardHtml = `
    <div class="card">
        <div>
                <img onclick="removeCard(${i})" src="assets/images/closeIcon.png" alt="Close">
                <img src="assets/images/${
                  employee.Gender === "Male" ? "M" : "F"
                }.png" alt="Photo">
        </div>        
        <form>
                <div>
                <span>Name :</span>
                <span>${employee.Name}</span>
                </div>
                <div>
                <span>ID :</span>
                <span>${employee.ID}</span>
                </div>
                <div id="cardSkillsContainer${i}">
                <span>Skills :</span>
                <span>${employee.Skills}</span>
                </div>
                <div>
                <span>Project :</span>
                <span>${employee.Project}</span>
                </div>
                <div>
                <span>HCM :</span>
                <span>${employee.HCM}</span>
                </div>               
                <div id="cardEditContainer${i}">
                <span class="edit" onclick="editCard(${i})">Edit</span>
                <span class="save" onclick="saveCard(${i})">Save</span>
                </div>
        </form>
    </div>
    `;
  return cardHtml;
}


function createTable(employee, i) {
  tableHtmlMiddle = `      
<tr>
    <td>${employee.Name}</td>
    <td>${employee.ID}</td>
    <td class="skills" id="tableSkillsContainer${i}">${employee.Skills}</td>
    <td>${employee.Project}</td>
    <td>${employee.HCM}</td>
    <td class="tableIcons" id="tableEditContainer${i}"> <img class="edit" onclick="editTable(${i})" src="assets/images/editIcon.png" alt="Edit"><img class="save" onclick="saveTable(${i})" src="assets/images/saveIcon.png" alt="Save"><img onclick="removeTable(${i})" src="assets/images/closeIcon.png" alt="Close"> </td>
</tr>
`;
  return tableHtmlMiddle;
}


function removeCard(i) {
  cardCollection[i] = "";
  tableCollection[i] = "";
  displayCard();
}

function removeTable(i) {
  tableCollection[i] = "";
  cardCollection[i] = "";
  displayTable();
}


function displayCard(){
  document.getElementById("cardAndTableContainer").innerHTML = cardCollection.join("");
  cardView = true;
}


function displayTable(){
  document.getElementById("cardAndTableContainer").innerHTML = tableHtmlStart + tableCollection.join("") + tableHtmlEnd;
  cardView = false;
}


function toggleView(){
  if(cardView){
    document.getElementById("toggleIconContainer").innerHTML = `<img src="assets/images/gridIcon.png" alt="grid"></img>`
    displayTable()
  }else{
    document.getElementById("toggleIconContainer").innerHTML = `<img src="assets/images/tableIcon.png" alt="List"></img>`
    displayCard()
  }
}


function editCard(i) {
  document.querySelector(`#cardEditContainer${i} .edit`).style.display="none"
  document.querySelector(`#cardEditContainer${i} .save`).style.display="inline-block"
  document.getElementById(`cardSkillsContainer${i}`).innerHTML =`<label for="skills">Skills :</label>
  <input type="text" name="skills" id="skills">`;
}


function saveCard(i){
  document.querySelector(`#cardEditContainer${i} .edit`).style.display="inline-block"
  document.querySelector(`#cardEditContainer${i} .save`).style.display="none"  
  employee = createEmployeeObj(i);
  employee.Skills = document.querySelector(`#cardSkillsContainer${i} input[name="skills"] `).value
  cardCollection[i] = createCard(employee, i);
  tableCollection[i] = createTable(employee, i);
  document.getElementById(`cardSkillsContainer${i}`).innerHTML =`                <span>Skills :</span>
  <span>${employee.Skills}</span>`;
}


function editTable(i) {
  document.querySelector(`#tableEditContainer${i} .edit`).style.display="none"
  document.querySelector(`#tableEditContainer${i} .save`).style.display="inline-block"
  document.getElementById(`tableSkillsContainer${i}`).innerHTML = `<input type="text" name="skills" id="skills">`
}


function saveTable(i) {
  document.querySelector(`#tableEditContainer${i} .edit`).style.display="inline-block"
  document.querySelector(`#tableEditContainer${i} .save`).style.display="none"
  employee = createEmployeeObj(i);
  employee.Skills = document.querySelector(`#tableSkillsContainer${i} input[name="skills"] `).value
  cardCollection[i] = createCard(employee, i);
  tableCollection[i] = createTable(employee, i);
  document.getElementById(`tableSkillsContainer${i}`).innerHTML = employee.Skills
}

