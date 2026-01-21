document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('clientForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupération des données du formulaire
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Construction de l'email
        const emailContent = buildEmailContent(data);
        
        // Ouverture du client de messagerie
        openEmailClient(data.email, emailContent);
        
        // Message de confirmation
        showSuccessMessage();
    });
});

function buildEmailContent(data) {
    const subject = encodeURIComponent(`Demande de devis - ${data.siteName || 'Nouveau projet'}`);
    
    let body = `Bonjour,\n\n`;
    body += `Je souhaite obtenir un devis pour la création de mon site internet.\n\n`;
    body += `Voici les informations concernant mon projet :\n\n`;
    body += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    body += `INFORMATIONS DE CONTACT\n`;
    body += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    body += `Nom complet : ${data.clientName}\n`;
    body += `Email : ${data.email}\n`;
    body += `Téléphone : ${data.phone}\n`;
    if (data.company) body += `Entreprise : ${data.company}\n`;
    
    body += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    body += `INFORMATIONS SUR LE SITE\n`;
    body += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    body += `Nom du site : ${data.siteName}\n`;
    body += `Type de site : ${getSelectLabel('siteType', data.siteType)}\n`;
    body += `\nDescriptif du business :\n${data.businessDescription}\n`;
    body += `\nPublic cible :\n${data.targetAudience}\n`;
    
    body += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    body += `DESIGN ET IDENTITÉ VISUELLE\n`;
    body += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    body += `Couleurs dominantes : ${data.dominantColors}\n`;
    body += `Style souhaité : ${getSelectLabel('stylePreference', data.stylePreference)}\n`;
    body += `Logo : ${getSelectLabel('logo', data.logo)}\n`;
    if (data.referenceSites) {
        body += `\nSites de référence :\n${data.referenceSites}\n`;
    }
    
    body += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    body += `STRUCTURE DU SITE\n`;
    body += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    body += `Nombre de pages : ${data.pageCount}\n`;
    body += `\nIntitulés des pages :\n${data.pageTitles}\n`;
    if (data.specialFeatures) {
        body += `\nFonctionnalités spéciales :\n${data.specialFeatures}\n`;
    }
    
    body += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    body += `CONTENU ET RESSOURCES\n`;
    body += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    body += `État du contenu : ${getSelectLabel('contentStatus', data.contentStatus)}\n`;
    body += `Images : ${getSelectLabel('images', data.images)}\n`;
    body += `Nom de domaine : ${getSelectLabel('domain', data.domain)}\n`;
    body += `Hébergement : ${getSelectLabel('hosting', data.hosting)}\n`;
    
    body += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    body += `DÉLAIS ET BUDGET\n`;
    body += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    if (data.deadline) {
        const deadlineDate = new Date(data.deadline);
        body += `Date de mise en ligne souhaitée : ${deadlineDate.toLocaleDateString('fr-FR')}\n`;
    }
    if (data.budget) {
        body += `Budget estimé : ${getSelectLabel('budget', data.budget)}\n`;
    }
    if (data.additionalInfo) {
        body += `\nInformations complémentaires :\n${data.additionalInfo}\n`;
    }
    
    body += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    body += `Cordialement,\n${data.clientName}\n`;
    body += `${data.email}\n`;
    body += `${data.phone}\n`;
    
    return encodeURIComponent(body);
}

function getSelectLabel(selectId, value) {
    const select = document.getElementById(selectId);
    if (!select || !value) return value || 'Non renseigné';
    
    const option = select.querySelector(`option[value="${value}"]`);
    return option ? option.textContent : value;
}

function openEmailClient(clientEmail, emailContent) {
    // Adresses email de réception
    const recipientEmails = 'barbelinnoan@gmail.com,tom.portenier@gmail.com';
    const subject = encodeURIComponent(`Demande de devis - ${document.getElementById('siteName').value || 'Nouveau projet'}`);
    
    const mailtoLink = `mailto:${recipientEmails}?cc=${encodeURIComponent(clientEmail)}&subject=${subject}&body=${emailContent}`;
    
    window.location.href = mailtoLink;
}

function showSuccessMessage() {
    // Création d'un message de confirmation
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = `
        <div class="success-content">
            <h3>✓ Formulaire envoyé avec succès !</h3>
            <p>Votre client de messagerie devrait s'ouvrir automatiquement.</p>
            <p>Si ce n'est pas le cas, vérifiez vos paramètres de messagerie.</p>
        </div>
    `;
    
    document.body.appendChild(message);
    
    // Animation d'apparition
    setTimeout(() => {
        message.style.opacity = '1';
        message.style.transform = 'translateY(0)';
    }, 10);
    
    // Suppression après 5 secondes
    setTimeout(() => {
        message.style.opacity = '0';
        message.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            document.body.removeChild(message);
        }, 300);
    }, 5000);
}

// Ajout des styles pour le message de succès
const style = document.createElement('style');
style.textContent = `
    .success-message {
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #51cf66 0%, #40c057 100%);
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
        max-width: 400px;
    }
    
    .success-content h3 {
        margin-bottom: 10px;
        font-size: 1.2em;
    }
    
    .success-content p {
        margin: 5px 0;
        font-size: 0.9em;
        opacity: 0.95;
    }
    
    @media (max-width: 768px) {
        .success-message {
            right: 10px;
            left: 10px;
            max-width: none;
        }
    }
`;
document.head.appendChild(style);

