let i =document.getElementById("i")
let i2 =document.getElementById("i2")
let sb=document.body.getElementsByClassName("sidebar")[0]
let main=document.body.getElementsByClassName("main")[0]
let sn=document.body.getElementsByClassName("signin")[0]
i.onclick=()=>{
    sb.style.transform="translate(-50vw,0px)"
    sb.style.position="absolute";
    main.style.width="95vw";
    i2.style.display="block";
}
i2.onclick=()=>{
    sb.style.transform="translate(0px,0px)"
    sb.classList.add("sidebar2")
    if(visualViewport.width>'900'){
        console.log("hello1")
        setTimeout(()=>{
                sb.style.position="static";
                i2.style.display="none"
                main.style.width="80vw";
            },300)
    }
    else{
        console.log("hello2")
        setTimeout(()=>{
                sb.style.position="absolute";
                i2.style.display="none"
                main.style.width="95vw";
            },300)
    }
}