import Image from "next/image";
import Link from "next/link";
import { IoPersonSharp } from "react-icons/io5";
import logo from "../../../public/images/logos/logo-pu-512x512.png";

interface NavBarProps {
	admin?: boolean;
}

interface NavRoute {
	name: string;
	link: string;
}

const routes: NavRoute[] = [
	{ name: "home", link: "/" },
	{ name: "sobre", link: "/sobre" },
	{ name: "filie-se", link: "/filie-se" },
	{ name: "história", link: "/historia" },
];

const NavBar: React.FC<NavBarProps> = ({ admin }) => (
	<nav className="bg-black/25 w-4/5 h-[5.5rem] flex items-center justify-between p-4">
		<Link href="/">
			<Image src={logo} alt="logo pu 69" height={72} width={72} />
		</Link>
		<ul className="flex gap-8">
			{routes.map((route) => (
				<li key={route.name}>
					<Link
						href={route.link}
						className="text-white text-2xl font-semibold hover:underline"
					>
						{route.name}
					</Link>
				</li>
			))}
		</ul>
		{admin && (
			<Link href="/admin">
				<div className="w-12 h-12 rounded-md bg-white flex justify-center items-center cursor-pointer">
					<IoPersonSharp size={30} />
				</div>
			</Link>
		)}
	</nav>
);

export default NavBar;
