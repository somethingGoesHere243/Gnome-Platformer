// Function called as soon as page is loaded to create a new instance of the overworld and initialise it
(function() {
    const overworld = new OverWorld(document.querySelector('.game-container'));
    overworld.init();
})();