import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Impression from './Impression';  // Importer le composant Impression
import { FaEdit, FaTrashAlt, FaPrint } from 'react-icons/fa';  // Ajouter les icônes

const Employes = () => {
  const [employes, setEmployes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newEmploye, setNewEmploye] = useState({});
  const [editEmploye, setEditEmploye] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/employes')
      .then(response => {
        setEmployes(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des employés:', error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddEmploye = () => {
    setShowModal(true);
    setEditEmploye(null);
  };

  const handleEditEmploye = (employe) => {
    setEditEmploye(employe);
    setNewEmploye(employe);
    setShowModal(true);
  };

  const handleSaveEmploye = () => {
    const url = editEmploye ? `http://localhost:5000/api/employes/${editEmploye.id}` : 'http://localhost:5000/api/employes';
    const method = editEmploye ? 'put' : 'post';

    axios({ method, url, data: newEmploye })
      .then(response => {
        if (editEmploye) {
          setEmployes(employes.map(emp => (emp.id === editEmploye.id ? response.data : emp)));
        } else {
          setEmployes([...employes, response.data]);
        }
        setShowModal(false);
        setNewEmploye({});
        setEditEmploye(null);
      })
      .catch(error => {
        console.error('Erreur lors de la sauvegarde de l\'employé:', error);
      });
  };

  const handleDeleteEmploye = (id) => {
    axios.delete(`http://localhost:5000/api/employes/${id}`)
      .then(() => {
        setEmployes(employes.filter(employe => employe.id !== id));
      })
      .catch(error => {
        console.error('Erreur lors de la suppression de l\'employé:', error);
      });
  };

  return (
    <div className="employes-container">
      <h1>Bienvenue sur la page des Employés</h1>

      <div className="actions">
        <input
          type="text"
          placeholder="Rechercher par Imatricule..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
        <button onClick={handleAddEmploye} className="add-button">Ajouter un Employé</button>
      </div>

      <table className="employes-table">
        <thead>
          <tr>
            <th>Imatricule</th>
            <th>Nom</th>
            <th>Prénoms</th>
            <th>Naissance</th>
            <th>Date d'embauche</th>
            <th>ECD</th>
            <th>EFA</th>
            <th>FONC</th>
            <th>CIN</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employes
            .filter(employe =>
              employe.Imatricule && employe.Imatricule.toString().includes(searchTerm)
            )
            .map(employe => (
              <tr key={employe.id}>
                <td>{employe.Imatricule}</td>
                <td>{employe.Nom}</td>
                <td>{employe.Prenoms}</td>
                <td>{employe.Naissance}</td>
                <td>{employe.Date_embauche}</td>
                <td>{employe.ECD}</td>
                <td>{employe.EFA}</td>
                <td>{employe.FONC}</td>
                <td>{employe.CIN}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEditEmploye(employe)}>
                    <FaEdit /> Modifier
                  </button>
                  <button className="delete-button" onClick={() => handleDeleteEmploye(employe.id)}>
                    <FaTrashAlt /> Supprimer
                  </button>
                  <Impression employe={employe} />  {/* Ajouter le bouton d'impression */}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editEmploye ? 'Modifier un Employé' : 'Ajouter un nouvel Employé'}</h2>
            <form>
              <input type="text" placeholder="Imatricule" value={newEmploye.Imatricule || ''} onChange={e => setNewEmploye({ ...newEmploye, Imatricule: parseInt(e.target.value) })} />
              <input type="text" placeholder="Nom" value={newEmploye.Nom || ''} onChange={e => setNewEmploye({ ...newEmploye, Nom: e.target.value })} />
              <input type="text" placeholder="Prénoms" value={newEmploye.Prenoms || ''} onChange={e => setNewEmploye({ ...newEmploye, Prenoms: e.target.value })} />
              <input type="date" placeholder="Naissance" value={newEmploye.Naissance || ''} onChange={e => setNewEmploye({ ...newEmploye, Naissance: e.target.value })} />
              <input type="date" placeholder="Date d'embauche" value={newEmploye.Date_embauche || ''} onChange={e => setNewEmploye({ ...newEmploye, Date_embauche: e.target.value })} />
              <input type="date" placeholder="ECD" value={newEmploye.ECD || ''} onChange={e => setNewEmploye({ ...newEmploye, ECD: e.target.value })} />
              <input type="date" placeholder="EFA" value={newEmploye.EFA || ''} onChange={e => setNewEmploye({ ...newEmploye, EFA: e.target.value })} />
              <input type="date" placeholder="FONC" value={newEmploye.FONC || ''} onChange={e => setNewEmploye({ ...newEmploye, FONC: e.target.value })} />
              <input type="number" placeholder="CIN" value={newEmploye.CIN || ''} onChange={e => setNewEmploye({ ...newEmploye, CIN: parseInt(e.target.value) })} />
              <button type="button" onClick={handleSaveEmploye}>Enregistrer</button>
            </form>
            <button onClick={() => setShowModal(false)}>Fermer</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Employes;
