let pages = document.querySelectorAll('.page');
let page_btn = document.querySelectorAll('.page_btn');

page_btn.forEach((btn,index)=>{
    btn.addEventListener('click',()=>{
        pages.forEach((value,ind)=>{
            value.classList.remove('addblock');
        })
        pages[index].classList.add('addblock');
    })
});

let home_vocals_list = document.querySelector(".home_vocals_list");
let song = document.querySelector('.song');
let progress_bar = document.querySelector('.progress_bar');
let play_btn = document.querySelector('#play_btn');
let vocal_start = document.querySelector('.vocal_start');
let vocal_end = document.querySelector('.vocal_end');            
let vocal_img = document.querySelector('.player_img img');
let vocal_authour = document.querySelector('.player_info h3');
let vocal_title = document.querySelector('.player_title');
let for_btn = document.querySelector('#for_btn');
let back_btn = document.querySelector('#back_btn');
let searched = document.querySelector('.searched');
let show_progress_bar = document.querySelector('.show_progress_bar');
let show_play_btn = document.querySelector('#show_play_btn');
let show_back_btn = document.querySelector('#show_back_btn');
let show_for_btn = document.querySelector('#show_for_btn');
let favorites_page = document.querySelector('.favorites_page');
let fav_no_data = document.querySelector('.fav_no_data');
let album_list = document.querySelector('.album_list');
let vocals_player = document.querySelector('.vocals_player');
let vocal_player_show_btn = document.querySelector(".vocal_player_show_btn");
let vocal_player_close = document.querySelector(".vocal_player_close");

let count = 0;

async function get() {
    let Fetch =await fetch('vocals.json');
    let data =await Fetch.json();
    return await data;    
}

let data = get().then(res=>{
            res.map((value,index)=>{
                var div1= document.createElement('div');
                div1.classList.add('home_vocal');
                home_vocals_list.appendChild(div1);
            
                var div2 = document.createElement('div');
                div2.classList.add('home_vocal_top');
                div1.appendChild(div2);
                
                var img = document.createElement('img');
                img.src =value.vocal_img;
                div2.appendChild(img);
            
                var div3 = document.createElement('div');
                div3.classList.add('home_vocals_content');
                div2.appendChild(div3);
            
                var marqu = document.createElement('marquee');
                marqu.classList.add('home_title');
                marqu.innerHTML = value.title;
                div3.appendChild(marqu);
            
                var p = document.createElement('h6');
                p.classList.add('home_authour');
                p.innerHTML = value.authour;
                div3.appendChild(p);
            
                var div4 = document.createElement('div');
                div4.classList.add('home_vocal_bottom');
                div1.appendChild(div4);
            
                var div5 = document.createElement('div');
                div5.classList.add('home_vocal_duration');
                div5.innerHTML = value.duration
                div4.appendChild(div5);
            
                var div6 = document.createElement('div');
                div6.classList.add('favorites');
                div4.appendChild(div6);
            
                var i = document.createElement('i');
                i.classList.add('bi');
                i.classList.add('bi-heart');
                div6.appendChild(i);

                let album = document.createElement('div');
                album.classList.add('album');
                album.innerHTML = `
                        <div class="album_top">
                            <img src='${value.vocal_img}' alt="">
                        </div>
                        <div class="album_bottom">
                            <h5 class="album_authour">${value.authour}</h5>
                            <h5 class="album_title">${value.title}</h5>
                            <h5 class="album_dur">Duration: ${value.duration}</h5>
                        </div>`;
                album_list.appendChild(album);
                });
                var ans = document.querySelectorAll('.home_vocal');
                ans.forEach((value,index)=>{
                value.addEventListener("click",(e)=>{
                    e.stopImmediatePropagation();
                    count = index;
                    call(count)
                    play_btn.classList.add("bi-pause");
                    play_btn.classList.remove('bi-play');
                    show_play_btn.classList.add("bi-pause");
                    show_play_btn.classList.remove('bi-play');
                })
                })

                let fav = document.querySelectorAll('.favorites i');
                fav.forEach((value,index)=>{
                    value.addEventListener('click',(e)=>{
                        e.stopImmediatePropagation();
                        
                        if(value.classList.contains('bi-heart')){
                            value.classList.remove('bi-heart');
                            value.classList.add('bi-heart-fill');
                            fav_no_data.style.display = 'none';
                            let fav_img = value.parentNode.parentNode.parentNode.children[0].children[0].src;
                            let fav_title = value.parentNode.parentNode.parentNode.children[0].children[1].children[0].textContent;
                            let fav_authour = value.parentNode.parentNode.parentNode.children[0].children[1].children[1].textContent;
                            let fav_duration = value.parentNode.parentNode.parentNode.children[1].children[0].textContent                            

                            let fav_vocal = document.createElement('div');
                            fav_vocal.classList.add('favorite_vocal');
                            fav_vocal.classList.add(`ident${index}`)
                            fav_vocal.innerHTML = `
                            <div class="favorite_top">
                                <img src=${fav_img} alt="">
                                <div class="favorite_content">
                                    <marquee class="favorite_title">${fav_title}</marquee>
                                    <h6 class="favorite_authour">${fav_authour}</h6>
                                </div>
                            </div>
                            <div class="favorite_bottom">
                                <div class="favorite_duration">${fav_duration}</div>
                            </div>`;
                            console.log(fav_vocal);
                            favorites_page.appendChild(fav_vocal);
                        }else{
                            value.classList.remove('bi-heart-fill');
                            value.classList.add('bi-heart');
                            let pi = document.querySelector(`.favorites_page .ident${index}`);
                            console.log(pi.classList.add('close'));
                            
                            }
                    })
                })
    })
    async function call(count) {
        let data = await fetch('vocals.json');
        let vocalData = await data.json();
        song.src = vocalData[count].vocal_url;
        vocal_img.src = vocalData[count].vocal_img;
        vocal_authour.innerHTML = vocalData[count].authour;
        vocal_title.innerHTML= vocalData[count].title;
        song.play()
        return vocalData.length;
    }
    call(count).then((ans)=>{
        function shuffle() {
            setInterval(()=>{
                if(song.duration==song.currentTime){
                    forwardFunc();
                }
            },800)
        }
        shuffle()
    for_btn.addEventListener('click',forwardFunc);
    show_for_btn.addEventListener('click',forwardFunc);
    function forwardFunc() {
        play_btn.classList.add("bi-pause");
        play_btn.classList.remove('bi-play');
        if(count>=ans-1){
        count = 0;
        call(count);
    }else{
        call(++count);
    }
    }

    back_btn.addEventListener('click',backwardFunc)
    show_back_btn.addEventListener('click',backwardFunc);
    function backwardFunc(){
        play_btn.classList.add("bi-pause");
        play_btn.classList.remove('bi-play');
        if(count<=0){
        count =ans-1;
        call(count);
        }else{
        call(--count);
    }
    }
    })

    song.onloadedmetadata = function(){
        progress_bar.max = song.duration;
        progress_bar.value = song.currentTime;

        show_progress_bar.max = song.duration;
        show_progress_bar.value = song.currentTime;
        
        let end_min = Math.floor(song.duration/60);
        let end_sec = Math.floor(song.duration) - (Math.floor(song.duration/60)*60);
        vocal_end.innerHTML = `0${end_min}:${end_sec}`
    }

    play_btn.addEventListener('click',()=>{
        if(play_btn.classList.contains('bi-play')){
            song.play();
            play_btn.classList.remove("bi-play");
            play_btn.classList.add('bi-pause');

            show_play_btn.classList.remove("bi-play");
            show_play_btn.classList.add('bi-pause');
        }else{
            song.pause();
            play_btn.classList.remove("bi-pause");
            play_btn.classList.add('bi-play');

            show_play_btn.classList.remove("bi-pause");
            show_play_btn.classList.add('bi-play');
        }
    })

    show_play_btn.addEventListener('click',()=>{
        if(show_play_btn.classList.contains('bi-play')){
            song.play();
            show_play_btn.classList.remove("bi-play");
            show_play_btn.classList.add('bi-pause');

            play_btn.classList.remove("bi-play");
            play_btn.classList.add('bi-pause');
        }else{
            song.pause();
            show_play_btn.classList.remove("bi-pause");
            show_play_btn.classList.add('bi-play');

            play_btn.classList.remove("bi-pause");
            play_btn.classList.add('bi-play');
        }
    })

    setInterval(()=>{
        progress_bar.value = song.currentTime;
        show_progress_bar.value = song.currentTime;
        let hour = 0;
        let minutes = 0;
        vocal_start.innerHTML = `0${hour}:${Math.floor(song.currentTime)}`;
        if(Math.floor(song.currentTime)>59){
            hour++;
            minutes = Math.floor(song.currentTime)-60;
            vocal_start.innerHTML = `0${hour}:${minutes}`;
        }
        if(Math.floor(song.currentTime)>119){
            hour++;
            minutes = minutes-60;
            vocal_start.innerHTML = `0${hour}:${minutes}`;
        }
        if(Math.floor(song.currentTime)>179){
            hour++;
            minutes = minutes-60;
            vocal_start.innerHTML = `0${hour}:${minutes}`;
        }
        if(Math.floor(song.currentTime)>239){
            hour++;
            minutes = minutes-60;
            vocal_start.innerHTML = `0${hour}:${minutes}`;
        }
        if(Math.floor(song.currentTime)>299){
            hour++;
            minutes = minutes-60;
            vocal_start.innerHTML = `0${hour}:${minutes}`;
        }
    },1000);
    
    progress_bar.addEventListener('change',()=>{
        song.currentTime = progress_bar.value;
        song.play();
        play_btn.classList.remove("bi-play");
        play_btn.classList.add('bi-pause');

        show_play_btn.classList.remove("bi-play");
        show_play_btn.classList.add('bi-pause');
    })

    show_progress_bar.addEventListener('change',(e)=>{
        song.currentTime = show_progress_bar.value;
        song.play();
        play_btn.classList.remove("bi-play");
        play_btn.classList.add('bi-pause');
        
        show_play_btn.classList.remove("bi-play");
        show_play_btn.classList.add('bi-pause');
    })

let burger_menu = document.querySelector('.burger_menu i');
let nav = document.querySelector('.navb');
burger_menu.addEventListener('click',()=>{
    nav.classList.toggle('addflex');
})
burger_menu.addEventListener('click',()=>{
    if(burger_menu.classList.contains('bi-list')){
        burger_menu.classList.remove('bi-list');
        burger_menu.classList.add('bi-x-square');
        nav.classList.add('addflex');
    }else{
        burger_menu.classList.remove('bi-x-square');
        burger_menu.classList.add('bi-list');
        nav.classList.remove('addflex');
    }
})
vocal_player_close.addEventListener('click',()=>{
    vocals_player.classList.toggle('addflex');
})

vocal_player_show_btn.addEventListener('click',()=>{
    vocals_player.classList.add('addflex');
})
window.addEventListener('load',showWidth)
window.addEventListener('resize',showWidth)
function showWidth() {
    let wid = 999;
    if(outerWidth<=wid){
        nav.classList.add('addnav');
    }else{
        nav.classList.remove('addnav');
    }
    let widd = 700;
    if(outerWidth<=widd){
        vocals_player.classList.add('addnav');
    }else{
        vocals_player.classList.remove('addnav');
    }
}
