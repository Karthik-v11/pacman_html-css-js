
document.addEventListener('DOMContentLoaded', () => {

    const scoreDisplay = document.getElementById('score')
    const width = 28
    let score = 0
    const grid = document.querySelector('.grid')
    const layout = [
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
      1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
      1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
      1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
      1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
      1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
      4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
      1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
      1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
      1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
      1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
      1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
      1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
      1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
      1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
      1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
      1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]
    // 0 - pac-dots
    // 1 - wall
    // 2 - ghost-lair
    // 3 - power-pellet
    // 4 - empty
  
    const squares = []
  
    //create your board
    function createBoard() {
      for (let i = 0; i < layout.length; i++) {
        const square = document.createElement('div')
        grid.appendChild(square)
        squares.push(square)
  
        //add layout to the board
        if(layout[i] === 0) {
          squares[i].classList.add('pac-dot')
        } else if (layout[i] === 1) {
          squares[i].classList.add('wall')
        } else if (layout[i] === 2) {
          squares[i].classList.add('ghost-lair')
        } else if (layout[i] === 3) {
          squares[i].classList.add('power-pellet')
        }
      }
    }
    createBoard()

    let pacmanCurrentPos=490
    squares[pacmanCurrentPos].classList.add('pac-man')

    function movePacman(e){
        squares[pacmanCurrentPos].classList.remove('pac-man')

        switch(e.keyCode) {
            case 37:
              if(
                pacmanCurrentPos % width !== 0 &&
                !squares[pacmanCurrentPos -1].classList.contains('wall') &&
                !squares[pacmanCurrentPos -1].classList.contains('ghost-lair')
                )
              pacmanCurrentPos -= 1
              if (squares[pacmanCurrentPos -1] === squares[363]) {
                pacmanCurrentPos = 391
              }
              break
            case 38:
              if(
                pacmanCurrentPos - width >= 0 &&
                !squares[pacmanCurrentPos -width].classList.contains('wall') &&
                !squares[pacmanCurrentPos -width].classList.contains('ghost-lair')
                ) 
              pacmanCurrentPos -= width
              break
            case 39:
              if(
                pacmanCurrentPos % width < width - 1 &&
                !squares[pacmanCurrentPos +1].classList.contains('wall') &&
                !squares[pacmanCurrentPos +1].classList.contains('ghost-lair')
              )
              pacmanCurrentPos += 1
              if (squares[pacmanCurrentPos +1] === squares[392]) {
                pacmanCurrentPos = 364
              }
              break
            case 40:
              if (
                pacmanCurrentPos + width < width * width &&
                !squares[pacmanCurrentPos +width].classList.contains('wall') &&
                !squares[pacmanCurrentPos +width].classList.contains('ghost-lair')
              )
              pacmanCurrentPos += width
              break
          }
          squares[pacmanCurrentPos].classList.add('pac-man')
          pacDotEaten()
          powerPelletEaten()
          checkForGameOver()
          checkForWin()


    }
    document.addEventListener('keyup',movePacman)

    function pacDotEaten(){
        if (squares[pacmanCurrentPos].classList.contains('pac-dot')) {
            score++
            scoreDisplay.innerHTML = score
            squares[pacmanCurrentPos].classList.remove('pac-dot')
          }
    }

    function powerPelletEaten() {
        if (squares[pacmanCurrentPos].classList.contains('power-pellet')) {
          score +=10
          ghosts.forEach(ghost => ghost.isScared = true)
          setTimeout(unScareGhosts, 10000)
          squares[pacmanCurrentPos].classList.remove('power-pellet')
        }
      }
    
      function unScareGhosts() {
        ghosts.forEach(ghost => ghost.isScared = false)
      }

    class Ghost{
        constructor(className,startIndex, speed){
            this.className=className
            this.startIndex=startIndex
            this.speed=speed
            this.isScared=false
            this.currentIndex=startIndex
            this.timerId=NaN
        }
    }

    ghosts=[new Ghost('blinky',348,250),new Ghost('pinky',376,400),new Ghost('inky',351,300),new Ghost('clyde',379,500)]
    
    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.add(ghost.className)
        squares[ghost.currentIndex].classList.add('ghost')
    })

    ghosts.forEach(ghost=>moveGhost(ghost))

function moveGhost(ghost){
    const directions= [-1,+1,width,-width]
    let direction=directions[Math.floor(Math.random()*directions.length)]

    ghost.timerId=setInterval(function(){
        if  (!squares[ghost.currentIndex + direction].classList.contains('ghost') &&
        !squares[ghost.currentIndex + direction].classList.contains('wall') ) {
          
          squares[ghost.currentIndex].classList.remove(ghost.className)
          squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
        
          ghost.currentIndex += direction
          squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      
      } else direction = directions[Math.floor(Math.random() * directions.length)]

      if (ghost.isScared) {
        squares[ghost.currentIndex].classList.add('scared-ghost')
      }

      //if the ghost is currently scared and pacman is on it
      if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
        ghost.currentIndex = ghost.startIndex
        score +=100
        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      }
      checkForGameOver()
    },ghost.speed)
}

function checkForGameOver() {
    if (squares[pacmanCurrentPos].classList.contains('ghost') &&
      !squares[pacmanCurrentPos].classList.contains('scared-ghost')) {
      ghosts.forEach(ghost => clearInterval(ghost.timerId))
      document.removeEventListener('keyup', movePacman)
      setTimeout(function(){ alert("Game Over"); }, 500)
    }
  }

  //check for a win - more is when this score is reached
  function checkForWin() {
    if (score === 274) {
      ghosts.forEach(ghost => clearInterval(ghost.timerId))
      document.removeEventListener('keyup', movePacman)
      setTimeout(function(){ alert("You have WON!"); }, 500)
    }
  }
})
