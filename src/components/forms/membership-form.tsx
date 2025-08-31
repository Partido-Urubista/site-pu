"use client";

import { MembershipFormSchema } from "@/core/domain/dtos/membership-form.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trefoil } from "ldrs/react";
import "ldrs/react/Trefoil.css";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { useMembershipCreate } from "../../hooks/membership-application/use-membership-application-create";
import { Button } from "../ui-external/shadcn-ui/button";
import { Checkbox } from "../ui-external/shadcn-ui/checkbox";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui-external/shadcn-ui/form";
import { Input } from "../ui-external/shadcn-ui/input";
import { Label } from "../ui-external/shadcn-ui/label";
import { ScrollArea } from "../ui-external/shadcn-ui/scroll-area";

const Title = () => (
	<div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mt-3">
		<p>PARTIDO URUBISTA</p>
		<p>FORMULÁRIO DE INSCRIÇÃO</p>
	</div>
);

const MembershipForm: React.FC = () => {
	const form = useForm<z.infer<typeof MembershipFormSchema>>({
		resolver: zodResolver(MembershipFormSchema),
		defaultValues: {
			age: "",
			state: "",
			youtubeId: "",
			discordId: "",
			motivation: "",
			howDidYouHear: "",
			neurodivergence: "",
			youtubeChannels: "",
			politicalIdeology: "",
			onlinePresence: undefined,
			currentSituation: undefined,
			escaralhamentoLevel: undefined,
		},
	});

	const { createMembership, isLoading, isSuccess, isError } =
		useMembershipCreate();

	useEffect(() => {
		if (isSuccess) {
			form.reset();
		}
	}, [isSuccess, form]);

	const onSubmit = (data: z.infer<typeof MembershipFormSchema>) => {
		createMembership(data);
	};

	if (isSuccess) {
		return (
			<div className="flex flex-col items-center justify-center text-center text-white bg-black p-8 rounded-xl h-96">
				<h2 className="text-2xl font-bold mb-4">Inscrição enviada com sucesso!</h2>
				<p>Agradecemos seu interesse. Entraremos em contato em breve.</p>
			</div>
		);
	}

	return (
		<ScrollArea className="flex flex-col h-full w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[50%] px-4 sm:px-6 md:px-8 lg:px-10 bg-black py-2 rounded-xl">
			<section className="flex flex-col gap-4 rounded-[0px]">
				<Title />

				<FormProvider {...form}>
					<form
						className="flex flex-col gap-4 md:gap-5 w-full"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<fieldset disabled={isLoading} className="space-y-4 md:space-y-5">
							<FormField
								control={form.control}
								name="youtubeId"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-white">
											<Label className="after:content-['*'] after:text-[#F55B5B] text-sm sm:text-base">
												Qual seu @ no YT?
											</Label>
										</FormLabel>
										<FormControl>
											<Input
												placeholder="@urubu_de_uruguaiana"
												{...field}
												className="bg-white h-10 sm:h-12 md:h-14 rounded-[1] text-sm sm:text-base"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="discordId"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-white">
											<Label className="text-sm sm:text-base">
												Qual seu @ no Discord?
											</Label>
										</FormLabel>
										<FormControl>
											<Input
												placeholder="@urubu_de_uruguaiana"
												{...field}
												className="bg-white h-10 sm:h-12 md:h-14 rounded-[1] text-sm sm:text-base"
											/>
										</FormControl>
										<FormDescription className="text-white after:content-['!'] after:text-[#F55B5B] text-xs sm:text-sm">
											caso não tenha é imprescindível criar pois é nosso meio de
											comunicação oficial
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="age"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-white">
											<Label className="after:content-['*'] after:text-[#F55B5B] text-sm sm:text-base">
												Quantos anos você tem?
											</Label>
										</FormLabel>
										<FormControl>
											<Input
												placeholder="69"
												{...field}
												className="bg-white h-10 sm:h-12 md:h-14 rounded-[1] text-sm sm:text-base"
												max={120}
												type="number"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="state"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-white">
											<Label className="after:content-['*'] after:text-[#F55B5B] text-sm sm:text-base">
												De que estado você é
											</Label>
										</FormLabel>
										<FormControl>
											<Input
												placeholder="Pernambuco"
												{...field}
												className="bg-white h-10 sm:h-12 md:h-14 rounded-[1] text-sm sm:text-base"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="youtubeChannels"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-white">
											<Label className="after:content-['*'] after:text-[#F55B5B] text-sm sm:text-base">
												Quais canais que acompanha no YT?
											</Label>
										</FormLabel>
										<FormControl>
											<Input
												placeholder="Canal 1, Canal 2, Canal 3..."
												{...field}
												className="bg-white h-10 sm:h-12 md:h-14 rounded-[1] text-sm sm:text-base"
											/>
										</FormControl>
										<FormDescription className="text-white text-xs sm:text-sm">
											Os canais comunas
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="politicalIdeology"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-white">
											<Label className="after:content-['*'] after:text-[#F55B5B] text-sm sm:text-base">
												Qual sua ideologia política?
											</Label>
										</FormLabel>
										<FormControl>
											<Input
												placeholder=""
												{...field}
												className="bg-white h-10 sm:h-12 md:h-14 rounded-[1] text-sm sm:text-base"
											/>
										</FormControl>
										<FormDescription className="text-white text-xs sm:text-sm">
											lembrando que o PU abrange as inúmeras correntes de
											pensamento Marxista
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="onlinePresence"
								render={({ field }) => (
									<FormItem className="space-y-2">
										<FormLabel className="text-white">
											<Label className="after:content-['*'] after:text-[#F55B5B] text-sm sm:text-base">
												Qual seu nível de presença online?
											</Label>
										</FormLabel>
										<FormControl>
											<div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
												<Label className="flex items-center gap-2 text-white text-sm sm:text-base p-2 hover:bg-white/10 rounded cursor-pointer">
													<Checkbox
														className="w-5 h-5"
														checked={field.value === "Pouco ativo"}
														onCheckedChange={() =>
															field.onChange("Pouco ativo")
														}
													/>
													Pouco ativo
												</Label>
												<Label className="flex items-center gap-2 text-white text-sm sm:text-base p-2 hover:bg-white/10 rounded cursor-pointer">
													<Checkbox
														className="w-5 h-5"
														checked={field.value === "Moderadamente online"}
														onCheckedChange={() =>
															field.onChange("Moderadamente online")
														}
													/>
													Moderadamente online
												</Label>
												<Label className="flex items-center gap-2 text-white text-sm sm:text-base p-2 hover:bg-white/10 rounded cursor-pointer">
													<Checkbox
														className="w-5 h-5"
														checked={field.value === "Cronicamente online"}
														onCheckedChange={() =>
															field.onChange("Cronicamente online")
														}
													/>
													Cronicamente online
												</Label>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="escaralhamentoLevel"
								render={({ field }) => (
									<FormItem className="space-y-2">
										<FormLabel className="text-white">
											<Label className="after:content-['*'] after:text-[#F55B5B] text-sm sm:text-base">
												Qual seu nível de domínio no escaralhamento (caso não
												saiba, selecione iniciante)
											</Label>
										</FormLabel>
										<FormControl>
											<div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
												<Label className="flex items-center gap-2 text-white text-sm sm:text-base p-2 hover:bg-white/10 rounded cursor-pointer">
													<Checkbox
														className="w-5 h-5"
														checked={field.value === "Iniciante"}
														onCheckedChange={() => field.onChange("Iniciante")}
													/>
													Iniciante
												</Label>
												<Label className="flex items-center gap-2 text-white text-sm sm:text-base p-2 hover:bg-white/10 rounded cursor-pointer">
													<Checkbox
														className="w-5 h-5"
														checked={field.value === "Escaralhador médio"}
														onCheckedChange={() =>
															field.onChange("Escaralhador médio")
														}
													/>
													Escaralhador médio
												</Label>
												<Label className="flex items-center gap-2 text-white text-sm sm:text-base p-2 hover:bg-white/10 rounded cursor-pointer">
													<Checkbox
														className="w-5 h-5"
														checked={field.value === "Doutrinador"}
														onCheckedChange={() =>
															field.onChange("Doutrinador")
														}
													/>
													Doutrinador
												</Label>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="neurodivergence"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-white">
											<Label className="text-sm sm:text-base">
												Você possui alguma neurodivergência?
											</Label>
										</FormLabel>
										<FormControl>
											<Input
												placeholder="(opcional)"
												{...field}
												className="bg-white h-10 sm:h-12 md:h-14 rounded-[1] text-sm sm:text-base"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="howDidYouHear"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-white">
											<Label className="after:content-['*'] after:text-[#F55B5B] text-sm sm:text-base">
												Como você ficou sabendo do partido?
											</Label>
										</FormLabel>
										<FormControl>
											<div className="relative">
												<textarea
													placeholder="Ex: Twitter, Instagram, amigos, etc."
													{...field}
													className="bg-white h-20 sm:h-24 rounded-[1] p-2 w-full text-sm sm:text-base"
													maxLength={500}
												/>
												<div className="flex justify-between">
													<FormDescription className="text-white after:content-['!'] after:text-[#F55B5B] text-xs sm:text-sm">
														Mínimo 20 caracteres
													</FormDescription>
													<span className="text-white mt-1 text-xs sm:text-sm">
														{field.value?.length || 0}/500
													</span>
												</div>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="motivation"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-white">
											<Label className="after:content-['*'] after:text-[#F55B5B] text-sm sm:text-base">
												Qual sua motivação de entrar para o partido?
											</Label>
										</FormLabel>
										<FormControl>
											<div className="relative">
												<textarea
													placeholder="Ex: Quero ajudar na revolução, etc."
													{...field}
													className="bg-white h-20 sm:h-24 rounded-[1] p-2 w-full text-sm sm:text-base"
													maxLength={500}
												/>
												<div className="flex justify-between">
													<FormDescription className="text-white after:content-['!'] after:text-[#F55B5B] text-xs sm:text-sm">
														Mínimo 20 caracteres
													</FormDescription>
													<span className="text-white mt-1 text-xs sm:text-sm">
														{field.value?.length || 0}/500
													</span>
												</div>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="currentSituation"
								render={({ field }) => (
									<FormItem className="space-y-2">
										<FormLabel className="text-white">
											<Label className="after:content-['*'] after:text-[#F55B5B] text-sm sm:text-base">
												Qual sua atual situação?
											</Label>
										</FormLabel>
										<FormControl>
											<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
												{[
													"Ensino Médio",
													"Faculdade",
													"Técnico",
													"Vestibular",
													"Trabalhando",
													"Desempregado",
												].map((item) => (
													<Label
														key={item}
														className="flex items-center gap-2 text-white text-sm sm:text-base p-2 hover:bg-white/10 rounded cursor-pointer"
													>
														<Checkbox
															className="w-5 h-5"
															checked={field.value === item}
															onCheckedChange={() => field.onChange(item)}
														/>
														{item}
													</Label>
												))}
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</fieldset>

						{isError && (
							<p className="text-red-500 text-center">
								Ocorreu um erro ao enviar o formulário. Tente novamente.
							</p>
						)}

						<Button
							className="my-4 sm:my-6 md:my-8 duration-500 transition-all border hover:border-black h-10 sm:h-12 md:h-14 bg-black hover:bg-white hover:text-black w-full sm:w-auto sm:px-8 md:px-12 disabled:bg-gray-500 disabled:cursor-not-allowed"
							type="submit"
							disabled={isLoading}
						>
							{isLoading ? (
								<div className="flex items-center gap-2">
									<Trefoil size="20" stroke="3" color="white" />
									<span>Enviando...</span>
								</div>
							) : (
								<p className="text-lg sm:text-xl md:text-2xl">Enviar</p>
							)}
						</Button>
					</form>
				</FormProvider>
			</section>
		</ScrollArea>
	);
};

export { MembershipForm };
