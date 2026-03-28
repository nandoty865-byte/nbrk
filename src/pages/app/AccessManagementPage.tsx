import { permissionDefinitions } from '@/config/accessControl';

export default function AccessManagementPage() {
  return (
    <section className="card stack-md">
      <div>
        <span className="eyebrow">Governança</span>
        <h1>Base inicial de permissões</h1>
        <p className="muted">Página preparada para evoluir com toggles, overrides e persistência por perfil.</p>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Action Key</th>
              <th>Módulo</th>
              <th>Descrição</th>
              <th>Perfis</th>
            </tr>
          </thead>
          <tbody>
            {permissionDefinitions.map((item) => (
              <tr key={item.key}>
                <td>{item.key}</td>
                <td>{item.moduleKey}</td>
                <td>{item.label}</td>
                <td>{item.allowedRoles.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
