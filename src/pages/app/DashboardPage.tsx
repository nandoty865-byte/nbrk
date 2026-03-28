export default function DashboardPage() {
  return (
    <div className="grid">
      <section className="card">
        <span className="eyebrow">Dashboard</span>
        <h1>Shell autenticado já integrado</h1>
        <p>Você já tem base para breadcrumbs futuros, favoritos, ACL e ações automáticas de header.</p>
      </section>
      <section className="card">
        <h2>Checklist da próxima etapa</h2>
        <ul>
          <li>Substituir login mock por API real</li>
          <li>Aplicar logomarca final VistaPro</li>
          <li>Evoluir permissões por ação com persistência</li>
        </ul>
      </section>
    </div>
  );
}
