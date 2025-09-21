import { GrLinkNext } from "react-icons/gr";
import MainLayout from "../components/layouts/main-layout";

const Page: React.FC = () => {
	return (
		<MainLayout navbar={false}>
			<div className="h-full w-full flex flex-col justify-center items-center text-[#FFD625]">
				<div className="text-center mb-6">
					<h1 className="text-4xl font-bold">
						Bem vinde à Plataforma do Urubismo
					</h1>
					<p className="text-lg mt-4">Esta página ainda não está pronta</p>
				</div>
				<div className="text-lg">
					<span>Enquanto isso, você pode visitar o </span>
					<a
						href="/filie-se"
						className="text-blue-500 hover:underline inline-flex items-center gap-1"
					>
						<GrLinkNext />
						Filie-se
					</a>
					<span> para se juntar à nossa comunidade.</span>
				</div>
			</div>
		</MainLayout>
	);
};

export default Page;
