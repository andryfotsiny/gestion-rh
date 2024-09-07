import React, { useState } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import { FaTachometerAlt, FaHome, FaBuilding, FaUsers, FaFileContract, FaClipboardList, FaProjectDiagram, FaUserCircle, FaSignOutAlt, FaAngleDown } from 'react-icons/fa';
import './Dashboard.css';

import Employes from './Employes';
import Acceuil from "./Acceuil";
import Contrats from "./Contrats";
import Demande from "./Demande";
import GestionRH from "./GestionRH";
import Organisations from "./Organisations";
import DemandeConge from './DemandeConge';
import DemandeDemission from './DemandeDemission';
import DemandePayement from './DemandePayement';
import DemandeTravail from './DemandeTravail';

function DashboardWrapper() {
  let { path, url } = useRouteMatch();
  const [isDemandeMenuOpen, setDemandeMenuOpen] = useState(false);

  const toggleDemandeMenu = () => {
    setDemandeMenuOpen(!isDemandeMenuOpen);
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <Link to={`${url}`} className='sidebar-brand'>
          <FaTachometerAlt className="icon" /> Admin
        </Link>
        <ul className="nav-menu">
          <li>
            <Link to={`${url}/acceuil`} className='nav-link'>
              <FaHome className="icon" /> Acceuil
            </Link>
          </li>
          <li>
            <Link to={`${url}/organisations`} className='nav-link'>
              <FaBuilding className="icon" /> Organisations
            </Link>
          </li>
          <li>
            <Link to={`${url}/employes`} className='nav-link'>
              <FaUsers className="icon" /> Employés
            </Link>
          </li>
          <li>
            <Link to={`${url}/contrats`} className='nav-link'>
              <FaFileContract className="icon" /> Contrats
            </Link>
          </li>
          <li className="nav-link" onClick={toggleDemandeMenu}>
            <FaClipboardList className="icon" /> Demande <FaAngleDown className="icon" />
            {isDemandeMenuOpen && (
              <ul className="sub-menu">
                <li><Link to={`${url}/demande/conge`} className="sub-link">Demande de Congé</Link></li>
                <li><Link to={`${url}/demande/demission`} className="sub-link">Demande de Démission</Link></li>
                <li><Link to={`${url}/demande/payement`} className="sub-link">Demande de Payement</Link></li>
                <li><Link to={`${url}/demande/travail`} className="sub-link">Demande de Travail</Link></li>
              </ul>
            )}
          </li>
          <li>
            <Link to={`${url}/gestionRH`} className='nav-link'>
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
          <Switch>
            <Route exact path={path}>
              <h1>Bienvenue sur le Dashboard</h1>
              <p>Utilisez le menu à gauche pour naviguer entre les différentes sections.</p>
            </Route>
            <Route path={`${path}/employes`}>
              <Employes />
            </Route>
            <Route path={`${path}/acceuil`}>
              <Acceuil />
            </Route>
            <Route path={`${path}/contrats`}>
              <Contrats />
            </Route>
            <Route path={`${path}/gestionRH`}>
              <GestionRH />
            </Route>
            <Route exact path={`${path}/demande`}>
              <Demande />
            </Route>
            <Route path={`${path}/demande/conge`}>
              <DemandeConge />
            </Route>
            <Route path={`${path}/demande/demission`}>
              <DemandeDemission />
            </Route>
            <Route path={`${path}/demande/payement`}>
              <DemandePayement />
            </Route>
            <Route path={`${path}/demande/travail`}>
              <DemandeTravail />
            </Route>
            <Route path={`${path}/organisations`}>
              <Organisations />
            </Route>
          </Switch>
        </section>
      </main>
    </div>
  );
}

export default DashboardWrapper;
