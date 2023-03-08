import data from "./data.json" assert { type: 'json' }; 
const comments = document.querySelector(".comments");
const profPic = document.querySelector(".profpic");

let dataStorage = data;

console.log(dataStorage.comments[0]);

for(let i=0;i<dataStorage.comments.length; i++){
    const commentWrap = document.createElement('div');
    commentWrap.classList.add('comment-wrap');
    comments.appendChild(commentWrap);

    const comment = document.createElement('div');
    comment.classList.add('comment');
    commentWrap.appendChild(comment);

    // Comment Header
    const commentHeader = document.createElement('div');
    commentHeader.classList.add('comment-header');
    comment.appendChild(commentHeader);

    const headerIMG = document.createElement('img');
    headerIMG.src = dataStorage.comments[i].user.image['png'];
    commentHeader.appendChild(headerIMG);

    const commentUser = document.createElement('h2');
    commentUser.classList.add('name');
    commentUser.textContent = dataStorage.comments[i].user.username;
    commentHeader.appendChild(commentUser);
    
    const commentTime = document.createElement('p');
    commentTime.textContent = dataStorage.comments[i].createdAt;
    commentHeader.appendChild(commentTime);

    // Comment text
    const commentText = document.createElement('div');
    commentText.classList.add('comment-text');
    comment.appendChild(commentText);
    const commentP = document.createElement('p');
    commentP.textContent = dataStorage.comments[i].content;
    commentText.appendChild(commentP);

    // Comment Tools
    const commentTools = document.createElement('div');
    commentTools.classList.add('comment-tools');
    comment.appendChild(commentTools);

    const likeSection = document.createElement('div');
    likeSection.classList.add('like-section');
    commentTools.appendChild(likeSection);

    const replySection = document.createElement('div');
    replySection.classList.add('reply-section');
    commentTools.appendChild(replySection);

    const plus = document.createElement('img');
    plus.src = "./images/icon-plus.svg";
    likeSection.appendChild(plus);

    const likeCount = document.createElement('span');
    likeCount.id = "likes-count";
    likeCount.textContent = dataStorage.comments[i].score;
    likeSection.appendChild(likeCount);

    const minus = document.createElement('img');
    minus.src = "./images/icon-minus.svg";
    likeSection.appendChild(minus);

    const replyWRAP = document.createElement('div');
    replyWRAP.classList.add('reply-section');
    commentTools.appendChild(replyWRAP);

    const replyIMG = document.createElement('img');
    replyIMG.src = "./images/icon-reply.svg";
    replyWRAP.appendChild(replyIMG);
    
    const replySPAN= document.createElement('span');
    replySPAN.classList.add('reply-click');
    replySPAN.textContent = "Reply";
    replyWRAP.appendChild(replySPAN);
    
    if(dataStorage.comments[i].replies.length !== 0){
        for(let x=0; x<dataStorage.comments[i].replies.length; x++){
            
            const commentReply = document.createElement('div');
            commentReply.classList.add('comment-replys');
            commentWrap.appendChild(commentReply);

            const reply = document.createElement('div');
            reply.classList.add('reply');
            commentReply.appendChild(reply);

            // Reply Header

            const replyHeader = document.createElement('div');
            replyHeader.classList.add('reply-header');
            reply.appendChild(replyHeader);

            const replyIMG = document.createElement('img');
            replyIMG.src = dataStorage.comments[i].replies[x].user.image['png'];
            replyHeader.appendChild(replyIMG);
            
            const replyName = document.createElement('h2');
            replyName.textContent = dataStorage.comments[i].replies[x].user.username;
            replyHeader.appendChild(replyName);

            const replyTime = document.createElement('p');
            replyTime.textContent = dataStorage.comments[i].replies[x].createdAt;
            replyHeader.appendChild(replyTime);

            // Reply Body

            const replyText = document.createElement('div');
            replyText.classList.add('reply-text');
            reply.appendChild(replyText);

            const ReplyTextInput = document.createElement('p');
            ReplyTextInput.textContent = dataStorage.comments[i].replies[x].content;
            replyText.appendChild(ReplyTextInput);

            // Reply Tools

            const commentTools = document.createElement('div');
            commentTools.classList.add('comment-tools');
            reply.appendChild(commentTools);
            const likeSection = document.createElement('div');
            likeSection.classList.add('like-section');
            commentTools.appendChild(likeSection);
            const replySection = document.createElement('div');
            replySection.classList.add('reply-section');
            commentTools.appendChild(replySection);

            const plus = document.createElement('img');
            plus.src = "./images/icon-plus.svg";
            likeSection.appendChild(plus);

            const likeCount = document.createElement('span');
            likeCount.id = "likes-count";
            likeCount.textContent = dataStorage.comments[i].replies[x].score;
            likeSection.appendChild(likeCount);

            const minus = document.createElement('img');
            minus.src = "./images/icon-minus.svg";
            likeSection.appendChild(minus);

            const replyWRAP = document.createElement('div');
            replyWRAP.classList.add('reply-section');
            commentTools.appendChild(replyWRAP);

            const replyImg = document.createElement('img');
            replyImg .src = "./images/icon-reply.svg";
            replyWRAP.appendChild(replyImg );
            
            const replySPAN= document.createElement('span');
            replySPAN.classList.add('reply-click');
            replySPAN.textContent = "Reply";
            replyWRAP.appendChild(replySPAN);
    
        }




    }

}
 


profPic.src = data.currentUser.image['png'];
