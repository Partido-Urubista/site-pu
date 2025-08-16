import NavBar from "@/components/layouts/nav-bar";

interface mainLayoutProps {
  children: React.ReactNode;
  navbar?: boolean;
}

const MainLayout: React.FC<mainLayoutProps> = ({ children, navbar = true }) => {
  return (
    <main className="h-screen w-screen bg-gradient-to-br p-4 flex flex-col justify-center items-center from-[#000000] to-[#FB0100]">
      {navbar && <NavBar admin />}
      <div className="w-full h-full overflow-hidden">{children}</div>
    </main>
  );
};

export default MainLayout;
