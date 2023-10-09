import React, { useState } from "react";
import "./App.css";
import LeadForm from "./LeadFrom/LeadForm";
import AgentForm from "./AgentForm/AgentForm";

export interface Lead {
  phone: string;
  name: string;
}

function App() {
  const [leads, setLeads] = useState(Array<Lead>);
  const [agents, setAgents] = useState(Array<string>);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showAgentForm, setShowAgentForm] = useState(false);
  const [leadsRandomized, setLeadsRandomized] = useState(Array<Array<Lead>>);
  const [agentsRandomized, setAgentsRandomized] = useState(Array<string>);

  const addLead = (newLead: Lead) => {
    setLeads([...leads, newLead]);
    setShowLeadForm(false);
  };

  const addAgent = (agent: string) => {
    setAgents([...agents, agent]);
    setShowAgentForm(false);
  };

  const shuffleInfo = () => {
    let newLeads = shuffleLeads(leads);
    let newAgents = shuffleAgents(agents);

    let leadsChuncked = [];
    const chunkSize = newLeads.length / newAgents.length;
    for (let i = 0; i < newLeads.length; i += chunkSize) {
      const chunk = newLeads.slice(i, i + chunkSize);
      leadsChuncked.push(chunk);
    }
    setAgentsRandomized(newAgents);
    setLeadsRandomized(leadsChuncked.reverse());
  };

  const shuffleLeads = (array: Lead[]) => {
    return array
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  };

  const shuffleAgents = (array: string[]) => {
    return array
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
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
                  {idx + 1}.- {agent}
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
                <p key={agent} className="agentTitle">
                  {agent}
                </p>
                {leadsRandomized[idx].map((lead) => {
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
