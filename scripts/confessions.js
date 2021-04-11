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
        <p class="confesion-text">"${confesion.confessionText}"</p>
        <div class="confesion-info">
            <p class="confesion-name">- ${confesion.name}</p>
            
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
