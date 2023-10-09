import React, { useState } from "react";
import "./AgentForm.css";

const AgentForm = ({
  saveAgentFn,
  closeFormFn,
}: {
  saveAgentFn: (agent: string) => void;
  closeFormFn: () => void;
}) => {
  const [name, setName] = useState("");
  const [showIncorrectInfoLegend, setShowIncorrectInfoLegend] = useState(false);

  const saveAgent = () => {
    if (name === "") {
      setShowIncorrectInfoLegend(true);
      return;
    }
    saveAgentFn(name);
    setShowIncorrectInfoLegend(false);
  };
  return (
    <div className="LFContainer">
      <label htmlFor="name">Nombre (opcional)</label>
      <br />
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <button className="saveLeadBtn" onClick={() => saveAgent()}>
        Guardar
      </button>
      <button className="cancelBtn" onClick={() => closeFormFn()}>
        Cancelar
      </button>
      {showIncorrectInfoLegend && (
        <p className="incorrectInfoLegend">
          *Nombre incorrecto, el nombre no puede estar vacio.
        </p>
      )}
    </div>
  );
};

export default AgentForm;
