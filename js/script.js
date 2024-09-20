const footer = document.getElementById('footer');
function flipCard(element, numDemo) {
  // console.log("eee", element)

   // Sélectionner l'enfant à l'intérieur du parent
    // Sélectionne un Div imbriqué ayant la class .flip-card-back
  const backDiv = element.querySelector('.flip-card-inner .flip-card-back');
  const allCards = document.querySelectorAll('.flip-card');
  allCards.forEach(card => {
      // Réinitialiser toutes les cartes
    if (card !== element) {
      card.classList.remove('flipped');

    }
    initialialize(backDiv)
  });

  // Retourner la carte cliquée
  element.classList.toggle('flipped');

  switch (numDemo) {
    case 1:
      console.log("1: La carte est retournée !");
      demoInnerHTML(backDiv)
      break;
    case 2:
      console.log("2: La carte est retournée !");
      demoImg(backDiv)
      break;
    case 3:
      console.log("3: La carte est retournée !");
      demoList(backDiv)
      break;
    default:
      console.log("carte inconnu");
      break;
  }
}
function initialialize (backDiv) {
  backDiv.innerHTML = 'Demo DOM';
  const inputListDiv= document.getElementById('inputListDiv')
  if(inputListDiv){
    inputListDiv.remove();
  }
}
function demoInnerHTML(backDiv) {
  console.log("DemoMethods start");
  // Fonction pour changer le contenu après 1 seconde
  setTimeout(() => {
   
    // Ajoute une classe pour l'effet de fondu
    backDiv.classList.add('fade-out');

    // Change le contenu après la fin de l'animation (1 seconde)
    setTimeout(() => {
      backDiv.innerHTML  = 'Demo innerHTML ';

      // Réinitialise la classe pour le fondu entrant
      backDiv.classList.remove('fade-out');
    }, 500);
  }, 500);
}
function demoImg(backDiv) {
  backDiv.textContent  = 'Demo Manipulation image ';
  // Crée et configure la première image
  const imgCat = document.createElement("img");
  imgCat.setAttribute("src", "./assets/cat.png");
  imgCat.setAttribute("alt", "monImage1");
 

  // Configure la deuxième image
  const imgGoat = document.createElement("img");
  imgGoat.setAttribute("src", "./assets/goat.png");
  imgGoat.setAttribute("alt", "monImage2");
 

  // Applique les styles de positionnement et d'animation initiale
  imgCat.style.position = "absolute";
  imgCat.style.transition = "transform 0.5s ease-in-out, opacity 0.5s ease-in-out";
  imgCat.style.opacity = "1";
  imgCat.style.transform = "translateX(0%)";  // Image 1 visible à sa place
  imgCat.style.top = "70px";  // Marge supérieure
  imgCat.style.width = "150px";  
  imgCat.style.height = "150px";  


  imgGoat.style.position = "absolute";
  imgGoat.style.transition = "transform 0.5s ease-in-out, opacity 0.5s ease-in-out";
  imgGoat.style.opacity = "0";  // Image 2 invisible au début
  imgGoat.style.transform = "translateX(100%)";  // Image 2 hors de l'écran
  imgGoat.style.top = "70px";  // Marge supérieure
  imgGoat.style.width = "150px";  
  imgGoat.style.height = "150px";  

  // Ajoute les deux images au conteneur
  backDiv.appendChild(imgCat);
  backDiv.appendChild(imgGoat);

  

  // Démarrer l'animation
  swapImages(imgCat, imgGoat);
}
// Fonction pour alterner les images en boucle
function swapImages(imgCat, imgGoat) {
  // Cache la première image et fait apparaître la seconde
  setTimeout(() => {
    //console.log("dddd", imgCat)
    imgCat.style.opacity = "0";  // Disparaît
    imgCat.style.transform = "translateX(-100%)";  // Se déplace vers la gauche

    imgGoat.style.opacity = "1";  // Apparaît
    imgGoat.style.transform = "translateX(0%)";  // Se déplace à sa place

    // Après un temps, remettre l'image 1 à droite et l'image 2 disparaît
    setTimeout(() => {
      imgCat.style.opacity = "1";
      imgCat.style.transform = "translateX(0%)";  // Retourne à droite, invisible

      imgGoat.style.opacity = "0";
      imgGoat.style.transform = "translateX(-100%)";  // Se déplace à gauche

      // Boucler l'animation
      setTimeout(swapImages(imgCat, imgGoat), 1000);  // Relance le processus après une pause
    }, 1000);  // Durée avant d'inverser à nouveau
  }, 1000);  // Temps d'affichage de la première image
}
function demoList (backDiv){
  backDiv.textContent  =""
  const titreCard= document.createElement("p");
  titreCard.textContent  = 'Demo Manipulation list ';
  backDiv.appendChild(titreCard)

  backDiv.classList.add("container", "mt-5");

  const row = document.createElement("div");
  row.id="inputListDiv"
  row.classList.add("row");

  const col = document.createElement("div");
  col.classList.add("col-lg-6", "offset-lg-3");
  const inputSection = document.createElement("div");
  inputSection.id = "inputSection";
  inputSection.classList.add("mb-3");

  const inputValue = document.createElement("input");
  inputValue.type = "text";
  inputValue.id = "inputValue";
  inputValue.classList.add("form-control");
  inputValue.placeholder = "Ajouter un élément";

  const addButton = document.createElement("button");
  addButton.id = "addButton";
  addButton.classList.add("btn", "btn-primary", "mt-2");
  addButton.textContent = "Ajouter";

  // Ajouter l'input et le bouton à la section input
  inputSection.appendChild(inputValue);
  inputSection.appendChild(addButton);

  // Créer la liste des éléments
  const itemList = document.createElement("ul");
  itemList.id = "itemList";
  itemList.classList.add("list-group", "mb-3");
  itemList.style.position = "absolute"; // absolute = depend de sont parent direct --- relative =
  itemList.style.top = "70px"; 

  // Créer le bouton supprimer
  const deleteButton = document.createElement("button");
  deleteButton.id = "deleteButton";
  deleteButton.classList.add("btn", "btn-danger");
  deleteButton.style.display = "none";
  deleteButton.textContent = "Supprimer tous les éléments";

  // Ajouter tout au conteneur de la colonne
  col.appendChild(inputSection);
  backDiv.appendChild(itemList);
  col.appendChild(deleteButton);

  // Ajouter la colonne à la ligne
  row.appendChild(col);

  // Ajouter la ligne au conteneur
  
  document.body.insertBefore(row, footer);

 

  // Liste d'éléments pour suivre les ajouts
  let items = [];

  // Fonction pour gérer l'interface utilisateur
  function updateUI() {
    if (items.length === 3) {
      addButton.style.display = "none";
      inputValue.style.display = "none";
      deleteButton.style.display = "block";
    } else {
      addButton.style.display = "block";
      inputValue.style.display = "block";
      deleteButton.style.display = "none";
    }
  }
  function handleEventAddItem() {
    const value = inputValue.value.trim();
    if (value) {
      items.push(value);
      const listItem = document.createElement("li");
      listItem.classList.add("list-group-item");
      listItem.textContent = value;
      itemList.appendChild(listItem);
      inputValue.value = "";
      if (items.length === 3) {
        updateUI();
      }
    }
  }
  // Ajout d'un élément à la liste
  addButton.addEventListener("click", handleEventAddItem);
  
  function handleEventClearItem () {
    items = [];
    itemList.innerHTML = "";
    updateUI();
  }
  // Suppression de tous les éléments
  deleteButton.addEventListener("click",handleEventClearItem);

  // Mise à jour initiale de l'interface
  updateUI();
}
