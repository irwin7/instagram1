let elNavigItems = document.querySelectorAll('.posts__item');
let elPostList = document.querySelector('.posts__list');
let postTemp = document.querySelector('#postTemplate').content;
let elModalTemp = document.querySelector('#modalPost').content;
let elPostFrag = document.createDocumentFragment();
let elLikeBtn = document.querySelector('.btn-like');
let elPost = document.querySelectorAll('.post');
let elPosts = document.querySelector('.posts');
let elPostInner = document.querySelectorAll('.post__inner');
let elFullPost = document.querySelector('.fullpost');





showPost();

for(let item of elNavigItems){
    item.addEventListener('click',()=>{
        for(let items of elNavigItems){
            items.classList.remove('posts__item--active');
        }
        item.classList.add('posts__item--active');
    })
}

function showPost(){
    for(let item of acc[0].posts){
        let postClone = postTemp.cloneNode(true);
        postClone.querySelector('.post').id = `${item.id - 1}`;
        postClone.querySelector('.post__img').src = `${item.content[0]}`;
        postClone.querySelector('.post__likes-count').textContent = `${item.likes}`;
        postClone.querySelector('.post__comm-count').textContent = `${item.comment}`;
        postClone.querySelector('.post__inner').addEventListener('click',()=>{
            showModal(item.id - 1);
        })
        elPostFrag.appendChild(postClone);
        elPostList.appendChild(elPostFrag);
    }
}

function showModal(id){
    let clone = elModalTemp.cloneNode(true);
    let cont = acc[0].posts[id];
    for(let item of cont.content){
        clone.querySelector('.fullpost__content').innerHTML = `<img class="fullpost__img" src="${item}" alt="">`;
    }
    clone.querySelector('.info__ava').src = acc[0].ava;
    clone.querySelector('.info__user').textContent = acc[0].userName;
    clone.querySelector('.comms__author-usern').textContent = acc[0].userName;
    clone.querySelector('.comms__author-ava').src = acc[0].ava;
    clone.querySelector('.comms__author-comment').innerHTML = cont.commAuthor;
    
    follow(clone);
    likedCheck(clone);
    function likedCheck(item){
        if(cont.liked === true){
            item.querySelector('.btn-like').innerHTML = `<i class='bx bxs-heart bxs-heart--active' ></i>`;
        }else{
            item.querySelector('.btn-like').innerHTML = `<i class='bx bx-heart' ></i>`;
        }
    }
    function follow(temp){
        if(acc[0].isFollowed === true){
            temp.querySelector('.info__is-followed').textContent = 'Following';
        }else{
            temp.querySelector('.info__is-followed').textContent = 'Follow';
        }
    }
    clone.querySelector('.info__is-followed').addEventListener('click',()=>{
        if(acc[0].isFollowed === true){
            acc[0].isFollowed = false;
            follow(document);
        }else{
            acc[0].isFollowed = true;
            follow(document);
        }
    })
    clone.querySelector('.btn-like').addEventListener('click',()=>{
        if(cont.liked === true){
            cont.liked = false;
            cont.likes--;
            likedCheck(document);
            document.querySelector('.info__likes-count').textContent = cont.likes;
        }else{
            cont.liked = true;
            cont.likes++;
            likedCheck(document);
            document.querySelector('.info__likes-count').textContent = cont.likes;
        }
    })
    clone.querySelector('.info__likes-count').textContent = cont.likes;
    clone.querySelector('.fullpost__exit').addEventListener('click',()=>{
        elPosts.removeChild(elPosts.childNodes[elPosts.childNodes.length -2])
    })
    elPosts.appendChild(clone)
    console.log(elPosts);
}