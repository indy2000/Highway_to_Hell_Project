import { HighwayToHellGame } from "./HighwayToHellGame.js";
import {  FighterState } from "./constants/fighter.js";

function populateMoveDropdown() {
    const dropdown = document.getElementById('state-dropdown');

    Object.entries(FighterState).forEach(([, value]) => {
        const option = document.createElement('option');
        option.setAttribute('value', value);
        option.innerText = value;
        dropdown.appendChild(option);
    });
}

window.addEventListener('load', function(){
    populateMoveDropdown();
    
    new HighwayToHellGame().start();
});