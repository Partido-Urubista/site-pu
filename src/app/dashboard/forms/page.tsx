import MainLayout from "@/components/layouts/main-layout";
import { requireAdmin } from "@/lib/auth-server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


//todo: melhorar o layout da página para os admins
export default async function FormsPage() {
	const user = await requireAdmin();

	const applications = await prisma.membershipApplication.findMany({
		orderBy: { createdAt: "desc" },
		select: {
			id: true,
			applicationNumber: true,
			youtubeId: true,
			age: true,
			state: true,
			status: true,
			createdAt: true,
			politicalIdeology: true,
		},
	});

	const totalToday = applications.filter(
		(app) =>
			new Date(app.createdAt).toDateString() === new Date().toDateString()
	).length;

	return (
		<MainLayout navbar={false}>
			<div className="min-h-screen bg-black text-white p-6">
				<div className="max-w-7xl mx-auto">
					{/* Header clean */}
					<header className="flex items-center justify-between mb-8 pb-4 border-b border-gray-800">
						<div>
							<h1 className="text-2xl font-medium text-white">Dashboard</h1>
							<p className="text-sm text-gray-400 mt-1">
								{applications.length} inscrições{" "}
								{totalToday > 0 && `• ${totalToday} hoje`}
							</p>
						</div>
						<div className="flex items-center gap-4">
							<span className="text-sm text-gray-400">{user.email}</span>
							{/* <LogoutButton /> */}
						</div>
					</header>

					{/* Tabela minimalista */}
					<div className="bg-gray-950/50 rounded-lg border border-gray-800 overflow-hidden">
						<table className="w-full">
							<thead>
								<tr className="border-b border-gray-800 bg-gray-900/30">
									<th className="text-left py-3 px-4 font-medium text-gray-400 text-sm">
										#
									</th>
									<th className="text-left py-3 px-4 font-medium text-gray-400 text-sm">
										YouTube
									</th>
									<th className="text-left py-3 px-4 font-medium text-gray-400 text-sm">
										Idade
									</th>
									<th className="text-left py-3 px-4 font-medium text-gray-400 text-sm">
										Estado
									</th>
									<th className="text-left py-3 px-4 font-medium text-gray-400 text-sm">
										Ideologia
									</th>
									<th className="text-left py-3 px-4 font-medium text-gray-400 text-sm">
										Status
									</th>
									<th className="text-left py-3 px-4 font-medium text-gray-400 text-sm">
										Data
									</th>
								</tr>
							</thead>
							<tbody>
								{applications.map((app, index) => (
									<tr
										key={app.id}
										className="border-b border-gray-800/50 hover:bg-gray-900/30 transition-colors"
									>
										<td className="py-3 px-4 text-sm">
											<span className="font-mono text-gray-300">
												{app.applicationNumber}
											</span>
										</td>
										<td className="py-3 px-4 text-sm text-white">
											{app.youtubeId}
										</td>
										<td className="py-3 px-4 text-sm text-gray-300">
											{app.age}
										</td>
										<td className="py-3 px-4 text-sm text-gray-300">
											{app.state}
										</td>
										<td className="py-3 px-4 text-sm text-gray-300 max-w-xs truncate">
											{app.politicalIdeology}
										</td>
										<td className="py-3 px-4 text-sm">
											<StatusBadge status={app.status} />
										</td>
										<td className="py-3 px-4 text-sm text-gray-400">
											{new Date(app.createdAt).toLocaleDateString("pt-BR")}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{/* Empty state simples */}
					{applications.length === 0 && (
						<div className="text-center py-12">
							<p className="text-gray-500">Nenhuma inscrição ainda</p>
						</div>
					)}
				</div>
			</div>
		</MainLayout>
	);
}

function StatusBadge({ status }: { status: string }) {
	const styles = {
		OK: "bg-green-900/40 text-green-400 border-green-800/40",
		UNUSUAL: "bg-yellow-900/40 text-yellow-400 border-yellow-800/40",
		PENDING: "bg-gray-700/40 text-gray-400 border-gray-600/40",
	};

	const labels = {
		OK: "",
		UNUSUAL: "",
		PENDING: "",
	};

	return (
		<span
			className={`
      inline-block px-2 py-1 rounded text-xs border
      ${styles[status as keyof typeof styles] || styles.PENDING}
    `}
		>
			{labels[status as keyof typeof labels] || status}
		</span>
	);
}


//todo: mudar o botão de logout para src/components/
//todo: remover o logout button

// function LogoutButton() {
// 	const logout = () => {
// 		signOut({ callbackUrl: "/login" });
// 	};
// 	return (
// 		<button
// 			onClick={logout}
// 			className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
// 			title="Sair"
// 		>
// 			<LogOut className="w-4 h-4" />
// 		</button>
// 	);
// }
