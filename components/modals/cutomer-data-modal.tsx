"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";

import { Modal } from "@/components/ui/modal";
import { useCustomerDataModal } from "@/hooks/use-customer-data-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import suscribe from "@/actions/suscribe";

const formSchema = z.object({
  name: z
    .string()
    .min(8, { message: "Por favor, ingrese su nombre completo." }),
  email: z.string().email({ message: "Dirección de email inválida." }),
  address: z.string(),
  region: z.string(),
  city: z.string(),
  zipCode: z.string(),
  phone: z.string(),
  plan: z.string(),
});

export const CustomerDataModal = () => {
  const customerDataModal = useCustomerDataModal();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      region: "",
      city: "",
      zipCode: "",
      phone: "44445555",
      plan: "tinto",
    },
  });

  useEffect(() => {
    if (!customerDataModal.isOpen) {
      form.reset();
    }
  }, [customerDataModal.isOpen, form]);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const suscription = await suscribe(data.email);

      const payload = {
        ...data,
        mercadopagoId: suscription.id,
      };

      const response = await axios.post("/api/subscription", payload);

      toast.success("Redirigiendo al proceso de pago...");

      window.location.href = suscription.init_point!;
    } catch (error) {
      console.error("Error al suscribirse:", error);
      toast.error("Hubo un problema al intentar suscribirte.");
    } finally {
      setLoading(false);
    }
  };

  if (!customerDataModal.isOpen) return null;

  return (
    <Modal
      title="Suscribirse al Club de Vino"
      description="Complete el formulario con sus datos"
      isOpen={customerDataModal.isOpen}
      onClose={customerDataModal.onClose}
    >
      <div className="space-y-4 py-2 pb-4">
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Completo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Escriba su nombre y apellido"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Escriba su email"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Escriba su calle y altura"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localidad</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese su localidad"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ciudad</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese su ciudad"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código Postal</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese su código postal"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
              <Button
                variant="outline"
                onClick={customerDataModal.onClose}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                Suscribirse
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
