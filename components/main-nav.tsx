import Link from "next/link";

const MainNav = () => {
  return (
    <div className="flex items-center">
      <ul className="flex space-x-12">
        <li>
          <Link href="/admin/products">Productos</Link>
        </li>
        <li>Clientes</li>
      </ul>
    </div>
  );
};

export default MainNav;
