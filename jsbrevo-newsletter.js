document.addEventListener("DOMContentLoaded", function(){

const form = document.getElementById("sib-form");
const success = document.getElementById("newsletter-success");

if(!form) return;

form.addEventListener("submit", function(){

const button = form.querySelector("button");

button.innerHTML = "⏳";
button.disabled = true;

setTimeout(function(){

success.style.display = "block";

button.innerHTML = "✔";

},2000);

});

});