import LoginForm from "@/components/forms/login-form";
import MainLayout from "@/components/layouts/main-layout";

const Page: React.FC = () => {
	return (
		<MainLayout navbar={false}>
			<div className="h-full w-full flex flex-col justify-center items-center ">
				<LoginForm />
			</div>
		</MainLayout>
	);
};

export default Page;
