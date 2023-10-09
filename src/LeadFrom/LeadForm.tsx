import React, { useState } from "react";
import "./LeadForm.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Lead } from "../App";

const LeadForm = ({
  saveLeadFn,
  closeFormFn,
}: {
  saveLeadFn: ({ phone, name }: Lead) => void;
  closeFormFn: () => void;
}) => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [showIncorrectInfoLegend, setShowIncorrectInfoLegend] = useState(false);

  const saveLead = () => {
    if (
      (phone[0] === "5" && phone.length === 12) ||
      (phone[0] === "1" && phone.length === 11)
    ) {
      saveLeadFn({ phone, name });
      setShowIncorrectInfoLegend(false);
      setPhone("");
      setName("");
      return;
    }
    setShowIncorrectInfoLegend(true);
  };
  return (
    <div className="LFContainer">
      <PhoneInput
        country={"mx"}
        preferredCountries={["mx", "us"]}
        value={phone}
        onChange={(phone) => setPhone(phone)}
      />
      <br />
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
      <button className="saveLeadBtn" onClick={() => saveLead()}>
        Guardar
      </button>
      <button className="cancelBtn" onClick={() => closeFormFn()}>
        Cancelar
      </button>
      {showIncorrectInfoLegend && (
        <p className="incorrectInfoLegend">
          *Telefono incorrecto, tiene que tener de 10 digitos aparte de la lada
          internacional.
        </p>
      )}
    </div>
  );
};

export default LeadForm;
