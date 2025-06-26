const btnPlus = document.querySelector(".btn-number-plus");
const btnMinus = document.querySelector(".btn-number-minus");
const inputNumber = document.querySelector(".input-number");
const dices = document.querySelector(".dices");
const startGame = document.querySelector(".start-game");

const btnDice = document.querySelector(".btn-dice");
const btnReset = document.querySelector(".btn-reset");

let inputNumberValue = parseInt(inputNumber.value) || 0;

btnPlus.addEventListener("click", () => {
    inputNumberValue++;
    inputNumber.value = inputNumberValue;
    addDiceItem();
});

btnMinus.addEventListener("click", () => {
    if (inputNumberValue > 0 && dices.lastElementChild) {
        inputNumberValue--;
        inputNumber.value = inputNumberValue;
        removeLastDiceItem();
    }
});

inputNumber.addEventListener("input", () => {
    const currentInputValue = parseInt(inputNumber.value);

    if (currentInputValue > inputNumberValue) {
        for (let i = inputNumberValue+1; i <= currentInputValue; i++){
            addDiceItem(i);
        }
    } else if (currentInputValue<inputNumberValue) {
        for (let i = inputNumberValue; i > currentInputValue; i--){
            removeLastDiceItem();
        }
    }
    
    inputNumberValue = currentInputValue;
});


function addDiceItem(itemIndex = inputNumberValue) {
    const diceItem = document.createElement("li");
    diceItem.classList.add("diceItem");

    const nameInput = document.createElement("input");
    nameInput.classList.add("nameInput");
    nameInput.value = `${itemIndex}. zar`;
    nameInput.id = `dice-input${itemIndex}`;

    const diceInfo = document.createElement("div");
    diceInfo.classList.add("diceInfo");

    const dice3DContainer = document.createElement("div");
    dice3DContainer.classList.add("dice-3d-container");

    const dice3D = document.createElement("div");
    dice3D.classList.add("dice-3d");
    dice3D.id = `dice-3d-${itemIndex}`;

    const faces = ["front", "back", "right", "left", "top", "bottom"];
    faces.forEach((face) => { 
        const faceDiv = document.createElement("div");
        faceDiv.classList.add("face", face);

        let numberOfDots;
        if (face === "front") { numberOfDots = 1; }
        else if (face === "bottom") { numberOfDots = 2; }
        else if (face === "right") { numberOfDots = 3; }
        else if (face === "left") { numberOfDots = 4; }
        else if (face === "top") { numberOfDots = 5; }
        else if (face === "back") { numberOfDots = 6; }

        for (let i = 0; i < numberOfDots; i++){
            const dotSpan = document.createElement("span");
            dotSpan.classList.add("dot");
            faceDiv.appendChild(dotSpan);
        }

        dice3D.appendChild(faceDiv);
    });

    dice3DContainer.appendChild(dice3D);
    diceInfo.appendChild(dice3DContainer);

    const valList = document.createElement("div");
    valList.classList.add("valList");

    const valueOfDice = document.createElement("ul");
    valueOfDice.classList.add("valueOfDice");

    const total = document.createElement("p");
    total.textContent = "Toplam : ";
    const totalSpan = document.createElement("span");
    totalSpan.textContent = "0";
    total.style.display = "none";

    total.appendChild(totalSpan);

    valList.appendChild(valueOfDice);
    valList.appendChild(total);

    diceInfo.appendChild(valList);

    diceItem.appendChild(nameInput);  
    diceItem.appendChild(diceInfo);

    dices.append(diceItem);
}

function removeLastDiceItem() {
    const lastDiceItem = dices.lastElementChild;
    if (lastDiceItem) {
        dices.removeChild(lastDiceItem);
    }
}

for (let i = 1; i <= inputNumberValue; i++){
    addDiceItem(i);
}

btnDice.addEventListener("click", rollDice);
btnReset.addEventListener("click", resetDice);

let currentTotal = 0;

function rollDice() {
    const allDiceItem = dices.querySelectorAll(".diceItem");

    allDiceItem.forEach((item) => {
        const val = item.querySelector(".valueOfDice");
        const spanText = item.querySelector(".valList span");
        const total = item.querySelector("p");
        const dice3DElement = item.querySelector(`.dice-3d`);

        total.style.display = "block";

        const result = Math.floor(Math.random() * 6) + 1;

        dice3DElement.classList.remove("rolling");

        setTimeout(() => { 
            dice3DElement.classList.add("rolling");

            const finalTransformMap = {
              1: "rotateX(0deg) rotateY(0deg)", // Ön yüz (1)
              2: "rotateX(90deg) rotateY(0deg)", // Alt yüz (2)
              3: "rotateY(-90deg) rotateX(0deg)", // Sağ yüz (3)
              4: "rotateY(90deg) rotateX(0deg)", // Sol yüz (4)
              5: "rotateX(-90deg) rotateY(0deg)", // Üst yüz (5)
              6: "rotateX(0deg) rotateY(180deg)", // Arka yüz (6)
            };

            const randomX = Math.floor(Math.random() * 4) * 360;
            const randomY = Math.floor(Math.random() * 4) * 360;
            const randomZ = Math.floor(Math.random() * 4) * 360;

            dice3DElement.style.transform =
              `${finalTransformMap[result]} ` +
              `rotateX(${randomX}deg) ` +
              `rotateY(${randomY}deg) ` +
              `rotateZ(${randomZ}deg)`;

            setTimeout(() => { 
                dice3DElement.classList.remove("rolling");

                const valElement = document.createElement("li");
                valElement.textContent = result;
                val.appendChild(valElement);

                currentTotal = parseInt(spanText.textContent) || 0;
                currentTotal += result;
                spanText.textContent = currentTotal;
            },1500);
        },50);
    });

}


function resetDice() {
    const allDiceItem = dices.querySelectorAll(".diceItem");

    allDiceItem.forEach((item) => {
        const val = item.querySelector(".valueOfDice");
        const spanText = item.querySelector(".valList span");
        const total = item.querySelector("p");
        const dice3DElement = item.querySelector(".dice-3d");

        total.style.display = "none";
        val.innerHTML = "";
        spanText.textContent = 0;

        currentTotal = 0;

        dice3DElement.classList.remove("rolling");
        dice3DElement.style.transform ="rotateX(0deg) rotateY(0deg) rotateZ(0deg)";
    });
    
}

