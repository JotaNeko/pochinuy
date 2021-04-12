let confession;

function showModal() {
  let modal = document.querySelector(".modal");

  modal.style.display = "flex";
}

function modalOff(e) {
  e.stopPropagation();
  let modal = document.querySelector(".modal");

  modal.style.display = "none";
}

window.onload = async () => {
  let confesionContainer = document.querySelector(".confessionBox");
  let form = document.querySelector("#confesionForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let confessionText = document.querySelector("#confesionTexto").value;
    let author = document.querySelector("#confesante").value;

    let sendConfession = await fetch(
      "https://confesionario-back-end.vercel.app/comentar",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({confessionText, author }),
      }
    ).then((response) => response.json());

    location.reload();
  });

  confession = await fetch(
    `https://confesionario-back-end.vercel.app/${location.search.slice(4)}`
  ).then((res) => res.json());
  console.log(confession);

  let confesionHtml = `
      <div class="confesion">
          <h3 class="confesion-titulo">${confession.confessionTitle}</h3>
          <p class="confesion-text">"${confession.confessionText}"</p>
          <div class="confesion-info">
              <p class="confesion-name">- ${confession.name}</p>
          </div>
          <div class="commentBox"> 
              ${confession.comments.map((comment) => {
                return `
                  <div class="comment">
                        <p class="coment-author">- ${comment.author}</p>
                        <p class="coment-text">- ${comment.commentText}</p>
                  </div>
                  `;
              })}
          </div>
      </div>
      `;

  confesionContainer.innerHTML += confesionHtml;
};
