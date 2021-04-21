// PLAN D'ATTAQUE :
// 1) Générer une grille de 8 x 8 => DONE
//      1. créer les éléments html (en js)
//      2. ajouter du style sur nos pixels
// 2) Changer la couleur des pixels au clic => DONE
//      1. réagir au clic sur les pixels
//      2. modifier la couleur d'arrière plan du pixel cliqué
// 3) Ajouter un formulaire pour choisir la taille de la grille
//      1. Ajouter des éléments dans notre <form> (un input et un bouton pour valider)
//      2. Auclic sur le bouton valider, on veut récupérer la valeur saisie dans l'input
//      3. Utiliser cette valeur pour changer la taille de la grille
//      4. Regénérer une nouvelle grille avec la nouvelle taille (avec drawBoard)


// on définit notre configuration de jeu
var gridSize = 8;


// ETAPE 1
function drawBoard() {
    // on séléctionne notre élément HTML qui contiendra la grille
    var boardElem = document.querySelector('#invader');

    // on va se servir des boucles pour créer notre grille :
    for (var lineIndex = 0; lineIndex < gridSize; lineIndex++) {
        // on va créer une ligne dans notre board :
        var lineElem = document.createElement('div');
        // je lui mets une classe:
        lineElem.classList.add('line');

        // on va remplir notre ligne avec 8 cases
        for (var columnIndex = 0; columnIndex < gridSize; columnIndex++) {
            // on crée une case :
            var squareElem = document.createElement('div');

            // on lui rajoute une classe pour pouvoir le styliser
            squareElem.classList.add('square');
            squareElem.classList.add('whiteSquare');

            // on branche un écouteur sur chaque pixel, pour pouvoir réagir au click sur chacun d'entre eux
            // la fonction handlePixelClick sera executée à chaque fois qu'une case sera cliquée
            // en gros : 
            // 1. une case est cliquée
            // 2. le navigateur crée un objet "event" (qui contient des détails sur l'event)
            // 3. il apelle la fonction qu'on lui a indiqué (handlePixelClick) en lui passant en paramètre l'objet event qu'iol a créé
            // Donc il fait : handlePixelClick(event);
            squareElem.addEventListener('click', handlePixelClick);

            // on les rajoute au HTML (appendChild)
            lineElem.appendChild(squareElem);
        }
        boardElem.appendChild(lineElem);
    }
}

drawBoard();

// ETAPE 2
// on déclare la fonction qui sera appellée par mon eventListener
function handlePixelClick(event) {
    // Ne pas faire ça : return 'tartempion'; // ne peut pas marcher : personne ne récupère le résultat de cette fonction. Elle est apellée automatiquement par l'EventListener. On ne l'apelle pas nous même à la main dans le code.

    // on écrit dans la console notre event, qui devrait apparaître quand on clique sur une case
    console.log(event);

    // le paramètre "target" de l'objet "event" contient la case cliquée
    var clickedPixel = event.target;
    console.log(clickedPixel);

    // on utilise un if pour changer la couleur du pixel :
    // si il est blanc, on le pass en bleu (et on enlève le blanc)
    // si il est bleu, on le pass en blanc (et on enlève le bleu)
    if (clickedPixel.classList.contains('whiteSquare')) {
        clickedPixel.classList.remove('whiteSquare');
        clickedPixel.classList.add('blueSquare');
    } else if (clickedPixel.classList.contains('blueSquare')) {
        clickedPixel.classList.remove('blueSquare');
        clickedPixel.classList.add('whiteSquare');
    }
}


// ETAPE 3
// 3) Ajouter un formulaire pour choisir la taille de la grille
//      1. Ajouter des éléments dans notre <form> (un input et un bouton pour valider)
//      2. Au clic sur le bouton valider, on veut récupérer la valeur saisie dans l'input
//      3. Utiliser cette valeur pour changer la taille de la grille
//      4. Regénérer une nouvelle grille avec la nouvelle taille (avec drawBoard)


function fillConfigurationForm() {
    // on récupère notre <form> dans le DOM :
    // Note :
    // Attention si onutilise getElementsByClassName("configuration"), on va récupérer un tableau d'éléments HTML (ici avec un seule élément dans le tableau)
    // pour naviguer dans un tableau on utilise par exemple tableau[0]

    // Donc on va plutôt utiliser querrySelector => qui renvoie dirrectement un élément HTML (le premier trouvé)
    var formElem = document.querySelector('.configuration');
    // on crée un nouvel élément HTML, un input :
    var inputElem = document.createElement('input');
    inputElem.type = 'number'; // l'utilisateur pourra rentrer que des chiffres
    inputElem.min = '1';
    inputElem.max = '30';
    inputElem.step = '1';
    inputElem.placeholder = 'Taille de la grille';
    inputElem.id = 'gridSizeInput';

    // on rajoute notre input dans le form :
    formElem.appendChild(inputElem);

    // idem avec un bouton
    var buttonElem = document.createElement('button');
    buttonElem.textContent = 'Valider';
    buttonElem.id = 'validateButton';

    // on ajoute un event listener sur notre boutton bien aimé :)
    // buttonElem.addEventListener('click', handleSubmitForm);
    // autre manière de faire : on peut mettre un event listener sur le fomr en lui même, et couter le "submit", et plus le click
    formElem.addEventListener('submit', handleSubmitForm);

    // on rajoute notre button dans le form :
    formElem.appendChild(buttonElem);
}

fillConfigurationForm();


// la fonction qui sera apellée au click sur le bouton valider
function handleSubmitForm(event) {
    // par défaut la page est rechargée à l'envoi du form
    // nous on ne veut pas ça, donc on empêche le comportement par défaut :
    event.preventDefault();
    
    console.log('ça appelle bien notre fonction handleSubmitForm');
    console.log(event);

    // ce qui est écrit ici se passera quand on clique le bouton Valider
    // je veux aller chercher mon input dans le DOM
    var inputElement = document.querySelector('#gridSizeInput');
    console.log(inputElement);
    // . value permet de connaitre sa valeur à ce moemtn précis (quandon cliqué sur lbouton, donc)
    var inputValue = inputElement.value;
    console.log('La valeur de l\'input est : ' + inputValue);
    // on change la valeur de gridSize, pour mettre la nouvelle taille choisie :
    gridSize = inputValue;
    // on efface la grille existante :
    document.querySelector('#invader').innerHTML = '';
    // maintenant on redessine la grille, avec la nouvelle taille
    drawBoard();
}