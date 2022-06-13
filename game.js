const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'You are camping and you come across a black bear in close proximity to you ',
    options: [
      {
        text: 'Charge at it',
        setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'Lie on the floor, do not move',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'Your reaction to the bear does not scare it off. What do you do now? ',
    options: [
      {
         text: 'RUN',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        text: 'Make loud noises',
       
        nextText: 4
      },
      {
        text: 'Remain calm',
        nextText: 4
      }
    ]
  },
  {
    id: 3,
    text: 'You died',
    options: [
      {
        text: 'Restart',
        nextText: -1
      },
      
      
    ]
  },
  {
    id: 4,
    text: 'You escape the bear and come across an Alligator. ',
    options: [
      {
        text: 'Run in zigzags',
        nextText: 5
    
      },
    
      {
        text: 'Keep at a distance',
        nextText: 6
   }
  ]
   },
  
  {
    id: 5,
    text: 'The Alliagtor catches you',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'The alligator creeps up on you',
    options: [
      {
        text: 'Find an excape plan ',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'You look around to see what is near you and how to surive .',
    options: [
      {
        text: 'Have a staring contest ',
        nextText: 8
      },
      {
        text: 'Fight the Alligator using all your strength',
        
        nextText: 9
      },
      {
        text: 'Remain still',
       
        nextText: 10
      },
      {
        text: 'There is a tall tree right next to you that you can climb',
       
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Your staring contest lead the Alligator to charge at you.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'Unfortunately, you were not strong enough to beat the Alligator',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'Remaining still did not refrain the Alligator.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'You climbed up the tall tree next to you and the Alligator could not get up there. Therefore you spared yourself enough time to call 911 to come and save you. ',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1
      }
    ]
  }
]

startGame()