const plans = [
  { name: 'Start', features: ['Dashboard', 'Usuários básicos', 'Suporte comercial'] },
  { name: 'Pro', features: ['Tudo do Start', 'Governança', 'Relatórios avançados'] },
  { name: 'Enterprise', features: ['Tudo do Pro', 'Integrações', 'Portal multi-módulo'] },
];

export default function PlansPage() {
  return (
    <section className="stack-lg">
      <div className="card">
        <span className="eyebrow">Planos</span>
        <h1>Comparativo inicial de contratação</h1>
        <p className="muted">Página pública pronta para evoluir com planos reais, pricing e regras comerciais.</p>
      </div>
      <div className="grid">
        {plans.map((plan) => (
          <article key={plan.name} className="card">
            <h2>{plan.name}</h2>
            <ul>
              {plan.features.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
