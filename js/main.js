let elNavigItems = document.querySelectorAll('.posts__item');


for(let item of elNavigItems){
    item.addEventListener('click',()=>{
        for(let items of elNavigItems){
            items.classList.remove('posts__item--active');
        }
        item.classList.add('posts__item--active');
    })
}