import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const signUpForm = z.object({
    restaurantName: z.string(),
    managerName: z.string(),
    phone: z.string(),
    email: z.string().email(),
});

type SignUpForm = z.infer<typeof signUpForm>;

export function SignUp() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<SignUpForm>({
        resolver: zodResolver(signUpForm),
    });

    async function handleSignUp(data: SignUpForm) {
        console.log(data);
        try {
            toast.success("Restaurante cadastrado com sucesso", {
                action: {
                    label: "Login",
                    onClick: () => {
                        navigate("/sign-in");
                    },
                },
            });
        } catch {
            toast.error("Erro ao cadastrar restaurante");
        }
    }

    return (
        <>
            <Helmet title="Cadastro" />
            <div className="p-8">
                <Button
                    asChild
                    variant="ghost"
                    className="absolute right-4 top-8"
                >
                    <Link to="/sign-in">Fazer Login</Link>
                </Button>
                <div className="flex w-[350px] flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Criar Conta Gratis
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Seja um Parceiro e comece suas vendas
                        </p>
                    </div>
                    <form
                        className="space-y-4"
                        onSubmit={handleSubmit(handleSignUp)}
                    >
                        <div className="space-y-2">
                            <Label htmlFor="restaurantName">
                                Nome do estabelecimento
                            </Label>
                            <Input
                                id="restaurantName"
                                type="text"
                                {...register("restaurantName")}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="managerName">Seu nome</Label>
                            <Input
                                id="managerName"
                                type="text"
                                {...register("managerName")}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Seu e-mail</Label>
                            <Input
                                id="email"
                                type="email"
                                {...register("email")}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Seu celular</Label>
                            <Input
                                id="phone"
                                type="tel"
                                {...register("phone")}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            Finalizar Cadastro
                        </Button>
                        <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
                            Ao continuar, você concorda com nossos
                            <a href="" className="underline underline-offset-4">
                                &nbsp; termos de serviço
                            </a>
                            &nbsp; e &nbsp;
                            <a href="" className="underline underline-offset-4">
                                politicas de privacidade
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}
