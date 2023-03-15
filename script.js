import data from "./data.json" assert { type: "json" };
const comments = document.querySelector(".comments");
const profPic = document.querySelector(".profpic");
const AddCommentMain = document.getElementById("AddCommentMain");
const deleteBox = document.querySelector(".delete-box");
const deleteYes = document.getElementById("yesbutton");
const deleteNo = document.getElementById("nobutton");
const commentMainButton = document.getElementById("CommentMainButton");
let dataStorage = data;
let dataSaver = "";
profPic.src = data.currentUser.image["png"];

function commentDisplayData() {
  comments.innerHTML = "";

  for (let i = 0; i < dataStorage.comments.length; i++) {
    const commentWrap = document.createElement("div");
    commentWrap.classList.add("comment-wrap");
    comments.appendChild(commentWrap);

    const comment = document.createElement("div");
    comment.classList.add("comment");
    commentWrap.appendChild(comment);

    // Comment Header
    const commentHeader = document.createElement("div");
    commentHeader.classList.add("comment-header");
    comment.appendChild(commentHeader);

    const headerIMG = document.createElement("img");
    headerIMG.src = dataStorage.comments[i].user.image["png"];
    commentHeader.appendChild(headerIMG);

    const commentUser = document.createElement("h2");
    commentUser.classList.add("name");
    commentUser.textContent = dataStorage.comments[i].user.username;
    commentHeader.appendChild(commentUser);

    const commentTime = document.createElement("p");
    commentTime.textContent = dataStorage.comments[i].createdAt;
    commentHeader.appendChild(commentTime);

    // Comment text
    const commentText = document.createElement("div");
    commentText.classList.add("comment-text");
    comment.appendChild(commentText);
    const commentP = document.createElement("p");
    commentP.textContent = dataStorage.comments[i].content;
    commentText.appendChild(commentP);

    // Comment Tools
    const commentTools = document.createElement("div");
    commentTools.classList.add("comment-tools");
    comment.appendChild(commentTools);

    const likeSection = document.createElement("div");
    likeSection.classList.add("like-section");
    commentTools.appendChild(likeSection);

    const plus = document.createElement("img");
    plus.src = "./images/icon-plus.svg";
    likeSection.appendChild(plus);

    const likeCount = document.createElement("span");
    likeCount.id = "likes-count";
    likeCount.textContent = dataStorage.comments[i].score;
    likeSection.appendChild(likeCount);

    const minus = document.createElement("img");
    minus.src = "./images/icon-minus.svg";
    likeSection.appendChild(minus);

    if (dataStorage.currentUser.username === dataStorage.comments[i].user.username) {
      const replyEdit = document.createElement("div");
      replyEdit.classList.add("reply-edit");
      commentTools.append(replyEdit);

      // Delete Icon

      const editDelete = document.createElement("div");
      editDelete.classList.add("delete");
      replyEdit.append(editDelete);
      const imgDelete = document.createElement("img");
      imgDelete.src = "./images/icon-delete.svg";
      editDelete.append(imgDelete);
      const deleteSpan = document.createElement("span");
      deleteSpan.textContent = "Delete";
      editDelete.append(deleteSpan);

      // Edit Icon
      const edit = document.createElement("div");
      edit.classList.add("edit");
      replyEdit.append(edit);

      const editIMG = document.createElement("img");
      editIMG.src = "./images/icon-edit.svg";
      edit.append(editIMG);

      const editSpan = document.createElement("span");
      editSpan.textContent = "Edit";
      edit.append(editSpan);

      
      deleteSpan.addEventListener("click", () => {
        deleteBox.style.display = "flex";
        deleteYes.addEventListener("click", () => {
          dataStorage.comments.splice(i, 1);
          commentDisplayData();
          deleteBox.style.display = "none";
        });
        deleteNo.addEventListener("click", () => {
          deleteBox.style.display = "none";
        });
      });

      let isEdit = false; // initialize a variable to keep track of edit mode

      editSpan.addEventListener("click", () => {
        if (isEdit) {
          // Nothing
        } else {
          commentP.style.display = "none";
          const editCommentTextArea = document.createElement("textarea");
          editCommentTextArea.classList.add("edit-text-area-comment");
          editCommentTextArea.value = dataStorage.comments[i].content;
          commentText.append(editCommentTextArea);
          const editCommentTextUpdateBtn = document.createElement("button");
          editCommentTextUpdateBtn.classList.add(
            "edit-Comment-Text-Update-Btn"
          );
          editCommentTextUpdateBtn.innerText = "UPDATE";
          commentText.append(editCommentTextUpdateBtn);
          editCommentTextUpdateBtn.addEventListener("click", () => {
            dataStorage.comments[i].content = editCommentTextArea.value;
            editCommentTextArea.remove();
            editCommentTextUpdateBtn.remove();
            commentP.innerText = dataStorage.comments[i].content;
            commentP.style.display = "unset";
            isEdit = false;
          });
        }
        isEdit = true;
      });

      const childElements = likeSection.querySelectorAll("*");
      let save = parseInt(childElements[1].innerText);

      likeSection.firstElementChild.addEventListener("click", () => {
        const currentCount = parseInt(childElements[1].innerText);
        if (
          save == parseInt(childElements[1].innerText) ||
          save > parseInt(childElements[1].innerText)
        ) {
          childElements[1].innerText = currentCount + 1;
        }
      });

      childElements[2].addEventListener("click", () => {
        const currentCount = parseInt(childElements[1].innerText);
        if (
          save == parseInt(childElements[1].innerText) ||
          save < parseInt(childElements[1].innerText)
        ) {
          childElements[1].innerText = currentCount - 1;
        }
      });
    } else {
      const replyWRAP = document.createElement("div");
      replyWRAP.classList.add("reply-section");
      commentTools.appendChild(replyWRAP);

      const replyIMG = document.createElement("img");
      replyIMG.src = "./images/icon-reply.svg";
      replyWRAP.appendChild(replyIMG);

      const replySPAN = document.createElement("span");
      replySPAN.classList.add("reply-click");
      replySPAN.textContent = "Reply";
      replyWRAP.appendChild(replySPAN);

      // Like-Dislike functionality

      const childElements = likeSection.querySelectorAll("*");
      let save = parseInt(childElements[1].innerText);

      likeSection.firstElementChild.addEventListener("click", () => {
        const currentCount = parseInt(childElements[1].innerText);
        if (
          save == parseInt(childElements[1].innerText) ||
          save > parseInt(childElements[1].innerText)
        ) {
          childElements[1].innerText = currentCount + 1;
        }
      });

      childElements[2].addEventListener("click", () => {
        const currentCount = parseInt(childElements[1].innerText);
        if (
          save == parseInt(childElements[1].innerText) ||
          save < parseInt(childElements[1].innerText)
        ) {
          childElements[1].innerText = currentCount - 1;
        }
      });

      // ..
      if (dataStorage.comments[i].replies.length !== 0) {
        for (let x = 0; x < dataStorage.comments[i].replies.length; x++) {
          const commentReply = document.createElement("div");
          commentReply.classList.add("comment-replys");
          commentWrap.appendChild(commentReply);

          const reply = document.createElement("div");
          reply.classList.add("reply");
          commentReply.appendChild(reply);

          // Reply Header

          const replyHeader = document.createElement("div");
          replyHeader.classList.add("reply-header");
          reply.appendChild(replyHeader);

          const replyIMG = document.createElement("img");
          replyIMG.src = dataStorage.comments[i].replies[x].user.image["png"];
          replyHeader.appendChild(replyIMG);

          const replyName = document.createElement("h2");
          replyName.textContent =
            dataStorage.comments[i].replies[x].user.username;
          replyHeader.appendChild(replyName);

          const replyTime = document.createElement("p");
          replyTime.textContent = dataStorage.comments[i].replies[x].createdAt;
          replyHeader.appendChild(replyTime);

          // Reply Body

          const replyText = document.createElement("div");
          replyText.classList.add("reply-text");
          reply.appendChild(replyText);

          const ReplyTextInput = document.createElement("p");
          ReplyTextInput.textContent =
            dataStorage.comments[i].replies[x].content;
          replyText.appendChild(ReplyTextInput);

          // Reply Tools

          const commentTools = document.createElement("div");
          commentTools.classList.add("comment-tools");
          reply.appendChild(commentTools);

          const likeSection = document.createElement("div");
          likeSection.classList.add("like-section");
          commentTools.appendChild(likeSection);

          const replySection = document.createElement("div");
          replySection.classList.add("reply-section");
          commentTools.appendChild(replySection);

          const plus = document.createElement("img");
          plus.src = "./images/icon-plus.svg";
          likeSection.appendChild(plus);

          const likeCount = document.createElement("span");
          likeCount.id = "likes-count";
          likeCount.textContent = dataStorage.comments[i].replies[x].score;
          likeSection.appendChild(likeCount);

          const minus = document.createElement("img");
          minus.src = "./images/icon-minus.svg";
          likeSection.appendChild(minus);

          const replyWRAP = document.createElement("div");
          replyWRAP.classList.add("reply-section");
          commentTools.appendChild(replyWRAP);

          const replyImg = document.createElement("img");
          replyImg.src = "./images/icon-reply.svg";
          replyWRAP.appendChild(replyImg);

          const replySPAN = document.createElement("span");
          replySPAN.classList.add("reply-click");
          replySPAN.textContent = "Reply";
          replyWRAP.appendChild(replySPAN);

          const childElements = likeSection.querySelectorAll("*");
          let save = parseInt(childElements[1].innerText);

          likeSection.firstElementChild.addEventListener("click", () => {
            const currentCount = parseInt(childElements[1].innerText);
            if (
              save == parseInt(childElements[1].innerText) ||
              save > parseInt(childElements[1].innerText)
            ) {
              childElements[1].innerText = currentCount + 1;
            }
          });

          childElements[2].addEventListener("click", () => {
            const currentCount = parseInt(childElements[1].innerText);
            if (
              save == parseInt(childElements[1].innerText) ||
              save < parseInt(childElements[1].innerText)
            ) {
              childElements[1].innerText = currentCount - 1;
            }
          });

          

          replySPAN.addEventListener("click", () => {
            if (isReplying) {
              for (let i = 0; i < commentWrap.children.length; i++) {
                const childElement = commentWrap.children[i];
                if (childElement.classList.contains("commentAdd")) {
                  childElement.remove();
                }
              }
              isReplying = false;
              return;
            }

            isReplying = true;
            const addComment = document.createElement("div");
            addComment.classList.add("commentAdd");
            commentWrap.appendChild(addComment);


            const AddCommentText = document.createElement("textarea");
            AddCommentText.classList.add("commentAdd-Text");
            AddCommentText.value = `@${dataStorage.comments[i].replies[0].user.username}, `;
            addComment.append(AddCommentText);

            const sendbtnContainer = document.createElement("div");
            sendbtnContainer.classList.add("send-btn-container");
            addComment.append(sendbtnContainer);

            const AddCommentButton = document.createElement("button");
            AddCommentButton.classList.add("add-comment-button");
            AddCommentButton.innerText = "REPLY";
            sendbtnContainer.append(AddCommentButton);

            const addCommentImg = document.createElement("img");
            addCommentImg.classList.add("commentAddIMG");
            addCommentImg.src = data.currentUser.image["png"];
            sendbtnContainer.append(addCommentImg);

            AddCommentButton.addEventListener("click", () => {
              if (AddCommentText.value.trim() === "" || AddCommentText.value.trim() === `@${dataStorage.comments[i].replies[0].user.username},`) {
                console.log("ok");
              } else {
              addComment.remove();
              const commentReply = document.createElement("div");
              commentReply.classList.add("comment-replys");
              commentWrap.appendChild(commentReply);


              const reply = document.createElement("div");
              reply.classList.add("reply");
              commentReply.appendChild(reply);

              // Reply Header

              const replyHeader = document.createElement("div");
              replyHeader.classList.add("reply-header");
              reply.appendChild(replyHeader);

              const replyIMG = document.createElement("img");
              replyIMG.src = dataStorage.currentUser.image["png"];
              replyHeader.appendChild(replyIMG);

              const replyName = document.createElement("h2");
              replyName.textContent = dataStorage.currentUser.username;
              replyHeader.appendChild(replyName);

              const replyTime = document.createElement("p");
              replyTime.textContent = "just now";
              replyHeader.appendChild(replyTime);

              // Reply Body

              const replyText = document.createElement("div");
              replyText.classList.add("reply-text");
              reply.appendChild(replyText);

              const ReplyTextInput = document.createElement("p");
              ReplyTextInput.textContent = AddCommentText.value.replace(`@${dataStorage.comments[i].replies[0].user.username}, `, '');
              dataSaver = AddCommentText.value;
              replyText.appendChild(ReplyTextInput);

              const blueTag = document.createElement("span");
              blueTag.classList.add("blueTag");
              blueTag.textContent = `@${dataStorage.comments[i].user.username}, `;
              ReplyTextInput.insertBefore(blueTag, ReplyTextInput.firstChild);

              // Reply Tools

              const commentTools = document.createElement("div");
              commentTools.classList.add("comment-tools");
              reply.appendChild(commentTools);

              const likeSection = document.createElement("div");
              likeSection.classList.add("like-section");
              commentTools.appendChild(likeSection);

              const plus = document.createElement("img");
              plus.src = "./images/icon-plus.svg";
              likeSection.appendChild(plus);

              const likeCount = document.createElement("span");
              likeCount.id = "likes-count";
              likeCount.textContent = 0;
              likeSection.appendChild(likeCount);

              const minus = document.createElement("img");
              minus.src = "./images/icon-minus.svg";
              likeSection.appendChild(minus);

              const replyEdit = document.createElement("div");
              replyEdit.classList.add("reply-edit");
              commentTools.append(replyEdit);

              const childElements = likeSection.querySelectorAll("*");
              let save = parseInt(childElements[1].innerText);

              likeSection.firstElementChild.addEventListener("click", () => {
                const currentCount = parseInt(childElements[1].innerText);
                if (
                  save == parseInt(childElements[1].innerText) ||
                  save > parseInt(childElements[1].innerText)
                ) {
                  childElements[1].innerText = currentCount + 1;
                }
              });

              childElements[2].addEventListener("click", () => {
                const currentCount = parseInt(childElements[1].innerText);
                if (
                  save == parseInt(childElements[1].innerText) ||
                  save < parseInt(childElements[1].innerText)
                ) {
                  childElements[1].innerText = currentCount - 1;
                }
              });

              // Delete Icon

              const editDelete = document.createElement("div");
              editDelete.classList.add("delete");
              replyEdit.append(editDelete);
              const imgDelete = document.createElement("img");
              imgDelete.src = "./images/icon-delete.svg";
              editDelete.append(imgDelete);
              const deleteSpan = document.createElement("span");
              deleteSpan.textContent = "Delete";
              editDelete.append(deleteSpan);

              // Edit Icon
              const edit = document.createElement("div");
              edit.classList.add("edit");
              replyEdit.append(edit);

              const editIMG = document.createElement("img");
              editIMG.src = "./images/icon-edit.svg";
              edit.append(editIMG);

              const editSpan = document.createElement("span");
              editSpan.textContent = "Edit";
              edit.append(editSpan);

              deleteSpan.addEventListener("click", () => {
                deleteBox.style.display = "flex";
                deleteYes.addEventListener("click", () => {
                  reply.remove();
                  commentReply.remove();
                  deleteBox.style.display = "none";
                });
                deleteNo.addEventListener("click", () => {
                  deleteBox.style.display = "none";
                });
              });

              let isEdit = false; // initialize a variable to keep track of edit mode

              editSpan.addEventListener("click", () => {
                if (isEdit) {
                  // do nothing
                } else {
                  const firstChild = replyText.firstChild;
                  if (firstChild) {
                    replyText.removeChild(firstChild);
                  }

                  const editTextArea = document.createElement("textarea");
                  editTextArea.classList.add("edit-text-area");
                  editTextArea.innerText = dataSaver;
                  replyText.append(editTextArea);

                  const editUpdateBtn = document.createElement("button");
                  editUpdateBtn.classList.add("edit-update");
                  editUpdateBtn.textContent = "UPDATE";
                  reply.insertBefore(editUpdateBtn, reply.children[2]);

                  console.log(dataSaver);

                  editUpdateBtn.addEventListener("click", () => {
                    const firstChild = replyText.firstChild;
                    replyText.removeChild(firstChild);

                    const ReplyTextInput = document.createElement("p");
                    ReplyTextInput.textContent = editTextArea.value;
                    replyText.appendChild(ReplyTextInput);

                    editUpdateBtn.remove();

                    dataSaver = editTextArea.value;
                    isEdit = false;
                  });
                }
                isEdit = true; // toggle edit mode
              });
            }
            });
          });
        }
      }

      let isReplying = false;

      replySPAN.addEventListener("click", () => {
        if (isReplying) {
          for (let i = 0; i < commentWrap.children.length; i++) {
            const childElement = commentWrap.children[i];
            if (childElement.classList.contains("commentAdd")) {
              childElement.remove();
            }
          }
          isReplying = false;
          return;
        }

        isReplying = true;
        const addComment = document.createElement("div");
        addComment.classList.add("commentAdd");
        commentWrap.insertBefore(addComment, commentWrap.childNodes[1]);

        const AddCommentText = document.createElement("textarea");
        AddCommentText.classList.add("commentAdd-Text");
        AddCommentText.value = `@${dataStorage.comments[i].user.username}, `;
        addComment.append(AddCommentText);

        const sendbtnContainer = document.createElement("div");
        sendbtnContainer.classList.add("send-btn-container");
        addComment.append(sendbtnContainer);

        const AddCommentButton = document.createElement("button");
        AddCommentButton.classList.add("add-comment-button");
        AddCommentButton.innerText = "REPLY";
        sendbtnContainer.append(AddCommentButton);

        const addCommentImg = document.createElement("img");
        addCommentImg.classList.add("commentAddIMG");
        addCommentImg.src = data.currentUser.image["png"];
        sendbtnContainer.append(addCommentImg);

        AddCommentButton.addEventListener("click", () => {
          if (AddCommentText.value.trim() === "" || AddCommentText.value.trim() === `@${dataStorage.comments[i].user.username},`) {
           
          } else {
          addComment.remove();
          const commentReply = document.createElement("div");
          commentReply.classList.add("comment-replys");
          commentWrap.insertBefore(commentReply, commentWrap.childNodes[1]);

          const reply = document.createElement("div");
          reply.classList.add("reply");
          commentReply.appendChild(reply);

          // Reply Header

          const replyHeader = document.createElement("div");
          replyHeader.classList.add("reply-header");
          reply.appendChild(replyHeader);

          const replyIMG = document.createElement("img");
          replyIMG.src = dataStorage.currentUser.image["png"];
          replyHeader.appendChild(replyIMG);

          const replyName = document.createElement("h2");
          replyName.textContent = dataStorage.currentUser.username;
          replyHeader.appendChild(replyName);

          const replyTime = document.createElement("p");
          replyTime.textContent = "just now";
          replyHeader.appendChild(replyTime);

          // Reply Body

          const replyText = document.createElement("div");
          replyText.classList.add("reply-text");
          reply.appendChild(replyText);

          const ReplyTextInput = document.createElement("p");
          ReplyTextInput.textContent = AddCommentText.value.replace(`@${dataStorage.comments[i].user.username}, `, '');
          dataSaver = AddCommentText.value;
          replyText.appendChild(ReplyTextInput);

          const blueTag = document.createElement("span");
          blueTag.classList.add("blueTag");
          blueTag.textContent = `@${dataStorage.comments[i].user.username}, `;
          ReplyTextInput.insertBefore(blueTag, ReplyTextInput.firstChild);


          // Reply Tools

          const commentTools = document.createElement("div");
          commentTools.classList.add("comment-tools");
          reply.appendChild(commentTools);

          const likeSection = document.createElement("div");
          likeSection.classList.add("like-section");
          commentTools.appendChild(likeSection);

          const plus = document.createElement("img");
          plus.src = "./images/icon-plus.svg";
          likeSection.appendChild(plus);

          const likeCount = document.createElement("span");
          likeCount.id = "likes-count";
          likeCount.textContent = 0;
          likeSection.appendChild(likeCount);

          const minus = document.createElement("img");
          minus.src = "./images/icon-minus.svg";
          likeSection.appendChild(minus);

          const replyEdit = document.createElement("div");
          replyEdit.classList.add("reply-edit");
          commentTools.append(replyEdit);

          const childElements = likeSection.querySelectorAll("*");
          let save = parseInt(childElements[1].innerText);

          likeSection.firstElementChild.addEventListener("click", () => {
            const currentCount = parseInt(childElements[1].innerText);
            if (
              save == parseInt(childElements[1].innerText) ||
              save > parseInt(childElements[1].innerText)
            ) {
              childElements[1].innerText = currentCount + 1;
            }
          });

          childElements[2].addEventListener("click", () => {
            const currentCount = parseInt(childElements[1].innerText);
            if (
              save == parseInt(childElements[1].innerText) ||
              save < parseInt(childElements[1].innerText)
            ) {
              childElements[1].innerText = currentCount - 1;
            }
          });

          // Delete Icon

          const editDelete = document.createElement("div");
          editDelete.classList.add("delete");
          replyEdit.append(editDelete);
          const imgDelete = document.createElement("img");
          imgDelete.src = "./images/icon-delete.svg";
          editDelete.append(imgDelete);
          const deleteSpan = document.createElement("span");
          deleteSpan.textContent = "Delete";
          editDelete.append(deleteSpan);

          // Edit Icon
          const edit = document.createElement("div");
          edit.classList.add("edit");
          replyEdit.append(edit);

          const editIMG = document.createElement("img");
          editIMG.src = "./images/icon-edit.svg";
          edit.append(editIMG);

          const editSpan = document.createElement("span");
          editSpan.textContent = "Edit";
          edit.append(editSpan);

          deleteSpan.addEventListener("click", () => {
            deleteBox.style.display = "flex";
            deleteYes.addEventListener("click", () => {
              reply.remove();
              commentReply.remove();
              deleteBox.style.display = "none";
            });
            deleteNo.addEventListener("click", () => {
              deleteBox.style.display = "none";
            });
          });

          editSpan.addEventListener("click", () => {
            const firstChild = replyText.firstChild;
            if (firstChild) {
              replyText.removeChild(firstChild);
            }

            const editTextArea = document.createElement("textarea");
            editTextArea.classList.add("edit-text-area");
            editTextArea.innerText = dataSaver;
            replyText.append(editTextArea);

            const editUpdateBtn = document.createElement("button");
            editUpdateBtn.classList.add("edit-update");
            editUpdateBtn.textContent = "UPDATE";
            reply.insertBefore(editUpdateBtn, reply.children[2]);

            console.log(dataSaver);

            editUpdateBtn.addEventListener("click", () => {
              const firstChild = replyText.firstChild;
              replyText.removeChild(firstChild);

              const ReplyTextInput = document.createElement("p");
              ReplyTextInput.textContent = editTextArea.value;
              replyText.appendChild(ReplyTextInput);

              editUpdateBtn.remove();

              dataSaver = editTextArea.value;
            });
          });
          }
        });
      });
    }
  }

  replyMove();
}

commentDisplayData();

commentMainButton.addEventListener("click", () => {
  const newComment = {
    id: dataStorage.comments.length + 1,
    content: AddCommentMain.value,
    createdAt: "just now",
    score: 0,
    user: {
      image: {
        png: data.currentUser.image["png"],
      },
      username: data.currentUser.username,
    },
    replies: [],
  };

  dataStorage.comments.push(newComment);
  commentDisplayData();
  AddCommentMain.value = "";
  replyMove();
});



function replyMove() {
  const mediaQuery = window.matchMedia('(min-width: 1440px)');
  const commentSelect = document.querySelectorAll(".comment");
  const headerComment = document.querySelectorAll(".comment-header");
  const textWrapper = document.querySelectorAll(".comment-text");
  const toolsComment = document.querySelectorAll(".comment-tools");
  const toolsReply = document.querySelectorAll(".reply-section");
  
  for(let i=0; i<toolsReply.length; i++){
    if (mediaQuery.matches) {
      const commentWrapper = document.createElement("div");
      commentWrapper.classList.add("comment-Wrapper-div");
      headerComment[i].appendChild(toolsReply[i]);
      commentSelect[i].insertBefore(commentWrapper, commentSelect[i].firstChild);
      commentWrapper.append(headerComment[i]);
      commentWrapper.append(textWrapper[i]);
    } else {
      toolsComment[i].appendChild(toolsReply[i]);
    }
  }
}
