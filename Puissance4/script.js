const coords = document.getElementById("coords");
const plateauElt = document.getElementById("plateau");
const plateau = document.querySelectorAll(".jeton");

plateauElt.addEventListener('click',function(click){
    let id;
    for (let i = 0; i < plateau.length; i++) {
        const element = plateau[i];
        if(element===document.elementFromPoint(click.clientX,click.clientY)){
            element.classList.add("jeton_rouge");
            id = i;
        }
    }
    //coords.innerHTML ="Client  : x : "+click.clientX+ " y : "+click.clientY+"\n"+"Index "+getIdFromClick(click.clientX,click.clientY);
});