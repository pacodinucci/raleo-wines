"use client";

import React, { useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import useProductStore from "@/hooks/use-product-store"; // Ruta a tu estado de productos
import { Check, ChevronsUpDown, Plus, Trash2 } from "lucide-react";
import { Bill, Packingbill } from "@prisma/client";
import axios from "axios";
import { toast } from "sonner";
import { ProductCombobox } from "@/components/ui/product-combobox";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import useBillStore from "@/hooks/use-bill-store";

interface PackingbillFormProps {
  initialData: Packingbill | null;
}

const productSchema = z.object({
  productId: z.string().min(1, { message: "El ID del producto es requerido." }),
  stock: z
    .number()
    .min(0, { message: "El stock debe ser un número mayor o igual a 0." }),
});

const formSchema = z.object({
  packingbillNumber: z
    .string()
    .min(1, { message: "El número de remito es requerido." }),
  products: z
    .array(productSchema)
    .min(1, { message: "Debe haber al menos un producto en la lista." }),
  observations: z.string().optional(),
  // linkedBillNumber: z.string().optional(),
  company: z.string().min(1, { message: "Titular es requerido." }),
});

const PackingbillForm = ({ initialData }: PackingbillFormProps) => {
  const router = useRouter();
  const [bill, setBill] = useState<Bill | null>(null);

  const {
    products,
    fetchProducts,
    isLoading: productsLoading,
  } = useProductStore();

  const { getBillById } = useBillStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const fetchBill = async () => {
      if (initialData?.billId) {
        const fetchedBill = await getBillById(initialData.billId);
        setBill(fetchedBill);
      }
    };

    fetchBill();
  }, [initialData?.billId, getBillById]);

  useEffect(() => {
    console.log(bill);
  }, [bill]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          packingbillNumber: initialData.packingbillNumber || "",
          company: initialData.company || "",
          products: Array.isArray(initialData.products)
            ? (
                initialData.products as Array<{
                  productId: string;
                  stock: number;
                }>
              ).map((product) => ({
                productId: product.productId || "",
                stock: product.stock || 0,
              }))
            : [{ productId: "", stock: 0 }],
          observations: initialData.observations || "",
        }
      : {
          packingbillNumber: "",
          company: "",
          products: [{ productId: "", stock: 0 }],
          observations: "",
        },
  });

  const isLoading = form.formState.isSubmitting;

  console.log("InitialData --> ", initialData);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (initialData) {
        await axios.patch("/api/packingbills", { ...data, id: initialData.id });
        toast.success("Remito actualizado exitosamente.");
        router.push("/admin/stock");
      } else {
        await axios.post("/api/packingbills", data);
        toast.success("Remito creado exitosamente.");
        router.push("/admin/stock");
      }
    } catch (error) {
      console.log(error);
      toast.error("No se pudo cargar el remito.");
    }
  };

  const addProduct = () => {
    const currentProducts = form.getValues("products");
    form.setValue("products", [
      ...currentProducts,
      { productId: "", stock: 0 },
    ]);
  };

  const removeProduct = (index: number) => {
    const currentProducts = form.getValues("products");
    currentProducts.splice(index, 1);
    form.setValue("products", currentProducts);
  };

  return (
    <div className="h-full p-4 space-y-2 max-w-6xl">
      <Form {...form}>
        <form
          className="space-y-8 pb-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-6 w-full">
            <div>
              <h3 className="text-lg font-medium">Crear Remito</h3>
              <p className="text-sm text-muted-foreground">
                Completar los campos para crear un nuevo remito.
              </p>
            </div>
            <Separator className="bg-primary/10" />
            <div className="w-3/4 flex justify-between">
              <FormField
                name="company"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>Titular</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              {initialData ? (
                <div>
                  {bill ? (
                    <div>
                      <h4 className="text-xl font-medium text-neutral-700">
                        Nro. Factura: {bill.billNumber}
                      </h4>
                    </div>
                  ) : (
                    <Button>Facturar Remito</Button>
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="w-3/4 flex gap-8">
              <FormField
                name="packingbillNumber"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>Número de Remito</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4">
              <div className="flex space-x-4 w-3/4">
                <div className="w-[70%]">
                  <FormLabel>Producto</FormLabel>
                </div>
                <div className="flex-1">
                  <FormLabel>Cantidad</FormLabel>
                </div>
                <div className="w-[100px]">
                  {/* Espacio para el botón eliminar */}
                </div>
              </div>
              {form.watch("products").map((product, index) => (
                <div key={index} className="flex space-x-4 items-end w-3/4">
                  <FormField
                    name={`products.${index}.productId`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="w-[70%]">
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Seleccione un producto" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {products.map((product) => (
                                  <SelectItem
                                    key={product.id}
                                    value={product.id}
                                  >
                                    {`${product.title} - Bodega ${product.winery}`}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name={`products.${index}.stock`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="w-[10%]">
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            placeholder="Cantidad"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    color="red"
                    onClick={() => removeProduct(index)}
                    // className="w-[100px]"
                  >
                    <Trash2 />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addProduct}
                disabled={isLoading}
              >
                <Plus />
              </Button>
            </div>
            <FormField
              name="observations"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-3/4">
                  <FormLabel>Observaciones</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Ingrese observaciones adicionales..."
                      className="block w-full h-24 p-2 border rounded-md resize-none border-gray-300 focus:ring focus:ring-primary/30"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button
              type="submit"
              variant="default"
              className="mt-4"
              disabled={isLoading || (initialData?.billId ? true : false)}
            >
              {initialData
                ? initialData.billId
                  ? "Remito ya está asociado a una factura"
                  : "Actualizar Remito"
                : "Guardar Remito"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PackingbillForm;
