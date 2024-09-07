import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Styles.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const Contrats = () => {
  const [contrats, setContrats] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newContrat, setNewContrat] = useState({});
  const [editContrat, setEditContrat] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/contrats')
      .then(response => {
        setContrats(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des contrats:', error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddContrat = () => {
    setShowModal(true);
    setEditContrat(null);
  };

  const handleEditContrat = (contrat) => {
    setEditContrat(contrat);
    setNewContrat(contrat);
    setShowModal(true);
  };

  const handleSaveContrat = () => {
    const url = editContrat ? `http://localhost:5000/api/contrats/${editContrat.id}` : 'http://localhost:5000/api/contrats';
    const method = editContrat ? 'put' : 'post';

    axios({ method, url, data: newContrat })
      .then(response => {
        if (editContrat) {
          setContrats(contrats.map(c => (c.id === editContrat.id ? response.data : c)));
        } else {
          setContrats([...contrats, response.data]);
        }
        setShowModal(false);
        setNewContrat({});
        setEditContrat(null);
      })
      .catch(error => {
        console.error('Erreur lors de la sauvegarde du contrat:', error);
      });
  };

  const handleDeleteContrat = (id) => {
    axios.delete(`http://localhost:5000/api/contrats/${id}`)
      .then(() => {
        setContrats(contrats.filter(contrat => contrat.id !== id));
      })
      .catch(error => {
        console.error('Erreur lors de la suppression du contrat:', error);
      });
  };

  return (
    <div className="contrats-container">
      <h1>Contrats</h1>

      <div className="actions">
        <input
          type="text"
          placeholder="Rechercher par Numéro de Contrat..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
        <button onClick={handleAddContrat} className="add-button">Ajouter un Contrat</button>
      </div>

      <table className="contrats-table">
        <thead>
          <tr>
            <th>Imatricule</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Numéro de Contrat</th>
            <th>Salaire</th>
            <th>Date de Début</th>
            <th>Date de Fin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contrats
            .filter(contrat =>
              contrat.Numero_Contrat && contrat.Numero_Contrat.toString().includes(searchTerm)
            )
            .map(contrat => (
              <tr key={contrat.id}>
                <td>{contrat.Imatricule}</td>
                <td>{contrat.Nom}</td>
                <td>{contrat.Prenom}</td>
                <td>{contrat.Numero_Contrat}</td>
                <td>{contrat.salaire}</td>
                <td>{contrat.Date_debut}</td>
                <td>{contrat.Date_Fin}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEditContrat(contrat)}>
                    <FaEdit /> Modifier
                  </button>
                  <button className="delete-button" onClick={() => handleDeleteContrat(contrat.id)}>
                    <FaTrashAlt /> Supprimer
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editContrat ? 'Modifier un Contrat' : 'Ajouter un nouveau Contrat'}</h2>
            <form>
              <input type="text" placeholder="Imatricule" value={newContrat.Imatricule || ''} onChange={e => setNewContrat({ ...newContrat, Imatricule: e.target.value })} />
              <input type="text" placeholder="Nom" value={newContrat.Nom || ''} onChange={e => setNewContrat({ ...newContrat, Nom: e.target.value })} />
              <input type="text" placeholder="Prénom" value={newContrat.Prenom || ''} onChange={e => setNewContrat({ ...newContrat, Prenom: e.target.value })} />
              <input type="text" placeholder="Numéro de Contrat" value={newContrat.Numero_Contrat || ''} onChange={e => setNewContrat({ ...newContrat, Numero_Contrat: e.target.value })} />
              <input type="number" placeholder="Salaire" value={newContrat.salaire || ''} onChange={e => setNewContrat({ ...newContrat, salaire: parseFloat(e.target.value) })} />
              <input type="date" placeholder="Date de Début" value={newContrat.Date_debut || ''} onChange={e => setNewContrat({ ...newContrat, Date_debut: e.target.value })} />
              <input type="date" placeholder="Date de Fin" value={newContrat.Date_Fin || ''} onChange={e => setNewContrat({ ...newContrat, Date_Fin: e.target.value })} />
              <button type="button" onClick={handleSaveContrat}>Enregistrer</button>
            </form>
            <button onClick={() => setShowModal(false)}>Fermer</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Contrats;
