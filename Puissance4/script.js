const coords = document.getElementById("coords");
const plateau = document.getElementById("plateau");

plateau.addEventListener('click',function(c){
    coords.innerHTML ="x : "+c.clientX+ " y : "+c.clientY;
    const jeton = document.elementFromPoint(c.clientX,c.clientY);
    jeton.classList.add("jeton_rouge");
});

//Jeton 0=rouge 1=jaune -1= pas joué
let Listeplateau = new Array(42);
let compteurJ1,compteurJ2 = 0;