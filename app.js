// Query Selector
const inviteForm = document.querySelector('#registrar');
const inviteesContainer = document.querySelector('#invitees-container');
const submitBtn = document.querySelector('#submit')
const saveBtn = document.querySelector('#save')
const saveId = document.querySelector('#saveid')



let listItems = []





// FUNCTIONS
function handleFormSubmit(e) {
   e.preventDefault();
//    console.log(e)

let name = inviteForm.querySelector('#name').value;
// console.log(name)
const invitees = {
    name,
    id: Date.now(),
}

if(name.trim()!=0){

// console.log(invitees)
listItems.push(invitees);
e.target.reset();
inviteesContainer.dispatchEvent(new CustomEvent ('refreshInvitees'))
} else {
  alert('Please write the name of the invitee')
}

}


function displayInvitees(){

     const tempString = listItems.map(item => `
    <div class="col-3">
    <div class="card mb-4 rounded-3 shadow-sm ">
      <div class="card-header py-3 text-white ">
        <h6 class="my-0">${item.name}</h6>
      </div>
      <div class="card-body">
      <div class="text-start d-flex">
      <h6>Confirmed</h6>
      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
      </div>
        <ul class="btn-list">
        <button class="btn btn-lg btn-edit" aria-label="Edit ${item.name}" value="${item.id}">Edit</button>
        <button class="btn btn-lg btn-delete" aria-label="Delete ${item.name}" value="${item.id}">Remove</button>
          
        </ul>
        
      </div>
    </div>
  </div>
  `).join('');
  inviteesContainer.innerHTML = tempString;
// console.log(tempString)


}

function mirrorStateLocalStorage(){
    localStorage.setItem('inviteesContainer.list', JSON.stringify(listItems))

}




function loadinitialUI(){
    const tempLocalStorage = localStorage.getItem('inviteesContainer.list')
    if(tempLocalStorage === null || tempLocalStorage === []) return;
    const tempInvitees = JSON.parse(tempLocalStorage)
    listItems.push(...tempInvitees)
    inviteesContainer.dispatchEvent(new CustomEvent ('refreshInvitees'))

}


function deleteInviteesFromList(id){
  // console.log(id)
  listItems = listItems.filter(item => item.id !=id)
  inviteesContainer.dispatchEvent(new CustomEvent ('refreshInvitees'))

}

function  editInviteesFromList(id){

  listItems.forEach(function(item){
    if(item.id === id){
     
      
      console.log(item.name)
      let inputName = inviteForm.querySelector('#name')
      inputName.value = item.name
      submitBtn.style.display = 'none';
      saveBtn.style.display = 'block'
      saveId.value = id;
      console.log(saveId.value)
      
     
      
    }
    
  })
  
}


saveBtn.addEventListener('click', function(){
  let name = inviteForm.querySelector('#name').value;
  const tempLocalStorage = localStorage.getItem('inviteesContainer.list')
  const tempInvitees = JSON.parse(tempLocalStorage)
  name = tempInvitees[saveId.value]
 
  localStorage.setItem('inviteesContainer.list', JSON.stringify(listItems))

})








// EVENT LISTERNERS
inviteForm.addEventListener('submit', handleFormSubmit)
inviteesContainer.addEventListener('refreshInvitees', displayInvitees)
inviteesContainer.addEventListener('refreshInvitees', mirrorStateLocalStorage)
window.addEventListener('DOMContentLoaded', loadinitialUI)
inviteesContainer.addEventListener('click', function(e){
  // console.log(e.target)
 if(e.target.matches('.btn-delete')){
   deleteInviteesFromList(Number(e.target.value))

 } else if (e.target.matches('.btn-edit')){
  editInviteesFromList(Number(e.target.value))
  // console.log(e.target.value)

 }
})


