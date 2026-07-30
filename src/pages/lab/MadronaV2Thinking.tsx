import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import "./madrona-v2.css";

export default function MadronaV2Thinking() {
  return (
    <main className="m2 m2-ap-page">
      <LabMeta title="Thinking · Madrona Product Studio" />
      <M2Nav active="thinking" />

      <section className="m2-ap-intro">
        <p className="m2-kicker">Notes from the studio</p>
        <h1>What we’re learning</h1>
        <p>
          We share what the work teaches us about product leadership, small
          teams, responsible AI, and the changing craft of software creation.
        </p>
      </section>

      <section className="m2-bridge">
        <p className="m2-kicker">Forthcoming</p>
        <h2>The Teams That Build Next</h2>
        <div className="m2-bridge-grid">
          <div className="m2-bridge-item">
            <div>
              <h3>A working question, grounded in practice</h3>
              <p>
                How can small, senior, multidisciplinary teams use new leverage
                to learn through working software and direct their energy
                toward problems worth solving?
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
