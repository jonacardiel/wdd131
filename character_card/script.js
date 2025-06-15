const character = {
  name: "Snortleblat",
  class: "Swamp Beast Diplomat",
  level: 5,
  health: 100,
  image: 'https://andejuli.github.io/wdd131/character_card/snortleblat.webp',

  /**
   * Method to simulate the character being attacked.
   * Decreases health by 20. If health drops below 20, logs a "Character Died" message.
   */
  attacked() {
    const logElement = document.getElementById('log');
    if (this.health >= 20) {
      this.health -= 20;
      logElement.textContent = `Snortleblat was attacked! Health reduced to ${this.health}.`;
    } else {
      // Instead of alert(), update a log message on the page
      logElement.textContent = 'Character Died!';
      // Optionally disable buttons or add a "game over" state here
    }
    // Update the DOM after health changes
    updateCharacterDisplay();
  },

  /**
   * Method to simulate the character leveling up.
   * Increases level by 1 and health by 20.
   */
  levelUp() {
    this.level += 1;
    this.health += 20;
    document.getElementById('log').textContent = `Snortleblat leveled up! Now Level ${this.level} with ${this.health} health.`;
    // Update the DOM after level/health changes
    updateCharacterDisplay();
  }
};


/**
 * Function to update the character's properties in the DOM.
 * This function is called on page load and after each button interaction.
 */
function updateCharacterDisplay() {
  document.querySelector('.image').src = character.image;
  document.querySelector('.name').textContent = character.name;
  document.getElementById('class').textContent = character.class;
  document.getElementById('level').textContent = character.level;
  document.getElementById('health').textContent = character.health;
}

// Event Listeners for the buttons
document.addEventListener('DOMContentLoaded', () => {
  // Call updateCharacterDisplay once when the page loads to show initial stats
  updateCharacterDisplay();

  const attackedButton = document.getElementById('attacked');
  const levelUpButton = document.getElementById('levelup');

  // Add event listener for the 'Attacked' button
  attackedButton.addEventListener('click', () => {
    character.attacked();
  });

  // Add event listener for the 'Level Up' button
  levelUpButton.addEventListener('click', () => {
    character.levelUp();
  });
});
