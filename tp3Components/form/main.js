const batiScores = document.querySelectorAll('.bati-score')

const vote = (level) => {
    for (let i = 0; i < batiScores.length; i++) {
        if(i <= level) {
            batiScores[i].children[0].classList.add('vote-logo-active') 
        }
        else {
            batiScores[i].children[0].classList.remove('vote-logo-active') 
            batiScores[i].children[0].classList.add('vote-logo-inactive') 
        }
    }
}

batiScores.forEach( (batiScore, i) => {
    batiScore.addEventListener('click', () => vote(i) )
})

