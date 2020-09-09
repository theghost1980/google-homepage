// your javascript file
const container = document.querySelector('#container');

const content = document.createElement('div');
content.classList.add('content');
content.textContent = 'This is the glorious text-content!';
container.appendChild(content);

const p = document.createElement("p");
const p1 = document.createElement("p");
const h3 = document.createElement("h3");
const div = document.createElement("div");
const h1 = document.createElement("h1");
const btn = document.createElement("button");
//for buttons
const div2 = document.createElement("div");

p1.textContent = "Me too!";
h1.textContent = "I am a Div!";
p.setAttribute('style','color:red;');
p.textContent = "Hey I'm red!";
h3.setAttribute('style','color:blue;');
h3.textContent = "Hey I'm Blue!";
div.setAttribute('style','border:1px solid pink;')
div2.setAttribute('style', 'width:300px;')
btn.setAttribute('style', 'width:200px;')
btn.textContent = "Click Me!";
btn.onclick = alert_function;
//
btn.addEventListener('click', function (e) {
    console.log(e.target);
  });
btn.addEventListener('click', function (e) {
    e.target.style.background = 'blue';
  });
  //
div.appendChild(h1);
div.appendChild(p1); 
//button to div
div2.appendChild(btn);

container.appendChild(p);
container.appendChild(h3);
container.appendChild(div);
//last div to container
container.appendChild(div2);

//functions
function alert_function(){
    alert("Howdy!!!");
}
