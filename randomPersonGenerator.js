document.getElementById("newperson").addEventListener("click", randNamePre);
document.getElementById("save").addEventListener("click", save);
document.getElementById("load").addEventListener("click", load);
document.getElementById("clear").addEventListener("click", clear);
document.getElementById("theme").addEventListener("click", theme);
document.getElementById("share").addEventListener("click", share);


//Define Output Variables
var output = document.getElementById("output");
var output2 = document.getElementById("backstory");
var save = document.getElementById("save");
//atLoad controlls weather a page can be saved
var atLoad = false;
//variables used to generate people information
var gender;
var eyeColor;
var hairColor;
var name;
var backstory;
var age;
var weight;
var height;
var pronoun;
var pronounCap;
var strongStat;
var weakStat;
var speed;
var strength;
var intelegence;
var dexterity;
var charisma;
var combat = [];
var exploration = [];
var hunting = [];
var scavenging = [];
var social = [];
var medicine = [];
var stealth = [];
var shooting = [];
//variables used to save lists of randomized features
var Theme = 0;
var Themes;
var seed;
var originalseed;
var Intros = [];
var Places = [];
var Months = [];
var Jobs = [];
var Achievements = [];
var Actions = [];
var Food = [];
var Animals = [];
var SmallThings = [];
var BigThings = [];
var Terrain = [];

//set variables used to create backstory
//variables used to generate backstories
var birthPlace;
var birthMonth;
var birthDay;
var birthYear;
var curYear;
var jobNum;
var job;
var homeNum;
var home;
var intro;
var achieve;
var achieveNum;
var pet;
var petNum;
var attackNum;
var animal;
var friend;
var friendNum;
var lostNum;
var lost;
var terrainNum;
var terrain;
var likeThing;
var atHome;
//lists of used rrandomized features
var usedPlaces = [];
var usedIntros = [];
var usedJobs = [];
var usedAchievements = [];
var usedAnimals = [];
var usedSmallThings = [];
var usedBigThings = [];
var usedTerrain = [];
var namesFemale = [];
var namesMale = [];
var usedActions = [];
var usedFood = [];
var thingsToLike = [];

function randNamePre() {
    randName();
}
//main function
function randName(value, saved) {

    originalseed = generateSeed();
    if (value !== undefined) originalseed = value;
    seed = originalseed;
    console.log(seed);
    atLoad = false;
    if (saved === true) save.innerHTML = "Saved";
    else save.innerHTML = "Save";
    //set Gender
    var genderConstant;
    if (random() > 0.5) gender = "male";
    else gender = "female";
    if (gender === "male") {
        genderConstant = 0;
    } else {
        genderConstant = 1;
    }
    //lists of letters used to generate names
    var vowels = [
        ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "i", "i", "i", "i", "i", "i", "i", "i", "i", "i", "i", "i", "i", "i", "i", "i", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "u", "u", "u", "u", "u", "y"],
        ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "i", "i", "i", "i", "i", "i", "i", "i", "i", "i", "i", "i", "i", "i", "i", "i", "i", "i", "i", "i", "i", "o", "o", "o", "o", "o", "u", "u", "y"]
    ];
    var vowelCaps = [
        ["A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "O", "O", "O", "U", "Y"],
        ["A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "I", "I", "I", "I", "O", "Y"]
    ];
    var consonants = [
        ["b", "b", "b", "ch", "c", "c", "c", "c", "c", "rd", "d", "d", "d", "d", "d", "f", "g", "h", "h", "h", "j", "j", "j", "j", "j", "k", "k", "k", "k", "ll", "ll", "ll", "l", "l", "l", "l", "l", "l", "m", "m", "m", "m", "m", "m", "m", "m", "m", "m", "nd", "nd", "n", "n", "n", "n", "n", "n", "n", "n", "n", "n", "n", "n", "n", "n", "n", "n", "ph", "p", "r", "r", "r", "r", "r", "r", "r", "r", "r", "r", "r", "r", "r", "r", "sh", "sh", "s", "s", "s", "s", "s", "s", "s", "s", "th", "th", "t", "t", "t", "v", "v", "w", "x", "y", "y", "y", "y", "y", "y", "z"],
        ["b", "b", "b", "ch", "c", "c", "c", "rd", "d", "d", "f", "f", "g", "g", "h", "h", "h", "j", "j", "j", "k", "k", "k", "k", "ll", "ll", "ll", "l", "l", "l", "l", "l", "l", "l", "l", "l", "l", "l", "l", "m", "m", "m", "m", "m", "m", "nd", "nd", "n", "n", "n", "n", "n", "n", "n", "n", "n", "n", "n", "n", "n", "n", "n", "n", "ph", "p", "r", "r", "r", "r", "r", "r", "r", "r", "r", "r", "sh", "sh", "s", "s", "s", "s", "s", "s", "s", "th", "t", "t", "v", "v", "w", "x", "y", "y", "y", "y", "y", "y", "y", "y", "y", "y", "z"]
    ];
    var consolnantCaps = [
        ["B", "B", "B", "B", "B", "B", "B", "B", "Ch", "C", "C", "C", "C", "C", "C", "C", "C", "C", "C", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "F", "F", "F", "F", "G", "G", "G", "G", "G", "G", "H", "J", "J", "J", "J", "J", "J", "J", "J", "J", "J", "J", "J", "J", "J", "J", "J", "J", "J", "J", "J", "J", "J", "J", "J", "J", "K", "K", "K", "K", "K", "K", "K", "K", "L", "L", "L", "L", "L", "L", "L", "L", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "N", "N", "N", "N", "N", "N", "Ph", "P", "P", "P", "Qu", "Qu", "Qu", "Qu", "R", "R", "R", "R", "R", "R", "R", "R", "R", "Sh", "S", "S", "S", "S", "S", "S", "S", "S", "S", "S", "S", "Th", "Th", "T", "T", "T", "T", "V", "W", "W", "W", "X", "Y", "Y", "Y", "Y", "Y", "Y", "Z"],
        ["B", "B", "B", "B", "B", "B", "B", "B", "Ch", "C", "C", "C", "C", "C", "C", "C", "C", "C", "C", "C", "C", "D", "D", "D", "D", "D", "D", "D", "D", "F", "F", "F", "F", "G", "G", "G", "G", "G", "G", "H", "J", "J", "J", "J", "J", "J", "J", "J", "J", "J", "J", "J", "J", "J", "J", "K", "K", "K", "K", "K", "K", "K", "K", "K", "K", "K", "K", "K", "K", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "N", "N", "N", "N", "N", "N", "N", "O", "Ph", "P", "P", "P", "P", "Qu", "R", "R", "R", "R", "R", "R", "R", "R", "Sh", "S", "S", "S", "S", "S", "S", "S", "S", "S", "S", "S", "S", "S", "S", "S", "S", "S", "Th", "Th", "T", "T", "T", "T", "V", "V", "V", "W", "X", "Y", "Y", "Z", "Z"]
    ];
    var format = "";
    name = "";
    var length = FloorRan(3, 2);
    var inRow = 0;
    var curItem;
    var sylform;
    for (i = 0; i < length; i++) {
        sylform = FloorRan(2, 1);
        for (e = 0; e < FloorRan(1, 2); e++) {
            if (sylform === 0 || sylform === 1) {
                if (e === 0 || e === 2) {
                    if (i === 0 && e === 0) {
                        name = name + vowelCaps[genderConstant][Math.floor(random() * vowelCaps[genderConstant].length)];
                    } else {
                        name = name + vowels[genderConstant][Math.floor(random() * vowels[genderConstant].length)];
                    }
                } else {
                    name = name + consonants[genderConstant][Math.floor(random() * consonants[genderConstant].length)];

                }
            } else if (sylform == 2) {
                if (e === 0 || e === 2) {
                    if (i === 0 && e === 0) {
                        name = name + consolnantCaps[genderConstant][Math.floor(random() * consolnantCaps[genderConstant].length)];
                    } else {
                        name = name + consonants[genderConstant][Math.floor(random() * consonants[genderConstant].length)];
                    }
                } else {
                    name = name + vowels[genderConstant][Math.floor(random() * vowels[genderConstant].length)];
                }

            }
        }
    }

    //remove awkward ;etter combinations from names
    name = name.replace(/aa/ig, 'a');
    name = name.replace(/ii/ig, 'i');
    name = name.replace(/oo/ig, 'o');
    name = name.replace(/ee/ig, 'e');
    name = name.replace(/uu/ig, 'u');
    name = name.replace(/ai/ig, 'a');
    name = name.replace(/yy/ig, 'y');
    name = name.replace(/ei/ig, 'e');
    name = name.replace(/ie/ig, 'i');
    name = name.replace(/iu/ig, 'i');
    name = name.replace(/ui/ig, 'u');
    name = name.replace(/io/ig, 'i');
    name = name.replace(/oi/ig, 'o');
    name = name.replace(/llll/ig, 'll');
    name = name.replace(/lll/ig, 'll');
    //set output to name
    output.innerHTML = name;
    //backstory gen here
    backstory = "";
    //Stats gen
    //set Age
    age = FloorRan(60, 10);
    backstory = backstory + "Age: " + age + " years<br>";
    var ageOffSet;
    //set Height
    if (age > 16) ageOffSet = 1;
    else ageOffSet = age / 16;
    height = Math.floor(40 + ageOffSet * (100 + Math.floor(random() * 70)));
    backstory = backstory + "Height: " + height + " cm<br>";
    //set Weight
    weight = Math.floor(ageOffSet * (120 + Math.floor(random() * 140)));
    backstory = backstory + "Weight: " + weight + " lb<br>";
    //set Eye Color
    var eyeColorRan = Math.floor(random() * 5);
    if (eyeColorRan === 0) eyeColor = "brown";
    else if (eyeColorRan === 1) eyeColor = "green";
    else if (eyeColorRan === 2) eyeColor = "blue";
    else if (eyeColorRan === 3) eyeColor = "hazel";
    else if (eyeColorRan === 4) eyeColor = "black";
    backstory = backstory + "Eye Color: " + eyeColor + "<br>";
    //set Hair Color
    var hairColorRan = Math.floor(random() * 4);
    if (random() * 200 < age) hairColor = "gray";
    else if (hairColorRan === 0) hairColor = "blonde";
    else if (hairColorRan === 1) hairColor = "red";
    else if (hairColorRan === 2) hairColor = "black";
    else if (hairColorRan === 3) hairColor = "brown";
    backstory = backstory + "Hair Color: " + hairColor + "<br>";
    //add gender to backstory;
    backstory = backstory + "Gender: " + gender + "<br><br>Bio: ";
    //set Pronouns
    if (gender == "female") {
        pronoun = ["she", "her"];
        pronounCap = ["She", "Her"];
    } else {
        pronoun = ["he", "his"];
        pronounCap = ["He", "His"];
    }
    //backstory Starts Here
    usedPlaces = [];
    usedIntros = [];
    usedJobs = [];
    usedAchievements = [];
    usedAnimals = [];
    usedSmallThings = [];
    usedBigThings = [];
    usedTerrain = [];
    usedActions = [];
    usedFood = [];
    //List of Themes
    Themes = ["Pirate", "Space", "Medieval", "Fantasy", "Contemporary"];
    //List of Intros
    Intros = ["In " + curYear + ", " + pronoun[0] + " ", "Later in " + pronoun[1] + " life " + pronoun[0] + " ", "In the years to come, " + pronoun[0] + " ", pronounCap[1] + " future was defined when " + pronoun[0] + " ", pronounCap[1] + " life was changed when " + pronoun[0], pronounCap[0] + " then ", pronounCap[0] + " continued life when " + pronoun[0] + " ", "In " + curYear + ", " + pronoun[1] + " fate was sealed when " + pronoun[0] + " ", name + " then ", "In the proceeding years,  " + name, pronounCap[0] + " ", name + " finally saw the beauty in the universe when " + pronoun[0] + " ", "The first time " + name + " got recognition was when " + pronoun[0] + " ", name + " felt shame for the first time when " + pronoun[0] + " ", pronounCap[0] + " became invested in " + pronoun[1] + " life when " + pronoun[0]];
    //List of Places
    Places = [
    /*Pirate*/ ["Death Cove", "Isle of the Dead", "Kelp Cove", "Pirate's Bay", "Sea of Tears", "Sea of Blood", "Red Sea", "Isle of the Last", "Isle of the Lost", "Dark Storm", "Isle of the Fishes", "Sea of Lost Soles", "Sea of the Dead and Dying"],
    /*Space*/ ["Dune", "Mars", "Tera-" + FloorRan(1000, 0), "Nexon-" + FloorRan(1000, 0), "Gia-" + FloorRan(1000, 0), "Tetre-" + FloorRan(1000, 0), "Loris-" + FloorRan(1000, 0), "Eden-" + FloorRan(1000, 0), "Hyperion", "The New World", "Slete-" + FloorRan(1000, 0), "Sactu-" + FloorRan(1000, 0)],
    /*Midevil*/ ["the Amazon", "Thria", "Ele", "Forstworth", "Mathwatch Hold", "Lastwatch Hold", "Adrea", "Holents", "Saliford", "Shanton", "Crimea", "Winterfel", "Helheim", "Vanhiem", "Kailasa", "Rulton", "El Le", "Karnstien", "Midlun", "Westeros"],
    /*Fantasy*/ ["the Sactum of the Tempest", "Middle Earth", "North Earth", "South Earth", "the Nether", "Atlantis", "Hell", "Icewark", "Candyland", "Olympus", "West Kraznya", "Arstotzka", "Hades", "the Dream Machine", "the Aether", "Gallifrey", "the Weather Ballon", "the Edge", "Dale", "Valantis", "Ulopa", "Epcot", "Ry'leh", "the Forbidden Desert", "Bitterwood", "Tarsonis", "The Beyond", "Oceana", "Pelagia", "Agartha", "Sands of Blood"],
    /*Contemporary*/ ["the Mid-West", "United States of Canada", "Chicago", "Boston", "London", "Georgia", "Ephos", "Rhodes", "Russia", "Disneyland", "The Bermuda Triange", "Pacifica", "Kansas", "Mexico City", "San Fransisco", "New York", "York"]];
    //List of Months
    Months = ["January", "February", "March", "April", "May", "June", "July", "August", "Spetember", "October", "November", "December"];
    //List of animals
    Animals = [
    /*Pirate*/ ["squid", "fish", "parrot#00", "sturgeon", "octopus#01", "seal#00", "seagul#00", "monkey#03", "serpent#00", "mermaid#00", "kraken#00", "flying fish", "shark#00", "giant squid#00", "octopus#01", "sea star#00", "dophin#00", "pirana#00", "stork#00", "coral", "hippo#00", "pufferfish", "sea lion#00", "sea lepord#00", "sea snake#00", "sea llama#00"],
    /*Space*/ ["roctopus#01", "alien#00", "monkey#03", "space whale#00", "leviathan#00", "ulem#00", "nanana#00", "shetemenenotolocosozzose#00", "ooool#00", "ululo#00", "thras#02", "space kraken#00", "neptun#00", "wrathchild#06", "space pigeon#00", "orbital turtle#00", "blob#00", "bananazas#02", "mufulo#00", "boomrat#00", "mega-scarab#00", "mini-scarab#00", "superbacteria#00", "space chicken#00", "interstellar squirel#00", "planet eater#00"],
    /*Midevil*/ ["oxen#00", "horse#00", "dog#00", "dragon#00", "giant#00", "troll#00", "hart#00", "Boar#00", "wolf#05", "pig#00", "cow#00", "rat#00", "squirrel#00", "chipmunk", "alerion", "badger#00", "bat#00", "bear#00", "beaver#00", "coot#00", "crocodile#00", "crow#00", "duck#00", "falcon#00", "fox#02", "goat#00", "hare#00", "direwolf#05"],
    /*Fantasy*/ ["velociraptor#00", "unicorn#00", "beefulo", "slurper#00", "hellhound#00", "manticore#00", "roshling#00", "jackalope#00", "pegasus#01", "dragon#00", "dagon#00", "deep one#00", "nightstalker#00", "vampire bat#00", "wisp#00", "wailing soul#00", "wisperer#00", "shadow fiend#00", "light fiend#00", "demon#00", "devourer of souls", "souldstealer#00", "dementor#00", "dark wisp#00", "shadow#00", "follower#00", "azi#00", "derpy bird#00"],
    /*Contemporary*/ ["dog#00", "sheep", "fish", "cow#00", "turtle#00", "bat#00", "snake#00", "cat#00", "lion#00", "cassowary#00", "platapus#01", "cheetah#00", "tiger#00", "rabbit#00", "bird#00", "spider#00", "alagator#00", "crocodile#00", "crab#00", "pigeon#00", "eagle#00", "ant#00", "gopher#00", "squirel#00", "whale#00", "dolphin#00", "mouse#07", "rat#00"]];
    //List of small things
    SmallThings = [
    /*Pirate*/ ["mast#00", "barrel#00", "ancor#00", "wheel#00", "sail#00", "treasure map#00", "rope#00", "deck#00", "treasure chest#00"],
    /*Space*/ ["porthole#00", "hydrogen booster#00", "air tank#00", "terraform machine#00", "Nitrate Propulser#00"],
    /*Midevil*/ ["shrub#00", "wardrobe#00", "cross#00", "sword#00", "bow#00", "throne#00", "knife#00", "shield#00", "cattle prod#00"],
    /*Fantasy*/ ["sligifi#00", "compass#02", "redstone repeater#00", "#broomstick", "slippers#00", "pumkin#00", "wand#00"],
    /*Contemporary*/ ["piano#00", "chair#00", "table#00", "fish tank#00", "computer#00", "cabinet#00", "bush#02", "time bomb#00", "door#00", "keyboard#00", "bookshelf#05", "floormat#00", "lamp#00", "desk#00", "shelf#05", "dresser#00"]];
    //List of big things
    BigThings = [
    /*Pirate*/ ["ship#00", "port#00", "isle#00", "cliff#00", "iceberg#00", "submarine#00"],
    /*Space*/ ["solar generator#00", "geothermal generator#00", "rocket#00", "space station#00", "space shuttle#00", "orbital mind controll laser#00"],
    /*Midevil*/ ["temple#00", "castle#00", "theater#00", "courtroom#00", "throne room#00", "house#00", "stable#00"],
    /*Fantasy*/ ["pyramid#00", "fallen star#00", "resurection machine#00", "ziggurat#00"],
    /*Contemporary*/ ["cliff#00", "house#00", "tree#00", "mountain#00", "cabin#00", "zoo#00", "plane#00", "skyscraper#00", "factory#03", "powerplant#00", "car#00", "tank#00", "hyper aquiatic super excaimatory submarine#00", "stadium#00"]];
    //List of terrain
    Terrain = [
    /*Pirate*/ ["ocean#00", "sea#00", "bay#00", "cove#00", "kelp forest#00", "island#00", "coast#00", "ice float"],
    /*Space*/ ["spiral galaxy#00", "elliptical galaxy#00", "irregular galaxy#00", "solar system#00", "terrascape#00", "asteriod belt#00", "t-0 planet", "t-1 planet", "t-2 planet", "t-3 planet"],
    /*Midevil*/ ["city#03", "forest#00", "plains", "town#00", "castle#00", "sea#00", "battlefield#00", "village#00", "cave#00"],
    /*Fantasy*/ ["swamp#00", "jungle#00", "desert#00", "tundra#00", "wasteland#00", "mellonland#00", "mushterra#00", "pumkinland#00", "dark forest#00", "edgeland#00", "twilight forest#00"],
    /*Contemporary*/ ["city#03", "country#03", "desert#00", "tundra#00", "jungle#00", "swamp#00", "ocean#00", "plains", "dump#00", "irradiated scape#00"]];
    //List of Food
    Food = [
    /*Pirate*/ ["grub", "glug", "pirate booty#00", "rum", "lemons", "mush", "limes", "fish", "pickeled " + GetAnimal],
    /*Space*/ ["dehydrated water", "dehydrated ice cream", "dehydrated fish", "dehydrated " + GetAnimal()],
    /*Midevil*/ ["maize", "bread", "beer", "oyster", GetAnimal(), "potatos", "honeyed ham"],
    /*Fantasy*/ ["ambrosia", "monster meat", "lembas bread", "invisable " + GetAnimal(), GetAnimal() + " steak"],
    /*Contemporary*/ ["cookies", "ice cream", "pizza", "sushi", "babies", "fish fillet", GetAnimal() + " steak", "burrritos"]];
    //List of Jobs
    Jobs = [
    /*Pirate*/ [RemovePlurals(GetSmallThing()) + " swabber", RemovePlurals(GetTerrain()) + " explorer", RemovePlurals(GetAnimal()) + " catcher", "arrrer", "pirateer", "cook", GetAnimal() + " killer", "captain", ""],
    /*Space*/ ["geothermal surveyer#00", "asteroid miner#00", "hacker#00", "rocket surgeon#00", GetPlace() + " telecomunicator", GetPlace() + " entrepreneur#00", RemovePlurals(GetAnimal()) + "ilizer repairman#04", "solar determiner#00", "deep space acrobatics specialist#00", "grox exterminator#00", "terraformer#00", "ship technician#00", GetPlace() + " diplomat#00"],
    /*Midevil*/ ["fisherman#04", "exorcist#00", "assasin#00", "mercenary#03", "bloodletter#00", RemovePlurals(GetAnimal()) + " dismemberment specialist#00", GetAnimal() + " herder", "thief#05"],
    /*Fantasy*/ ["miner#00", "keeper#00 of dreams", "polymorph specialist#00", "paradox reverser#00", "purification specialist#00", "thought policeman#00", "hunter#00 in the night"],
    /*Contemporary*/ ["mailman#04", "con artist#00", "teacher#00", "journalist#00", "border gaurd#00", "detective#00", "sniper#00", RemovePlurals(GetAnimal()) + " surgeon#00", "doctor#00", "programmer#00", RemovePlurals(GetBigThing()) + " inventor#00", GetFood() + " cheif#00", RemovePlurals(GetSmallThing()) + " repairman#04", RemovePlurals(GetTerrain()) + " rescue expert", RemovePlurals(GetAnimal()) + " exterminator#00", RemovePlurals(GetTerrain()) + " preserve manager#00"]];
    //List of Actions
    Actions = [
    /*Pirate*/ [GetSmallThing() + " swabbing", GetFood() + " devouring", "sea shanty singing", "fishing", "stearing", "pirating", "downloading files"],
    /*Space*/ ["Asteroid dodging", "lazzergun modifying", GetSmallThing() + " fabricating", GetAnimal() + " terminating", "Alien observing"],
    /*Midevil*/ ["throwing knives", "hunting " + GetAnimal(), "fighting " + GetAnimal(), "stoneing innocnets"],
    /*Fantasy*/ ["destroying " + GetAnimal(), GetAnimal() + " counjioring", GetPlace() + " wizardry", "magiking", "vampire hunting", "vampire defending", "wearwolf studying"],
    /*Contemporary*/ [GetAnimal() + " catching", "knitting", "preforming at the circus", "dancing ballet", "playing videogames", "reading fantasy books", "keeping a journal", "cooking " + GetFood(), "tie-dying socks", "sewing wedding dresses", "playing cookie clicker"]];
    //List of Achievements
    Achievements = [
    /*Pirate*/ ["was lost at sea for " + FloorRan(100, 1) + " days before " + pronoun[0] + " took refuge in a " + GetTerrain(), "sailed the seven seas", "fought a giand sea " + GetAnimal(), "spent 7 days without fresh water", "learned to swim", "repaired a sinking ship", "captured the Admiral's Ship", "discovered the flying ship", "built a ship in " + FloorRan(100, 0) + " days"],
    /*Space*/ ["traveled from " + GetPlace() + " to " + GetPlace(), "was stranded on a " + GetBigThing() + " near " + GetPlace() + " for " + FloorRan(10, 1) + " days", "lead a smuggling buisnuss", "discovered the rare " + GetAnimal(), "Lost a spaceship in a game of poker to a " + GetJob()],
    /*Midevil*/ ["masscred millions", "fought three angrey " + p(GetAnimal()), "saw the light", "killed a " + GetJob(), "was stabbed by a" + GetJob()],
    /*Fantasy*/ ["got lost in time and space", "founded a Quidditch leage", "died and was ressurected by the resurection machine", "declaired freedom from life and death"],
    /*Contemporary*/ ["visited " + GetPlace(), "swam across the Bearing Straight", "attempted genocide", "threw one to many games", "won, recieved, obtained, the national, nationwide, country's rule of three award, prize, marit", "invented the hyper aquatic super exclaimatory submarine", "led a drug cartel", "correctly guessed a Math.random() to 13 digits", "saved an innocent " + GetAnimal() + " from death", "became a millionare", "survived " + FloorRan(10, 1) + " days in the " + GetTerrain(), "discovered " + pronoun[1] + " interest in " + GetAction()]];
    //clear Variables
    usedPlaces = [];
    usedIntros = [];
    usedJobs = [];
    usedAchievements = [];
    usedAnimals = [];
    usedSmallThings = [];
    usedBigThings = [];
    usedTerrain = [];
    usedActions = [];
    usedFood = [];
    jobNum = 0;
    homeNum = 0;
    //Create Backstory Plan
    var backStoryPlan = [0];
    var backStoryLength = FloorRan(age / 20, Math.floor(age / 20) + 1);
    for (i = 0; i < backStoryLength; i++) {
        //backStoryPlan.push(FloorRan(0, 4));
        backStoryPlan.push(FloorRan(7, 1));
    }
    //Create Backstory here
    for (i = 0; i < backStoryPlan.length; i++) {
        //set Intro
        acceptableIntro = false;
        switch (backStoryPlan[i]) {
            case 0:
                //where person was born
                console.log("Birth");
                birthPlace = GetPlace();
                birthMonth = GetMonth();
                birthDay = FloorRan(29, 1);
                birthYear = 3000 - age;
                backstory = backstory + name + " was born in " + birthPlace + " on " + birthMonth + " " + birthDay + ", " + birthYear + ". ";
                curYear = birthYear;
                atHome = true;
                AdvanceAge();
                break;
            case 1:
                //person took a job
                console.log("Job");
                jobNum++;
                job = GetJob();
                intro = GetIntro();
                backstory = backstory + intro + " became a " + job + ".  ";
                AdvanceAge();
                break;
            case 2:
                //person moved or returned home
                homeNum++;
                if (atHome === false && FloorRan(5, 0) > 3) {
                    console.log("returnHome");
                    home = birthPlace;
                    intro = GetIntro();
                    backstory = backstory + intro + " returned to " + pronoun[1] + " childhood home " + home + ". ";
                    atHome = true;
                } else {
                    console.log("Move");
                    home = GetPlace();
                    intro = GetIntro();
                    backstory = backstory + intro + " moved to " + home + ". ";
                    atHome = false;
                }
                AdvanceAge();
                break;
            case 3:
                //person did something special
                console.log("Achievement");
                achieveNum++;
                achieve = GetAchievement();
                intro = GetIntro();
                backstory = backstory + intro + " " + achieve + ". ";
                AdvanceAge();
                break;
            case 4:
                //person adopted a pet
                console.log("Pet");
                petNum++;
                pet = GetAnimal();
                intro = GetIntro();
                backstory = backstory + intro + " adopted a " + pet + ". ";
                AdvanceAge();
                break;
            case 5:
                //person was attacked by an animal
                console.log("Attack");
                attackNum++;
                animal = GetAnimal();
                intro = GetIntro();
                backstory = backstory + intro + " was attacked by a vicious " + animal + ". ";
                AdvanceAge();
                break;
            case 6:
                //person became freinds
                console.log("Friendship");
                friendNum++;
                friend = GetJob();
                intro = GetIntro();
                backstory = backstory + intro + " became friends with a mysterious " + friend + ". ";
                AdvanceAge();
                break;
            case 7:
                //person got lost
                console.log("Lost");
                terrainNum++;
                lost = GetTerrain();
                intro = GetIntro();
                backstory = backstory + intro + " got lost for " + FloorRan(15, 3) + " months while visiting the " + lost + ". ";
                AdvanceAge();
                break;
        }
    }
    //clear thingsToLike
    thingsToLike = [];
    //add all used features to thingsToLike
    for (i = 0; i < usedPlaces.length; i++) thingsToLike.push(Places[Theme][usedPlaces[i]]);
    for (i = 0; i < usedJobs.length; i++) thingsToLike.push(p(Jobs[Theme][usedJobs[i]]));
    for (i = 0; i < usedAnimals.length; i++) thingsToLike.push(p(Animals[Theme][usedAnimals[i]]));
    for (i = 0; i < usedAchievements.length; i++) thingsToLike.push(Achievements[Theme][usedAchievements[i]]);
    for (i = 0; i < usedSmallThings.length; i++) thingsToLike.push(p(SmallThings[Theme][usedSmallThings[i]]));
    for (i = 0; i < usedBigThings.length; i++) thingsToLike.push(p(BigThings[Theme][usedBigThings[i]]));
    for (i = 0; i < usedTerrain.length; i++) thingsToLike.push(p(Terrain[Theme][usedTerrain[i]]));
    for (i = 0; i < usedFood.length; i++) thingsToLike.push(Food[usedFood[Theme][i]]);
    for (i = 0; i < usedActions.length; i++) thingsToLike.push(Actions[usedActions[Theme][i]]);
    console.log(thingsToLike);
    backstory = backstory + "<br><br>Likes: ";
    //generate likes and dislikes
    var likesLength = FloorRan(thingsToLike.length / 3, 1);
    var dislikesLength = FloorRan(thingsToLike.length / 3, 1);
    for (i = 0; i < likesLength; i++) {
        likedThing = GetLikedThing();
        backstory = backstory + likedThing + ", ";
    }
    backstory = backstory.slice(0, backstory.length - 2) + ".";
    backstory = backstory + "<br><br>Dislikes: ";
    for (i = 0; i < dislikesLength; i++) {
        likedThing = GetLikedThing();
        backstory = backstory + likedThing + ", ";
    }
    backstory = backstory.slice(0, backstory.length - 2) + ".";
    //stats
    //choose strong/weak stats.
    switch (FloorRan(5, 0)) {
        case 0:
            strongStat = "speed";
            break;
        case 1:
            strongStat = "strength";
            break;
        case 2:
            strongStat = "intelegence";
            break;
        case 3:
            strongStat = "dexterity";
            break;
        case 4:
            strongStat = "charisma";
            break;
    }
    do {
        switch (FloorRan(5, 0)) {
            case 0:
                weakStat = "speed";
                break;
            case 1:
                weakStat = "strength";
                break;
            case 2:
                weakStat = "intelegence";
                break;
            case 3:
                weakStat = "dexterity";
                break;
            case 4:
                weakStat = "charisma";
                break;
        }
    } while (weakStat == strongStat);
    console.log("Weak: " + weakStat);
    console.log("Strong: " + strongStat);
    //speed
    if (strongStat == "speed") speed = FloorRan(50, 50);
    else if (weakStat == "speed") speed = FloorRan(50, 0);
    else speed = FloorRan(50, 25);
    backstory = backstory + "<br><br>Speed: " + speed;
    //strength
    if (strongStat == "strength") strength = FloorRan(50, 50);
    else if (weakStat == "strength") strength = FloorRan(50, 0);
    else strength = FloorRan(50, 25);
    backstory = backstory + "<br>Strength: " + strength;
    //intelegence
    if (strongStat == "intelegence") intelegence = FloorRan(50, 50);
    else if (weakStat == "intelegence") intelegence = FloorRan(50, 0);
    else intelegence = FloorRan(50, 25);
    backstory = backstory + "<br>Intelegence: " + intelegence;
    //dexterity
    if (strongStat == "dexterity") dexterity = FloorRan(50, 50);
    else if (weakStat == "dexterity") dexterity = FloorRan(50, 0);
    else dexterity = FloorRan(50, 25);
    backstory = backstory + "<br>Dexterity: " + dexterity;
    //charisma
    if (strongStat == "charisma") charisma = FloorRan(50, 50);
    else if (weakStat == "charisma") charisma = FloorRan(50, 0);
    else charisma = FloorRan(50, 25);
    backstory = backstory + "<br>Charisma: " + charisma;
    //experiance
    //combat
    combat = [1, FloorRan(1000, 0)];
    while (combat[1] >= 100) {
        combat[0]++;
        combat[1] -= 100;
    }
    backstory = backstory + "<br>Combat: " + combat[0] + " " + combat[1] + "/100";
    //exploration
    exploration = [1, FloorRan(1000, 0)];
    while (exploration[1] >= 100) {
        exploration[0]++;
        exploration[1] -= 100;
    }
    backstory = backstory + "<br>Exploration: " + exploration[0] + " " + exploration[1] + "/100";
    //hunting
    hunting = [1, FloorRan(1000, 0)];
    while (hunting[1] >= 100) {
        hunting[0]++;
        hunting[1] -= 100;
    }
    backstory = backstory + "<br>Hunting: " + hunting[0] + " " + hunting[1] + "/100";
    //scavenging
    scavenging = [1, FloorRan(1000, 0)];
    while (scavenging[1] >= 100) {
        scavenging[0]++;
        scavenging[1] -= 100;
    }
    backstory = backstory + "<br>Scavenging: " + scavenging[0] + " " + scavenging[1] + "/100";
    //social
    social = [1, FloorRan(1000, 0)];
    while (social[1] >= 100) {
        social[0]++;
        social[1] -= 100;
    }
    backstory = backstory + "<br>Social: " + social[0] + " " + social[1] + "/100";
    //medicine
    medicine = [1, FloorRan(1000, 0)];
    while (medicine[1] >= 100) {
        medicine[0]++;
        medicine[1] -= 100;
    }
    backstory = backstory + "<br>Medicine: " + medicine[0] + " " + medicine[1] + "/100";
    //stealth
    stealth = [1, FloorRan(1000, 0)];
    while (stealth[1] >= 100) {
        stealth[0]++;
        stealth[1] -= 100;
    }
    backstory = backstory + "<br>Stealth: " + stealth[0] + " " + stealth[1] + "/100";
    //shooting
    shooting = [1, FloorRan(1000, 0)];
    while (shooting[1] >= 100) {
        shooting[0]++;
        shooting[1] -= 100;
    }
    backstory = backstory + "<br>Shooting: " + shooting[0] + " " + shooting[1] + "/100";
    //write backstory on page
    backstory = RemovePlurals(backstory);
    console.log(backstory);
    output2.innerHTML = backstory;
}

//FloorRan function, saving valuable space
function FloorRan(num, base) {
    return Math.floor(random() * num) + base;
}

function CheckUsed(valueIndex, Array, usedArray) {
    for (i = 0; i < usedArray.length; i++) {
        if (usedArray[i] == valueIndex) {
            return false;
        }
    }
    return true;
}
//Fucntions to retrieve Information

function GetIntro() {
    var value;
    var valueIndex;
    var unused = false;
    do {
        valueIndex = FloorRan(Intros.length, 0);
        value = Intros[valueIndex];
        unused = CheckUsed(valueIndex, Intros, usedIntros);
    } while (unused === false);
    usedIntros.push(valueIndex);
    return value;
}

function GetPlace() {
    var value;
    var valueIndex;
    var unused = false;
    do {
        valueIndex = FloorRan(Places[Theme].length, 0);
        value = Places[Theme][valueIndex];
        unused = CheckUsed(valueIndex, Places, usedPlaces);
    } while (unused === false);
    usedPlaces.push(valueIndex);
    return value;
}

function GetMonth() {
    var value;
    var unused = false;
    value = Months[FloorRan(Months.length, 0)];
    return value;
}

function AdvanceAge() {
    curYear = curYear + 1 + FloorRan(age / 5, Math.floor(age / 10));

}

function GetJob() {
    var value;
    var valueIndex;
    var unused = false;
    do {
        valueIndex = FloorRan(Jobs[Theme].length, 0);
        value = Jobs[Theme][valueIndex];
        unused = CheckUsed(valueIndex, Jobs, usedJobs);
    } while (unused === false);
    usedJobs.push(valueIndex);
    return value;
}

function GetAchievement() {
    var value;
    var valueIndex;
    var unused = false;
    do {
        valueIndex = FloorRan(Achievements[Theme].length, 0);
        value = Achievements[Theme][valueIndex];
        unused = CheckUsed(valueIndex, Achievements, usedAchievements);
    } while (unused === false);
    usedAchievements.push(valueIndex);
    return value;
}

function GetAnimal() {
    var value;
    var valueIndex;
    var unused = false;
    do {
        valueIndex = FloorRan(Animals[Theme].length, 0);
        value = Animals[Theme][valueIndex];
        unused = CheckUsed(valueIndex, Animals, usedAnimals);
    } while (unused === false);
    usedAnimals.push(valueIndex);
    return value;
}

function GetSmallThing() {
    var value;
    var valueIndex;
    var unused = false;
    do {
        valueIndex = FloorRan(SmallThings[Theme].length, 0);
        value = SmallThings[Theme][valueIndex];
        unused = CheckUsed(valueIndex, SmallThings, usedSmallThings);
    } while (unused === false);
    usedSmallThings.push(valueIndex);
    return value;
}

function GetBigThing() {
    var value;
    var valueIndex;
    var unused = false;
    do {
        valueIndex = FloorRan(BigThings[Theme].length, 0);
        value = BigThings[Theme][valueIndex];
        unused = CheckUsed(valueIndex, BigThings, usedBigThings);
    } while (unused === false);
    usedBigThings.push(valueIndex);
    return value;
}

function GetTerrain() {
    var value;
    var valueIndex;
    var unused = false;
    do {
        valueIndex = FloorRan(Terrain[Theme].length, 0);
        value = Terrain[Theme][valueIndex];
        unused = CheckUsed(valueIndex, Terrain, usedTerrain);
    } while (unused === false);
    usedTerrain.push(valueIndex);
    return value;

}

function GetAction() {
    var value;
    var valueIndex;
    var unused = false;
    do {
        valueIndex = FloorRan(Actions[Theme].length, 0);
        value = Actions[Theme][valueIndex];
        unused = CheckUsed(valueIndex, Actions, usedActions);
    }
    while (unused === false);
    usedActions.push(valueIndex);
    return value;
}

function GetFood() {
    var value;
    var valueIndex;
    var unused = false;
    do {
        valueIndex = FloorRan(Food[Theme].length, 0);
        value = Food[Theme][valueIndex];
        unused = CheckUsed(valueIndex, Food, usedFood);
    }
    while (unused === false);
    usedFood.push(valueIndex);
    return value;
}

function GetLikedThing() {
    var value;
    var position = FloorRan(thingsToLike.length, 0);
    value = thingsToLike[position];
    thingsToLike.splice(position, 1);
    return value;
}
//function to make a thing plural
function p(string) {
    var value = string;
    var beginHere;
    var endHere;
    var finalEnd;
    while (value.indexOf("#00") != -1) {
        beginHere = value.indexOf("#00");
        endHere = value.indexOf("#00") + 3;
        finalEnd = value.length;
        value = value.slice(0, beginHere) + "s" + value.slice(endHere, finalEnd);
    }
    while (value.indexOf("#01") != -1) {
        beginHere = value.indexOf("#01") - 2;
        endHere = value.indexOf("#01") + 3;
        finalEnd = value.length;
        value = value.slice(0, beginHere) + "i" + value.slice(endHere, finalEnd);
    }
    while (value.indexOf("#02") != -1) {
        beginHere = value.indexOf("#02");
        endHere = value.indexOf("#02") + 3;
        finalEnd = value.length;
        value = value.slice(0, beginHere) + "es" + value.slice(endHere, finalEnd);
    }
    while (value.indexOf("#03") != -1) {
        beginHere = value.indexOf("#03") - 1;
        endHere = value.indexOf("#03") + 3;
        finalEnd = value.length;
        value = value.slice(0, beginHere) + "ies" + value.slice(endHere, finalEnd);
    }
    while (value.indexOf("#04") != -1) {
        beginHere = value.indexOf("#04") - 2;
        endHere = value.indexOf("#04") + 3;
        finalEnd = value.length;
        value = value.slice(0, beginHere) + "en" + value.slice(endHere, finalEnd);
    }
    while (value.indexOf("#05") != -1) {
        beginHere = value.indexOf("#05") - 1;
        endHere = value.indexOf("#05") + 3;
        finalEnd = value.length;
        value = value.slice(0, beginHere) + "ves" + value.slice(endHere, finalEnd);
    }
    while (value.indexOf("#06") != -1) {
        beginHere = value.indexOf("#06");
        endHere = value.indexOf("#06") + 3;
        finalEnd = value.length;
        value = value.slice(0, beginHere) + "ren" + value.slice(endHere, finalEnd);
    }
    while (value.indexOf("#07") != -1) {
        beginHere = value.indexOf("#07") - 4;
        endHere = value.indexOf("#07") + 3;
        finalEnd = value.length;
        value = value.slice(0, beginHere) + "ice" + value.slice(endHere, finalEnd);
    }
    return value;
}
//function to remove unused plural codes from a string

function RemovePlurals(string) {
    var value = string;
    var beginHere;
    var endHere;
    var finalEnd;
    while (value.indexOf("#00") != -1) {
        beginHere = value.indexOf("#00");
        endHere = value.indexOf("#00") + 3;
        finalEnd = value.length;
        value = value.slice(0, beginHere) + value.slice(endHere, finalEnd);
    }
    while (value.indexOf("#01") != -1) {
        beginHere = value.indexOf("#01");
        endHere = value.indexOf("#01") + 3;
        finalEnd = value.length;
        value = value.slice(0, beginHere) + value.slice(endHere, finalEnd);
    }
    while (value.indexOf("#02") != -1) {
        beginHere = value.indexOf("#02");
        endHere = value.indexOf("#02") + 3;
        finalEnd = value.length;
        value = value.slice(0, beginHere) + value.slice(endHere, finalEnd);
    }
    while (value.indexOf("#03") != -1) {
        beginHere = value.indexOf("#03");
        endHere = value.indexOf("#03") + 3;
        finalEnd = value.length;
        value = value.slice(0, beginHere) + value.slice(endHere, finalEnd);
    }
    while (value.indexOf("#04") != -1) {
        beginHere = value.indexOf("#04");
        endHere = value.indexOf("#04") + 3;
        finalEnd = value.length;
        value = value.slice(0, beginHere) + value.slice(endHere, finalEnd);
    }
    while (value.indexOf("#05") != -1) {
        beginHere = value.indexOf("#05");
        endHere = value.indexOf("#05") + 3;
        finalEnd = value.length;
        value = value.slice(0, beginHere) + value.slice(endHere, finalEnd);
    }
    while (value.indexOf("#06") != -1) {
        beginHere = value.indexOf("#06");
        endHere = value.indexOf("#06") + 3;
        finalEnd = value.length;
        value = value.slice(0, beginHere) + value.slice(endHere, finalEnd);
    }
    while (value.indexOf("#07") != -1) {
        beginHere = value.indexOf("#07");
        endHere = value.indexOf("#07") + 3;
        finalEnd = value.length;
        value = value.slice(0, beginHere) + value.slice(endHere, finalEnd);
    }
    return value;
}
//save a person
function save() {
    var names = getCookie("savedPeople").split(",");
    console.log(names);
    if (atLoad === false && names.indexOf(name) == -1) {
        if (names.length <= 30) {
            save.innerHTML = "Saved";
            console.log("save");
            console.log(name);
            setCookie(" " + name, name, 365);
            setCookie(name + "Seed", originalseed, 365);
            setCookie("savedPeople", getCookie("savedPeople") + name + ",", 365);
        } else alert("Maximum of 30 saves reached.");
    }
}
//load loading screen
function load() {
    console.log(document.cookie);
    save.innerHTML = "Save";
    atLoad = true;
    var names = getCookie("savedPeople").split(",");
    console.log(names);
    var buttons = "";
    var curName;
    console.log("load");
    for (i = 0; i < names.length - 1; i++) {
        curName = names[i];
        console.log(curName);
        buttons += "<button class=loadButton onclick=loadPerson('" + curName + "')>" + curName + "</button>";


    }
    buttons += "<button class=loadButton onclick=loadPersonSeed()>Load from seed</button> Remember: saved people will be different in different themes.";
    backstory = buttons;
    output.innerHTML = "Load a Save";
    output2.innerHTML = backstory;
}
//load a person
function loadPerson(person) {
    name = getCookie(person);
    console.log(person);
    var savedSeed = getCookie(person + "Seed");
    randName(savedSeed, true);
    atLoad = false;
}

function loadPersonSeed() {
    var value = prompt("input a seed");
    if (value === null || isNaN(value) || value < 1) return 0;
    randName(value);
}

//function to set a Cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
//function to retrieve a Cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}
//load clear screen
function clear() {
    save.innerHTML = "Save";
    atLoad = true;
    var names = getCookie("savedPeople").split(",");
    console.log(names);
    var buttons = "";
    var curName;
    console.log("load");
    for (i = 0; i < names.length - 1; i++) {
        curName = names[i];
        console.log(curName);
        buttons += "<button class=loadButton onclick=clearPerson('" + curName + "')>" + curName + "</button>";


    }
    buttons += "<button class=loadButton onclick=clearAll()>Clear all</button>";
    backstory = buttons;
    output.innerHTML = "Delete a Save";
    output2.innerHTML = backstory;
}
//clear a person
function clearPerson(person) {
    if (!confirm("Delete " + person + "? They don't want to die!")) return 0;
    console.log(person);
    var names = getCookie("savedPeople").split(",");
    console.log(names);
    var newNames = "";
    for (i = 0; i < names.length - 1; i++) {
        if (names[i] != person) {
            newNames = newNames + names[i] + ",";
        }
    }
    document.cookie = "savedPeople=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setCookie("savedPeople", newNames, 365);
    document.cookie = person + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = person + "Seed" + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    console.log(getCookie("savedPeople"));
    clear();
}
//clear all people
function clearAll() {
    clear();
    if (!confirm("Delete ALL saved people? They don't want to die!")) return 0;
    var cookies = document.cookie.split(";");
    console.log(cookies);
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    clear();
}
//open theme screen
function theme() {
    save.innerHTML = "Save";
    atLoad = true;
    var buttons = "";
    var curTheme;
    console.log("theme");
    for (i = 0; i < Themes.length; i++) {
        curTheme = Themes[i];
        console.log(curTheme);
        buttons += "<button class=loadButton onclick=setTheme(" + i + ")>" + curTheme + "</button>";


    }
    backstory = buttons;
    output.innerHTML = "Chose a Theme";
    output2.innerHTML = backstory;
}
//open share screen
function share() {
    if (atLoad === false) {
        save.innerHTML = "Save";
        atLoad = true;
        console.log(originalseed);
        output.innerHTML = "Share";
        output2.innerHTML = "Use this seed to regenerate this person from the load a seed option in the load tab: " + originalseed;
    }
}
//create a seed to share
function createSeed() {

}

function setTheme(newTheme) {
    Theme = newTheme;
    randName();
}

function generateSeed() {
    var value = "";
    for (x = Math.floor(Math.random() * 29); x < 30; x++) {
        value += Math.floor(Math.random() * 9);
    }
    return value + 1;
}

function random() {
    var value = Math.sin(seed) * 10000;
    seed *= 1.1;
    value -= Math.floor(value);
    return value;

}

//call randName to generate a person when page loads
randName();