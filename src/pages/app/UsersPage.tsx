import RequirePermission from '@/components/auth/RequirePermission';

const users = [
  { id: 'USR-001', name: 'Ana Souza', role: 'admin', status: 'ativo', team: 'Operações' },
  { id: 'USR-002', name: 'Carlos Lima', role: 'gestor', status: 'ativo', team: 'Comercial' },
  { id: 'USR-003', name: 'Marina Rocha', role: 'auditoria', status: 'pendente', team: 'Compliance' },
  { id: 'USR-004', name: 'Bruno Prado', role: 'operacao', status: 'suspenso', team: 'Campo' },
];

export default function UsersPage() {
  return (
    <section className="card stack-md">
      <div className="section-header">
        <div>
          <span className="eyebrow">Usuários</span>
          <h1>Gestão inicial de usuários</h1>
          <p className="muted">Tabela mock pronta para evoluir com filtros, paginação e CRUD real.</p>
        </div>
        <RequirePermission actionKey="users:create" fallback={<button className="button button--ghost" disabled>Sem permissão</button>}>
          <button className="button">Novo usuário</button>
        </RequirePermission>
      </div>

      <div className="grid grid--stats">
        <article className="mini-card"><strong>4</strong><span>Total</span></article>
        <article className="mini-card"><strong>2</strong><span>Ativos</span></article>
        <article className="mini-card"><strong>1</strong><span>Pendente</span></article>
        <article className="mini-card"><strong>1</strong><span>Suspenso</span></article>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Perfil</th>
              <th>Equipe</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>{user.team}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
