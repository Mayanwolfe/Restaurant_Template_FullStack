window.onload = function() {
  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.has('success')) {
    alert('Reservation sent successfully!');
  } else if (urlParams.has('error')) {
    alert('There was an error in making the reservation. Please call 555-555-5555');
  }
}


//Tabbed Menu
function openMenu(event, menuName) {
 let menuArray = document.getElementsByClassName("menu")
 for (let i=0; i < menuArray.length; i++) {
  menuArray[i].style.display = 'none';
 }

  let tablinks = document.getElementsByClassName("tablink")
  for (let i=0; i < tablinks.length; i++) {
    tablinks[i].classList.remove('active-tab')
   }

   document.getElementById(menuName).style.display ='block'
   event.currentTarget.classList.add('active-tab')
}

document.getElementById("mainLink").click()
