import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Demande.css';
import ImpressionDemande from './ImpressionDemande';

function DemandeConge() {
  const [demandes, setDemandes] = useState([]);
  const [employes, setEmployes] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    matricule: '',
    nom: '',
    prénom: '',
    date_debut: '',
    date_fin: '',
    type: '',
    Jours_ouvrables: '',
    Jours_Non_Ouvrables: '',
    Etat: '',
    type_demande: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch all demandes on component mount
    axios.get('http://localhost:5000/api/demandeConge')
      .then(response => setDemandes(response.data))
      .catch(error => console.error('Error fetching demandes:', error));

    // Fetch all employes on component mount
    axios.get('http://localhost:5000/api/employes')
      .then(response => setEmployes(response.data))
      .catch(error => console.error('Error fetching employes:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      axios.put(`http://localhost:5000/api/demandeConge/${formData.id}`, formData)
        .then(() => {
          setDemandes(demandes.map(demande =>
            demande.id === formData.id ? formData : demande
          ));
          resetForm();
        })
        .catch(error => console.error('Error updating demande:', error));
    } else {
      axios.post('http://localhost:5000/api/demandeConge', formData)
        .then(response => {
          setDemandes([...demandes, response.data]);
          resetForm();
        })
        .catch(error => console.error('Error adding demande:', error));
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDelete = (index) => {
    const demandeToDelete = demandes[index];
    axios.delete(`http://localhost:5000/api/demandeConge/${demandeToDelete.id}`)
      .then(() => {
        const newDemandes = demandes.filter((_, i) => i !== index);
        setDemandes(newDemandes);
      })
      .catch(error => console.error('Error deleting demande:', error));
  };

  const handleEdit = (index) => {
    const demandeToEdit = demandes[index];
    setFormData({
      ...demandeToEdit,
      id: demandeToEdit.id
    });
    setIsEditing(true);
  };

  const resetForm = () => {
    setFormData({
      id: '',
      matricule: '',
      nom: '',
      prénom: '',
      date_debut: '',
      date_fin: '',
      type: '',
      Jours_ouvrables: '',
      Jours_Non_Ouvrables: '',
      Etat: '',
      type_demande: ''
    });
    setIsEditing(false);
  };

  const handleEmployeChange = (e) => {
    const selectedEmployeId = e.target.value;
    const selectedEmploye = employes.find(emp => emp.Imatricule === selectedEmployeId);
    if (selectedEmploye) {
      setFormData({
        ...formData,
        matricule: selectedEmploye.Imatricule,
        nom: selectedEmploye.Nom,
        prénom: selectedEmploye.Prenoms
      });
    }
  };

  return (
    <div className="container">
      <h2>Demande de Congé</h2>
      <form onSubmit={handleSubmit}>
        <select name="employe" onChange={handleEmployeChange}>
          <option value="">Sélectionner un employé</option>
          {employes.map((employe) => (
            <option key={employe.Imatricule} value={employe.Imatricule}>
              {employe.Imatricule}-{employe.Nom} {employe.Prenoms}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="matricule"
          value={formData.matricule}
          placeholder="Matricule"
          onChange={handleChange}
        />
        <input
          type="text"
          name="nom"
          value={formData.nom}
          placeholder="Nom"
          onChange={handleChange}
        />
        <input
          type="text"
          name="prénom"
          value={formData.prénom}
          placeholder="Prénom"
          onChange={handleChange}
        />
        <input
          type="date"
          name="date_debut"
          value={formData.date_debut}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date_fin"
          value={formData.date_fin}
          onChange={handleChange}
        />
        <input
          type="text"
          name="type"
          value={formData.type}
          placeholder="Type"
          onChange={handleChange}
        />
        <input
          type="number"
          name="Jours_ouvrables"
          value={formData.Jours_ouvrables}
          placeholder="Jours Ouvrables"
          onChange={handleChange}
        />
        <input
          type="number"
          name="Jours_Non_Ouvrables"
          value={formData.Jours_Non_Ouvrables}
          placeholder="Jours Non Ouvrables"
          onChange={handleChange}
        />
        <select name="Etat" value={formData.Etat} onChange={handleChange}>
          <option value="">État</option>
          <option value="En attente">En attente</option>
          <option value="Validé">Validé</option>
          <option value="Refusé">Refusé</option>
        </select>
        <input
          type="text"
          name="type_demande"
          value={formData.type_demande}
          placeholder="Type de Demande"
          onChange={handleChange}
        />
        <button type="submit">{isEditing ? 'Modifier Demande' : 'Ajouter Demande'}</button>
        {isEditing && <button type="button" onClick={resetForm}>Annuler</button>}
      </form>

      <h3>Liste des Demandes</h3>
      <table>
        <thead>
          <tr>
            <th>Matricule</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Type</th>
            <th>Jours Ouvrables</th>
            <th>Jours Non Ouvrables</th>
            <th>État</th>
            <th>Type de Demande</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {demandes.map((demande, index) => (
            <tr key={index}>
              <td>{demande.matricule}</td>
              <td>{demande.nom}</td>
              <td>{demande.prénom}</td>
              <td>{demande.date_debut}</td>
              <td>{demande.date_fin}</td>
              <td>{demande.type}</td>
              <td>{demande.Jours_ouvrables}</td>
              <td>{demande.Jours_Non_Ouvrables}</td>
              <td>{demande.Etat}</td>
              <td>{demande.type_demande}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Éditer</button>
                <button onClick={() => handleDelete(index)}>Supprimer</button>
                <ImpressionDemande demande={demande} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DemandeConge;
