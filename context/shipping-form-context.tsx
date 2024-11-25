import React, { createContext, useContext } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z
  .object({
    fullName: z.string().min(6, {
      message: "El nombre es requerido.",
    }),
    phone: z.string().min(6, {
      message: "El número de teléfono es requerido.",
    }),
    email: z.string().min(6, {
      message: "El email es requerido.",
    }),
    address: z.string().min(10, {
      message: "La dirección es requerida.",
    }),
    identification: z.string().min(8, {
      message: "El documento es requerido.",
    }),
    apart: z.string().optional(),
    region: z.string().min(1, {
      message: "Provincia es requerida.",
    }),
    city: z.string().min(6, {
      message: "La ciudad es requerida.",
    }),
    zipCode: z.string().min(4, {
      message: "El código postal es requerido.",
    }),
    observations: z.string(),
    deliveryAddress: z.boolean(),
    deliveryFullName: z.string(),
    deliveryPhone: z.string().optional(),
    deliveryAddressLine: z.string().optional(),
    deliveryApart: z.string().optional(),
    deliveryCity: z.string().optional(),
    deliveryZipCode: z.string().optional(),
    deliveryRegion: z.string().optional(),
    deliveryDays: z.array(z.string()).min(1, {
      message: "Los días de entrega son requeridos.",
    }),
    deliveryTime: z.array(z.string()).min(1, {
      message: "El horario de entrega es requerido.",
    }),
  })
  .refine((data) => !data.deliveryAddress || data.deliveryFullName.length > 0, {
    path: ["deliveryFullName"],
    message: "Complete nombre de la persona que recibe",
  });

export type FormValues = z.infer<typeof formSchema>;

export type FormFieldNames = keyof FormValues;

const FormContext = createContext<UseFormReturn<FormValues> | undefined>(
  undefined
);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const formMethods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      zipCode: "",
      observations: "",
      region: "",
      deliveryAddress: false,
      deliveryAddressLine: "",
      deliveryPhone: "",
      deliveryApart: "",
      deliveryCity: "",
      deliveryRegion: "",
      deliveryZipCode: "",
      deliveryFullName: "",
      deliveryDays: [],
      deliveryTime: [],
    },
  });

  return (
    <FormContext.Provider value={formMethods}>{children}</FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
