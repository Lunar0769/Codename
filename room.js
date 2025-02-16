const words = [
    "Apple", "Banana", "Orange", "Grape", "Lemon", "Peach", "Cherry", "Mango", "Berry", "Pineapple",
    "Car", "Truck", "Plane", "Boat", "Train", "Bike", "Bus", "Subway", "Rocket", "Skateboard",
    "Cat", "Dog", "Bird", "Fish", "Horse", "Sheep", "Cow", "Pig", "Deer", "Rabbit",
    "Mountain", "River", "Ocean", "Lake", "Forest", "Desert", "Jungle", "Island", "Canyon", "Valley",
    "Computer", "Laptop", "Mouse", "Keyboard", "Monitor", "Printer", "Speaker", "Headphone", "Tablet", "Smartphone",
    "Sun", "Moon", "Star", "Galaxy", "Planet", "Comet", "Meteor", "Blackhole", "Asteroid", "Nebula",
    "House", "Apartment", "Building", "Castle", "Cottage", "Tent", "Hut", "Palace", "Mansion", "Cabin",
    "Pencil", "Eraser", "Notebook", "Book", "Marker", "Crayon", "Brush", "Canvas", "Paper", "Folder",
    "Football", "Basketball", "Tennis", "Baseball", "Golf", "Soccer", "Hockey", "Swimming", "Running", "Cycling",
    "Doctor", "Nurse", "Teacher", "Engineer", "Artist", "Singer", "Dancer", "Pilot", "Chef", "Scientist",
    "Bread", "Cheese", "Pizza", "Burger", "Sandwich", "Salad", "Pasta", "Steak", "Soup", "Sushi",
    "Gold", "Silver", "Diamond", "Ruby", "Emerald", "Sapphire", "Pearl", "Bronze", "Quartz", "Topaz",
    "Dragon", "Unicorn", "Phoenix", "Mermaid", "Griffin", "Fairy", "Troll", "Elf", "Giant", "Goblin",
    "Chair", "Table", "Lamp", "Clock", "Mirror", "Sofa", "Bed", "Curtain", "Carpet", "Desk",
    "Winter", "Spring", "Summer", "Autumn", "Rain", "Snow", "Storm", "Cloud", "Fog", "Wind"
];


const roles = ["red", "blue", "neutral", "assassin"];

let isSpymaster = false;
let isInitialize = false;

var clue_button='<button id="clue" class="comic-button" onclick="cluewriter()">Write Clue</button>';
var clue='<input id="clue-input" type="text" placeholder="Write here..." name="text" class="input">   <button class="clue_button" onclick="clueshow()">Enter</button>';

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initializeGame() {
    isInitialize=true;
    const board = document.getElementById("game-board");
    board.innerHTML = "";

    document.getElementById("spymasterButton").disabled = false;

    // Shuffle words and roles
    const shuffledWords = [...words].sort(() => 0.5 - Math.random()).slice(0, 25);
    const cardRoles = Array(8).fill("red").concat(
        Array(8).fill("blue"),
        Array(7).fill("neutral"),
        Array(1).fill("assassin")
    );
    shuffle(cardRoles);

    // Create cards
    shuffledWords.forEach((word, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.textContent = word;
        card.dataset.role = cardRoles[index];

        card.addEventListener("click", () => {
            if (!card.classList.contains("revealed")) {
                card.classList.add("revealed", card.dataset.role);
            }
        });

        board.appendChild(card);
    });
}

function toggleSpymasterView() {

    if(isInitialize)
    {
        isSpymaster = true;
        const cards = document.querySelectorAll(".card");
        const spymasterButton = document.getElementById("spymasterButton");
        
        cards.forEach(card => {
            card.classList.add(card.dataset.role);
        });
        
        const clue_div = document.getElementById("clue_div");
        clue_div.innerHTML=clue_button;
        
        spymasterButton.disabled = true;
    }

    else{
        alert("Please initialize the game first");
    }
    
}

function resetGame(){
    
    const boardDiv = document.getElementById('game-board');
    boardDiv.innerHTML="";
}

function clueshow(){
    const clueInput = document.getElementById('clue-input');
    const clue_div = document.getElementById("clue_div");
    clue_div.innerHTML = clueInput.value+"<br><br>"+clue_button;
}

function cluewriter(){
    const clue_div = document.getElementById("clue_div");
    clue_div.innerHTML=clue;
}