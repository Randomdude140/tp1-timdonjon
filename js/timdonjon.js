// IIFE
/* Module pour TIM donjon */
(function(){
	var attributes = {
	    for : 0,
		dex : 0,
		con : 0,
		itl : 0,
		sag : 0,
		cha : 0
	};
	// effectue avance lorsque bouton[i] est cliqué
	document.querySelector("button[data-etape='1']").addEventListener("click", avance);
	document.querySelector("button[data-etape='2']").addEventListener("click", avance);
	document.querySelector("button[data-etape='3']").addEventListener("click", avance);
	document.querySelector("button[data-etape='4']").addEventListener("click", avance);
	document.querySelector("button[data-etape='5']").addEventListener("click", avance);
	window.addEventListener("load", afficherStats(attributes));

	var list = [];


	function statGen(object) {
		for (variable in object) {
			object[variable] = 3 + Math.floor(Math.random()*16);
		}

	}

	function afficherStats(attributes) {
		statGen(attributes);
		disabled(attributes);
		recommended(attributes);
		populateTables(attributes);
	}
	
	function populateTables (attributes) {
		for (var i = 0; i < 2; i++) {
			for (variable in attributes) {
				var textNode = document.createTextNode(attributes[variable]);
				console.log(document.getElementsByName(variable)[i]);
				document.getElementsByName(variable)[i].appendChild(textNode);
			}
		};
	}

	function avance() {
		var etape = parseInt(this.dataset.etape);
		if(etape < 6) {
			// Mauvaise pratique : ne pas modifier le CSS dans le code JS (ou du moins garder ça au minimum)
			// document.querySelector("fieldset:nth-child(" + etape + ")").style.display = "none";
			// document.querySelector("fieldset:nth-child(" + (etape + 1) + ")").style.display = "block";
			if (etape == 2) {
				persoModif();
			}
			// Meilleure pratique, utiliser les classes CSS
			document.querySelector("div.etape" + etape).classList.add("cacher");
			document.querySelector("div.etape" + etape).classList.remove("afficher");

			document.querySelector("div.etape" + (etape+1)).classList.add("afficher");
			document.querySelector("div.etape" + (etape+1)).classList.remove("cacher");
			
		}	
	}

	function recule() {
		var etape = parseInt(this.dataset.etape);
		if(etape < 6) {
			// Mauvaise pratique : ne pas modifier le CSS dans le code JS (ou du moins garder ça au minimum)
			// document.querySelector("fieldset:nth-child(" + etape + ")").style.display = "none";
			// document.querySelector("fieldset:nth-child(" + (etape + 1) + ")").style.display = "block";
			
			// Meilleure pratique, utiliser les classes CSS
			document.querySelector("div.etape" + etape).classList.add("cacher");
			document.querySelector("div.etape" + etape).classList.remove("afficher");

			document.querySelector("div.etape" + (etape-1)).classList.add("afficher");
			document.querySelector("div.etape" + (etape-1)).classList.remove("cacher");
			
		}	
	}

	function disabled(attributes) {
		if(attributes.con < 9){
			document.getElementById('nain-label').className = "disabled";
			document.getElementById('nain').disabled = true;
		}
		if(attributes.itl < 9 && attributes.con < 9){
			document.getElementById('halfelin-label').className = "disabled";
			document.getElementById('halfelin').disabled = true;
		}
		if(attributes.itl < 9){
			document.getElementById('elfe-label').className = "disabled";
			document.getElementById('elfe').disabled = true;
		}
	}

	function recommended(attributes) {
		if(attributes.sag >= 13){
			document.getElementById('clerc-label').className = "recommended";
		}
		if(attributes.forC >= 13){
			document.getElementById('guerrier-label').className = "recommended";
		}
		if(attributes.itl >= 13){
			document.getElementById('magicien-label').className = "recommended";
		}
		if(attributes.dex >= 13){
			document.getElementById('voleur-label').className = "recommended";
		}
		if(attributes.forC >= 13){
			document.getElementById('nain-label').className = "recommended";
		}
		if(attributes.dex >= 13 || attributes.forC >= 13){
			document.getElementById('halfelin-label').className = "recommended";
		}
		if(attributes.itl >= 13 && attributes.forC >= 13){
		 	document.getElementById('elfe-label').className = "recommended";
		}
	}

function persoModif() {
	var classSpeciality = {
		"Guerrier": "force",
		"Voleur": "dextérité",
		"Magicien": "intelligence",
		"Clerc": "sagesse",
		"Nain": "force",
		"Elfe": "intelligence et sagesse",
		"Halfelin": "dextérité et force"
	};
	var classe = getClass();
	var texteClasse = "Tu a choisi d'être un: " + classe;
	var confirmClasse = document.createTextNode(texteClasse);
	document.querySelector(".confirmClasse").appendChild(confirmClasse);

	var specialClass = "La spécialité de cette classe est: " + classSpeciality[classe];
	document.querySelector(".tableauPerso").appendChild(document.createTextNode(specialClass));
}

function getClass () {
	var radios = document.getElementsByName("race");
	for (var i = radios.length - 1; i >= 0; i--) {
		if(radios[i].checked) {
			return radios[i].value.charAt(0).toUpperCase() + radios[i].value.slice(1);
		}
	};
}

// function ajouter() {
// 		var articleLi = this.parentNode;
// 		var article = {};
// 		article.nom = articleLi.querySelector(".nom").innerHTML;
// 		article.prix = articleLi.querySelector(".prix").innerHTML;
// 		article.qte = 1;
// 		panier[panier.length] = article;
// 		console.log(panier);
// 		console.log(JSON.stringify(panier));
// 	}

// 	function sauvegarder() {
// 		var util = document.querySelector("#utilisateur").value;
		
// 		// Récupérer le tiroir étiqueté "lesPaniers" dans localStorage
// 		var lesPaniers = localStorage.getItem("lesPaniers");
// 		// S'il existe ...
// 		if(lesPaniers) {
// 			// Vérifier si cet utilisateur a déjà un panier d'achat...
// 			lesPaniers = JSON.parse(lesPaniers);
// 			if(lesPaniers[util]) {
// 				console.log("L'utilisateur a déjà un panier d'achats ; il faut le mettre à jour");
// 			}
// 			else {
// 				lesPaniers[util] = panier;
// 				localStorage.setItem("lesPaniers", JSON.stringify(lesPaniers));
// 				console.log(localStorage.getItem("lesPaniers"));
// 			}
// 		}
// 		// S'il n'existe pas...
// 		else {
// 			var objetDesPaniers = {};
// 			objetDesPaniers[util] = panier;
// 			localStorage.setItem("lesPaniers", JSON.stringify(objetDesPaniers));
// 			console.log(localStorage.getItem("lesPaniers"));
// 		}
// 	}

// 	function afficher() {
// 		// Nom de l'identifiant saisi par l'utilisateur dans le "textbox"
// 		var util = document.querySelector("#utilisateur").value;

// 		document.querySelector("ul.contenu-panier").innerHTML = "";
// 		var lesPaniersSauvegardes = JSON.parse(localStorage.getItem("lesPaniers"));
		
// 		if(lesPaniersSauvegardes[util]) {
// 			var lePanierDeCetUtil = lesPaniersSauvegardes[util];
// 			for (var i = 0; i < lePanierDeCetUtil.length; i++) {
// 				document.querySelector("ul.contenu-panier").innerHTML += "<li>" + lePanierDeCetUtil[i].nom + "</li>";
// 			}
// 		}
// 	}



})();


// var users = {
// 	0: {
// 		characters: [
// 			{name}, {classe}, {attributes}
// 		]
// 	}

// };