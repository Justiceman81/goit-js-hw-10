import{i as r}from"./vendor-77e16229.js";import{i as l}from"./alert-icon-8fd74490.js";const a="/goit-js-hw-10/assets/resolve-icon-8573d46d.svg",c=document.querySelector(".form");c.addEventListener("submit",n);function n(o){o.preventDefault();const s=o.target.delay.value,t=o.target.state.value;new Promise((e,i)=>{setTimeout(()=>{t==="fulfilled"?e(s):i(s)},s)}).then(e=>{r.success({message:`Fulfilled promise in ${e}ms`,messageSize:"16",messageColor:"#fff",backgroundColor:"#59a10d",position:"topRight",close:!0,closeOnEscape:!0,closeOnClick:!0,progressBar:!0,progressBarColor:"#326101",iconColor:"#fff",iconUrl:a})}).catch(e=>{r.error({message:`Rejected promise in ${e}ms`,messageSize:"16",messageColor:"#fff",backgroundColor:"#ef4040",position:"topRight",close:!0,closeOnEscape:!0,closeOnClick:!0,progressBar:!0,progressBarColor:"#ffbebe",iconUrl:l,iconColor:"#fff"})})}
//# sourceMappingURL=2-snackbar-63daf9c8.js.map
