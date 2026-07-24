const envelopeScreen=document.getElementById('envelopeScreen');
const openEnvelope=document.getElementById('openEnvelope');
const site=document.getElementById('site');
const musicButton=document.getElementById('musicButton');
const audio=document.getElementById('bgMusic');
window.addEventListener('load',()=>setTimeout(()=>document.getElementById('preloader').classList.add('hide'),250));
openEnvelope.addEventListener('click',()=>{
  openEnvelope.classList.add('open');
  setTimeout(()=>{
    envelopeScreen.classList.add('opened');
    document.body.classList.remove('locked');
    document.body.classList.add("site-opened");
    site.setAttribute('aria-hidden','false');
    musicButton.hidden=false;
    document.querySelector('.hero .reveal').classList.add('visible');
  },700);
});
musicButton.addEventListener('click',async()=>{
  try{ if(audio.paused){await audio.play();musicButton.classList.add('playing')}else{audio.pause();musicButton.classList.remove('playing')}}
  catch(e){alert('Добавьте файл assets/music.mp3 — после этого музыка заработает.')}
});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.18});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const target=new Date('2026-08-30T14:00:00+03:00').getTime();
function updateCountdown(){
 const diff=Math.max(0,target-Date.now());
 const d=Math.floor(diff/86400000),h=Math.floor(diff/3600000)%24,m=Math.floor(diff/60000)%60,s=Math.floor(diff/1000)%60;
 [['days',d],['hours',h],['minutes',m],['seconds',s]].forEach(([id,v])=>document.getElementById(id).textContent=String(v).padStart(2,'0'));
}
updateCountdown();setInterval(updateCountdown,1000);
const SCRIPT_URL=''; // Вставьте URL веб-приложения Google Apps Script
const form=document.getElementById('rsvpForm'),status=document.getElementById('formStatus');
form.addEventListener('submit',async e=>{
 e.preventDefault();status.textContent='Отправляем…';
 const data=Object.fromEntries(new FormData(form).entries());
 if(!SCRIPT_URL){localStorage.setItem('ismat-nastya-rsvp',JSON.stringify({...data,date:new Date().toISOString()}));status.textContent='Ответ сохранён на устройстве. Добавьте URL Apps Script для отправки в таблицу.';return}
 try{await fetch(SCRIPT_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});status.textContent='Спасибо! Ваш ответ отправлен.';form.reset()}
 catch(err){status.textContent='Не удалось отправить. Попробуйте ещё раз.'}
});
const weddingDate = new Date("2026-08-30T14:00:00+03:00");

function updateCountdown() {
    const now = new Date();
    const difference = weddingDate.getTime() - now.getTime();

    if (difference <= 0) {
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );
    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );
    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);
