// ==UserScript==
// @author         smthngsaid
// @name           Neopets - Battledome Prize Counter
// @description    Keeps a count of the items and Neopoints you've won today
// @match        https://www.neopets.com/dome/arena.phtml
// ==/UserScript==
$(document).ready(function () {
    $('#arenacontainer').on('click', '.end_game', function () {
        displayTotals();
    });
});
function displayTotals() {
    let rewardsBox = document.getElementById("bd_rewards");
    //In case of double click
    if (rewardsBox.children[1].children.length > 0) {
        return;
    }
    //Grab stored info. If it's a new day, reset everything.
    var d = new Date();
    var currentDate = d.getDate();
    var storedDate = window.localStorage.getItem('battledomeDate');
    var nPCount = window.localStorage.getItem('battledomeNPCount') == null ? 0 : parseInt(window.localStorage.getItem('battledomeNPCount'));
    var itemCount = window.localStorage.getItem('battledomeItemCount') == null ? 0 : parseInt(window.localStorage.getItem('battledomeItemCount'));
    var pointCount = window.localStorage.getItem('battledomePointCount') == null ? 0 : parseInt(window.localStorage.getItem('battledomePointCount'));
    if (storedDate != currentDate) {
        nPCount = 0;
        itemCount = 0;
        pointCount = 0;
        window.localStorage.setItem('battledomeNPCount', nPCount);
        window.localStorage.setItem('battledomeItemCount', itemCount);
        window.localStorage.setItem('battledomePointCount', pointCount);
        window.localStorage.setItem('battledomeDate', currentDate);
    }
    //Add any winnings and store the new totals
    let prizes = document.querySelectorAll("span.prizname");
    if (prizes.length > 0) {
        for (let i = 0; i < prizes.length; i++) {
            if (/\d+ Neopoints/.test(prizes[i].textContent)) {
                let np = prizes[i].textContent.split(' ')[0];
                nPCount += parseInt(np);
            } else if (/\d+ Plot Points/.test(prizes[i].textContent)) {
                let points = prizes[i].textContent.split(' ')[0];
                pointCount += parseInt(points);
            } else {
                itemCount += 1;
            }
        }
        window.localStorage.setItem('battledomeNPCount', nPCount);
        window.localStorage.setItem('battledomeItemCount', itemCount);
        window.localStorage.setItem('battledomePointCount', pointCount);
    }
    //Display the totals
    let counter = document.createElement("span");
    counter.setAttribute("nowrap", "nowrap");
    let items = document.createElement("strong");
    items.textContent = ' Items: ' + itemCount;
    let separator = document.createElement("span");
    separator.textContent = ' | ';
    separator.setAttribute("style", "font-weight: normal;");
    let separator2 = document.createElement("span");
    separator2.textContent = ' | ';
    separator2.setAttribute("style", "font-weight: normal;");
    let np = document.createElement("strong");
    np.textContent = 'NP: ' + nPCount;
    let points = document.createElement("strong");
    points.textContent = 'Plot: ' + pointCount;
    rewardsBox.children[1].appendChild(counter).appendChild(items).appendChild(separator).appendChild(np).appendChild(separator2).appendChild(points);
}
