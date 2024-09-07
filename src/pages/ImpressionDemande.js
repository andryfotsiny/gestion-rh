import { jsPDF } from 'jspdf';

const ImpressionDemande = ({ demande }) => {
  const imprimerPDF = () => {

    if (!demande || Object.keys(demande).length === 0) {
      console.error('Aucune donnée demande disponible pour impression.');
      return;
    }

    const doc = new jsPDF();

    // Titre du document
    doc.text('Détails de la Demande de Congé', 20, 10);

    // Définir les coordonnées Y pour chaque ligne
    let y = 20;

    // Ajout des détails de la demande comme une liste
    const details = [
      `Matricule: ${demande.matricule || 'N/A'}`,
      `Nom: ${demande.nom || 'N/A'}`,
      `Prénom: ${demande.prénom || 'N/A'}`,
      `Date Début: ${demande.date_debut || 'N/A'}`,
      `Date Fin: ${demande.date_fin || 'N/A'}`,
      `Type: ${demande.type || 'N/A'}`,
      `Jours Ouvrables: ${demande.Jours_ouvrables || 'N/A'}`,
      `Jours Non Ouvrables: ${demande.Jours_Non_Ouvrables || 'N/A'}`,
      `État: ${demande.Etat || 'N/A'}`,
      `Type de Demande: ${demande.type_demande || 'N/A'}`,
    ];

    details.forEach((detail) => {
      doc.text(detail, 20, y);
      y += 10; // Espace entre les lignes
    });

    // Enregistrer le PDF
    doc.save(`Demande_${demande.matricule || 'inconnue'}.pdf`);
  };

  return (
    <button onClick={imprimerPDF} className="print-button">
      <i className="fa fa-print"></i> Impression
    </button>
  );
};

export default ImpressionDemande;
