import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaHome, FaBuilding, FaUsers, FaFileContract, FaClipboardList, FaProjectDiagram, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <Link to='/dashboard' className='sidebar-brand'>
          <FaTachometerAlt className="icon" /> Admin
        </Link>
        <ul className="nav-menu">
          <li>
            <Link to="/Acceuil" className='nav-link'>
              <FaHome className="icon" /> Acceuil
            </Link>
          </li>
          <li>
            <Link to="/organisations" className='nav-link'>
              <FaBuilding className="icon" /> Organisations
            </Link>
          </li>
          <li>
            <Link to="/employes" className='nav-link'>
              <FaUsers className="icon" /> Employés
            </Link>
          </li>
          <li>
            <Link to="/contrats" className='nav-link'>
              <FaFileContract className="icon" /> Contrats
            </Link>
          </li>
          <li>
            <Link to="/demande" className='nav-link'>
              <FaClipboardList className="icon" /> Demande
            </Link>
          </li>
          <li>
            <Link to="/gestionRH" className='nav-link'>
              <FaProjectDiagram className="icon" /> GestionRH
            </Link>
          </li>

        </ul>
      </aside>

      <main className="main-content">
        <nav className="navbar">
          <Link to="/" className="navbar-brand">GESTION DES RESSOURCES HUMAINES</Link>
          <div className="navbar-actions">
            <Link to="/profil" className="nav-link"><FaUserCircle className="icon" /> Profil</Link>
            <button className="btn-logout" type="button"><FaSignOutAlt className="icon" /> Déconnexion</button>
          </div>
        </nav>
        <section className="content">
          <h1>Bienvenue sur le Dashboard</h1>
          <p>Utilisez le menu à gauche pour naviguer entre les différentes sections.</p>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
