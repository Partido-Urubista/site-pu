import { MembershipForm } from "@/components/forms/membership-form";
import MainLayout from "@/components/layouts/main-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Partido Urubista | Filie-se",
	description: "A plataforma do urubismo para filiação",
};

const Page: React.FC = () => {
	return (
		<MainLayout navbar={false}>
			<div className="h-full w-full flex flex-col justify-center items-center ">
				<MembershipForm />
			</div>
		</MainLayout>
	);
};

export default Page;
