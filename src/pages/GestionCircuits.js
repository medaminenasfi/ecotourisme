import React from "react";
import CircuitMap from "../Components/CircuitMap";

const GestionCircuits = () => {
  return (
    <div className="container mx-auto p-6">
      <center>
      <h2 className="text-3xl font-semibold text-blue-600 mb-4">Gestion des Circuits</h2>
      </center>
      {/* CircuitMap with Adjusted Size */}
      <div className="w-full h-[300px] sm:h-[400px] lg:h-[700px] mt-6 rounded-lg shadow-lg overflow-hidden">
        <CircuitMap />
      </div>
    </div>
  );
};

export default GestionCircuits;
