import { useState } from 'react';
import { WiCloud } from 'react-icons/wi';
import WeatherMap from "../Components/weather"; // Make sure this matches your map component

const WeatherModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Trigger Button integrated with Bootstrap */}
      <div className="d-flex justify-content-center my-5">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow"
          style={{
            fontSize: '1.2rem',
            transition: 'all 0.3s ease',
          }}
        >
          <WiCloud className="me-2" style={{ fontSize: '1.5rem' }} />
          Afficher la Météo en Direct
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="modal-backdrop"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1050,
            backdropFilter: 'blur(4px)'
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="modal-content container"
            style={{ 
              maxWidth: '1200px',
              height: '85vh',
              marginTop: '5vh',
              background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
              borderRadius: '20px',
              overflow: 'hidden',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="btn btn-danger rounded-circle"
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '40px',
                height: '40px',
                zIndex: 100
              }}
            >
              &times;
            </button>

            {/* Weather Content */}
            <header className="text-center py-4">
              <h1 className="display-5 fw-bold text-dark">
                <WiCloud className="text-primary me-2" />
                Météo Tunisie
              </h1>
              <p className="lead text-muted">Surveillance météorologique en temps réel</p>
            </header>
            
            <div style={{ 
              height: 'calc(100% - 150px)',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }}>
              <WeatherMap center={[36.806389, 10.181667]} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WeatherModal;