let persons = ["ozawa" , "shigemitsu" , "okamoto" , "nakazawa" , "tatsukawa" , "kawamitsu" , "sasagawa" , "shinozaki" , "miyaoka"];

const form = document.getElementById("randomForm");



function makeCheckbox(){
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  return checkbox;
};


function makeLabel(x){
  let label = document.createElement("label");
  label.innerHTML=x;

  return label;
}



function makeForm(x){
  
  let checkbox = makeCheckbox();
  form.appendChild(checkbox);

  let label = makeLabel(x);
  form.appendChild(label);
}


function firstForm(){
  for(let i=0; i<persons.length; i++){
    makeForm(persons[i]);
  };

  /*input[0]は、ボタン*/
  for(let i=1; i<=persons.length; i++){
    let input = form.getElementsByTagName("input");
    input[i].id = `person${i}`;
    input[i].name = `person${i}`;
  }

  for(let i=0; i<persons.length; i++){
    let label = form.getElementsByTagName("label");
    label[i].id = `label${i+1}`;
    label[i].htmlFor = `person${i+1}`;
  }
}


firstForm();




function decision(z){
  let decision = document.getElementById(`label${z}`);
  decision.className = "decision";
}



function loopCheck(z,i,loopCount,tamori){
  let promise1 = new Promise((resolve,reject)=>{
    let person = document.getElementById(`person${z}`);
    person.checked = true;

    if(i===loopCount-1 && z===tamori){
      return decision(z);
    }

    setTimeout(()=>{
      person.checked = false;
      resolve();
    },300)
  })
  return promise1;
}


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
};


function makeButton(){

  let button = document.getElementById("randomButton");
  button.addEventListener("click",()=>{

    for(let i=1; i<=persons.length; i++){
      let deleteClass = document.getElementById(`label${i}`);
      let className = deleteClass.className;
      if(className==="decision"){
        deleteClass.className = "delete";
      }
    }

    let tamori = getRandomInt(persons.length) + 1;
    const loopCount = 3;

    console.log(tamori);

    /*promise = promise
      .then(loopCheck.bind(this,z,i,loopCount,tamori))
      でpromise変数をresolved状態とpending状態で繰り返している
      (loopCheck関数を実行するとpromise変数はpending状態になる)
      (関数内で別promiseオブジェクト(promise1)を生成しているため)

      promiseがpending状態なら、thenメソッドは実行されない
    */

    let promise = Promise.resolve();
    for(let i=0; i<loopCount; i++){
      for(let z=1; z<=persons.length; z++){
        promise = promise
        .then(loopCheck.bind(this,z,i,loopCount,tamori))
      }
    }
    /*
    for(let i=0; i<loopCount; i++){
      for(let z=1; z<=persons.length; z++){

        let person = document.getElementById(`person${z}`);
        person.checked = true;

        if(i===loopCount-1 && z===tamori){
          break;
        }

        メインスレッドをブロックしてしまうため、うまく動かない
        
        let time = Date.now() + 2000;
        while(time > Date.now()){
        }
        person.checked = false;
      } 
    }*/
  })
}


function addPerson(){
  let addButton = document.getElementById("addButton");
  addButton.addEventListener("click" , ()=>{
    let addName = document.getElementById("addName");
    if(addName.value===""){
      return;
    }
    persons[persons.length] = addName.value;

    makeForm(persons[persons.length - 1])

    let input = form.getElementsByTagName("input");
    input[persons.length].id = `person${persons.length}`;
    input[persons.length].name = `person${persons.length}`;

    let label = form.getElementsByTagName("label");
    label[label.length - 1].id = `label${persons.length}`;
    label[label.length - 1].htmlFor = `person${persons.length}`
  })
}

function makeId(){
  for(let i=1; i<=persons.length; i++){
    let personId = form.getElementsByTagName("input");
    let labelId = form.getElementsByTagName("label");
    personId[i].id = `person${i}`;
    personId[i].name = `person${i}`;
    labelId[i-1].id = `label${i}`;
    labelId[i-1].htmlFor = `person${i}`;
  }
}


function makedelete(){
  let deleteButton = document.getElementById("deleteButton");
  deleteButton.addEventListener("click" , ()=>{
    for(let i=1; i<=persons.length; i++){
      let deleteperson = document.getElementById(`person${i}`);
      let deletelabel = document.getElementById(`label${i}`);
      let confirm = deleteperson.checked;
      if(confirm === true){
        persons.splice(i-1,1);
        form.removeChild(deleteperson);
        form.removeChild(deletelabel);
      }
    }
    makeId();
  })
}


function load(){
  makeButton();
  addPerson();
  makedelete();
}

window.onload = load;



/*
もう少しやりたかったこと(時間足らなかった)
・input と labelをdivで囲いたかった
→ブラウザに表示されるときにinputとlabelの間で行がわかれてしまうことが多々ある
*/



































