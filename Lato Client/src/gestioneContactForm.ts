import { ContactForm } from "./contactForm";

const form = document.getElementById("contactForm") as HTMLFormElement;
const tbody = document.querySelector("#contactsTableBody");


form?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const contatti: ContactForm = {
        nome: formData.get("nome") as string,
        email: formData.get("email") as string,
        messaggio: formData.get("messaggio") as string,
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
            console.log("Contatto inviato con successo!");
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
            const contatti: ContactForm[] = await response.json();

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
            alert("Errore nel caricare i contatti.");
        }
    } catch (error) {
        console.error("Errore nel caricare i contatti:", error);
        alert("Errore nel caricare i contatti.");
    }
}
document.addEventListener("DOMContentLoaded", () => {   
    caricaContatti(); 
    
});