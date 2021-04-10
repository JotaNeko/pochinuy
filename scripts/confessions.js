let confesiones = [];

let url = {
  confesiones: "https://confesionario-back-end.vercel.app/",
};
window.onload = async () => {
  let confesionContainer = document.querySelector(".confessionBox");
  const data = await fetch(url.confesiones).then((res) => res.json());

  console.log(data.map(e => console.log('e', e)
  ));

  data.map((confesion) => {
    let confesionHtml = `
    <div class="confesion" id="${confesion.id}">
        <h3 class="confesion-titulo">${confesion.confessionTitle}</h3>
        <div class="confesion-info">
            <p class="confesion-text">Confiesa: ${confesion.confessionTitle}</p>
            <p class="confesion-text">Comentarios : ${confesion.comments.length}</p>
        </div>
    </div>
    `;
    confesiones.push(confesionHtml);
  });

  confesiones.map((confesion) => {
    console.log(confesion);
    confesionContainer.innerHTML += confesion
  });
};
