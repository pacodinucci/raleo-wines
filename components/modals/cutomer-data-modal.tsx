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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { PaymentCardForm } from "../mercadopago/payment-card-form";

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
});

export const CustomerDataModal = () => {
  const customerDataModal = useCustomerDataModal();
  const [loading, setLoading] = useState(false);
  const [showPaymentCardForm, setShowPaymentCardForm] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      region: "",
      city: "",
      zipCode: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (!customerDataModal.isOpen) {
      form.reset();
      setShowPaymentCardForm(false);
    }
  }, [customerDataModal.isOpen, form]);

  if (!customerDataModal.isOpen) return null;

  return (
    <Modal
      title="Suscribirse al Club de Vino"
      description={
        !showPaymentCardForm
          ? "Complete el formulario con sus datos"
          : "Complete los datos de su tarjeta de crédito"
      }
      isOpen={customerDataModal.isOpen}
      onClose={customerDataModal.onClose}
    >
      <div>
        {!showPaymentCardForm ? (
          <div className="space-y-4 py-2 pb-4">
            <Form {...form}>
              <form
                className="flex flex-col gap-4"
                onSubmit={form.handleSubmit(() => {
                  console.log(form.getValues());
                  setShowPaymentCardForm(true);
                })}
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
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccione su ciudad" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ciudad de buenos aires">
                              Ciudad de Buenos Aires
                            </SelectItem>
                            <SelectItem value="vicente lopez">
                              Vicente López
                            </SelectItem>
                            <SelectItem value="la plata">La Plata</SelectItem>
                          </SelectContent>
                        </Select>
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
                    Ir al pago
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        ) : (
          <PaymentCardForm />
        )}
      </div>
    </Modal>
  );
};
