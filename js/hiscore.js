// User Click and Countdown Logic:
const mainContainer = document.querySelector(".main-container");
mainContainer.addEventListener("click", function() {
    document.querySelector(".outer-container").remove(); // remove the members container from DOM tree
    
    let countdown = 3;
    const countDown = document.createElement("h1");
    countDown.classList.add("countdown");
    countDown.textContent = countdown;
    countDown.style.fontSize = "200px";
    countDown.style.color = "rgba(185, 158, 253, 1)"; 
    
    mainContainer.append(countDown);
    mainContainer.style.cursor = "default"; // change cursor to default from pointer

    const timerID = setInterval(function() {
        countdown--;    
        if(countdown > 0) {
            countDown.textContent = countdown; // update
        }
        else {
            clearInterval(timerID); // stop the interval
            countDown.remove(); // remove countdown element
            startGame(); // start the game
        }
    }, 1); // CHANGE TO 1000 FOR ACTUAL SECOND INTERVAL - THIS IS FOR TESTING 
});


// global game variables
let score = 0;
let timeLeft = 10;
let gameTimer;
let pointCounter = 10; // max points

function startGame() {
    document.querySelector(".game-platform").style.display = "flex"; // game platform becomes visible
    mainContainer.style.cursor = "pointer";
    mainContainer.style.backgroundColor = "white";

    // place 3 random black tiles
    initializeGame();

    // reset game state
    score = 0;
    timeLeft = 10;

    // start timer
    gameTimer = setInterval(function() {
        if(document.querySelector(".instruction").style.display === "none") {
            timeLeft--;

        }
        document.querySelector(".timer").textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(gameTimer);
            endGame(); // timeLeft reached zero, end game
        }
    }, 1000);

    // add click listeners to tiles
    const tiles = document.querySelectorAll(".tile");
    tiles.forEach((tile, index) => {
        tile.addEventListener("click", function() {
            if (this.classList.contains("black-tile")) {
                handleBlackTileClick(this); // send the clicked tile to the handler
            }
        });
    });
}

function handleBlackTileClick(tile) {  
    // show points and add animations
    tile.textContent = `+${pointCounter}`;
    tile.style.fontSize = "30px";
    tile.style.color = "gray";
    tile.classList.add("green-fade"); // for background
    tile.classList.add("fade-out"); // for text
   
    // update score
    score += pointCounter;
    document.querySelector(".score").textContent = score;
    
    // hide instruction after first click
    document.querySelector(".instruction").style.display = "none";
    
    // reset that clicked tile after animations complete
    setTimeout(() => {
        tile.textContent = "";
        tile.classList.remove("green-fade", "fade-out");
        
        // add new black tile at a different position
        addNewBlackTile();

        // remove black class
        tile.classList.remove("black-tile");
    }, 400);
    

}

function addNewBlackTile() {
    const tiles = document.querySelectorAll(".tile");
    const availableIndices = []; 
    // new tile must be in a different position than the positions of three black tiles
    tiles.forEach((tile, index) => {
        if (!tile.classList.contains("black-tile")) {
            availableIndices.push(index);
        }
    });
    
    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)]; // get a random index from available indices
    tiles[randomIndex].classList.add("black-tile"); 

}

function endGame() {
    alert(`Game Over! Your score: ${score}`);
    // could add high score logic here
}

function initializeGame() {
    const tilesArr = document.querySelectorAll(".tile");
    const blackTiles = [];

    while(blackTiles.length < 3) { // create random indices until we have 3 unique
        const randomIndex = Math.floor(Math.random() * tilesArr.length);
        if(!blackTiles.includes(randomIndex)) { 
            blackTiles.push(randomIndex);
        }
    }
    blackTiles.forEach(index => {
        tilesArr[index].classList.add("black-tile");
    });
}


