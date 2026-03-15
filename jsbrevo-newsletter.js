const form = document.getElementById("movve-newsletter");

const msg = document.getElementById("movve-msg");

form.addEventListener("submit", function(){

msg.innerHTML="🚀 Enviando...";

setTimeout(()=>{

msg.innerHTML="✅ Suscripción enviada. Revisa tu correo.";

},2000);

});
