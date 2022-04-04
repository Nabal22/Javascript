const coords = document.getElementById("coords");
const plateauElt = document.getElementById("plateau");
const auTourDe = document.getElementById("auTourDe");

const scoreJ1 = document.getElementById("scoreJ1");
const scoreJ2 = document.getElementById("scoreJ2");

const bEnd = document.getElementById("end");
const bRestart = document.getElementById("restart");
const bRestartTotal = document.getElementById("restartTotal");

let estfinie = false, hasStarted=false;
let strTypeJeton = new String("");

const c0 = [0, 7, 14, 21, 28, 35];
const c1 = [1, 8, 15, 22, 29, 36];
const c2 = [2, 9, 16, 23, 30, 37];
const c3 = [3, 10, 17, 24, 31, 38];
const c4 = [4, 11, 18, 25, 32, 39];
const c5 = [5, 12, 19, 26, 33, 40];
const c6 = [6, 13, 20, 27, 34, 41];

let joueur=2;
let cmpJ1=0,cmpJ2=0;

//On génère les jeton du palteaux de jeu
for (let i = 0; i < 6; i++) {
    var newRow = document.createElement("div");
    newRow.classList.add("row");
    newRow.classList.add("justify-content-center");
    for (let j = 0; j < 7; j++) {
        var newDiv = document.createElement("div");
        newDiv.classList.add("jeton");
        newRow.appendChild(newDiv);
    }
    plateauElt.appendChild(newRow);
}

const plateau = document.querySelectorAll(".jeton");

function incScore(idGagnant){
    if(idGagnant==1)cmpJ1++;
    else if(idGagnant==2)cmpJ2++;
    scoreJ1.innerHTML = cmpJ1;
    scoreJ2.innerHTML = cmpJ2;
}

function restartTotal(){
    restart();
    cmpJ1=0,cmpJ2=0;
    scoreJ1.innerHTML = cmpJ1;
    scoreJ2.innerHTML = cmpJ2;
    auTourDe.innerHTML = "Au tour du joueur 1";
    bRestartTotal.textContent = "Recommencer la partie à zéro";
}

function restart(){
    joueur = 2;
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

function changePlayer(_idJ) {
    if (joueur == 1){
        strTypeJeton = "jeton_jaune";
        joueur = 2;
        auTourDe.innerHTML ="C'est au tour du joueur 1";
        hoverBGJeton("jetonHoverRouge");
    }
    else {
        strTypeJeton ="jeton_rouge";
        joueur = 1;
        auTourDe.innerHTML = "C'est au tour du joueur 2";
        hoverBGJeton("jetonHoverJaune");
    }
    return joueur,strTypeJeton;
}

function clicSurJetonEstValide(jeton) {
    return (jeton.classList.contains("jeton") && !jeton.classList.contains("jeton_rouge") && !jeton.classList.contains("jeton_jaune"));
}

function hoverBGJeton(str){
    plateau.forEach(element => {
        if (clicSurJetonEstValide(element)){
            element.classList.remove("jetonHoverRouge");
            element.classList.remove("jetonHoverJaune");
            element.classList.add(str);
        } 
    });
}

function estDejaJoue(jeton){
    return (jeton.classList.contains("jeton_rouge") || jeton.classList.contains("jeton_jaune"));
}

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
            return idC[index];
        }
    }
}

function diagonaleDroiteValide(i) {// Celle la : /
    const noDiagD = [0,1,2,7,8,14,27,33,34,39,40,41];
    return !noDiagD.includes(i);
}

function diagonaleGaucheValide(i) {// Celle la : \
    const noDiagG = [4,5,6,12,13,20,21,28,29,35,36,37];
    return !noDiagG.includes(i);
}

function testVoisin(cmp,tmp,strTypeJeton){
    if (cmp==4) {
        plateau[tmp].classList.contains(strTypeJeton);
        return true;
    }
    else return false;
}

function partieEstGagnée(id,strtypeJeton) {
    //Horizontalement
    let tmp=id,cmpVoisin=-1;
    while (plateau[tmp].classList.contains(strTypeJeton) ) {
        cmpVoisin++;
        if (tmp!=41){
            tmp++;
        }
        else{
            break;
        }
    }
    tmp = id;
    while (plateau[tmp].classList.contains(strTypeJeton) ) {
        cmpVoisin++;
        if (tmp!=0){
            tmp--;
        }
        else{
            break;
        }
    }
    if (testVoisin(cmpVoisin,tmp,strTypeJeton)) return true;
    //Verticalement en bas car impossible en haut
    tmp = id, cmpVoisin = 0;
    while(plateau[tmp].classList.contains(strTypeJeton) ){
        cmpVoisin++;
        if(tmp < 35){
            tmp+=7;
        }
        else{
            break;
        }
    }
    if (testVoisin(cmpVoisin,tmp,strTypeJeton)) return true;
    
    tmp = id, cmpVoisin = -1;
    if(diagonaleDroiteValide(tmp)){
        while(plateau[tmp].classList.contains(strTypeJeton) ){ //Diagonale /
            cmpVoisin++;
            if(tmp != 6){
                tmp-=6;
            }
            else{
                break;
            }
        }
        tmp = id;
        while(plateau[tmp].classList.contains(strTypeJeton) ){
            cmpVoisin++;
            if(tmp < 35){
                tmp+=6;
            }
            else{
                break;
            }
        }
        if (testVoisin(cmpVoisin,tmp,strTypeJeton)) return true;
    }

    tmp = id, cmpVoisin = -1;
    if (diagonaleGaucheValide(tmp)){
        while(plateau[tmp].classList.contains(strTypeJeton) ){// diagonale \
            cmpVoisin++;
            if(tmp != 0){
                tmp-=8;
            }
            else{
                break;
            }
        }
        tmp = id;
        while(plateau[tmp].classList.contains(strTypeJeton) ){
            cmpVoisin++;
            if(tmp < 35){
                tmp+=8;
            }
            else{
                break;
            }
        }
        if (testVoisin(cmpVoisin,tmp,strTypeJeton)) return true;
    }
}

// bEnd.addEventListener('click',function(_click){
//     bEnd.style.display = "none" ;
//     bRestart.style.display ="none";
//     auTourDe.innerHTML = "";
//     estfinie = true;
//     hasStarted = false;
//     if (cmpJ1>cmpJ2){
//         alert("Le vainqueur est donc le joueur 1 !");
//     }
//     else if (cmpJ1<cmpJ2){
//         alert("Le vainqueur est donc le joueur 2 !");
//     }
//     else{
//         alert("Aucun vainqueur égalité parfaite !");
//     }
// });

bRestart.addEventListener('click',()=>{
    restart();
    restart();
    hoverBGJeton("jetonHoverRouge");
    bRestart.style.display = "none";
    bRestartTotal.style.display ="none";
});

bRestartTotal.addEventListener('click',()=>{
    restartTotal();
    hoverBGJeton("jetonHoverRouge");
    bRestartTotal.style.display = "none";
    bRestart.style.display = "none";
    hasStarted = true;
});

plateauElt.addEventListener('click',function(click){
    let i,newId;
    const jeton = document.elementFromPoint(click.clientX,click.clientY);
    if (!estfinie && hasStarted && clicSurJetonEstValide(jeton)){
        for (i = 0; i < plateau.length; i++) {
            if(plateau[i]===document.elementFromPoint(click.clientX,click.clientY)){
                joueur,strTypeJeton = changePlayer(joueur);
                newId = placeInColonne(getColonne(i),strTypeJeton);
                if(partieEstGagnée(newId,strTypeJeton)){
                    incScore(joueur);
                    auTourDe.innerHTML = "Partie gagnée par Joueur"+joueur+"";
                    bRestart.style.display = "inline";
                    bRestartTotal.style.display ="inline";
                }
                break;
            }
        }
    }
});