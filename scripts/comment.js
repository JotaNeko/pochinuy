let localUrl = "http://localhost:8000/";
let deployedUrl = "https://confesionario-back-end.vercel.app/";
let confession;

function showModal() {
  let modal = document.querySelector(".modal");
  let goBack = document.querySelector(".goBack");
  let confessionButton = document.querySelector(".confesate-aca");

  modal.style.display = "flex";
  goBack.style.display = "none";
  confessionButton.style.display = "none";
}

function modalOff() {
  let goBack = document.querySelector(".goBack");
  let confessionButton = document.querySelector(".confesate-aca");
  let modal = document.querySelector(".modal");

  modal.style.display = "none";
  goBack.style.display = "initial";
  confessionButton.style.display = "initial";
}

window.onload = async () => {
  let confesionContainer = document.querySelector(".confessionBox");
  let form = document.querySelector("#confesionForm");

  confession = await fetch(
    deployedUrl + `${location.search.slice(4)}`
  ).then((res) => res.json());

  let confesionHtml = `
      <div class="confesion">
          <h3 class="confesion-titulo">${confession.confessionTitle}</h3>
          <p class="confesion-text">"${confession.confessionText}"</p>
          <div class="confesion-info">
              <p class="confesion-name">- ${confession.name}</p>
          </div>
          <div class="commentBox"> 
          </div>
      </div>
      `;

  confesionContainer.innerHTML += confesionHtml;

  let commentContainer = document.querySelector(".commentBox");
  let commentHtml = "";

  confession.comments.map((comment) => {
    commentHtml += `
          <div class="comment">
              <p class="commentAuthor">${comment.author.length > 1 ? comment.author : 'Anonim@'}:</p>
              <p class="commentText">${comment.commentText}</p>
          </div>
    `;
  });

  commentContainer.innerHTML += commentHtml;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let commentText = document.querySelector("#confesionTexto").value;
    let author = document.querySelector("#confesante").value;

    let sendConfession = await fetch(deployedUrl + "comentar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        commentText,
        author,
        confessionId: confession._id,
      }),
    }).then((response) => response.json());

    location.reload();
  });
};
