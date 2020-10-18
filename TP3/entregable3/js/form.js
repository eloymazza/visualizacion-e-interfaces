const loadFormJS = () => {

    const commentsForm = document.querySelector('.comments-form')
    const batiScores = document.querySelectorAll('.bati-score')
    const sendButton = document.querySelector('#send-button')
    const batmanLogocontainer = document.querySelector('.batman-logo-container')
    const commentSentContainer =  document.querySelector('.comment-sent-container')
    const sendAgainButton =  document.querySelector('#send-again-button')

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
    
    const sendComment = () => {
        commentsForm.classList.remove("rotate-in")
        commentSentContainer.classList.remove("rotate-in")
        commentSentContainer.hidden = false
        commentsForm.classList.add('transform-origin-top')
        sendButton.classList.add("hide-send-button")
        batmanLogocontainer.style.zIndex = 0
        setTimeout(showCommentsLogo, 2000)
    }
    
    const showCommentsLogo = () => {
        batmanLogocontainer.style.opacity = 1
        setTimeout(closeCommentsForm, 2000)
    }
    
    const closeCommentsForm = () => {
        commentsForm.classList.add('close-comments-form')
        batmanLogocontainer.classList.add('move-up-logo')
        setTimeout(() => {
            commentSentContainer.style.zIndex = 5
        }, 2000)
    }
    
    const sendCommentAgain = () => {
        commentSentContainer.style.zIndex = -1
        commentsForm.classList.remove('close-comments-form')
        batmanLogocontainer.classList.remove('move-up-logo')
        setTimeout(() => {
            batmanLogocontainer.style.opacity = 0
            setTimeout(() => {
                sendButton.classList.remove("hide-send-button")
            }, 2000)
        }, 2000)
    }
    
    batiScores.forEach( (batiScore, i) => {
        batiScore.addEventListener('click', () => vote(i) )
    })
    sendButton.addEventListener("click", sendComment)
    sendAgainButton.addEventListener('click', sendCommentAgain)
    
}

