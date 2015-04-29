document.onkeydown = checkKey;
document.getElementById("explore").addEventListener("click", explore);
document.getElementById("enter").addEventListener("click", enter);
document.getElementById("rest").addEventListener("click", rest);


var height = 15;
var width = 15;
var X = Math.floor(width / 2);
var Y = Math.floor(height / 2);
var curPos = Y * width + X;
var map = [];
var moves;
var zone;
var Entities = [];
var chosenMove;
var enemies = [];
var inGui = false;
var gui = "";
var biomes = [
    ["desert", "yellow", 2.3, false],
    ["forest", "darkgreen", 0.6, false],
    ["plains", "lightgreen", 2.0, false],
    ["ocean", "blue", 5.0, true],
    ["mountain", "gray", 0.3, true],
    ["swamp", "green", 0.3, false],
    ["waste", "lightgray", 1.6, false],
    ["meadow", "#00FF00", 0.1, false]
];
var tiles = [
    ["dirt", "#996633", false],
    ["sand", "yellow", false],
    ["grass", "lightgreen", false],
    ["water", "blue", true],
    ["waterfresh", "lightblue", true],
    ["bolder", "gray", true],
    ["tree", "darkgreen", true],
    ["rock", "lightgray", false],
    ["cactus", "#99FF66", true],
    ["house", "#FF9900", false],
    ["road", "#999966", false],
    ["bush", "#33CC33", false],
    ["mud", "#1E0800", false],
    ["reed", "#669900", false]
];
var houseTiles = [
    ["exit", "black", false],
    ["carpet,", "#CC0000", false],
    ["wood", "#CC3300", false],
    ["tile", "#FFFFCC", false],
    ["stone", "#666652", false],
    ["marble", "#E6FFFF", false],
    ["wall", "#FFCC66", true],
    ["door", "#FF9933", false],
    ["chair", "#99FF99", true],
    ["table", "#33CC33", true],
    ["counter", "#CC66FF", true],
    ["desk", "#0099FF", true], ];
var weapons = [
/*Swords - Speed Pro:Cooldown Con: Damage*/
[ /*Name*/ "Sword", /*Type*/ "sword", /*Damage Mult*/ 1, /*Accuracy Mult*/ 1, /*Cooldown Mult*/ 1, /*Crit Mult*/ 1, /*Weight*/ 10],
    [ /*Name*/ "Dagger", /*Type*/ "sword", /*Damage Mult*/ 0.4, /*Accuracy Mult*/ 1.3, /*Cooldown Mult*/ 1.3, /*Crit Mult*/ 1.2, /*Weight*/ 4],
    [ /*Name*/ "Longsword", /*Type*/ "sword", /*Damage Mult*/ 1.2, /*Accuracy Mult*/ 0.8, /*Cooldown Mult*/ 0.7, /*Crit Mult*/ 0.7, /*Weight*/ 13],
    [ /*Name*/ "Heartfinder", /*Type*/ "sword", /*Damage Mult*/ 1.1, /*Accuracy Mult*/ 1.1, /*Cooldown Mult*/ 1.2, /*Crit Mult*/ 3, /*Weight*/ 12],
    /*Clubs - Strength Pro:Damage Con: Accuracy*/
    [ /*Name*/ "Club", /*Type*/ "club", /*Damage Mult*/ 1, /*Accuracy Mult*/ 1, /*Cooldown Mult*/ 1, /*Crit Mult*/ 1, /*Weight*/ 10],
    [ /*Name*/ "Fist", /*Type*/ "club", /*Damage Mult*/ 0.3, /*Accuracy Mult*/ 0.5, /*Cooldown Mult*/ 1.1, /*Crit Mult*/ 0.2, /*Weight*/ 2],
    /*Bows - Dexterity Pro:Crit Con:Cooldown*/
    [ /*Name*/ "Bow", /*Type*/ "bow", /*Damage Mult*/ 1, /*Accuracy Mult*/ 1, /*Cooldown Mult*/ 1, /*Crit Mult*/ 1, /*Weight*/ 10],
    /*Staffs - Intelegence Pro:Accuracy Con: Crit*/
    [ /*Name*/ "Staff", /*Type*/ "staff", /*Damage Mult*/ 1, /*Accuracy Mult*/ 1, /*Cooldown Mult*/ 1, /*Crit Mult*/ 1, /*Weight*/ 10]
];
var items = [
    [ /*Name*/ "Amulet of Antimagic", /*Type*/ "misc", /*Strength*/ 0, /*Speed*/ 0, /*Intelegence*/ 0, /*Dexterity*/ 0, /*Charisma*/ 5, /*Resistance*/ 10, /*Armor*/ 0, /*Special Effect*/ "none"],
    [ /*Name*/ "Armlet of Giant Strength", /*Type*/ "misc", /*Strength*/ 10, /*Speed*/ 0, /*Intelegence*/ 0, /*Dexterity*/ 0, /*Charisma*/ 0, /*Resistance*/ 0, /*Armor*/ 0, /*Special Effect*/ "none"],
    [ /*Name*/ "Feather of Swiftness", /*Type*/ "misc", /*Strength*/ 0, /*Speed*/ 10, /*Intelegence*/ 0, /*Dexterity*/ 0, /*Charisma*/ 0, /*Resistance*/ 0, /*Armor*/ 0, /*Special Effect*/ "none"],
    [ /*Name*/ "Gem of Mind", /*Type*/ "misc", /*Strength*/ 0, /*Speed*/ 0, /*Intelegence*/ 10, /*Dexterity*/ 0, /*Charisma*/ 0, /*Resistance*/ 0, /*Armor*/ 0, /*Special Effect*/ "none"],
    [ /*Name*/ "Sleave of the Spinner", /*Type*/ "misc", /*Strength*/ 0, /*Speed*/ 0, /*Intelegence*/ 0, /*Dexterity*/ 10, /*Charisma*/ 0, /*Resistance*/ 0, /*Armor*/ 0, /*Special Effect*/ "none"],
    [ /*Name*/ "Charm", /*Type*/ "misc", /*Strength*/ 0, /*Speed*/ 0, /*Intelegence*/ 0, /*Dexterity*/ 0, /*Charisma*/ 10, /*Resistance*/ 0, /*Armor*/ 0, /*Special Effect*/ "none"]
];
var biome;
var player = document.getElementById("player");

function mapGen() {
    for (i = 0; i < height * width; i++) {
        map[i] = ["ocean", "none", true, 0, "none"];
    }
    for (e = 0; e < 1 + (Math.random() * 20); e++) {
        biome = biomes[Math.floor(Math.random() * biomes.length)];
        bioGen(biome);
    }
    for (i = 0; i < Math.random() * (width * height) / 25; i++) {
        villageGen();
    }

    renderMap();
    console.log(map);
}
//BioGen
function bioGen(terrain) {
    var size = terrain[2];
    var curPos;
    var X = Math.floor(Math.random() * width);
    var Y = Math.floor(Math.random() * height);
    for (i = 0; i < (height * width * size) / 5; i++) {
        curPos = Y * width + X;
        moves = [];
        map[curPos][0] = terrain[0];
        map[curPos][2] = terrain[3];
        if (X != width - 1) moves.push(0);
        if (X !== 0) moves.push(1);
        if (Y != height - 1) moves.push(2);
        if (Y !== 0) moves.push(3);
        chosenMove = moves[Math.floor(Math.random() * moves.length)];
        switch (chosenMove) {
            case 0:
                X++;
                break;
            case 1:
                X--;
                break;
            case 2:
                Y++;
                break;
            case 3:
                Y--;
                break;

        }
    }
}

function villageGen() {
    var X = Math.floor(Math.random() * width);
    var Y = Math.floor(Math.random() * height);
    var curPos = Y * width + X;
    if (map[curPos][2] === false) map[curPos][4] = "village";
}

function renderMap(index, indexArea) {
    document.getElementById("level").innerHTML = "Level: " + player.level;
    document.getElementById("xp").innerHTML = "Xp: " + player.experiance;
    document.getElementById("health").innerHTML = "Health: " + player.health[1] + "/" + player.health[0];
    document.getElementById("mana").innerHTML = "Mana: " + player.mana[1] + "/" + player.mana[0];
    document.getElementById("stanima").innerHTML = "Stanima: " + player.stanima[1] + "/" + player.stanima[0];
    document.getElementById("armor").innerHTML = "Armor: " + player.armor;
    document.getElementById("resistance").innerHTML = "Resistance: " + player.resistance;
    document.getElementById("coolBar").style.width = (player.moveWait / player.moveWaitTime) * 100 + "%";
    var inventory;
    document.getElementById("inventory").innerHTML = "Inventory: <br>";
    document.getElementById("equip").innerHTML = "Equiped: " + player.equiped;
    document.getElementById("misc").innerHTML = "Misc: " + player.misc;
    var item;
    for (i = 0; i < player.inventory.length; i++) {
        document.getElementById("inventory").insertAdjacentHTML("beforeend", player.inventory[i][0] + " " + player.inventory[i][2] + "<br>");
        item = player.inventory[i][0];
        if (player.inventory[i][1] == "weapon") document.getElementById("inventory").insertAdjacentHTML("beforeend", "<div onclick=player.equip('" + item + "')>Equip</div>");
        if (player.inventory[i][1] == "item") document.getElementById("inventory").insertAdjacentHTML("beforeend", "<div onclick=player.equip('" + item + "')>Wear</div>");
    }
    var final = "";
    var color;
    var containsPlayer;
    var containsVillage;
    var containsEnemy;
    var text;
    if (!inGui) {
        if (zone == "world") {
            final += "<table>";
            final += "<tr>";
            for (i = 0; i < map.length; i++) {
                for (e = 0; e < biomes.length; e++) {
                    if (biomes[e][0] == map[i][0]) color = biomes[e][1];
                }
                if (map[i][1] == "player") containsPlayer = true;
                else containsPlayer = false;
                if (map[i][4] == "village") containsVillage = true;
                else containsVillage = false;
                if (containsPlayer) text = "☺";
                else if (containsVillage) text = "<div style='font-size:20px'>&#8962;</div>";
                else text = "";
                final += "<td onclick='tileClick(" + i + ")' class='tile' style='background-color:" + color + "' id='tile" + i + "'><center>" + text + "</center></td>";

                if ((i + 1) % width === 0) {
                    final += "</tr><tr>";
                }
            }
            final += "</tr>";
            final += "</table>";
            document.getElementById("map").innerHTML = final;
        } else if (zone == "area") {
            final += "<table>";
            final += "<tr>";
            for (i = 0; i < map[index][3].length; i++) {
                for (e = 0; e < tiles.length; e++) {
                    if (tiles[e][0] == map[index][3][i][0]) color = tiles[e][1];
                }
                if (map[index][3][i][1] == "player") containsPlayer = true;
                else containsPlayer = false;
                containsEnemy = false;
                for (o = 0; o < enemies.length; o++) if (map[index][3][i][1] == enemies[o].ID) containsEnemy = true;
                if (containsPlayer) text = "☺";
                else if (containsEnemy) text = "E";
                else text = "";
                final += "<td onclick='tileClick(" + i + ")' class='tile' style='background-color:" + color + "'><center>" + text + "</center></td>";
                if ((i + 1) % width === 0) {
                    final += "</tr><tr>";
                }
            }
            final += "</tr>";
            final += "</table>";
            document.getElementById("map").innerHTML = final;
        } else if (zone == "house") {
            final += "<table>";
            final += "<tr>";
            for (i = 0; i < map[index][3][indexArea][3].length; i++) {
                for (e = 0; e < houseTiles.length; e++) {
                    if (houseTiles[e][0] == map[index][3][indexArea][3][i][0]) color = houseTiles[e][1];
                }
                if (map[index][3][indexArea][3][i][1] == "player") containsPlayer = true;
                else containsPlayer = false;
                if (containsPlayer) text = "☺";
                else text = "";
                final += "<td onclick='tileClick(" + i + ")' class='tile' style='background-color:" + color + "'><center>" + text + "</center></td>";
                if ((i + 1) % width === 0) {
                    final += "</tr><tr>";
                }
            }
            final += "</tr>";
            final += "</table>";
            document.getElementById("map").innerHTML = final;
        }
    } else {
        document.getElementById("map").innerHTML = gui;
    }
}
//generate Area
function generateArea(biome) {
    console.log(biome);
    var value = [];
    switch (biome) {
        case "ocean":
            value = areaGenScripts.ocean();
            break;
        case "plains":
            value = areaGenScripts.plains();
            break;
        case "forest":
            value = areaGenScripts.forest();
            break;
        case "desert":
            value = areaGenScripts.desert();
            break;
        case "waste":
            value = areaGenScripts.waste();
            break;
        case "swamp":
            value = areaGenScripts.swamp();
            break;
        case "mountain":
            value = areaGenScripts.mountain();
            break;
        case "meadow":
            value = areaGenScripts.meadow();
            break;
    }
    //generate Coasts
    var coast = [false, false, false, false];
    if (player.pos[0] !== 0) if (map[(player.pos[0] - 1) + player.pos[1] * width][0] == "ocean") coast[0] = true;
    if (player.pos[1] !== 0) if (map[player.pos[0] + (player.pos[1] - 1) * width][0] == "ocean") coast[1] = true;
    if (player.pos[0] !== width - 1) if (map[(player.pos[0] + 1) + player.pos[1] * width][0] == "ocean") coast[2] = true;
    if (player.pos[1] !== height - 1) if (map[player.pos[0] + (player.pos[1] + 1) * width][0] == "ocean") coast[3] = true;
    console.log(coast);
    value = generateCoasts(coast, value);
    //generate lakes
    if (coast[0] === false && coast[1] === false && coast[2] === false && coast[3] === false) {
        for (y = 0; y < Math.random() * 4 - 1; y++) {
            console.log("lake");
            value = generateLake(value);
        }
    }
    //generate beaches
    value = generateBeaches(value, biome);
    //generate village
    if (map[player.pos[0] + player.pos[1] * width][4] == "village") value = generateVillage(value);
    console.log(value);
    return value;
}
var player = {
    pos: [0, 0],
    areaPos: [0, 0],
    housePos: [0, 0],
    moveWaitTime: 0,
    moveWait: 0,
    strength: 50 + Math.floor(Math.random() * 50),
    speed: 50 + Math.floor(Math.random() * 50),
    intelegence: 50 + Math.floor(Math.random() * 50),
    dexterity: 50 + Math.floor(Math.random() * 50),
    charisma: 50 + Math.floor(Math.random() * 50),
    health: [0, 0],
    mana: [0, 0],
    stanima: [0, 0],
    armor: 0,
    resistance: 0,
    //XP
    experiance: 0,
    //Level
    level: 1,
    //checkXp
    checkXP: function () {
        if (this.experiance >= this.level * 100) {
            this.experiance = 0;
            this.levelUp();
        }
    },
    //levelUp
    levelUp: function () {
        this.level++;
        this.strength++;
        this.speed++;
        this.intelegence++;
        this.dexterity++;
        this.charisma++;
        this.startHealth();
        this.startMana();
        this.startStanima();
    },
    //Equiped items
    equiped: "Fist",
    head: "none",
    body: "none",
    feet: "none",
    misc: "none",
    //Equip - function to equip new item;
    equip: function (item) {
        if (this.CheckCoolDown()) if (this.useStanima(5)) {
            for (e = 0; e < weapons.length; e++) {
                if (weapons[e][0] == item) this.equiped = item;
            }
            for (e = 0; e < items.length; e++) {
                if (items[e][0] == item){this.misc = item;}
            }
        }
        this.justMoved(10, 0, 0, 0, 1, 0);
    },
    //Attack
    attack: function (enemy) {
        var item;
        for (i = 0; i < weapons.length; i++) if (weapons[i][0] == this.equiped) item = weapons[i][6];
        if (this.CheckCoolDown()) if (this.useStanima(item * 3)) attack(this.equiped, player, enemies[enemy]);
    },
    //rest
    rest: function () {
        if (this.CheckCoolDown()) {
            this.stanimaHeal(this.speed * 2);
            this.justMoved(20, 0.2, 0.2, 0.2, 0.2, 0.2);
        }
    },
    //justMoved
    justMoved: function (base, strength, speed, intelegence, dexterity, charisma) {
        this.moveWaitTime = (base * 50) / (this.strength * strength + this.speed * speed + this.intelegence * intelegence + this.dexterity * dexterity + this.charisma * charisma);
        this.moveWait = this.moveWaitTime;
    },
    //tickDown
    tickDown: function () {
        this.moveWait--;
        if (this.moveWait < 0) this.moveWait = 0;
    },
    //checkCoolDown
    CheckCoolDown: function () {
        if (inGui) return false;
        if (this.moveWait === 0) return true;
        else return false;
    },
    //startHealth
    startHealth: function () {
        this.health = [this.strength * 10, this.strength * 10];
        console.log(this.health);
    },
    //startMana
    startMana: function () {
        this.mana = [this.intelegence * 10, this.intelegence * 10];
        console.log(this.mana);
    },
    //startStanima
    startStanima: function () {
        this.stanima = [this.speed * 10, this.speed * 10];
        console.log(this.stanima);
    },
    //startArmor
    startArmor: function () {
        this.armor = 0;
        console.log(this.armor);
    },
    //startResistance
    startResistance: function () {
        this.resistance = 0;
        console.log(this.resistance);
    },
    //updateArmor
    updateArmor: function () {
        var value = 0;
        this.armor = value;
    },
    //updateResistance
    updateResistance: function () {
        var value = 0;
        this.resistance = value;
    },
    //updateStrength
    //updateSpeed
    //updateIntelegence
    //updateDexterity
    //updateCharisma
    //damagePhysical
    damagePhysical: function (damage) {
        this.health[1] -= Math.floor(damage * ((100 - this.armor) / 100));
    },
    //damageMagical
    damageMagical: function (damage) {
        this.health[1] -= Math.floor(damage * (100 - this.resistance / 100));
        if (this.health[1] < 0) this.health = 0;
    },
    //damageOther
    damageOther: function (damage) {
        this.health[1] -= Math.floor(damage);
        if (this.health[1] < 0) this.health = 0;
    },
    //healthHeal
    healthHeal: function (heal) {
        this.health[1] += heal;
        if (this.health[1] > this.health[0]) this.health[1] = this.health[0];
    },
    //manaHeal
    manaHeal: function (heal) {
        this.mana[1] += heal;
        if (this.mana[1] > this.mana[0]) this.mana[1] = this.mana[0];
    },
    //stanimaHeal
    stanimaHeal: function (heal) {
        this.stanima[1] += heal;
        if (this.stanima[1] > this.stanima[0]) this.stanima[1] = this.stanima[0];
    },
    //useHealth
    useHealth: function (amount) {
        if (this.health[1] >= amount) {
            this.health[1] -= amount;
            return true;
        } else return false;
    },
    //useMana
    useMana: function (amount) {
        if (this.mana[1] >= amount) {
            this.mana[1] -= amount;
            return true;
        } else return false;
    },
    //useStanima
    useStanima: function (amount) {
        if (this.stanima[1] >= amount) {
            this.stanima[1] -= amount;
            return true;
        } else return false;
    },
    //useItem
    useItem: function (item) {
        var index = -1;
        for (i = 0; i < this.inventory.length; i++) if (this.inventory[i][0] == item[0]) index = i;
        if (index > -1 && this.inventory[index][2] >= item[2]) {
            this.inventory[index][2] -= item[2];
            if (this.inventory[index][2] === 0 && this.inventory[index][1] == "item") this.inventory.splice(index, 1);
            return true;
        } else return false;
    },
    //inventory format as such: [Name, Item/Weapon, Count]
    inventory: [],
    //take
    take: function (item) {
        var index = -1;
        for (i = 0; i < this.inventory.length; i++) if (this.inventory[i][0] == item[0]) index = i;
        if (index != -1) this.inventory[index][2] += item[2];
        else this.inventory.push(item);
    },
    startPos: function () {
        do {
            this.pos = [Math.floor(Math.random() * width), Math.floor(Math.random() * height)];
            console.log(this.pos);
        } while (map[this.pos[0] + this.pos[1] * width][2] === true);
        this.render();
    },
    startAreaPos: function () {
        console.log("start area");
        do {
            this.areaPos = [Math.floor(Math.random() * width), Math.floor(Math.random() * height)];
            this.render();
            console.log(this.areaPos);
        } while (map[this.pos[0] + this.pos[1] * width][3][this.areaPos[0] + this.areaPos[1] * width][2] === true);
    },
    startHousePos: function () {
        console.log("start house");
        do {
            this.housePos = [Math.floor(Math.random() * width), Math.floor(Math.random() * height)];
            this.render();
            console.log(this.housePos);
        } while (map[this.pos[0] + this.pos[1] * width][3][this.areaPos[0] + this.areaPos[1] * width][3][this.housePos[0] + this.housePos[1] * width][2] === true);
    },
    render: function () {
        console.log(this.pos);
        for (i = 0; i < map.length; i++) if (map[i][1] == "player") map[i][1] = "none";
        if (zone == "area") {
            for (i = 0; i < map[this.pos[0] + this.pos[1] * width][3].length; i++) if (map[this.pos[0] + this.pos[1] * width][3][i][1] == "player") map[this.pos[0] + this.pos[1] * width][3][i][1] = "none";
        } else if (zone == "house") for (i = 0; i < map[this.pos[0] + this.pos[1] * width][3][this.areaPos[0] + this.areaPos[1] * width][3].length; i++) if (map[this.pos[0] + this.pos[1] * width][3][this.areaPos[0] + this.areaPos[1] * width][3][i][1] == "player") map[this.pos[0] + this.pos[1] * width][3][this.areaPos[0] + this.areaPos[1] * width][3][i][1] = "none";
        map[this.pos[0] + this.pos[1] * width][1] = "player";
        if (zone == "area") map[this.pos[0] + this.pos[1] * width][3][this.areaPos[0] + this.areaPos[1] * width][1] = "player";
        else if (zone == "house") map[this.pos[0] + this.pos[1] * width][3][this.areaPos[0] + this.areaPos[1] * width][3][this.housePos[0] + this.housePos[1] * width][1] = "player";
        if (zone == "house") if (map[this.pos[0] + this.pos[1] * width][3][this.areaPos[0] + this.areaPos[1] * width][3][this.housePos[0] + this.housePos[1] * width][0] == "exit") {
            zone = "area";
            player.justMoved(25, 0, 0.5, 0, 0.5, 0);
            loadArea(this.pos, true);
        }
        //renderMap(this.pos[0] + this.pos[1] * width, this.areaPos[0] + this.areaPos[1] * width);
    },
    up: function () {
        if (this.CheckCoolDown()) {
            if (zone == "world") {
                if (this.pos[1] !== 0) if (map[this.pos[0] + (this.pos[1] - 1) * width][2] !== true && map[this.pos[0] + (this.pos[1] - 1) * width][1] == "none") if (this.useStanima(5)) {
                    this.pos[1]--;
                    this.justMoved(10, 0, 1, 0, 0, 0);

                }
            } else if (zone == "area") {
                if (this.areaPos[1] !== 0) {
                    if (map[this.pos[0] + this.pos[1] * width][3][this.areaPos[0] + (this.areaPos[1] - 1) * width][2] !== true) {
                        if (map[this.pos[0] + this.pos[1] * width][3][this.areaPos[0] + (this.areaPos[1] - 1) * width][1] == "none") {

                            if (this.useStanima(5)) {
                                this.areaPos[1]--;
                                this.justMoved(10, 0, 1, 0, 0, 0);
                            }
                        } else player.attack(attackEnemy(this.areaPos[0] + (this.areaPos[1] - 1) * width));
                    }
                }
            } else if (zone == "house") {
                if (this.housePos[1] !== 0) if (map[this.pos[0] + this.pos[1] * width][3][this.areaPos[0] + this.areaPos[1] * width][3][this.housePos[0] + (this.housePos[1] - 1) * width][2] !== true && map[this.pos[0] + this.pos[1] * width][3][this.areaPos[0] + this.areaPos[1] * width][3][this.housePos[0] + (this.housePos[1] - 1) * width][1] == "none") if (this.useStanima(5)) {
                    this.housePos[1]--;
                    this.justMoved(10, 0, 1, 0, 0, 0);

                }
            }
            this.render(this.pos[0] + this.pos[1] * width);
        }
    },
    down: function () {
        if (this.CheckCoolDown()) {
            if (zone == "world") {
                if (this.pos[1] != height - 1) if (map[this.pos[0] + (this.pos[1] + 1) * width][2] !== true && map[this.pos[0] + (this.pos[1] + 1) * width][1] == "none") if (this.useStanima(5)) {
                    this.pos[1]++;
                    this.justMoved(10, 0, 1, 0, 0, 0);

                }
            } else if (zone == "area") {
                if (this.areaPos[1] != height - 1) {
                    if (map[this.pos[0] + this.pos[1] * width][3][this.areaPos[0] + (this.areaPos[1] + 1) * width][2] !== true) {
                        if (map[this.pos[0] + this.pos[1] * width][3][this.areaPos[0] + (this.areaPos[1] + 1) * width][1] == "none") {
                            if (this.useStanima(5)) {
                                this.areaPos[1]++;
                                this.justMoved(10, 0, 1, 0, 0, 0);

                            }
                        } else player.attack(attackEnemy(this.areaPos[0] + (this.areaPos[1] + 1) * width));
                    }
                }
            } else if (zone == "house") {
                if (this.housePos[1] != height - 1) if (map[this.pos[0] + this.pos[1] * width][3][this.areaPos[0] + this.areaPos[1] * width][3][this.housePos[0] + (this.housePos[1] + 1) * width][2] !== true && map[this.pos[0] + this.pos[1] * width][3][this.areaPos[0] + this.areaPos[1] * width][3][this.housePos[0] + (this.housePos[1] + 1) * width][1] == "none") if (this.useStanima(5)) {
                    this.housePos[1]++;
                    this.justMoved(10, 0, 1, 0, 0, 0);

                }
            }
            this.render(this.pos[0] + this.pos[1] * width);
        }
    },
    right: function () {
        if (this.CheckCoolDown()) {
            if (zone == "world") {
                if (this.pos[0] != width - 1) if (map[(this.pos[0] + 1) + this.pos[1] * width][2] !== true && map[(this.pos[0] + 1) + this.pos[1] * width][1] == "none") if (this.useStanima(5)) {
                    this.pos[0]++;
                    this.justMoved(10, 0, 1, 0, 0, 0);

                }
            } else if (zone == "area") {
                if (this.areaPos[0] != width - 1) {

                    if (map[this.pos[0] + this.pos[1] * width][3][(this.areaPos[0] + 1) + this.areaPos[1] * width][2] !== true) {
                        if (map[this.pos[0] + this.pos[1] * width][3][(this.areaPos[0] + 1) + this.areaPos[1] * width][1] == "none") {
                            if (this.useStanima(5)) {
                                this.areaPos[0]++;
                                this.justMoved(10, 0, 1, 0, 0, 0);

                            }
                        } else player.attack(attackEnemy((this.areaPos[0] + 1) + this.areaPos[1] * width));
                    }
                }
            } else if (zone == "house") {
                if (this.housePos[0] != width - 1) if (map[this.pos[0] + this.pos[1] * width][3][this.areaPos[0] + this.areaPos[1] * width][3][(this.housePos[0] + 1) + this.housePos[1] * width][2] !== true && map[this.pos[0] + this.pos[1] * width][3][this.areaPos[0] + this.areaPos[1] * width][3][(this.housePos[0] + 1) + this.housePos[1] * width][1] == "none") if (this.useStanima(5)) {
                    this.housePos[0]++;
                    this.justMoved(10, 0, 1, 0, 0, 0);

                }
            }
            this.render(this.pos[0] + this.pos[1] * width);
        }
    },
    left: function () {
        if (this.CheckCoolDown()) {
            if (zone == "world") {
                if (this.pos[0] !== 0) if (map[(this.pos[0] - 1) + this.pos[1] * width][2] !== true && map[(this.pos[0] - 1) + this.pos[1] * width][1] == "none") if (this.useStanima(5)) {
                    this.pos[0]--;
                    this.justMoved(10, 0, 1, 0, 0, 0);

                }
            } else if (zone == "area") {
                if (this.areaPos[0] !== 0) {
                    if (map[this.pos[0] + this.pos[1] * width][3][(this.areaPos[0] - 1) + this.areaPos[1] * width][2] !== true) {
                        if (map[this.pos[0] + this.pos[1] * width][3][(this.areaPos[0] - 1) + this.areaPos[1] * width][1] == "none") {
                            if (this.useStanima(5)) {
                                this.areaPos[0]--;
                                this.justMoved(10, 0, 1, 0, 0, 0);

                            }
                        } else player.attack(attackEnemy((this.areaPos[0] - 1) + this.areaPos[1] * width));
                    }
                }
            } else if (zone == "house") {
                if (this.housePos[0] !== 0) if (map[this.pos[0] + this.pos[1] * width][3][this.areaPos[0] + this.areaPos[1] * width][3][(this.housePos[0] - 1) + this.housePos[1] * width][2] !== true && map[this.pos[0] + this.pos[1] * width][3][this.areaPos[0] + this.areaPos[1] * width][3][(this.housePos[0] - 1) + this.housePos[1] * width][1] == "none") if (this.useStanima(5)) {
                    this.housePos[0]--;
                    this.justMoved(10, 0, 1, 0, 0, 0);

                }
            }
            this.render();
        }
    }
};

function beginGame() {
    player.inventory = [
        ["Amulet of Antimagic", "item", 1]
    ];
    player.startHealth();
    player.startMana();
    player.startStanima();
    player.startArmor();
    player.startResistance();
    document.getElementById("stats").style.height = 29 * height + "px";
    zone = "world";
    mapGen();
    player.startPos();
    player.render();
}

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        player.up();
    } else if (e.keyCode == '40') {
        // down arrow
        player.down();
    } else if (e.keyCode == '37') {
        // left arrow
        player.left();
    } else if (e.keyCode == '39') {
        // right arrow
        player.right();
    } else if (e.keyCode == '32') {
        //test key
        enemies[0].attack(10);
    }

}

function explore() {
    if (player.CheckCoolDown() && player.useStanima(25)) {
        if (zone == "world") {
            zone = "area";
            console.log("explore");
            loadArea(player.pos);
            document.getElementById("explore").innerHTML = "Leave";
            player.justMoved(25, 0, 1, 0, 0, 0);
        } else if (zone == "area") {
            zone = "world";
            loadWorld();
            document.getElementById("explore").innerHTML = "Explore";
            player.justMoved(25, 0, 1, 0, 0, 0);
        }
    }
}

function loadArea(position, fromHouse) {
    var index = position[0] + position[1] * width;
    if (map[index][3] === 0) {
        map[index][3] = generateArea(map[index][0]);
        //enemies = [];
        for (o = 0; o < Math.random(); o += Math.random()) {
            console.log("enemyGEN " + i);
            enemies.push(new entity(enemies.length + 1, Math.floor(Math.random() * 20) + 10, Math.floor(Math.random() * 20) + 10, Math.floor(Math.random() * 20) + 10, Math.floor(Math.random() * 20) + 10, Math.floor(Math.random() * 20) + 10, [player.pos[0], player.pos[1]], weapons[Math.floor(Math.random() * weapons.length)][0]));
            enemies[enemies.length - 1].startPos();
            enemies[enemies.length - 1].startHealth();
            enemies[enemies.length - 1].startMana();
            enemies[enemies.length - 1].startStanima();
        }
    }
    if (!fromHouse) player.startAreaPos();
    console.log(map[index]);
    renderMap(index);
}

function loadWorld() {
    renderMap();
}

//aerea Generation Scripts
var areaGenScripts = {
    //ocean
    ocean: function () {
        var value = [];
        var curPos;
        var blocked;
        for (i = 0; i < width * height; i++) {
            value[i] = ["water", "none", true, 0];
        }
        return value;
    },
    //plains
    plains: function () {
        var value = [];
        var curPos;
        var blocked;
        var X;
        var Y;
        for (i = 0; i < width * height; i++) {
            value[i] = ["grass", "none", false, 0];
        }
        for (i = 0; i < value.length / 15; i++) {
            console.log("loop");
            X = Math.floor(Math.random() * width);
            Y = Math.floor(Math.random() * height);
            curPos = Y * width + X;
            value[curPos][0] = "tree";
            for (e = 0; e < tiles.length; e++) {
                if (tiles[e][0] == "tree") blocked = tiles[e][2];
            }
            value[curPos][2] = blocked;
        }
        for (i = 0; i < value.length / 30; i++) {
            console.log("loop");
            X = Math.floor(Math.random() * width);
            Y = Math.floor(Math.random() * height);
            curPos = Y * width + X;
            value[curPos][0] = "bolder";
            for (e = 0; e < tiles.length; e++) {
                if (tiles[e][0] == "tree") blocked = tiles[e][2];
            }
            value[curPos][2] = blocked;
        }
        for (i = 0; i < value.length / 15; i++) {
            console.log("loop");
            X = Math.floor(Math.random() * width);
            Y = Math.floor(Math.random() * height);
            curPos = Y * width + X;
            value[curPos][0] = "bush";
            for (e = 0; e < tiles.length; e++) {
                if (tiles[e][0] == "bush") blocked = tiles[e][2];
            }
            value[curPos][2] = blocked;
        }
        return value;
    },
    //forest
    forest: function () {
        var value = [];
        var curPos;
        var blocked;
        for (i = 0; i < width * height; i++) {
            value[i] = ["grass", "none", false, 0];
        }
        for (i = 0; i < value.length; i++) {
            console.log("loop");
            X = Math.floor(Math.random() * width);
            Y = Math.floor(Math.random() * height);
            curPos = Y * width + X;
            value[curPos][0] = "tree";
            for (e = 0; e < tiles.length; e++) {
                if (tiles[e][0] == "tree") blocked = tiles[e][2];
            }
            value[curPos][2] = blocked;
        }
        for (i = 0; i < value.length / 15; i++) {
            console.log("loop");
            X = Math.floor(Math.random() * width);
            Y = Math.floor(Math.random() * height);
            curPos = Y * width + X;
            value[curPos][0] = "bolder";
            for (e = 0; e < tiles.length; e++) {
                if (tiles[e][0] == "bolder") blocked = tiles[e][2];
            }
            value[curPos][2] = blocked;
        }
        return value;
    },
    //desert
    desert: function () {
        var value = [];
        var curPos;
        var blocked;
        for (i = 0; i < width * height; i++) {
            value[i] = ["sand", "none", false, 0];
        }
        for (i = 0; i < value.length / 50; i++) {
            console.log("loop");
            X = Math.floor(Math.random() * width);
            Y = Math.floor(Math.random() * height);
            curPos = Y * width + X;
            value[curPos][0] = "cactus";
            for (e = 0; e < tiles.length; e++) {
                if (tiles[e][0] == "cactus") blocked = tiles[e][2];
            }
            value[curPos][2] = blocked;
        }
        return value;
    },
    //waste
    waste: function () {
        var value = [];
        var curPos;
        var blocked;
        for (i = 0; i < width * height; i++) {
            value[i] = ["dirt", "none", false, 0, 0];
        }
        for (i = 0; i < value.length / 2; i++) {
            console.log("loop");
            X = Math.floor(Math.random() * width);
            Y = Math.floor(Math.random() * height);
            curPos = Y * width + X;
            value[curPos][0] = "rock";
            for (e = 0; e < tiles.length; e++) {
                if (tiles[e][0] == "rock") blocked = tiles[e][2];
            }
            value[curPos][2] = blocked;
        }
        for (i = 0; i < value.length / 10; i++) {
            console.log("loop");
            X = Math.floor(Math.random() * width);
            Y = Math.floor(Math.random() * height);
            curPos = Y * width + X;
            value[curPos][0] = "bolder";
            for (e = 0; e < tiles.length; e++) {
                if (tiles[e][0] == "bolder") blocked = tiles[e][2];
            }
            value[curPos][2] = blocked;
        }
        return value;
    },
    //swamp
    swamp: function () {
        var value = [];
        var curPos;
        var blocked;
        for (i = 0; i < width * height; i++) {
            value[i] = ["water", "none", true, 0];
        }
        for (i = 0; i < value.length / 2; i++) {
            console.log("loop");
            X = Math.floor(Math.random() * width);
            Y = Math.floor(Math.random() * height);
            curPos = Y * width + X;
            value[curPos][0] = "grass";
            for (e = 0; e < tiles.length; e++) {
                if (tiles[e][0] == "grass") blocked = tiles[e][2];
            }
            value[curPos][2] = blocked;
        }
        for (i = 0; i < value.length / 5; i++) {
            console.log("loop");
            X = Math.floor(Math.random() * width);
            Y = Math.floor(Math.random() * height);
            curPos = Y * width + X;
            value[curPos][0] = "tree";
            for (e = 0; e < tiles.length; e++) {
                if (tiles[e][0] == "tree") blocked = tiles[e][2];
            }
            value[curPos][2] = blocked;
        }
        for (i = 0; i < value.length / 5; i++) {
            console.log("loop");
            X = Math.floor(Math.random() * width);
            Y = Math.floor(Math.random() * height);
            curPos = Y * width + X;
            value[curPos][0] = "reed";
            for (e = 0; e < tiles.length; e++) {
                if (tiles[e][0] == "reed") blocked = tiles[e][2];
            }
            value[curPos][2] = blocked;
        }
        return value;
    },
    //mountain
    mountain: function () {
        var value = [];
        var curPos;
        var blocked;
        for (i = 0; i < width * height; i++) {
            value[i] = ["rock", "none", false, 0];
        }
        return value;
    },
    //meadow
    meadow: function () {
        var value = [];
        var curPos;
        var blocked;
        var X;
        var Y;
        var moves;
        var chosenMove;
        for (i = 0; i < width * height; i++) {
            value[i] = ["grass", "none", false, 0];
        }
        for (i = 0; i < value.length / 7; i++) {
            console.log("loop");
            X = Math.floor(Math.random() * width);
            Y = Math.floor(Math.random() * height);
            curPos = Y * width + X;
            value[curPos][0] = "tree";
            for (e = 0; e < tiles.length; e++) {
                if (tiles[e][0] == "tree") blocked = tiles[e][2];
            }
            value[curPos][2] = blocked;
        }
        return value;
    }
};
//beaches
function generateCoasts(coast, value) {
    var X;
    var Y;
    var curPos;
    var blocked;
    var tile;
    //var beachThick;
    if (coast[0]) {
        X = Math.floor(Math.random() * width / 2) + 1;
        for (i = 0; i < height; i++) {
            //beachThick = Math.floor(Math.random() * 5) + 5;
            Y = i;
            if (Math.random() > 0.5) {
                if (X !== 1) X--;
            } else if (X < width / 2) X++;
            for (o = 0; o < X; o++) {
                curPos = Y * width + (X - o - 1);
                //if (o < width / beachThick && value[curPos][0] != "water") tile = "sand";
                //else 
                tile = "water";
                value[curPos][0] = tile;
                for (e = 0; e < tiles.length; e++) {
                    if (tiles[e][0] == tile) blocked = tiles[e][2];
                }
                value[curPos][2] = blocked;
            }
        }

    }
    if (coast[1]) {
        Y = Math.floor(Math.random() * height / 2) + 1;
        for (i = 0; i < width; i++) {
            //beachThick = Math.floor(Math.random() * 5) + 5;
            X = i;
            if (Math.random() > 0.5) {
                if (Y !== 1) Y--;
            } else if (Y < height / 2) Y++;
            for (o = 0; o < Y; o++) {
                curPos = (Y - o - 1) * width + X;
                //if (o < height / beachThick && value[curPos][0] != "water") tile = "sand";
                //else 
                tile = "water";
                value[curPos][0] = tile;
                for (e = 0; e < tiles.length; e++) {
                    if (tiles[e][0] == tile) blocked = tiles[e][2];
                }
                value[curPos][2] = blocked;
            }
        }
    }
    if (coast[2]) {
        X = width - (Math.floor(Math.random() * width / 2) + 1);
        for (i = 0; i < height; i++) {
            //beachThick = Math.floor(Math.random() * 5) + 5;
            Y = i;
            if (Math.random() > 0.5) {
                if (X > width / 2) X--;
            } else if (X != width - 1) X++;
            for (o = width; o > X; o--) {
                curPos = Y * width + (X + (width - o));
                //if (o > width - width / beachThick && value[curPos][0] != "water") tile = "sand";
                //else 
                tile = "water";
                value[curPos][0] = tile;
                for (e = 0; e < tiles.length; e++) {
                    if (tiles[e][0] == tile) blocked = tiles[e][2];
                }
                value[curPos][2] = blocked;
            }
        }
    }
    if (coast[3]) {
        Y = height - (Math.floor(Math.random() * height / 2) + 1);
        for (i = 0; i < width; i++) {
            //beachThick = Math.floor(Math.random() * 5) + 5;
            X = i;
            if (Math.random() > 0.5) {
                if (Y > height / 2) Y--;
            } else if (Y != height - 1) Y++;
            for (o = height; o > Y; o--) {
                curPos = (Y + (height - o)) * width + X;
                //if (o > height - height / beachThick && value[curPos][0] != "water") tile = "sand";
                //else 
                tile = "water";
                value[curPos][0] = tile;
                for (e = 0; e < tiles.length; e++) {
                    if (tiles[e][0] == tile) blocked = tiles[e][2];
                }
                value[curPos][2] = blocked;
            }
        }
    }
    return value;
}
//generate Village
function generateVillage(value) {
    console.log("village");
    var X = Math.floor(Math.random() * (width / 3)) + Math.floor(width / 3);
    var Y = Math.floor(Math.random() * (height / 3)) + Math.floor(height / 3);
    var curPos;
    var moves = [];
    var chosenMove;
    var blocked;
    var tile;
    for (i = 0; i < height * width / 5; i++) {
        curPos = X + Y * width;
        if (Math.random() > 0.8) tile = "house";
        else tile = "road";
        if (value[curPos][0] != "ocean") {
            value[curPos][0] = tile;
            for (e = 0; e < tiles.length; e++) {
                if (tiles[e][0] == tile) blocked = tiles[e][2];
            }
            value[curPos][2] = blocked;
        }
        moves = [];
        if (X < width / 4 * 3) moves.push(0);
        if (X > width / 4) moves.push(1);
        if (Y < height / 4 * 3) moves.push(2);
        if (Y > height / 4) moves.push(3);
        chosenMove = moves[Math.floor(Math.random() * moves.length)];
        switch (chosenMove) {
            case 0:
                X++;
                break;
            case 1:
                X--;
                break;
            case 2:
                Y++;
                break;
            case 3:
                Y--;
                break;

        }
    }
    return value;
}
//generate Lake
function generateLake(value) {
    var X = Math.floor(Math.random() * (width / 3)) + Math.floor(width / 3);
    var Y = Math.floor(Math.random() * (height / 3)) + Math.floor(height / 3);
    var curPos;
    var moves = [];
    var chosenMove;
    var blocked;
    var tile;
    for (i = 0; i < height * width / 5; i++) {
        curPos = X + Y * width;
        value[curPos][0] = "waterfresh";
        for (e = 0; e < tiles.length; e++) {
            if (tiles[e][0] == "waterfresh") blocked = tiles[e][2];
        }
        value[curPos][2] = blocked;
        moves = [];
        if (X != width - 1) moves.push(0);
        if (X !== 0) moves.push(1);
        if (Y != height - 1) moves.push(2);
        if (Y !== 0) moves.push(3);
        chosenMove = moves[Math.floor(Math.random() * moves.length)];
        switch (chosenMove) {
            case 0:
                X++;
                break;
            case 1:
                X--;
                break;
            case 2:
                Y++;
                break;
            case 3:
                Y--;
                break;

        }
    }
    return value;
}

function generateBeaches(value, biome) {
    if (biome == "desert" || biome == "waste" || biome == "mountain" || biome == "swamp") return value;
    var genSand;
    var tile;
    var toReplace = [];
    console.log("beach");
    for (o = 0; o < (height * width) / 200; o++) {
        console.log("generateBeach");
        for (i = 0; i < value.length; i++) {
            genSand = false;
            if (i - width >= 0) if (value[i - width][0] == "water" || value[i - width][0] == "sand" || value[i - width][0] == "waterfresh") genSand = true;
            if (i + width <= value.length - 1) if (value[i + width][0] == "water" || value[i + width][0] == "sand" || value[i + width][0] == "waterfresh") genSand = true;
            if (i - 1 >= 0 && i % width !== 0) if (value[i - 1][0] == "water" || value[i - 1][0] == "sand" || value[i - 1][0] == "waterfresh") genSand = true;
            if (i + 1 <= value.length - 1 && (i + 1) % width !== 0) if (value[i + 1][0] == "water" || value[i + 1][0] == "sand" || value[i + 1][0] == "waterfresh") genSand = true;
            if ((value[i][0] != "water" && value[i][0] != "waterfresh") && genSand === true) toReplace[i] = true;
            else toReplace[i] = false;
        }
        for (i = 0; i < value.length; i++) {
            if (toReplace[i] === true && Math.random() > 0.5) {
                tile = "sand";
                value[i][0] = tile;
                for (e = 0; e < tiles.length; e++) {
                    if (tiles[e][0] == tile) blocked = tiles[e][2];
                }
                value[i][2] = blocked;
            }
        }
    }
    return value;
}

function enter() {
    if (player.CheckCoolDown()) if (zone == "area") if (map[player.pos[0] + player.pos[1] * width][3][player.areaPos[0] + player.areaPos[1] * width][0] == "house" && player.useStanima(5)) {
        loadHouse(player.pos, player.areaPos);
        player.justMoved(25, 0, 0.5, 0, 0.5, 0);
    }
}

function loadHouse(positionWorld, positionZone) {
    zone = "house";
    console.log("house");
    console.log(positionWorld);
    console.log(positionZone);
    var indexWorld = positionWorld[0] + positionWorld[1] * width;
    var indexZone = positionZone[0] + positionZone[1] * width;
    if (map[indexWorld][3][indexZone][3] === 0) {
        map[indexWorld][3][indexZone][3] = houseGen();
    }
    player.startHousePos();
    console.log(map[indexWorld][3][indexZone]);
    //renderMap(index);
}

function houseGen() {
    var value = [];
    value = houseGenScripts();
    return value;
}

function houseGenScripts() {
    var value = [];
    var curPos;
    var blocked;
    var X;
    var Y;
    var doorPos;
    for (i = 0; i < width * height; i++) {
        value[i] = ["wood", "none", false];
    }
    for (i = 0; i < value.length / 15; i++) {
        X = Math.floor(Math.random() * width);
        Y = Math.floor(Math.random() * height);
        curPos = Y * width + X;
        value[curPos][0] = "chair";
        for (e = 0; e < houseTiles.length; e++) {
            if (houseTiles[e][0] == "chair") blocked = houseTiles[e][2];
        }
        console.log(blocked);
        value[curPos][2] = blocked;
    }
    for (i = 0; i < value.length; i++) {
        curPos = i;
        if (i < width || i >= width * (height - 1) || i % width === 0 || (i + 1) % width === 0) {
            value[curPos][0] = "wall";
            for (e = 0; e < houseTiles.length; e++) {
                if (houseTiles[e][0] == "wall") blocked = houseTiles[e][2];
            }
            console.log(blocked);
            value[curPos][2] = blocked;
        }
    }
    doorPos = [];
    for (i = 0; i < value.length; i++) {
        curPos = i;
        if (XOR(i < width, XOR(i >= width * (height - 1), XOR(i % width === 0, (i + 1) % width === 0)))) {
            //if ((i < width || i >= width * (height - 1) || i % width === 0 || (i + 1) % width === 0)){
            doorPos.push(curPos);
            console.log("test");
        }
    }
    curPos = doorPos[Math.floor(Math.random() * doorPos.length)];
    value[curPos][0] = "exit";
    for (e = 0; e < houseTiles.length; e++) {
        if (houseTiles[e][0] == "exit") blocked = houseTiles[e][2];
    }
    console.log(blocked);
    value[curPos][2] = blocked;
    return value;
}

function XOR(value1, value2) {
    if ((!value1 && value2) || (value1 && !value2)) return true;
    else return false;
}

function rest() {
    player.rest();
}

function entity(ID, strength, speed, intelegence, dexterity, charisma, pos, weapon) {
    this.ID = ID;
    this.pos = pos;
    this.areaPos = [0, 0];
    this.moveWaitTime = 0;
    this.moveWait = 0;
    this.strength = strength;
    this.speed = speed;
    this.intelegence = intelegence;
    this.dexterity = dexterity;
    this.charisma = charisma;
    this.health = [0, 0];
    this.mana = [0, 0];
    this.stanima = [0, 0];
    this.armor = 0;
    this.resistance = 0;
    this.equiped = weapon;
    //Equip - function to equip new item;
    this.equip = function (weapon) {
        if (this.CheckCoolDown()) if (this.useStanima(5)) this.equiped = weapon;
    };
    //Attack
    this.attack = function (enemy) {
        var item;
        for (i = 0; i < weapons.length; i++) if (weapons[i][0] == this.equiped) item = weapons[i][6];
        if (this.useStanima(item * 3)) attack(this.equiped, this, player);
    };
    this.inspect = function () {
        return "Health: " + this.health + "<br>Mana: " + this.mana + "<br>Stanima: " + this.stanima + "<br>Strength: " + this.strength + "<br>Speed: " + this.speed + "<br>Intelegence: " + this.intelegence + "<br>Dexterity: " + this.dexterity + "<br>Charisma: " + this.charisma + "<br>Armor: " + this.armor + "<br>Resistance: " + this.resistance;
    };
    this.justMoved = function (Base, Strength, Speed, Intelegence, Dexterity, Charisma) {
        this.moveWaitTime = (Base * 50) / (this.strength * Strength + this.speed * Speed + this.intelegence * Intelegence + this.dexterity * Dexterity + this.charisma * Charisma);
        this.moveWait = this.moveWaitTime;
        console.log(this.moveWait);
    };
    //tickDown
    this.tickDown = function () {
        this.moveWait--;
        if (this.moveWait < 0) this.moveWait = 0;
    };
    //checkCoolDown
    this.CheckCoolDown = function () {
        //console.log(this.moveWait);
        if (this.moveWait === 0) return true;
        else return false;
    };
    //startHealth
    this.startHealth = function () {
        this.health = [this.strength * 10, this.strength * 10];
        console.log(this.health);
    };
    //startMana
    this.startMana = function () {
        this.mana = [this.intelegence * 10, this.intelegence * 10];
        console.log(this.mana);
    };
    //startStanima
    this.startStanima = function () {
        this.stanima = [this.speed * 10, this.speed * 10];
        console.log(this.stanima);
    };
    //startArmor
    this.startArmor = function () {
        this.armor = 0;
        console.log(this.armor);
    };
    //startResistance
    this.startResistance = function () {
        this.resistance = 0;
        console.log(this.resistance);
    };
    //updateArmor
    this.updateArmor = function () {
        var value = 0;
        this.armor = value;
    };
    //updateResistance
    updateResistance = function () {
        var value = 0;
        this.resistance = value;
    };
    //damagePhysical
    this.damagePhysical = function (damage) {
        this.health[1] -= Math.floor(damage * ((100 - this.armor) / 100));
    };
    //damageMagical
    this.damageMagical = function (damage) {
        this.health[1] -= Math.floor(damage * (100 - this.resistance / 100));
        if (this.health[1] < 0) this.health[1] = 0;
    };
    //damageOther
    this.damageOther = function (damage) {
        this.health[1] -= Math.floor(damage);
        if (this.health[1] < 0) this.health[1] = 0;
    };
    //healthHeal
    this.healthHeal = function (heal) {
        this.health[1] += heal;
        if (this.health[1] > this.health[0]) this.health[1] = this.health[0];
    };
    //manaHeal
    this.manaHeal = function (heal) {
        this.mana[1] += heal;
        if (this.mana[1] > this.mana[0]) this.mana[1] = this.mana[0];
    };
    //stanimaHeal
    this.stanimaHeal = function (heal) {
        this.stanima[1] += heal;
        if (this.stanima[1] > this.stanima[0]) this.stanima[1] = this.stanima[0];
    };
    //useHealth
    this.useHealth = function (amount) {
        if (this.health[1] >= amount) {
            this.health[1] -= amount;
            return true;
        } else return false;
    };
    //useMana
    this.useMana = function (amount) {
        if (this.mana[1] >= amount) {
            this.mana[1] -= amount;
            return true;
        } else return false;
    };
    //useStanima
    this.useStanima = function (amount) {
        console.log(this.stanima);
        if (this.stanima[1] >= amount) {
            this.stanima[1] -= amount;
            return true;
        } else return false;
    };
    //useItem
    this.useItem = function (item) {
        var index = -1;
        for (i = 0; i < this.inventory.length; i++) if (this.inventory[i][0] == item[0]) index = i;
        if (index > -1 && this.inventory[index][2] >= item[2]) {
            this.inventory[index][2] -= item[2];
            if (this.inventory[index][2] === 0 && this.inventory[index][1] == "item") this.inventory.splice(index, 1);
            return true;
        } else return false;
    };
    //inventory
    this.inventory = [];
    //take
    this.take = function (item) {
        var index = -1;
        for (i = 0; i < this.inventory.length; i++) if (this.inventory[i][0] == item[0]) index = i;
        if (index != -1) this.inventory[index][2] += item[2];
        else this.inventory.push(item);
    };
    this.startPos = function () {
        //this.pos = player.pos;
        do {
            this.areaPos = [Math.floor(Math.random() * width), Math.floor(Math.random() * height)];
            console.log(this.areaPos);
        } while (map[this.pos[0] + this.pos[1] * width][3][this.areaPos[0] + this.areaPos[1] * width][2] === true);
        this.render();
    };
    this.render = function () {
        for (i = 0; i < map[this.pos[0] + this.pos[1] * width][3].length; i++) if (map[this.pos[0] + this.pos[1] * width][3][i][1] == this.ID) map[this.pos[0] + this.pos[1] * width][3][i][1] = "none";
        map[this.pos[0] + this.pos[1] * width][3][this.areaPos[0] + this.areaPos[1] * width][1] = this.ID;
    };
    this.up = function () {
        if (this.areaPos[1] !== 0) {
            if (map[this.pos[0] + this.pos[1] * width][3][this.areaPos[0] + (this.areaPos[1] - 1) * width][2] !== true && map[this.pos[0] + this.pos[1] * width][3][this.areaPos[0] + (this.areaPos[1] - 1) * width][1] == "none") if (this.useStanima(5)) {
                this.areaPos[1]--;
                this.justMoved(10, 0, 1, 0, 0, 0);

            }
        }

        this.render(this.pos[0] + this.pos[1] * width);
    };
    this.down = function () {
        if (this.areaPos[1] != height - 1) {
            if (map[this.pos[0] + this.pos[1] * width][3][this.areaPos[0] + (this.areaPos[1] + 1) * width][2] !== true && map[this.pos[0] + this.pos[1] * width][3][this.areaPos[0] + (this.areaPos[1] + 1) * width][1] == "none") if (this.useStanima(5)) {
                this.areaPos[1]++;
                this.justMoved(10, 0, 1, 0, 0, 0);

            }
        }

        this.render(this.pos[0] + this.pos[1] * width);
    };
    this.right = function () {
        if (this.areaPos[0] != width - 1) {

            if (map[this.pos[0] + this.pos[1] * width][3][(this.areaPos[0] + 1) + this.areaPos[1] * width][2] !== true && map[this.pos[0] + this.pos[1] * width][3][(this.areaPos[0] + 1) + this.areaPos[1] * width][1] == "none") if (this.useStanima(5)) {
                this.areaPos[0]++;
                this.justMoved(10, 0, 1, 0, 0, 0);

            }
        }

        this.render(this.pos[0] + this.pos[1] * width);
    };
    this.left = function () {
        if (this.areaPos[0] !== 0) {
            if (map[this.pos[0] + this.pos[1] * width][3][(this.areaPos[0] - 1) + this.areaPos[1] * width][2] !== true && map[this.pos[0] + this.pos[1] * width][3][(this.areaPos[0] - 1) + this.areaPos[1] * width][1] == "none") if (this.useStanima(5)) {
                this.areaPos[0]--;
                this.justMoved(10, 0, 1, 0, 0, 0);

            }
        }

        this.render(this.pos[0] + this.pos[1] * width);
    };
    this.chooseMove = function () {
        if (this.CheckCoolDown()) {
            var nextToPlayer = false;
            if (this.areaPos[1] !== 0) if (map[this.pos[0] + this.pos[1] * width][3][this.areaPos[0] + (this.areaPos[1] - 1) * width][1] == "player") nextToPlayer = true;
            if (this.areaPos[1] != height - 1) if (map[this.pos[0] + this.pos[1] * width][3][this.areaPos[0] + (this.areaPos[1] + 1) * width][1] == "player") nextToPlayer = true;
            if (this.areaPos[0] != width - 1) if (map[this.pos[0] + this.pos[1] * width][3][(this.areaPos[0] + 1) + this.areaPos[1] * width][1] == "player") nextToPlayer = true;
            if (this.areaPos[0] !== 0) if (map[this.pos[0] + this.pos[1] * width][3][(this.areaPos[0] - 1) + this.areaPos[1] * width][1] == "player") nextToPlayer = true;
            if (nextToPlayer) {
                this.attack("fish");
            } else {
                var value = Math.random();
                if (value > 0.75) this.right();
                else if (value > 0.5) this.left();
                else if (value > 0.25) this.up();
                else this.down();
            }
        }
    };
}

//examineTile
function tileClick(tile) {
    if (player.CheckCoolDown()) {
        openTileGui(tile);
    }
}
//openTileGui
function openTileGui(tile) {
    var options = [];
    for (i = 0; i < enemies.length; i++) {
        if (enemies[i].pos[0] == player.pos[0] && enemies[i].pos[1] == player.pos[1] && zone == "area" && enemies[i].areaPos[0] + enemies[i].areaPos[1] * width == tile) {
            options.push("Inspect Enemy");
            options.push("Attack Enemy");
        }
    }
    console.log(options);
    openGui("tileGui", tile, options);
}
//openGui
function openGui(type, data, options) {
    inGui = true;
    var final;
    if (type == "tileGui") {
        final = "<div id='tileGui' class='gui'><div id='guiTitle'>Select an action</div>";
        for (i = 0; i < options.length; i++) {
            if (options[i] == "Inspect Enemy") final += "<div onclick = 'inspectEnemy(" + data + ")'class='gui guiChoice'>" + options[i] + "</div>";
            else if (options[i] == "Attack Enemy") final += "<div onclick = 'player.attack(attackEnemy(" + data + "))'class='gui guiChoice'>" + options[i] + "</div>";
        }
        final += "<div class='gui guiChoice' onclick='closeGui()'>Close</div></div>";
    }
    gui = final;
}

function closeGui() {
    inGui = false;
}

function inspectEnemy(tile) {
    for (i = 0; i < enemies.length; i++) if (enemies[i].areaPos[0] + enemies[i].areaPos[1] * width == tile) gui = "<div id='tileGui' class='gui'><div id='guiTitle'>Select an action</div><div>" + enemies[i].inspect() + "<div class='gui guiChoice' onclick='closeGui()'>Close</div></div></div>";
}

function attackEnemy(tile) {
    var combatResolve;
    for (i = 0; i < enemies.length; i++) if (enemies[i].areaPos[0] + enemies[i].areaPos[1] * width == tile) return i;
    closeGui();
}

//attack - should return a damage value, and call this.justMoved. [Name,Type,Damage Mult,Accuracy Mult,Cooldown Mult,Crit Mult,Weight]
function attack(weapon, attacker, defender) {
    var damage;
    var hit;
    var crit;
    var cooldown;
    var increment;
    var chance;
    for (i = 0; i < weapons.length; i++) {
        if (weapons[i][0] == weapon) {
            if (weapons[i][1] == "club") {
                damage = weapons[i][2] * attacker.strength * 1.2;
                hit = weapons[i][3] * attacker.strength * 0.8;
                cooldown = weapons[i][4] * attacker.strength;
                crit = weapons[i][5] * attacker.strength;
            } else if (weapons[i][1] == "sword") {
                damage = weapons[i][2] * attacker.speed * 0.8;
                hit = weapons[i][3] * attacker.speed;
                cooldown = weapons[i][4] * attacker.speed * 1.2;
                crit = weapons[i][5] * attacker.speed;
            } else if (weapons[i][1] == "bow") {
                damage = weapons[i][2] * attacker.dexterity;
                hit = weapons[i][3] * attacker.dexterity;
                cooldown = weapons[i][4] * attacker.dexterity * 8;
                crit = weapons[i][5] * attacker.dexterity * 1.2;
            } else if (weapons[i][1] == "staff") {
                damage = weapons[i][2] * attacker.intelegence;
                hit = weapons[i][3] * attacker.intelegence * 1.2;
                cooldown = weapons[i][4] * attacker.intelegence;
                crit = weapons[i][5] * attacker.intelegence * 8;
            }
            chance = 0;
            increment = 1;
            for (e = 0; e < crit; e++) {
                chance += increment;
                increment *= 0.99;
            }
            crit = (chance > Math.random() * 100);
            chance = 0;
            increment = 1;
            for (e = 0; e < hit; e++) {
                chance += increment;
                increment *= 0.999;
            }
            hit = (chance > Math.random() * 100);
            cooldown = Math.floor(100 / cooldown * 6);
            console.log(chance);
            damage = Math.floor((damage + Math.floor(Math.random() * damage) - damage / 2) * (crit ? 3 : 1));
            if (weapons[i][1] == "club") {
                attacker.justMoved(cooldown, 1, 0, 0, 0, 0);
            } else if (weapons[i][1] == "sword") {
                attacker.justMoved(cooldown, 0, 1, 0, 0, 0);
            } else if (weapons[i][1] == "bow") {
                attacker.justMoved(cooldown, 0, 0, 0, 1, 0);
            } else if (weapons[i][1] == "staff") {
                attacker.justMoved(cooldown, 0, 0, 1, 0, 0);
            }
            defender.damagePhysical(damage);
            return [damage, hit, cooldown, crit];
        }
    }
}

function dropItem() {
    var item;
    if (Math.random() > 0.5) item = [items[Math.floor(Math.random() * items.length)][0], "item", 1];
    else do {
        item = [weapons[Math.floor(Math.random() * weapons.length)][0], "weapon", 1];
    } while (item[0] == "Fist");
    return item;
}

function update() {
    if (!inGui) {
        player.tickDown();
        for (k = 0; k < enemies.length; k++) {
            //console.log([enemies[i].pos,player.pos]);
            if (enemies[k].pos[0] == player.pos[0] && enemies[k].pos[1] == player.pos[1]) {
                enemies[k].tickDown();
                enemies[k].chooseMove();
                //console.log("Enemy: " + k);
                if (enemies[k].health[1] <= 0) {
                    for (i = 0; i < map[enemies[k].pos[0] + enemies[k].pos[1] * width][3].length; i++) if (map[enemies[k].pos[0] + enemies[k].pos[1] * width][3][i][1] == enemies[k].ID) map[enemies[k].pos[0] + enemies[k].pos[1] * width][3][i][1] = "none";
                    enemies.splice(k, 1);
                    player.take(dropItem());
                    player.experiance += 100;
                    player.checkXP();
                }
            }
        }
    }
    renderMap(player.pos[0] + player.pos[1] * width, player.areaPos[0] + player.areaPos[1] * width);
    window.requestAnimationFrame(update);
}


window.requestAnimationFrame(update);
beginGame();