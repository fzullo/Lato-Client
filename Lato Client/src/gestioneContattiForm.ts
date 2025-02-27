import { ContattiForm } from "./contattiForm";

const form = document.getElementById("contactForm") as HTMLFormElement;
const tbody = document.querySelector("#contactsTableBody");


form?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const nome = formData.get("nome") as string;
    const email = formData.get("email") as string;
    const messaggio = formData.get("messaggio") as string;
    if (!nome || !email || !messaggio) {
        alert("Per favore, completa tutti i campi.");
        return;
    }
    const contatti: ContattiForm = {
        nome, email, messaggio
    };

    try {
        const response = await fetch("http://localhost:5053/api/contatti", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contatti),
        });

        if (response.ok) {
            alert("Contatto inviato con successo!");
            form.reset();
            caricaContatti();
        } else {
            console.error("Errore nell'invio del contatto.");
        }
    } catch (error) {
        console.error("Errore di rete:", error);
    }
});



export async function caricaContatti() {
    try {
        const response = await fetch("http://localhost:5053/api/contatti");

        if (response.ok) {
            const contatti: ContattiForm[] = await response.json();
            console.log(contatti);
            

            contatti.forEach(contatto => {
                const row = document.createElement("tr");

                const nomeCell = document.createElement("td");
                nomeCell.textContent = contatto.nome;

                const emailCell = document.createElement("td");
                emailCell.textContent = contatto.email;

                const messaggioCell = document.createElement("td");
                messaggioCell.textContent = contatto.messaggio;

                row.appendChild(nomeCell);
                row.appendChild(emailCell);
                row.appendChild(messaggioCell);

                tbody?.appendChild(row);
            });
        } else {
            console.error("Errore nel caricare i contatti:", response.status);
           
        }
    } catch (error) {
        console.error("Errore nel caricare i contatti:", error);
       
    }
}
document.addEventListener("DOMContentLoaded", () => {
    caricaContatti();

});