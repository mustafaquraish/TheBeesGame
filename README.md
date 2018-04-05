# The Bees Game

# Controls

`Arrow Keys` to move.

`Space` to reset game when you lose all lives.

Keys `0-6` to have that many number of bees.

---

# Scoring

This game is time based. Your score increases every 2 seconds, but only if you have bees on the screen.

Closing the browser screen clears the high score. This is modelled after the original game.

---

# Why?

Recently made this game using Verilog to run on a DE2 board for a university course. Wanted to recreate it using JavaScript just to be able to share it. Everything except being able to change the speed of the game is currently supported, however score has to be displayed on the screen now instead of the DE2 board on the HEX displays.

Aside from the score text, the screen has been divided into a 160x120 screen, and all game mechanics involving movement, collision detection, etc take place on this grid and in a very similar manner to the game for the FPGA, and all graphics including colors are kept intact.

---

# The Game

[Click here to start the game](http://mustafaquraish.github.io/TheBeesGame)
