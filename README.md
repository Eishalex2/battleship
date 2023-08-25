# battleship

// game loop (done)
// game ends function (done)
// how to place the ships git pushon the board (done)
// improve computer ai guessing (somehow store the previous two guesses,
could have it be a queue)
// improve visuals
// Add game ends visuals
// Add new game functionality (done, but may need to mess with the
z-index of the popup, or just set it to display none, and ditch the animation)
// Add remaining ships visuals
// Recheck and revise tests

Ideas: winner popup (do this). Look at EmptyBox's board (https://emptybox12.github.io/battleship/). Misses should
be blue for water.

When you're placing the ships, have the ships names on the place board
container.

6 things remaining:
- (done) git Add a key (X = miss, O = hit)
- Ships remaining capability
- Make it so that ships cannot be placed next to or adjacent from each
  other
- Add a custom message when placing each ship (Place your destroyer, etc.)
- Improve computer AI
- Recheck and revise tests