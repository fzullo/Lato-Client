import { progetti } from "./datiProgetti.js";

export function inserisciProgetti(): void {
  const sezioneProgetti = document.getElementById("progetti");

  if (sezioneProgetti) {
    progetti.forEach(progetto => {
      const div = document.createElement("div")
      div.classList.add("progetto");

      const card = document.createElement("div")
      card.classList.add("card")

      const img = document.createElement("img")
      img.classList.add("card-img-top")
      img.src = progetto.immagine;

      const cardBody = document.createElement("div")
      cardBody.classList.add("card-body")

      const title = document.createElement("h5");
      title.classList.add("card-title");
      title.textContent = progetto.titolo;

      const description = document.createElement("p");
      description.classList.add("card-text");
      description.textContent = progetto.descrizione;

      const link = document.createElement("a");
      link.classList.add("btn");
      link.href = progetto.link;
      link.textContent = "Link al progetto";
      link.setAttribute("target", "_blank");


      cardBody.appendChild(title);
      cardBody.appendChild(description);
      cardBody.appendChild(link);
      card.appendChild(img);
      card.appendChild(cardBody);
      div.appendChild(card);
      sezioneProgetti.appendChild(div);
    });
  } else {
   console.error("Id non trovato!");
  }
}

