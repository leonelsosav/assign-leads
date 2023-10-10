import React, { useState } from "react";
import "./AgentForm.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ILeadAndAgent } from "../App";

const AgentForm = ({
  saveAgentFn,
  closeFormFn,
}: {
  saveAgentFn: ({ phone, name }: ILeadAndAgent) => void;
  closeFormFn: () => void;
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [showIncorrectInfoLegend, setShowIncorrectInfoLegend] = useState(false);

  const saveAgent = () => {
    if (
      ((phone[0] === "5" && phone.length === 12) ||
        (phone[0] === "1" && phone.length === 11)) &&
      name !== ""
    ) {
      saveAgentFn({ phone, name });
      setShowIncorrectInfoLegend(false);
      setPhone("");
      setName("");
      return;
    }
    setShowIncorrectInfoLegend(true);
  };
  return (
    <div className="LFContainer">
      <label htmlFor="name">Nombre</label>
      <br />
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <br />
      <br />
      <PhoneInput
        country={"mx"}
        preferredCountries={["mx", "us"]}
        value={phone}
        onChange={(phone) => setPhone(phone)}
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
          *Nombre o telefono incorrecto. El nombre no puede estar vacio y el
          telefono tiene que ser de 10 digitos sin contar la lada internacional.
        </p>
      )}
    </div>
  );
};

export default AgentForm;
