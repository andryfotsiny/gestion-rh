import { jsPDF } from 'jspdf';

const Impression = ({ employe }) => {
  const imprimerPDF = () => {

    if (!employe || Object.keys(employe).length === 0) {
      console.error('Aucune donnée employé disponible pour impression.');
      return;
    }

    const doc = new jsPDF();

    // Titre du document
    doc.text('Détails de l\'Employé', 20, 10);

    // Définir les coordonnées Y pour chaque ligne
    let y = 20;

    // Ajout des détails de l'employé comme une liste
    const details = [
      `Imatricule: ${employe.Imatricule || 'N/A'}`,
      `Nom: ${employe.Nom || 'N/A'}`,
      `Prénoms: ${employe.Prenoms || 'N/A'}`,
      `Naissance: ${employe.Naissance || 'N/A'}`,
      `Date d'embauche: ${employe.Date_embauche || 'N/A'}`,
      `ECD: ${employe.ECD || 'N/A'}`,
      `EFA: ${employe.EFA || 'N/A'}`,
      `FONC: ${employe.FONC || 'N/A'}`,
      `CIN: ${employe.CIN || 'N/A'}`,
    ];

    details.forEach((detail) => {
      doc.text(detail, 20, y);
      y += 10; // Espace entre les lignes
    });

    // Enregistrer le PDF
    doc.save(`Employe_${employe.Imatricule || 'inconnu'}.pdf`);
  };

  return (
    <button onClick={imprimerPDF} className="print-button">
      <i className="fa fa-print"></i> Impression
    </button>
  );
};

export default Impression;
