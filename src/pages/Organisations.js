import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Styles.css';
import { FaEdit, FaTrashAlt, FaPrint } from 'react-icons/fa';  // Importer les icônes

const Organisations = () => {
  const [organisations, setOrganisations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newOrganisation, setNewOrganisation] = useState({});
  const [editOrganisation, setEditOrganisation] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/organisations')
      .then(response => {
        setOrganisations(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des organisations:', error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddOrganisation = () => {
    setShowModal(true);
    setEditOrganisation(null);
  };

  const handleEditOrganisation = (organisation) => {
    setEditOrganisation(organisation);
    setNewOrganisation(organisation);
    setShowModal(true);
  };

  const handleSaveOrganisation = () => {
    const url = editOrganisation ? `http://localhost:5000/api/organisations/${editOrganisation.id}` : 'http://localhost:5000/api/organisations';
    const method = editOrganisation ? 'put' : 'post';

    axios({ method, url, data: newOrganisation })
      .then(response => {
        if (editOrganisation) {
          setOrganisations(organisations.map(org => (org.id === editOrganisation.id ? response.data : org)));
        } else {
          setOrganisations([...organisations, response.data]);
        }
        setShowModal(false);
        setNewOrganisation({});
        setEditOrganisation(null);
      })
      .catch(error => {
        console.error('Erreur lors de la sauvegarde de l\'organisation:', error);
      });
  };

  const handleDeleteOrganisation = (id) => {
    axios.delete(`http://localhost:5000/api/organisations/${id}`)
      .then(() => {
        setOrganisations(organisations.filter(organisation => organisation.id !== id));
      })
      .catch(error => {
        console.error('Erreur lors de la suppression de l\'organisation:', error);
      });
  };

  return (
    <div className="organisations-container">
      <h1>Bienvenue sur la page des Organisations</h1>

      <div className="actions">
        <input
          type="text"
          placeholder="Rechercher par Société..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
        <button onClick={handleAddOrganisation} className="add-button">Ajouter une Organisation</button>
      </div>

      <table className="organisations-table">
        <thead>
          <tr>
            <th>Société</th>
            <th>Email</th>
            <th>Ville</th>
            <th>Adresse</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {organisations
            .filter(organisation =>
              organisation.Société && organisation.Société.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(organisation => (
              <tr key={organisation.id}>
                <td>{organisation.Société}</td>
                <td>{organisation.Email}</td>
                <td>{organisation.Ville}</td>
                <td>{organisation.Adresse}</td>
                <td>{organisation.Type}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEditOrganisation(organisation)}>
                    <FaEdit /> Modifier
                  </button>
                  <button className="delete-button" onClick={() => handleDeleteOrganisation(organisation.id)}>
                    <FaTrashAlt /> Supprimer
                  </button>
                  <button className="print-button">
                    <FaPrint /> Imprimer
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editOrganisation ? 'Modifier une Organisation' : 'Ajouter une nouvelle Organisation'}</h2>
            <form>
              <input type="text" placeholder="Société" value={newOrganisation.Société || ''} onChange={e => setNewOrganisation({ ...newOrganisation, Société: e.target.value })} />
              <input type="email" placeholder="Email" value={newOrganisation.Email || ''} onChange={e => setNewOrganisation({ ...newOrganisation, Email: e.target.value })} />
              <input type="text" placeholder="Ville" value={newOrganisation.Ville || ''} onChange={e => setNewOrganisation({ ...newOrganisation, Ville: e.target.value })} />
              <input type="text" placeholder="Adresse" value={newOrganisation.Adresse || ''} onChange={e => setNewOrganisation({ ...newOrganisation, Adresse: e.target.value })} />
              <input type="text" placeholder="Type" value={newOrganisation.Type || ''} onChange={e => setNewOrganisation({ ...newOrganisation, Type: e.target.value })} />
              <button type="button" onClick={handleSaveOrganisation}>Enregistrer</button>
            </form>
            <button onClick={() => setShowModal(false)}>Fermer</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Organisations;
