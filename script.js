let words=["Web Developer","3D Creator","Student"];
let wi=0,ci=0;

function type(){
  if(ci<words[wi].length){
    document.querySelector(".typing").innerHTML+=words[wi][ci++];
    setTimeout(type,80);
  }else{
    setTimeout(()=>{
      document.querySelector(".typing").innerHTML="";
      ci=0;wi=(wi+1)%words.length;
      type();
    },1500);
  }
}
type();
