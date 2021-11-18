class Chip {
    constructor(chipID, isFull, column, row) {
        this.chipID = chipID
        this.isFull = false
        this.column = column
        this.row = row
        this.currentColor = "None";
    }
}


var playerOneName = prompt("Please enter name of player 1: ")
var playerTwoName = prompt("Please enter name of player 2: ")
var isGameOver = false;
var catigories = ["A", "B", "C", "D", "E", "F", "G"]
var boxes = [[], [], [], [], [], [], []]
var playerOneTurn = true
changePlayerTurn()

for (let i = 0; i < catigories.length; i++) {
    for (let j = 0; j < 6; j++) {
        boxes[i][j] = new Chip((j + 1).toString() + catigories[i],
            false, catigories[i], (j + 1).toString())
    }
}


for (let i = 0; i < boxes.length; i++) {
    for (let j = 0; j < 6; j++) {
        $("#" + "box" + boxes[i][j].chipID + "\\00000a").click(function () {
            var x = shiftChips(boxes[i][j])
            chipAdded(x);
        })
    }
}

function shiftChips(chip) {
    for (let i = 0; i < catigories.length; i++) {
        for (let j = 0; j < 6; j++) {
            if (chip.column === boxes[i][j].column) {
                for (let k = 5; k >= 0; k--) {
                    if (boxes[i][k].isFull === false) {
                        boxes[i][k].isFull = true
                        if (playerOneTurn) {
                            boxes[i][k].currentColor = "Blue"
                        } else {
                            boxes[i][k].currentColor = "Red"

                        }
                        return boxes[i][k].chipID;
                    }
                }
            }
        }
    }
}


function chipAdded(chip) {
    if (playerOneTurn) {
        turnBlue(chip)
        playerOneTurn = false
        changePlayerTurn()
        if (checkForWinner("Blue")) {
            showWinner(playerOneName)
        }
    } else {
        turnRed(chip)
        playerOneTurn = true
        changePlayerTurn()
        if (checkForWinner("Red")) {
            showWinner(playerOneName)
        }
    }
    disableChip(chip)

}


function checkForWinner(color) {
    // horizontalCheck
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 7; i++) {
            if (boxes[i][j].currentColor === color &&
                boxes[i][j + 1].currentColor === color &&
                boxes[i][j + 2].currentColor === color &&
                boxes[i][j + 3].currentColor === color) {
                return true;
            }
        }
    }


    // verticalCheck
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 6; j++) {
            if (boxes[i][j].currentColor === color &&
                boxes[i + 1][j].currentColor === color &&
                boxes[i + 2][j].currentColor === color &&
                boxes[i + 3][j].currentColor === color) {
                return true;
            }
        }
    }
    // ascendingDiagonalCheck
    for (let i = 3; i < 7; i++) {
        for (let j = 0; j < 3; j++) {
            if (boxes[i][j].currentColor === color &&
                boxes[i - 1][j + 1].currentColor === color &&
                boxes[i - 2][j + 2].currentColor === color &&
                boxes[i - 3][j + 3].currentColor === color) {
                return true;
            }

        }
    }
    // descendingDiagonalCheck
    for (let i = 3; i < 7; i++) {
        for (let j = 3; j < 6; j++) {
            if (boxes[i][j].currentColor === color &&
                boxes[i - 1][j - 1].currentColor === color &&
                boxes[i - 2][j - 2].currentColor === color &&
                boxes[i - 3][j - 3].currentColor === color) {
                return true;
            }

        }
    }
    return false
}

function showWinner(name) {
    alert(name + " won the game!")
    resetGame()
}

function resetGame() {
    window.location.reload()
}


function disableChip(box) {
    $('#' + 'box' + box + '\\00000a').off('click')
}

function turnBlue(box) {
    $('#' + 'box' + box + '\\00000a').css('background-color', 'blue')
}

function turnRed(box) {
    $('#' + 'box' + box + '\\00000a').css('background-color', 'red')
}

function turnGrey(box) {
    $('#' + 'box' + box + '\\00000a').css('background-color', 'grey')
}

function changePlayerTurn() {
    if (playerOneTurn) {
        $('#turnShower').text("It's " + playerOneName + "'s turn!")
    } else {
        $('#turnShower').text("It's " + playerTwoName + "'s turn!")

    }
}
