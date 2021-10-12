document.addEventListener('DOMContentLoaded', ()=>{
	class Person{
		constructor(name){
			this.name=name;
			this.notes=[];
			this.notesContent=[];

		}
		addNoteTitle(notesTitles,noteContent){
			this.notes.add(noteTitle);
			this.notesContent.add(noteContent)


		}
	}



let people=[];
let notes=[];
let notesContent=[];
let activePerson=null;
let activeNote=null;
let activeNoteText=null;
let peopleList=document.querySelector('.name-list');
let personForm={
		name: document.querySelector('.add-name'),
		addBtn: document.querySelector(".add-name-btn")
	}
let notesListForm={
	notesConteiner: document.querySelector('.notes-list-container'),
	notesList: document.querySelector('.note-list'),
	inputNoteTitle: document.querySelector('.add-note-title'),
	inputNote: document.querySelector('.add-note'),
	addNoteBtn: document.querySelector('.add-note-btn')
}
let noteForm={
	chosenNoteContainer: document.querySelector('.chosen-note-container'),
	noteTitleArea: document.querySelector('.note-title-area'),
	noteTitleBig: document.querySelector('.note-title-big'),
	noteContent: document.querySelector('.note-area')

}

function addPerson(){
		let name=personForm.name.value;
		if(name.trim()===''){
			alert("Write name");
			return;
		}
		people.push(new Person(name));
		showPeople(people);

	}
function createPersonElement(person, i){
		let personElement= document.createElement('div');
		personElement.classList.add('person');
		if(person===activePerson){
			personElement.classList.add('active');
		}
		personElement.dataset.index=i;
		personElement.append(`${person.name}`);
		return personElement;
	}
function showPeople(people){
		peopleList.innerHTML='';
		let peopleElements = people.map((p, i)=>createPersonElement(p,i));
		peopleList.append(...peopleElements);
	}



function createNoteElem(note, i){
		let noteTitleElem=document.createElement('div');
		noteTitleElem.classList.add('note-title');
		if(note===activeNote){
			noteTitleElem.classList.add('active');
		}
		noteTitleElem.dataset.index=i;
		noteTitleElem.append(note);
		return noteTitleElem;
		}

function createNoteContentElem(noteContent, i){
		let noteTextContentElem=document.createElement('p');
		noteTextContentElem.dataset.index=i;
		noteTextContentElem.append(noteContent);
		return noteTextContentElem;
		}



function showPersonNotes(){
		if(activePerson===null){
				notesListForm.notesList.style.display='none';
				notesListForm.inputNote.style.display='none';
				notesListForm.inputNoteTitle.style.display='none';
				notesListForm.addNoteBtn.style.display='none';
				return;
			}
				let noteElems=activePerson.notes.map((m, i)=>createNoteElem(m, i));
				notesListForm.notesList.innerHTML=('');
				notesListForm.notesList.append(...noteElems);
				notesListForm.notesList.style.display='block';
				notesListForm.inputNote.style.display='block';
				notesListForm.inputNoteTitle.style.display='block';
				notesListForm.addNoteBtn.style.display='block';
		}


function addNotesTitle(){
		if (activePerson===null) return;
	         let noteTitle=notesListForm.inputNoteTitle.value;
	         let noteText=notesListForm.inputNote.value;
	         activePerson.notes.push(noteTitle);
	         activePerson.notesContent.push(noteText);
	         
	    showPersonNotes();
		}


function showChosenNote(){
		if(activeNote===null){
				
			noteForm.noteTitleArea.style.display='none';
			noteForm.noteTitleBig.style.display='none';
			noteForm.noteContent.style.display='none';
			return;
			}
			let noteTextContentElems=activePerson.notesContent.map((m,i)=>createNoteContentElem(m,i));
			noteForm.noteTitleBig.innerHTML=('');
			noteForm.noteContent.innerHTML=('');
			noteForm.noteTitleArea.style.display='block';
			noteForm.noteTitleBig.style.display='block';
			noteForm.noteContent.style.display='block';
		}

function addNoteContent(){
			let noteTextContent=notesListForm.inputNote.value;
			activePerson.notesContent.push(noteTextContent);
			showChosenNote();
		}


		

personForm.addBtn.addEventListener('click', ()=>addPerson());
peopleList.addEventListener('click', (e)=>{
	if (!e.target.matches('.person')) return;
	let index =e.target.dataset.index;
	activePerson=people[index];
	showPeople(people);
	showPersonNotes();
			
})
notesListForm.addNoteBtn.addEventListener('click', ()=>addNotesTitle());
notesListForm.notesList.addEventListener('click', (e)=>{
	if (!e.target.matches('.note-title')) return;
	let index =e.target.dataset.index;
	activeNote=activePerson.notes[index];
	activeNoteText=activePerson.notesContent[index];
	showPersonNotes();
	showPeople(people);
	

})
notesListForm.notesList.addEventListener('click', (e)=>{
	if (!e.target.matches('.note-title')) return;
	showPeople(people);
	showPersonNotes(notes);
	showChosenNote();
	noteForm.noteTitleBig.append(activeNote);
	noteForm.noteContent.append(activeNoteText);

})




showPeople(people);
showPersonNotes();
showChosenNote();


	})
