const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxt4U3enDQmX-3sHeaTglbQqrxptghPAkIuLCu2BylOuDA-gbo16z7-IX2qxPr6tgqe/exec";

document.addEventListener("DOMContentLoaded", function () {

setupTabs();
setupForm();
setupTrack();
setupAdminFilters();
setupAdminLogin();
setupFilePreview();

});

/* =========================
   TAB SYSTEM
========================= */

function setupTabs(){

const tabButtons=document.querySelectorAll(".tab-btn");
const tabContents=document.querySelectorAll(".tab-content");

tabButtons.forEach(button=>{

button.addEventListener("click",function(){

const tabName=this.dataset.tab;

tabContents.forEach(tab=>tab.classList.remove("active"));
tabButtons.forEach(btn=>btn.classList.remove("active"));

document.getElementById(tabName).classList.add("active");
this.classList.add("active");

});

});

}

/* =========================
   SUBMIT COMPLAINT
========================= */

function setupForm(){

const form=document.getElementById("complaintForm");
if(!form) return;

form.addEventListener("submit",function(e){

e.preventDefault();

const submitBtn=document.getElementById("submitBtn");
const resultDiv=document.getElementById("submitResult");

submitBtn.disabled=true;
submitBtn.innerHTML="Submitting...";

resultDiv.innerHTML=getLoadingHTML("Processing complaint...");

const params=new URLSearchParams();

params.append("action","submit");
params.append("name",document.getElementById("name").value.trim());
params.append("email",document.getElementById("email").value.trim());
params.append("subject",document.getElementById("subject").value.trim());
params.append("description",document.getElementById("description").value.trim());
params.append("priority",document.getElementById("priority").value);

const fileInput=document.getElementById("fileUpload");

if(fileInput && fileInput.files.length>0){

const file=fileInput.files[0];
const reader=new FileReader();

reader.onload=function(){

const base64=reader.result.split(",")[1];

params.append("fileData",base64);
params.append("fileName",file.name);
params.append("fileType",file.type);

sendRequest(params);

};

reader.readAsDataURL(file);

}else{

sendRequest(params);

}

});

}

/* =========================
   SEND REQUEST
========================= */

async function sendRequest(params){

const submitBtn=document.getElementById("submitBtn");
const resultDiv=document.getElementById("submitResult");

try{

const response=await fetch(SCRIPT_URL,{
method:"POST",
body:params,
cache:"no-store"
});

const result=await response.json();

if(!result.success) throw new Error("Submission failed");

resultDiv.innerHTML=`
<div class="alert alert-success">
✅ Ticket Created<br>
<strong>Ticket ID:</strong> ${result.ticketId}
</div>`;

document.getElementById("complaintForm").reset();

}catch(error){

resultDiv.innerHTML=`<div class="alert alert-error">❌ ${error.message}</div>`;

}finally{

submitBtn.disabled=false;
submitBtn.innerHTML="🚀 Submit Complaint";

}

}

/* =========================
   TRACK TICKET
========================= */

function setupTrack(){

const trackBtn=document.getElementById("trackBtn");
const input=document.getElementById("trackTicketId");

if(!trackBtn) return;

trackBtn.addEventListener("click",trackTicket);

input.addEventListener("keypress",function(e){
if(e.key==="Enter") trackTicket();
});

}

async function trackTicket(){

const ticketId=document.getElementById("trackTicketId").value.trim();
const resultDiv=document.getElementById("trackResult");

if(!ticketId){
resultDiv.innerHTML=`<div class="alert alert-error">Enter Ticket ID</div>`;
return;
}

resultDiv.innerHTML=getLoadingHTML("Tracking ticket...");

try{

const params=new URLSearchParams();
params.append("action","track");
params.append("ticketId",ticketId);

const response=await fetch(SCRIPT_URL,{
method:"POST",
body:params,
cache:"no-store"
});

const result=await response.json();

if(!result.success) throw new Error("Ticket not found");

const t=result.ticket;

resultDiv.innerHTML=`
<div class="ticket-display">
<strong>${t["Ticket ID"]}</strong><br>
Status: ${t.Status}<br>
Name: ${t.Name}<br>
Email: ${t.Email}<br>
Subject: ${t.Subject}<br>
Priority: ${t.Priority}<br>
Created: ${new Date(t["Created Date"]).toLocaleString()}
</div>`;

}catch(error){

resultDiv.innerHTML=`<div class="alert alert-error">❌ ${error.message}</div>`;

}

}

/* =========================
   ADMIN LOGIN
========================= */

function setupAdminLogin(){

const loginBtn=document.getElementById("adminLoginBtn");
if(!loginBtn) return;

loginBtn.addEventListener("click",async function(){

loginBtn.disabled=true;
loginBtn.innerHTML="Logging in...";

const username=document.getElementById("adminUsername").value.trim();
const password=document.getElementById("adminPassword").value.trim();

const errorText=document.getElementById("adminError");
const loginSection=document.getElementById("adminLoginSection");
const dashboardSection=document.getElementById("adminDashboardSection");

errorText.textContent="";

try{

const params=new URLSearchParams();

params.append("action","adminLogin");
params.append("username",username);
params.append("password",password);

const response=await fetch(SCRIPT_URL,{
method:"POST",
body:params,
cache:"no-store"
});

const result=await response.json();

if(result.success){

loginSection.style.display="none";
dashboardSection.style.display="block";

loadTickets();

}else{

errorText.textContent="Invalid Admin Login ❌";

}

}catch(err){

errorText.textContent="Login Failed ❌";

}finally{

loginBtn.disabled=false;
loginBtn.innerHTML="Login";

}

});

}

/* =========================
   ADMIN DASHBOARD
========================= */

function setupAdminFilters(){

const refreshBtn=document.getElementById("refreshBtn");
const statusFilter=document.getElementById("filterStatus");
const priorityFilter=document.getElementById("filterPriority");
const searchInput=document.getElementById("searchTicket");

if(refreshBtn) refreshBtn.addEventListener("click",loadTickets);
if(statusFilter) statusFilter.addEventListener("change",loadTickets);
if(priorityFilter) priorityFilter.addEventListener("change",loadTickets);
if(searchInput) searchInput.addEventListener("input",loadTickets);

}

async function loadTickets(){

const resultDiv=document.getElementById("adminResult");
resultDiv.innerHTML=getLoadingHTML("Loading latest tickets...");

try{

const search=document.getElementById("searchTicket")?.value || "";
const status=document.getElementById("filterStatus")?.value || "";
const priority=document.getElementById("filterPriority")?.value || "";

const url=SCRIPT_URL+
"?action=getTickets"+
"&status="+encodeURIComponent(status)+
"&priority="+encodeURIComponent(priority)+
"&t="+Date.now();

const response=await fetch(url,{cache:"no-store"});
const result=await response.json();

if(!result.success){
resultDiv.innerHTML=`<div class="alert alert-error">Server error loading tickets</div>`;
return;
}

let tickets=result.tickets || [];

if(search){

const s=search.toLowerCase();

tickets=tickets.filter(t=>
(t.Name || "").toLowerCase().includes(s) ||
(t.Email || "").toLowerCase().includes(s) ||
(t.Subject || "").toLowerCase().includes(s) ||
(t["Ticket ID"] || "").toLowerCase().includes(s)
);

}

tickets=sortByPriority(tickets);

if(tickets.length===0){

resultDiv.innerHTML=`
<div class="alert alert-error">
⚠ No tickets match your search or filters
</div>
`;

return;

}

resultDiv.innerHTML=tickets.map(ticket=>`

<div class="ticket-item">

<strong>${ticket.Subject}</strong><br>

${ticket.Name} • ${ticket.Email}<br>

Status:
<select onchange="updateStatus('${ticket["Ticket ID"]}', this.value)">

<option value="Pending" ${ticket.Status==="Pending"?"selected":""}>Pending</option>
<option value="In Progress" ${ticket.Status==="In Progress"?"selected":""}>In Progress</option>
<option value="Resolved" ${ticket.Status==="Resolved"?"selected":""}>Resolved</option>

</select>

<br>

Priority: ${ticket.Priority}

</div>

`).join("");

}catch(error){

resultDiv.innerHTML=`<div class="alert alert-error">❌ ${error.message}</div>`;

}

}

/* =========================
   UPDATE STATUS
========================= */

async function updateStatus(ticketId,status){

try{

const params=new URLSearchParams();

params.append("action","updateStatus");
params.append("ticketId",ticketId);
params.append("status",status);

const response=await fetch(SCRIPT_URL,{
method:"POST",
body:params,
cache:"no-store"
});

const result=await response.json();

if(result.success){

alert("Status Updated ✅");
loadTickets();

}else{

alert("Update failed ❌");

}

}catch(error){

alert("Update failed ❌");

}

}

/* =========================
   PRIORITY SORT
========================= */

function sortByPriority(tickets){

const order={high:1,medium:2,low:3};

return tickets.sort((a,b)=>{

const p1=(a.Priority || "").toLowerCase();
const p2=(b.Priority || "").toLowerCase();

return (order[p1] || 99) - (order[p2] || 99);

});

}

/* =========================
   FILE PREVIEW
========================= */

function setupFilePreview(){

const fileInput=document.getElementById("fileUpload");
const fileInfo=document.getElementById("fileInfo");

if(!fileInput) return;

fileInput.addEventListener("change",function(){

const file=this.files[0];
if(!file) return;

const sizeKB=(file.size/1024).toFixed(2);

if(sizeKB>500){

alert("File must be less than 500 KB");

this.value="";
fileInfo.innerHTML="";
return;

}

fileInfo.innerHTML=`
Selected File: <b>${file.name}</b><br>
Size: <b>${sizeKB} KB</b>
`;

});

}

/* =========================
   UTIL
========================= */

function getLoadingHTML(text){

return `<div class="loading"><p>${text}</p></div>`;

}