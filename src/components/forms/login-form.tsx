/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Eye, EyeOff, Lock, UserCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import logo_pu from "../../../public/images/logos/logo-pu-192x192.png";
import { Button } from "../ui-external/shadcn-ui/button";
import { Checkbox } from "../ui-external/shadcn-ui/checkbox";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui-external/shadcn-ui/form";
import { Input } from "../ui-external/shadcn-ui/input";

const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm({
		resolver: zodResolver(
			z.object({
				login: z.string().nonempty("Login is required"),
				password: z.string().nonempty("Password is required"),
				rememberMe: z.boolean(),
			})
		),
		defaultValues: {
			login: "",
			password: "",
			rememberMe: false,
		},
	});

	const onSubmit = (data: any) => {
		setIsLoading(true);
		console.log("Form submitted with data:", data);
		setTimeout(() => setIsLoading(false), 1500);
	};

	return (
		<div className="w-full max-w-md p-8 bg-[#120200] rounded-xl shadow-xl ">
			<Title />
			<FormProvider {...form}>
				<form
					className="flex flex-col gap-5 w-full"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormField
						control={form.control}
						name="login"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-white">
									<Label className="after:content-['*'] after:text-[#F55B5B] text-sm sm:text-base">
										Qual seu @ no YT?
									</Label>
								</FormLabel>
								<FormControl>
									<div className="relative">
										<UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
										<Input
											placeholder="@urubu_de_uruguaiana"
											{...field}
											className="bg-gray-900 h-12 pl-10 pr-4 rounded-lg text-white border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
										/>
									</div>
								</FormControl>
								<FormMessage className="text-[#F55B5B]" />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-white">
									<Label className="after:content-['*'] after:text-[#F55B5B] text-sm sm:text-base">
										Senha
									</Label>
								</FormLabel>
								<FormControl>
									<div className="relative">
										<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
										<Input
											type={showPassword ? "text" : "password"}
											placeholder="Digite sua senha"
											{...field}
											className="bg-gray-900 h-12 pl-10 pr-10 rounded-lg text-white border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
										/>
										<button
											type="button"
											onClick={() => setShowPassword(!showPassword)}
											className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
										>
											{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
										</button>
									</div>
								</FormControl>
								<FormMessage className="text-[#F55B5B]" />
							</FormItem>
						)}
					/>

					<div className="flex items-center justify-between mt-2">
						<FormField
							control={form.control}
							name="rememberMe"
							render={({ field }) => (
								<FormItem className="flex items-center space-x-2">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
											className="h-5 w-5 border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
										/>
									</FormControl>
									<FormLabel className="text-gray-300 cursor-pointer text-sm">
										Lembrar de mim
									</FormLabel>
								</FormItem>
							)}
						/>
						<a
							href="#"
							className="text-sm text-blue-500 hover:text-blue-400 transition-colors"
						>
							Esqueceu a senha?
						</a>
					</div>

					<Button
						type="submit"
						disabled={isLoading}
						className="w-full h-12 mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-base transition-all duration-200 disabled:opacity-70"
					>
						{isLoading ? "Entrando..." : "Entrar"}
					</Button>
				</form>
			</FormProvider>
		</div>
	);
};

export default LoginForm;

const Title = () => (
	<div className="text-center mb-8">
		<div className="flex justify-center mb-4">
			<div className="relative w-20 h-20 bg-gradient-to-br from-red-700 to-red-900 rounded-full p-1">
				<div className="absolute inset-1 bg-black rounded-full flex items-center justify-center">
					<Image
						width={64}
						height={64}
						src={logo_pu}
						alt="logo do pu"
						className="rounded-full"
					/>
				</div>
			</div>
		</div>
		<h2 className="text-3xl font-bold text-white">Bem Vinde Camarada</h2>
		<p className="text-gray-400 mt-2">Faça login para continuar</p>
	</div>
);
