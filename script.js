let addBtn = document.getElementById('addBtn');
let delBtn = document.getElementById('delBtn');

// coder :- Vaibhav Pathak

function showNotes() {
    notesObj = [];
    let html = '';
    let keys;
    keys = Array.apply(0, new Array(localStorage.length)).map(function  (o, i) {
      return localStorage.key(i);
    });
    if (keys.length == 0) {
        notesObj = [];
    } else {
        keys.forEach(function(element, index) {
          let note = localStorage.getItem(element);
          note = JSON.parse(note);
          if(note[1] == true){
            html += `<div class="bg-danger notesCard card m-2 " style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title text-light">${element}</h5>
        <p class="card-text text-light">${note[0]}</p>
        <Button onclick="deleteNote(this.id)" id="${element}" class="btn btn-primary my-btn">Delete Note</Button>
      </div>
    </div>`;
  }else{
    html += `<div class="notesCard card m-2 " style="width: 18rem;">
<div class="card-body">
<h5 class="card-title">${element}</h5>
<p class="card-text">${note[0]}</p>
<Button onclick="deleteNote(this.id)" id="${element}" class="btn btn-primary my-btn">Delete Note</Button>
</div>
</div>`;
  }
        });
    }
    let notesElm = document.getElementById('notes');
    if (keys.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = 'No Notes';
    }
}

function deleteNote(key) {
    let confirmation = confirm(`Do you want to delete the note ?`);
    if (confirmation) {
        localStorage.removeItem(key);
        showNotes();
        }else{
            showNotes();
        }
}

addBtn.addEventListener('click', function () {
    let addTxt = document.getElementById('addTxt');
    let titleTxt = document.getElementById('titleTxt');
    let impr = document.getElementsByClassName('impr')[0];
    if(addTxt.value != '' && titleTxt.value != ''){
      notesObj = [addTxt.value, impr.checked];
      localStorage.setItem(titleTxt.value, JSON.stringify(notesObj));
      addTxt.value = '';
      titleTxt.value = '';
      impr.checked = false;
      showNotes();
    }else{
      window.alert("Blank fields are detected");

    }

});

showNotes();

let search = document.getElementById('searchTxt');
search.addEventListener('input', function() {
    let inputVal = search.value;
    let notesCard = document.getElementsByClassName('notesCard');
    Array.from(notesCard).forEach(function(element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }else{
            element.style.display = "none";
        }
    });
})
