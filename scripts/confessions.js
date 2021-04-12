let confesiones = [];

let url = {
  confesiones: "https://confesionario-back-end.vercel.app/",
};


window.onload = async () => {
  let confesionContainer = document.querySelector(".confessionBox");
  const data = await fetch(url.confesiones).then((res) => res.json());

  data.map((confesion, key) => {
    console.log(confesion._id);

    let confesionHtml = `
    <div class="confesion ${key === data.length -1 ? 'lastConfesion' : ''}">
        <h3 class="confesion-titulo">${confesion.confessionTitle}</h3>
        <p class="confesion-text">"${confesion.confessionText}"</p>
        <div class="confesion-info">
            <p class="confesion-name">- ${confesion.name}</p>
            <a href="confesion.html?id=${confesion._id}"> 
                <p class="confesion-name">Comentarios: ${confesion.comments.length}</p> 
            </a>
        </div>
    </div>
    `;
    confesiones.push(confesionHtml);
  });

  confesiones.map((confesion) => {
    confesionContainer.innerHTML += confesion;
  });
};
