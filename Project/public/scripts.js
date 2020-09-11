const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute('href'))){
        item.classList.add('active')
    }
}


/* tem certeza que deseja deletar member ou instrutor */
const formDelete = document.querySelector('#form-delete')
formDelete.addEventListener('submit', function(event){
    const confirmation = confirm('Deseja realmente deletar?')
    if(!confirmation) {
        event.preventDefault()
    }
})
