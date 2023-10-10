import React, { useState } from "react";
import "./App.css";
import LeadForm from "./LeadFrom/LeadForm";
import AgentForm from "./AgentForm/AgentForm";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export interface ILeadAndAgent {
  phone: string;
  name: string;
}

function App() {
  const [leads, setLeads] = useState(Array<ILeadAndAgent>);
  const [agents, setAgents] = useState(agentsInfo);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showAgentForm, setShowAgentForm] = useState(false);
  const [leadsRandomized, setLeadsRandomized] = useState(
    Array<Array<ILeadAndAgent>>
  );
  const [agentsRandomized, setAgentsRandomized] = useState(
    Array<ILeadAndAgent>
  );

  const addLead = (newLead: ILeadAndAgent) => {
    setLeads([...leads, newLead]);
    setShowLeadForm(false);
  };

  const removeLead = (idx: number) => {
    const newLeadsArr = leads.filter((val, i) => i !== idx);
    setLeads(newLeadsArr);
  };

  const addAgent = (agent: ILeadAndAgent) => {
    setAgents([...agents, agent]);
    setShowAgentForm(false);
  };

  const shuffleInfo = () => {
    let newLeads = shuffleArr(leads);
    let newAgents = shuffleArr(agents);

    let leadsChuncked = [];
    const chunkSize = newLeads.length / newAgents.length;
    for (let i = 0; i < newLeads.length; i += chunkSize) {
      const chunk = newLeads.slice(i, i + chunkSize);
      leadsChuncked.push(chunk);
    }
    setAgentsRandomized(newAgents);
    setLeadsRandomized(leadsChuncked.reverse());
  };

  const shuffleArr = (array: ILeadAndAgent[]) => {
    return array
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  };

  const sendInfo = (idx: number) => {
    let phoneNumber = encodeURIComponent(agentsRandomized[idx].phone);
    let messages = [];

    for (var i = 0; i < leadsRandomized[idx].length; i++) {
      var lead = leadsRandomized[idx][i];
      if (lead.phone) {
        messages.push(encodeURIComponent("+" + lead.phone + " - " + lead.name));
      }
    }
    let messageWithLineBreaks = messages.join("%0A");
    let whatsappURL =
      "https://api.whatsapp.com/send?phone=" +
      phoneNumber +
      "&text=" +
      messageWithLineBreaks;

    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="container">
      <div className="topSection">
        <h1 className="title">Repartir Leads</h1>
        <button className="assignBtn" onClick={() => shuffleInfo()}>
          Asignar
        </button>
      </div>

      <div className="workSection">
        <div className="registerSection">
          <div className="leadSection">
            {showLeadForm && (
              <LeadForm
                saveLeadFn={addLead}
                closeFormFn={() => setShowLeadForm(false)}
              />
            )}
            <button className="addLead" onClick={() => setShowLeadForm(true)}>
              Añadir nuevo lead... +
            </button>
            {leads.map((lead, idx) => {
              return (
                <p key={idx} className="leadInfo">
                  {idx + 1}.- +{lead.phone} - {lead.name}
                  <DeleteOutlineIcon
                    className="icon"
                    onClick={() => removeLead(idx)}
                  />
                </p>
              );
            })}
          </div>

          <div className="agentSection">
            {showAgentForm && (
              <AgentForm
                saveAgentFn={addAgent}
                closeFormFn={() => setShowAgentForm(false)}
              />
            )}
            <button className="addAgent" onClick={() => setShowAgentForm(true)}>
              Añadir nuevo asesor... +{" "}
            </button>
            {agents.map((agent, idx) => {
              return (
                <p key={idx} className="agentInfo">
                  {idx + 1}.- {agent.name} - {agent.phone}
                </p>
              );
            })}
          </div>
        </div>

        <div className="resultsSection">
          <p className="resultTag">Resultados:</p>
          {agentsRandomized.map((agent, idx) => {
            return (
              <div key={idx + 10 + "key"}>
                <p key={agent.name} className="agentTitle">
                  {agent.name}
                  <WhatsAppIcon
                    className="icon"
                    onClick={() => sendInfo(idx)}
                  />
                </p>
                {leadsRandomized.length > 0 &&
                  leadsRandomized[idx].map((lead) => {
                    return (
                      <p key={lead.phone} className="leadInfo">
                        +{lead.phone} - {lead.name}
                      </p>
                    );
                  })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

const agentsInfo = [
  {
    name: "Alejandra Sandoval",
    phone: "+525511218421",
  },
  {
    name: "Angelica Vigueras",
    phone: "+525524954139",
  },
  {
    name: "Claudia Luna",
    phone: "+525548205748",
  },
  {
    name: "Daniela Luna",
    phone: "+525628021429",
  },
  {
    name: "Fernanda Ibarra",
    phone: "+525533722711",
  },
  {
    name: "Martha Sosa",
    phone: "+525519015467",
  },
  {
    name: "Pablo Sandoval",
    phone: "+525564682858",
  },
];