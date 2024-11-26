// let video = document.getElementById("myvid");

// // Set the playback speed
// video.playbackRate = 2; // 1.5x speed

let left_btn = document.getElementsByClassName('bi-chevron-left')[0];
let right_btn = document.getElementsByClassName('bi-chevron-right')[0];
let cards = document.getElementsByClassName('cards')[0];
let search=document.getElementsByClassName('search')[0];
let search_input=document.getElementById("search_input");

left_btn.addEventListener("click", () => {
    cards.scrollLeft -= 140; // Scroll left
});

right_btn.addEventListener("click", () => {
    cards.scrollLeft += 140; // Scroll right
});


let json_url = "movie.json";
fetch(json_url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        data.forEach((element) => {
            let { name, imdb, date, sposter, bposter, genre, url } = element;
            let card = document.createElement('a');
            card.classList.add('card');
            card.href = url;
            card.innerHTML = `
                <img src="${sposter}" alt="${name}" class="poster">
                <div class="rest_card">
                    <img src="${bposter}" alt="">
                    <div class="cont">
                        <h4>${name}</h4>
                        <div class="sub">
                            <p>${genre}, ${date}</p>
                            <h3><span>IMDB</span><i class="bi bi-star-fill"></i> ${imdb}</h3>
                        </div>
                    </div>
                </div>`;
            cards.appendChild(card);
            card.addEventListener("mouseover", () => {
                document.getElementById('title').innerText = name;
                document.getElementById('gen').innerText = genre;
                document.getElementById('date').innerText = date;
                document.getElementById('rate').innerHTML = `<span>IMDB</span><i class="bi bi-star-fill"></i>${imdb}`;
            });
            document.getElementById('title').innerText = data[0].name;
            document.getElementById('gen').innerText = data[0].genre;
            document.getElementById('date').innerText = data[0].date;
            document.getElementById('rate').innerHTML = `<span>IMDB</span><i class="bi bi-star-fill"></i>${data[0].imdb}`;


        });




        if (data.length > 0) {
            const firstMovie = data[0];
            document.getElementById('title').innerText = firstMovie.name;
            document.getElementById('gen').innerText = firstMovie.genre;
            document.getElementById('date').innerText = firstMovie.date;
            document.getElementById('rate').innerHTML = `<span>IMDB</span><i class="bi bi-star-fill"></i>${firstMovie.imdb}`;
        }
       


         //seach data load
         
        data.forEach(ele=>//for search bar
            {
                let { name, imdb, date, sposter, genre, url } = ele;
                let card = document.createElement('a');
                card.classList.add('card');
                card.href = url;
                card.innerHTML = `
                    <img src="${sposter}" alt="">
          
                        <div class="cont">
                            <h3>${name}</h3>
                            <p>${genre}, ${date} , <span>IMDB</span><i class="bi bi-star-fill"></i>${imdb}</p>
                           </div>`
                           search.appendChild(card)
            })//foreach end
          
            search.style.visibility="hidden"
            search.style.opacity=0//input is hidden first
            
            
        search_input.addEventListener('keyup',()=>
        {
            let filter=search_input.value.toUpperCase();
            let a=search.getElementsByTagName('a');//element array

            for(let i=0;i<a.length;i++)
            {
             let b=a[i].getElementsByClassName('cont')[0];
            //  console.log(a.textContent);
            let textValue=b.children[0].innerText;//h3 || b.inneText || b.textContent


            if(textValue.toUpperCase().indexOf(filter)>-1)
            {
               a[i].style.display="flex" 
               search.style.visibility="visible"
               search.style.opacity=1

               a[i].addEventListener("click",()=>
            {
                window.location.href=`${data.url[0]}`;
            })
            }
             else{
                a[i].style.display="none"
             
             }
             if(search_input.value==0)
             {
                search.style.visibility="hidden"
                search.style.opacity=0
             }
            }
        })     


        let video=document.getElementsByTagName('video')[0];
        let play=document.getElementById('play');
        play.addEventListener('click',()=>
        {
            if(video.paused)
            {
                video.play();
                play.innerHTML=`Play <i class="bi bi-pause-fill"></i>`
            }
            else{
                video.pause();
                play.innerHTML=`Watch <i class="bi bi-play-fill"></i>`
            }
        })


        let series=document.getElementById("series")
        let movies=document.getElementById("movies")
        let kids=document.getElementById("kids")
        series.addEventListener('click',()=>
    {
   cards.innerHTML='';

   let series_array=data.filter(ele=>
   {
    return ele.type==="series";
   })

   series_array.forEach((element) => {
    let { name, imdb, date, sposter, bposter, genre, url } = element;
    let card = document.createElement('a');
    card.classList.add('card');
    card.href = url;
    card.innerHTML = `
        <img src="${sposter}" alt="${name}" class="poster">
        <div class="rest_card">
            <img src="${bposter}" alt="">
            <div class="cont">
                <h4>${name}</h4>
                <div class="sub">
                    <p>${genre}, ${date}</p>
                    <h3><span>IMDB</span><i class="bi bi-star-fill"></i> ${imdb}</h3>
                </div>
            </div>
        </div>`
   
        cards.appendChild(card)
    })
    });


    movies.addEventListener('click',()=>
        {
       cards.innerHTML='';
    
       let movies_array=data.filter(ele=>
       {
        return ele.type==="movie";
       })
    
       movies_array.forEach((element) => {
        let { name, imdb, date, sposter, bposter, genre, url } = element;
        let card = document.createElement('a');
        card.classList.add('card');
        card.href = url;
        card.innerHTML = `
            <img src="${sposter}" alt="${name}" class="poster">
            <div class="rest_card">
                <img src="${bposter}" alt="">
                <div class="cont">
                    <h4>${name}</h4>
                    <div class="sub">
                        <p>${genre}, ${date}</p>
                        <h3><span>IMDB</span><i class="bi bi-star-fill"></i> ${imdb}</h3>
                    </div>
                </div>
            </div>`
       
            cards.appendChild(card)
        })
        });

        kids.addEventListener('click',()=>
            {
           cards.innerHTML='';
        
           let kids_array=data.filter(ele=>
           {
            return ele.type==="kids";
           })
        
           kids_array.forEach((element) => {
            let { name, imdb, date, sposter, bposter, genre, url } = element;
            let card = document.createElement('a');
            card.classList.add('card');
            card.href = url;
            card.innerHTML = `
                <img src="${sposter}" alt="${name}" class="poster">
                <div class="rest_card">
                    <img src="${bposter}" alt="">
                    <div class="cont">
                        <h4>${name}</h4>
                        <div class="sub">
                            <p>${genre}, ${date}</p>
                            <h3><span>IMDB</span><i class="bi bi-star-fill"></i> ${imdb}</h3>
                        </div>
                    </div>
                </div>`
           
                cards.appendChild(card)
            })
            });
        
    

    })
    .catch(error => console.error('Error fetching the JSON:', error));

    