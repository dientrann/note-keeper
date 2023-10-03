let listNote = [];

function dataLocal() {
  let dataLocal = localStorage.getItem("listNote");
  if (dataLocal) {
    return JSON.parse(dataLocal);
  } else {
    return [];
  }
}
listNote = dataLocal();

function renderListNote(arr) {
  let listNoteString = ``;
  for (let note of arr) {
    listNoteString += `
    <div class="itemNote">
      <div><p>${note.noteTitle}</p></div>
      <div id="btn">
        <button onclick="deleteNote(${note.noteId},listNote)"  class="btnDelete">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
    `;
  }
  document.getElementById("listNote").innerHTML = listNoteString;
}
renderListNote(listNote);

function addNote(event, arr) {
  event.preventDefault();
  let spanEl = document.getElementById("validate");
  let title = event.target.title.value;
  if (title == "") {
    spanEl.innerHTML = `<span><i class="fa-solid fa-xmark"></i> Cannot be left blank</span>`;
    spanEl.style.color = "red";
    return false;
  }
  if (title.length > 50) {
    spanEl.innerHTML = `<span><i class="fa-solid fa-xmark"></i> Enter more than 20 characters</span>`;
    spanEl.style.color = "red";
    return false;
  }
  let newNote = {
    noteId: Date.now() * Math.random(),
    noteTitle: title,
  };
  document.getElementsByTagName("form")[0].reset();
  arr.push(newNote);
  localStorage.setItem("listNote", JSON.stringify(arr));
  renderListNote(arr);
  document.getElementById("validate").innerHTML = ``;
  return true;
}

function deleteNote(noteID, arr) {
  //arr = arr.filter((note) => note.noteId != noteID);
  for (let i in arr) {
    if (arr[i].noteId == noteID) {
      arr.splice(i, 1);
      localStorage.setItem("listNote", JSON.stringify(arr));
    }
  }
  renderListNote(arr);
}

function validate() {
  let dataInput = document.getElementsByTagName("input")[0].value;
  let spanEl = document.getElementById("validate");
  if (dataInput == "") {
    spanEl.innerHTML = `<span><i class="fa-solid fa-xmark"></i> Cannot be left blank</span>`;
    spanEl.style.color = "red";
  } else if (dataInput.length > 50) {
    spanEl.innerHTML = `<span><i class="fa-solid fa-xmark"></i> Enter more than 50 characters</span>`;
    spanEl.style.color = "red";
  } else {
    spanEl.innerHTML = `<span><i class="fa-solid fa-check"></i> Correct data</span>`;
    spanEl.style.color = "rgb(19, 247, 7)";
  }
}
