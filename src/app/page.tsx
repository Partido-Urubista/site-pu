import MainLayout from "../components/layouts/main-layout";




const Page: React.FC = () => {
  return (
    <MainLayout>
      <div className="h-full w-full flex justify-center items-center">
        <div className="flex flex-col justify-center items-center text-[#FFD625]">
          <h1 className="text-4xl font-bold">Bem vinde ao Partido Urubista</h1>
          <h3 className="text-lg">A plataforma do urubismo</h3>
        </div>
      </div>
    </MainLayout>
  );
};

export default Page;
