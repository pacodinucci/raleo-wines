"use client";

import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product, User } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ImageUpload } from "./image-upload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { wineTypes, boxes, discounts } from "@/lib/constants";

interface ProductFormProps {
  initialData: Product | null;
  // user: User | null;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Título es requerido.",
  }),
  winery: z.string().min(1, {
    message: "EL nombre de la bodega es requerido.",
  }),
  category: z.string().min(1, {
    message: "Categoría de vino es requerida.",
  }),
  type: z.string().min(1, {
    message: "Variedad de vino requerida.",
  }),
  year: z.string().min(1, { message: "Año de cosecha es requerido." }),
  size: z.string().min(1, {
    message: "Tamaño de vino es requerido.",
  }),
  harvest: z.string().min(1, {
    message: "Cosecha del vino es requerido.",
  }),
  fermentation: z.string().min(1, {
    message: "Fermentación del vino es requerido.",
  }),
  aging: z.string().min(1, {
    message: "Añejamiento del vino es requerido.",
  }),
  notes: z.string().min(1, {
    message: "Notas del vino es requerido.",
  }),
  composition: z.string().min(1, {
    message: "Composición del vino es requerido.",
  }),
  cellar: z.string().min(1, {
    message: "Capacidad de guarda del vino es requerido.",
  }),
  alcohol: z.string().min(1, {
    message: "Grado alcoholico del vino es requerido.",
  }),
  ph: z.string().optional(),
  src: z.string().min(1, {
    message: "Imagen es requerida.",
  }),
  weight: z.string().min(1, {
    message: "Peso es requerido.",
  }),
  discount: z.string(),
  price: z.string(),
  stock: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Stock debe ser un número.",
  }),
  // external_reference: z.string().min(5, {
  //   message: "External Reference es requerido.",
  // }),
  available: z.boolean().default(true),
  boxSize: z.string(),
});

const ProductForm = ({ initialData }: ProductFormProps) => {
  const router = useRouter();
  const params = useParams();

  const defaultValues = initialData
    ? {
        ...initialData,
        stock: initialData.stock.toString(),
      }
    : {
        title: "",
        winery: "",
        category: "",
        type: "",
        year: "",
        size: "750ml",
        src: "",
        harvest: "",
        fermentation: "",
        aging: "",
        notes: "",
        composition: "",
        cellar: "",
        alcohol: "",
        ph: "",
        discount: "0",
        weight: "",
        price: "",
        stock: "0", // stock como string
        // external_reference: "",
        available: true,
        boxSize: "6",
      };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const transformedData = {
      ...data,
      stock: Number(data.stock),
    };

    console.log({ transformedData });

    try {
      if (!initialData) {
        await axios.post("/api/products", { ...transformedData });
        toast.success("Producto agregado.");
        router.push("/admin/products");
      } else {
        await axios.patch(`/api/products/${params.productId}`, {
          data: transformedData,
        });
        toast.success("Producto actualizado.");
        router.push("/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("No se pudo agregar el producto.");
    }
  };

  return (
    <div className="h-full p-4 space-y-2 max-w-6xl">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pb-10"
        >
          <div className="space-y-2 w-full">
            <div>
              <h3 className="text-lg font-medium">Agregar Producto</h3>
              <p className="text-sm text-muted-foreground">
                Completar los campos para agregar un nuevo producto.
              </p>
            </div>
            <Separator className="bg-primary/10" />
            <div className="pt-6 pb-4 flex gap-x-10">
              <div className="flex-1 flex flex-col gap-y-4">
                <FormField
                  name="title"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título del producto</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex gap-x-12">
                  <FormField
                    name="type"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Variedad</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="winery"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Bodega</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="year"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="max-w-36 min-w-36">
                        <FormLabel>Año de cosecha</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" min="2020" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="category"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="max-w-36 min-w-36">
                        <FormLabel>Tipo de vino</FormLabel>
                        <Select
                          disabled={isLoading}
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                defaultValue={field.value}
                                placeholder="Seleccionar un tipo de vino"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {wineTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  name="harvest"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Período de cosecha</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="fermentation"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fermentación y vinificación</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={5} className="resize-none" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="notes"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notas de Cata</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={5} className="resize-none" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="aging"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Añejamiento</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="composition"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Composición</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex gap-x-8">
                  <FormField
                    name="cellar"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Capacidad de guarda</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="alcohol"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="max-w-40">
                        <FormLabel>Graduación alcohólica</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="ph"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="max-w-40">
                        <FormLabel>Acidez</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                name="src"
                render={({ field }) => (
                  <FormItem className="max-w-md flex flex-col space-y-4">
                    <FormControl>
                      <ImageUpload
                        disabled={isLoading}
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-x-12">
              <FormField
                name="price"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="weight"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peso por caja</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" className="max-w-32" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="boxSize"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Botellas por caja</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value || "6"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {boxes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                name="discount"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descuento</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Seleccionar descuento"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {discounts.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            {/* <div className="py-4">
              <FormField
                name="external_reference"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>
                      External Reference (Referencia para ShipNow)
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div> */}
            <div className="py-4">
              <FormField
                name="available"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex gap-x-2 items-center">
                    <FormLabel className="pt-2">Disponible</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Separator />
            <div className="pt-4">
              <Button type="submit" disabled={isLoading}>
                {initialData ? "Actualizar producto" : "Agregar producto"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
