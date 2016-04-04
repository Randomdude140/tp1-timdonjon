// IIFE
/* Module pour TIM donjon */
(function(){
	// effectue avance lorsque bouton[i] est cliqué
	document.querySelector("button[data-etape='1']").addEventListener("click", avance);
	document.querySelector("button[data-etape='2']").addEventListener("click", avance);
	document.querySelector("button[data-etape='3']").addEventListener("click", avance);
	document.querySelector("button[data-etape='4']").addEventListener("click", avance);
	document.querySelector("button[data-etape='5']").addEventListener("click", avance);
	window.addEventListener("load", afficherStats);

	var list = [];


	function statGen(object) {
		for (variable in object) {
			object[variable] = 3 + Math.floor(Math.random()*16);
		}
	}

	function afficherStats() {
		var attributes = {
		    forC : 0,
			dex : 0,
			con : 0,
			itl : 0,
			sag : 0,
			cha : 0
		};
		statGen(attributes);
		disabled(attributes);
		recommended(attributes);
		document.querySelector("td.for").innerHTML = attributes.forC;
		document.querySelector("td.dex").innerHTML = attributes.dex;
		document.querySelector("td.con").innerHTML = attributes.con;
		document.querySelector("td.itl").innerHTML = attributes.itl;
		document.querySelector("td.sag").innerHTML = attributes.sag;
		document.querySelector("td.cha").innerHTML = attributes.cha;
	}
	

	function avance() {
		var etape = parseInt(this.dataset.etape);
		if(etape < 6) {
			// Mauvaise pratique : ne pas modifier le CSS dans le code JS (ou du moins garder ça au minimum)
			// document.querySelector("fieldset:nth-child(" + etape + ")").style.display = "none";
			// document.querySelector("fieldset:nth-child(" + (etape + 1) + ")").style.display = "block";
			
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

// function persoModif() {
// 	var classe = document.querySelector(input.race).value;
// 	var choixClasse = "Tu as choisi d'être un: "
// 	var statMain = ""
// 	 document.querySelector("div.confirmClasse").innerHTML += "<p>" + choixClasse + classe + "</p>";
// }





})();


// var users = {
// 	0: {
// 		characters: [
// 			{name}, {classe}, {attributes}
// 		]
// 	}

// };