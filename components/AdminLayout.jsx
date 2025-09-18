import Link from "next";

export default function AdminLayout() {
  return (
    <div className="text-center flex items-center justify-center bg-green-600">
      <aside>
        <img src="public/img_01.png"></img>

        <Link id="crud-user">Usuarios</Link>
        <Link id="crud-eventos">Eventos</Link>
        <Link id="crud-setores">Setores</Link>
        <Link id="crud-cliente">Clientes</Link>
        <Link id="crud-ingresso">Ingressos</Link>
        <Link>Dashboard</Link>
      </aside>
    </div>
  );
}
