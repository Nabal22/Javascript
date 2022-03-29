const coords = document.getElementById("coords");
const plateauElt = document.getElementById("plateau");
const plateau = document.querySelectorAll(".jeton");


plateauElt.addEventListener('click',function(c){
    plateau[1].classList.add("jeton_rouge");

    // Fonctionne bien
    // Array.from(P).forEach((element, index) => 
    // {
    //     element.classList.add("jeton_rouge");
    // });

    // coords.innerHTML ="x : "+c.clientX+ " y : "+c.clientY;
    // const jeton = document.elementFromPoint(c.clientX,c.clientY);
    // jeton.classList.add("jeton_rouge");
    // document.querySelectorAll("jeton");
});


// Parcourir element
// const elements = document.querySelectorAll(".jeton");
// Array.from(elements).forEach((element, index) => 
// {
// valeur += "Valeur " + element.name + ": " + element.value + "\r";
// });