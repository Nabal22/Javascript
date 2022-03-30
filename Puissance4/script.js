const coords = document.getElementById("coords");
const plateauElt = document.getElementById("plateau");
const auTourDe = document.getElementById("auTourDe");

const bEnd = document.getElementById("end");
const bRestart = document.getElementById("restart");

const plateau = document.querySelectorAll(".jeton");

let estfinie = false;

let strTypeJeton = new String("");

const c0 = [0, 7, 14, 21, 28, 35];
const c1 = [1, 8, 15, 22, 29, 36];
const c2 = [2, 9, 16, 23, 30, 37];
const c3 = [3, 10, 17, 24, 31, 38];
const c4 = [4, 11, 18, 25, 32, 39];
const c5 = [5, 12, 19, 26, 33, 40];
const c6 = [6, 13, 20, 27, 34, 41];

let joueur=2;

function restart(){
    plateau.forEach(element => {
        if(element.classList.contains("jeton_rouge")){
            element.classList.remove("jeton_rouge");
        }
        else if (element.classList.contains("jeton_jaune")){
            element.classList.remove("jeton_jaune");
        }
    });
    estfinie = false;
}

function changePlayer(idJ) {
    if (joueur == 1){
        strTypeJeton = "jeton_jaune";
        joueur = 2;
    }
    else {
        strTypeJeton ="jeton_rouge";
        joueur = 1;
    }
    return joueur,strTypeJeton;
}

function clicSurJetonEstValide(jeton) {
    return (jeton.classList.contains("jeton") && !jeton.classList.contains("jeton_rouge") && !jeton.classList.contains("jeton_jaune"));
}

function estDejaJoue(jeton){
    return (jeton.classList.contains("jeton_rouge") || jeton.classList.contains("jeton_jaune"));
}

bEnd.addEventListener('click',function(click){
    bEnd.style.display = "none" ;
    estfinie = true;
});

bRestart.addEventListener('click',()=>{
    restart();
    restart();
    bEnd.style.display ="block";
});

function getColonne(i){
    if(c0.includes(i)) return c0;
    else if (c1.includes(i)) return c1;
    else if (c2.includes(i)) return c2;
    else if (c3.includes(i)) return c3;
    else if (c4.includes(i)) return c4;
    else if (c5.includes(i)) return c5;
    else if (c6.includes(i)) return c6;
}

function placeInColonne(idC,typeJeton){
    for (let index = 5; index >=0 ; index--) {
        if(estDejaJoue(plateau[idC[index]])==false) {
            plateau[idC[index]].classList.add(typeJeton);
            break;
        }
    }
}



plateauElt.addEventListener('click',function(click){
    let i;
    const jeton = document.elementFromPoint(click.clientX,click.clientY);
    if (estfinie == false && clicSurJetonEstValide(jeton)){
        for (i = 0; i < plateau.length; i++) {
            if(plateau[i]===document.elementFromPoint(click.clientX,click.clientY)){
                joueur,strTypeJeton = changePlayer(joueur);
                placeInColonne(getColonne(i),strTypeJeton);
                break;
            }
        }
    }
    else{

    }
});

// premiere colonne

        // plateau[0].classList.add("jeton_rouge");
        // plateau[7].classList.add("jeton_rouge");
        // plateau[14].classList.add("jeton_rouge");
        // plateau[21].classList.add("jeton_rouge");
        // plateau[28].classList.add("jeton_rouge");
        // plateau[35].classList.add("jeton_rouge");