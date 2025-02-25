var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.getElementById("contactForm");
const tbody = document.querySelector("#contactsTableBody");
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const formData = new FormData(form);
    const contatti = {
        nome: formData.get("nome"),
        email: formData.get("email"),
        messaggio: formData.get("messaggio"),
    };
    try {
        const response = yield fetch("http://localhost:5053/api/contatti", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contatti),
        });
        if (response.ok) {
            console.log("Contatto inviato con successo!");
            caricaContatti();
        }
        else {
            console.error("Errore nell'invio del contatto.");
        }
    }
    catch (error) {
        console.error("Errore di rete:", error);
    }
}));
export function caricaContatti() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://localhost:5053/api/contatti");
            if (response.ok) {
                const contatti = yield response.json();
                console.log(contatti);
                const tbody = document.querySelector("#contactsTableBody");
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
                    tbody === null || tbody === void 0 ? void 0 : tbody.appendChild(row);
                });
            }
            else {
                console.error("Errore nel caricare i contatti:", response.status);
                alert("Errore nel caricare i contatti.");
            }
        }
        catch (error) {
            console.error("Errore nel caricare i contatti:", error);
            alert("Errore nel caricare i contatti.");
        }
    });
}
document.addEventListener("DOMContentLoaded", () => {
    caricaContatti();
});
