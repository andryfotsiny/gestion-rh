import React from "react";
import './Acceuil.css';


function Accueil() {
    return(
        <div className="accueil-container">
            <div className="stats-container">
                <div className="stat-card">
                    <div className="stat-title">
                        <h4>Employés</h4>
                    </div>
                    <hr />
                    <div className="stat-value">
                        <h5>Total: 7</h5>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-title">
                        <h4>Départements</h4>
                    </div>
                    <hr />
                    <div className="stat-value">
                        <h5>Total: 2</h5>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-title">
                        <h4>Services</h4>
                    </div>
                    <hr />
                    <div className="stat-value">
                        <h5>Total: 30</h5>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-title">
                        <h4>Fonctionnaire</h4>
                    </div>
                    <hr />
                    <div className="stat-value">
                        <h5>Total: 3</h5>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-title">
                        <h4>EFA</h4>
                    </div>
                    <hr />
                    <div className="stat-value">
                        <h5>Total: 4</h5>
                    </div>
                </div>
            </div>
        </div>
    ) 
}

export default Accueil;
