const coords = document.getElementById("coords");
const plateauElt = document.getElementById("plateau");

const bStart = document.getElementById("start");

const plateau = document.querySelectorAll(".jeton");

let estfinie = false;

let strTypeJeton = new String("");

bStart.addEventListener('click',function(click){
    bStart.style.display = "none" ;
    estfinie = true;
});



function changePlayer(cmpt){
    if (cmpt=1){
        return 2;
    }
    else return 1;
}

let joueur=2;

plateauElt.addEventListener('click',function(click){
    let i;
    //joueur = changePlayer(joueur);
    if (joueur == 1){
        strTypeJeton = "jeton_jaune";
        joueur = 2;
    }
    else {
        strTypeJeton ="jeton_rouge";
        joueur = 1;
    }
    if (estfinie == false){
        for (i = 0; i < plateau.length; i++) {
            const element = plateau[i];
            if(element===document.elementFromPoint(click.clientX,click.clientY)){
                break;
            }
        }
    }
    else{

    }
    plateau[i].classList.add(strTypeJeton);
});

// premiere colonne

        // plateau[0].classList.add("jeton_rouge");
        // plateau[7].classList.add("jeton_rouge");
        // plateau[14].classList.add("jeton_rouge");
        // plateau[21].classList.add("jeton_rouge");
        // plateau[28].classList.add("jeton_rouge");
        // plateau[35].classList.add("jeton_rouge");