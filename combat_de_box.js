// JS

// Pour executer le fichier : node nomFichier.js

// Un combat de boxe est grandement attendu dans le monde entier,
// le numéro 1, Iappo, contre le numéro 2, vous-même. 😗

// Le combat s'effectuera en tour par tour avec un maximum de 10 rounds !

// Si vous allez jusqu'au dernier round, vous devez afficher le vainqueur et indiquer que le combat est bien terminé.

// Vous devez ajouter la probabilité d'effectuer un KO (coup critique, 10% de chance)  et, dans ce cas, le combat s'arrête aussi.

// Ippo (IA) vous attaque également à chaque round ; il peut donc vous mettre KO ou gagner le combat à la fin en fonction de votre stamina restante.

// [
//   {
//     id: 1,
//     name: "Ippo",
//     caractéristiques: { 
//       strength: 1300,  
//       defense: 900,   
//       stamina: 25000,  
//       speed: 180      
//     },
//     techniques: [ 
//       { name: "Smash", power: 1300 },             
//       { name: "Uppercut", power: 1330 },          
//       { name: "Gazelle Punch", power: 1320 },     
//       { name: "Dempsey Roll", power: 1350 }       
//     ]
//   },
//   {
//     id: 2,
//     name: "Challenger",
//     caractéristiques: { 
//       strength: 1250,  
//       defense: 900,    
//       stamina: 26000,  
//       speed: 190       
//     },
//     techniques: [ 
//       { name: "Jab", power: 1250 },                
//       { name: "Uppercut", power: 1280 },          
//       { name: "Crochet", power: 1265 },            
//       { name: "Enchaînement", power: 1290 }        
//     ]
//   }
// ];

// Étape 2 :

// Ajouter des compétences aux combattons

// -> Vous-même

// Jab (force de base)
// Uppercut (force de base + 20)
// Crochet (force de base + 15)
// Enchaînement (lance deux coups dévastateurs) (force de base + 30)

// -> Ippo

// Smash (c'est un coup à mi-chemin entre un crochet et un uppercut qui frappe le côté du menton) (force de base)

// Uppercut (uppercut surpuissant) (force de base + 30)

// Gazelle Punch (après avoir pris une impulsion sur ses appuis, Ippo lance un uppercut dévastateur qui met souvent à terre directement) (force de base + 20)

// Dempsey Roll (Ippo déplace son torse afin de former un huit à l'horizontale, puis il se sert de l'impulsion pour distribuer des coups puissants, rendant la riposte très difficile) (force de base + 50)

// Ippo doit lancer des techniques aléatoirement, tout comme le Challenger.
// Les techniques n'ont pas toutes la même puissance.

// Implémentez tout cela selon votre propre raisonnement, vous êtes libre pour la valeur des propriétés.

// La vitesse détermine qui frappe en premier.

// La stamina est déduite en fonction de la force de l'adversaire.

// Le coup critique est aléatoire (probabilité de réussir un KO).



class Boxer {
    //Chaque Boxer a un nom, des caractéristiques, des techniques propres à eux même et une barre de vie (stamina)
    constructor(name, caracteristiques, techniques, stamina) {
        this.name = name;
        this.caracteristiques = caracteristiques;
        this.techniques = techniques;
        this.stamina = stamina;
    }
    //Pour choisir une technique aléatoire dans le tableau "techniques"
    randomTechniques() {
        //Dans cette méthode on cherche juste un chiffre au hasard entre 0 et 4 et ensuite on le garde en tant qu'indice de l'éléments dans le tableau
        const index = Math.floor(Math.random() * this.techniques.length);// Math.random return un chiffre entre 0 et 1 c'est pour ça qu'on l'a multiplié par la taille du tableau (4 éléments)
        return this.techniques[index];
    }
    //Pour savoir quelle technique on a utilisé et combien de stamina il restera à l'adversaire après ce coup
    attack(adversaire) {
        //pour après faire une soustraction avec la stamina acutelle de l'adversaire
        const techRandom = this.randomTechniques();

        // 10 % de chance de faire un K.O
        const coupCritique = Math.random() < 0.1;

        //si il se prend un coup critique, on lui donne directement 0 en stamina
        if (coupCritique) {
            console.log(`${this.name} utils un K.O !`);
            adversaire.stamina = 0;
            return;
        }

        //affiche qui a utilisé quoi comme coup
        console.log(`${this.name} utilise ${techRandom.name} (puissance : ${techRandom.power})`);
        //le calcul pour savoir combien il reste de stamina à l'adversaire
        adversaire.stamina -= techRandom.power;

        //on vérifie si il lui reste encore de la stamina, si la stamina est négatif, on lui donne comme valeur 0. Si non, on affiche un message;
        if (adversaire.stamina < 0){
            adversaire.stamina = 0;
        }else {
            console.log("Toujours debout !");
        }
    }
}


class Combat {
    //Un combat contient forcément deux joueurs
    constructor(boxer1, boxer2) {
        this.boxer1 = boxer1;
        this.boxer2 = boxer2;
    }
    
    // C'est grâce à cette méthode qu'on pourra "visualiser" tout le combat
    rounds() {
        console.log("Le combat de la mort va COMMENCER !!!");
        console.log(`${this.boxer1.name} VS ${this.boxer2.name}`);
        console.log("=================================");

        //boucle pour afficher on est à quel Round
        for (let i = 1; i <= 10; i++) {
            console.log(`\n-------- ROUND ${i} --------`);

            //Le boxer le plus rapide commencera
            let premier, deuxieme;//on créé deux variable sans valeur pour l'instant
            if (this.boxer1.caracteristiques.speed >= this.boxer2.caracteristiques.speed) {//on compare la vitesse des deux
                premier = this.boxer1;
                deuxieme = this.boxer2;
            } else {
                premier = this.boxer2;
                deuxieme = this.boxer1;
            }

            // Premier attaque
            premier.attack(deuxieme);
            if (deuxieme.stamina <= 0) {
                console.log(`${deuxieme.name} est K.O ! ${premier.name} remporte le combat !`);
                return;//pour sortir de la méthode pour que ça ne continue pas
            } else {
                console.log(`${deuxieme.name} tient encore debout avec ${deuxieme.stamina} points de stamina`);
            }

            // Puis le second attaque
            deuxieme.attack(premier);
            if (premier.stamina <= 0) {
                console.log(`${premier.name} est K.O ! ${deuxieme.name}!`);
                return;
            } else {
                console.log(`${premier.name} tient bon !`);
            }

            //
            console.log(`${this.boxer1.name} stamina : ${this.boxer1.stamina} 🔋`);
            console.log(`${this.boxer2.name} stamina : ${this.boxer2.stamina} 🔋`);
        }

        // Si aucun K.O après 10 rounds
        console.log("\nLE MATCH EST TERMINE !!!");
        if (this.boxer1.stamina > this.boxer2.stamina) {
            console.log(`${this.boxer1.name} gagne aux points !`);
        } else if (this.boxer2.stamina > this.boxer1.stamina) {
            console.log(`${this.boxer2.name} gagne aux points !`);
        } else {
            console.log("Match nul !");
        }
    }
    
}

//tester si ça marche
const ippo = new Boxer(
  "Ippo",
  { strength: 1300, defense: 900, stamina: 25000, speed: 180 },
  [
    { name: "Smash", power: 1300 },
    { name: "Uppercut", power: 1300 + 30 },
    { name: "Gazelle Punch", power: 1300 + 20 },
    { name: "Dempsey Roll", power: 1300 + 50 }
  ],
  25000
);

const aurelie = new Boxer(
  "Aurélie",
  { strength: 1250, defense: 900, stamina: 26000, speed: 190 },
  [
    { name: "Jab", power: 1250 },
    { name: "Uppercut", power: 1250 + 20 },
    { name: "Crochet", power: 1250 + 15 },
    { name: "Enchaînement", power: 1250 + 30 }
  ],
  26000
);


const combat = new Combat(ippo, aurelie);
combat.rounds();
