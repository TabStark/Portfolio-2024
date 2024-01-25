let loader = document.getElementById('preloader');
let navbar = document.querySelector('.navbar')
let section = document.querySelectorAll('section')
let navbarlink = document.querySelectorAll('.navbar ul li a')
let app_project_container = document.querySelector('.app_project_container')
let web_project_container = document.querySelector('.web_project_container')
let mainforweb = document.querySelector('.mainforweb')
let view_more = document.querySelector('.project_footer p')
let show = false; 

// Hidden animation
const hiddenElement = document.querySelectorAll('.hidden')
const sechidden = document.querySelectorAll('.sechidden')

// Loader
window.addEventListener('load', function () {
    loader.style.display = 'none';
});

// Window Scroll
scrollFunction = () => {
    section.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id')

        if (top >= offset && top < offset + height) {
            navbarlink.forEach(links => {
                links.classList.remove('active');
                document.querySelector('ul li a[href*=' + id + ']').classList.add('active')
            })
        }
    })
}


window.onscroll = () => { scrollFunction() };



// About Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
})


hiddenElement.forEach((el) => observer.observe(el));


// Section Animation
const sec_observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('secshow');
        } 
    });
})

sechidden.forEach(el => sec_observer.observe(el));

// APP 
async function fetchAppData() {
    let response = await fetch('projects.json')
    let data = await response.json();
    console.log(data)
    data.app_projects.forEach(value => {
        let div = document.createElement('div')
        div.classList.add('card')
        app_project_container.appendChild(div)


        let divImg = document.createElement('div')
        divImg.classList.add('card-image')
        let img = document.createElement("img")
        img.src = value.img
        divImg.appendChild(img)
        div.appendChild(divImg)

        let titleP = document.createElement('p')
        titleP.classList.add('card-title')
        titleP.innerHTML = value.project_name
        div.appendChild(titleP)

        let bodyP = document.createElement('p')
        bodyP.classList.add('card-body')
        bodyP.innerHTML = value.language
        div.appendChild(bodyP)

        let divIcon = document.createElement('div')
        divIcon.classList.add('card_icons')
        let a = document.createElement('a')
        a.href = value.links
        a.target="_blank"
        divIcon.appendChild(a)
        let i = document.createElement('i')
        i.classList.add('fa-brands', 'fa-github')
        a.appendChild(i)
        div.appendChild(divIcon)
    })
}

fetchAppData()

// WEB
async function fetchWebData() {
    let response = await fetch('projects.json')
    let data = await response.json();
    data.web_projects.forEach(value => {
        let div = document.createElement('div')
        div.classList.add('card')
        web_project_container.appendChild(div)


        let divImg = document.createElement('div')
        divImg.classList.add('card-image')
        let img = document.createElement("img")
        img.src = value.img
        divImg.appendChild(img)
        div.appendChild(divImg)

        let titleP = document.createElement('p')
        titleP.classList.add('card-title')
        titleP.innerHTML = value.project_name
        div.appendChild(titleP)

        let bodyP = document.createElement('p')
        bodyP.classList.add('card-body')
        bodyP.innerHTML = value.language
        div.appendChild(bodyP)

        let divIcon = document.createElement('div')
        divIcon.classList.add('card_icons')
        
        // Git Link
        let gitA = document.createElement('a')
        gitA.href = value.links
        gitA.target="_blank"

        // GO Live
        let liveA = document.createElement('a')
        liveA.href = value.live
        liveA.target="_blank"
        let liveP = document.createElement('p')
        liveP.innerHTML="Live Demo"
        liveA.appendChild(liveP)
        
        divIcon.appendChild(gitA)
        divIcon.appendChild(liveA)
        let i = document.createElement('i')
        i.classList.add('fa-brands', 'fa-github')
        gitA.appendChild(i)
        div.appendChild(divIcon)
    })
}
fetchWebData()

view_more.addEventListener('click', function(){
    show=!show
    console.log(show)
    if(show){
        mainforweb.style.display="block"
        view_more.innerHTML = "View less"
    } else {
        mainforweb.style.display="none"
        view_more.innerHTML = "View more"
    }
})


let fromuser = document.querySelector('.fromuser')
let fromemail = document.querySelector('.fromemail')
let frommessage = document.querySelector('.frommessage')

// Form Submit
function SubmitEmail(e){
    e.preventDefault();
    var params ={
        from_name: fromuser.value,
        fromemail: fromemail.value,
        message: frommessage.value
    }
    emailjs.send('service_hf84olp', 'template_kvgd6cn', params).then(function (res){
        alert("Mail sent Successfully");
        fromuser.value = ''
        fromemail.value = ''
        frommessage.value = ''
    })
    
}