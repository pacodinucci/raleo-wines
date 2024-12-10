"use client";

import React, { useEffect, useState } from "react";
import { Bill, Packingbill } from "@prisma/client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import usePackingbillStore from "@/hooks/use-packingbill-store";
import useProductStore from "@/hooks/use-product-store";
import { formatNumber, getProductName } from "@/lib/helpers";
import { Textarea } from "@/components/ui/textarea";

interface BillFormProps {
  initialData: Bill | null;
}

export const productSchema = z.object({
  name: z.string().min(1, "El nombre del producto es obligatorio"),
  unitPrice: z
    .number()
    .min(0, "El precio del producto debe ser mayor o igual a 0"),
  quantity: z.number().int().min(1, "La cantidad debe ser al menos 1"),
  subtotal: z.number().min(0, "El subtotal debe ser mayor o igual a 0"),
});

export const formSchema = z.object({
  billNumber: z
    .string()
    .min(1, { message: "El numero de factura es requerido" }),
  linkedPackingbills: z
    .array(z.string())
    .min(1, "Debe asociar al menos un remito"),
  company: z
    .string()
    .min(1, { message: "El titual de la factura es requerido." }),
  products: z.array(productSchema).min(1, "Debe agregar al menos un producto"),
  observations: z.string().optional(),
  subtotal: z.number().min(0, "El subtotal debe ser mayor o igual a 0"),
  iva: z.number().min(0, "El IVA debe ser mayor o igual a 0"),
  total: z.number().min(0, "El total debe ser mayor o igual a 0"),
});

const BillForm = ({ initialData }: BillFormProps) => {
  const [availablePackingbills, setAvailablePackingbills] = useState<
    Packingbill[]
  >([]);
  const [selectedPackingbills, setSelectedPackingbills] = useState<string[]>(
    []
  );
  const [productsTable, setProductsTable] = useState<
    { productId: string; name: string; quantity: number; price: number }[]
  >([]);

  const { packingbills, fetchPackingbills } = usePackingbillStore();
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchPackingbills().then(() => {
      const filteredPackingbills = packingbills.filter(
        (packingbill) => !packingbill.billId
      );
      setAvailablePackingbills(filteredPackingbills);
    });
    fetchProducts();
  }, [fetchPackingbills]);

  const updateProductsTable = () => {
    const combinedProducts: Record<
      string,
      { productId: string; name: string; quantity: number; price: number }
    > = {};

    selectedPackingbills.forEach((billId) => {
      const packingbill = availablePackingbills.find((pb) => pb.id === billId);
      if (packingbill && Array.isArray(packingbill.products)) {
        packingbill.products.forEach((product: any) => {
          const productName = getProductName(products, product.productId);
          if (combinedProducts[product.productId]) {
            combinedProducts[product.productId].quantity += product.stock;
          } else {
            combinedProducts[product.productId] = {
              productId: product.productId,
              name: productName,
              quantity: product.stock,
              price: 0,
            };
          }
        });
      }
    });

    setProductsTable(Object.values(combinedProducts));
  };

  useEffect(() => {
    updateProductsTable();
  }, [selectedPackingbills]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          products: Array.isArray(initialData.products)
            ? initialData.products.map((product: any) => ({
                name: product.name || "",
                unitPrice: product.unitPrice || 0,
                quantity: product.quantity || 1,
                subtotal: product.subtotal || 0,
              }))
            : [],
        }
      : {
          billNumber: "",
          linkedPackingbills: [],
          products: [],
          subtotal: 0,
          iva: 0,
          total: 0,
        },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formattedData = {
        billNumber: values.billNumber,
        packingbills: selectedPackingbills.map((id) => ({ id })),
        products: productsTable.map((product) => ({
          productId: product.productId,
          quantity: product.quantity,
          unitPrice: product.price,
        })),
        observations: values.observations || "Sin observaciones",
        company: values.company,
        subtotal: productsTable.reduce(
          (acc, product) => acc + product.quantity * product.price,
          0
        ),
        iva:
          productsTable.reduce(
            (acc, product) => acc + product.quantity * product.price,
            0
          ) * 0.21,
        total:
          productsTable.reduce(
            (acc, product) => acc + product.quantity * product.price,
            0
          ) * 1.21,
      };

      console.log("Datos a enviar:", formattedData);
      // Aquí enviarías la información al servidor o harías lo que sea necesario.
    } catch (error) {
      console.error("Error en el formulario:", error);
    }
  };

  const togglePackingbill = (id: string) => {
    setSelectedPackingbills((prev) =>
      prev.includes(id) ? prev.filter((billId) => billId !== id) : [...prev, id]
    );
  };

  const selectedPackingbillNumbers = availablePackingbills
    .filter((packingbill) => selectedPackingbills.includes(packingbill.id))
    .map((packingbill) => packingbill.packingbillNumber);

  return (
    <div className="h-full p-4 space-y-2 max-w-6xl">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pb-10"
        >
          <div className="space-y-2 w-full">
            <div>
              <h3 className="text-lg font-medium">Agregar Factura</h3>
              <p className="text-sm text-muted-foreground">
                Completar los campos para cargar una nueva factura.
              </p>
            </div>
            <Separator className="bg-primary/10" />
            <div className="pt-6 pb-4 flex flex-col gap-y-6 ">
              <div className="flex gap-x-4">
                <FormField
                  name="company"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titular</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="billNumber"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numero de factura</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <FormLabel>Seleccionar Remitos</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-96 text-left">
                      {selectedPackingbillNumbers.length > 0 ? (
                        <div className="flex flex-wrap gap-2 w-full">
                          {selectedPackingbillNumbers.map((number) => (
                            <span
                              key={number}
                              className="bg-gray-100 px-4 py-1 rounded text-sm"
                            >
                              {number}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400">
                          Seleccionar remitos
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-96 translate-x-4">
                    <div className="max-h-60 overflow-y-auto p-2">
                      <TooltipProvider>
                        {availablePackingbills.map((packingbill) => (
                          <Tooltip key={packingbill.id}>
                            <TooltipTrigger asChild>
                              <div
                                onClick={() =>
                                  togglePackingbill(packingbill.id)
                                }
                                className={`flex items-center justify-between p-2 border-b border-gray-200 cursor-pointer ${
                                  selectedPackingbills.includes(packingbill.id)
                                    ? "bg-gray-100"
                                    : "hover:bg-gray-50"
                                }`}
                              >
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    checked={selectedPackingbills.includes(
                                      packingbill.id
                                    )}
                                    onCheckedChange={() =>
                                      togglePackingbill(packingbill.id)
                                    }
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                  <span className="text-gray-500 text-sm">
                                    {packingbill.company}
                                  </span>
                                </div>
                                <span className="text-gray-500 text-sm">
                                  {packingbill.packingbillNumber}
                                </span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="bg-white shadow-md">
                              <div className="text-sm text-gray-700">
                                <ul className="ml-4">
                                  {Array.isArray(packingbill.products) ? (
                                    (
                                      packingbill.products as {
                                        productId: string;
                                        stock: number;
                                      }[]
                                    ).map((product, index) => (
                                      <li key={index}>
                                        <span>
                                          {getProductName(
                                            products,
                                            product?.productId
                                          )}
                                        </span>
                                        ,{" "}
                                        <span>
                                          <strong>Cantidad:</strong>{" "}
                                          {product?.stock}
                                        </span>
                                      </li>
                                    ))
                                  ) : (
                                    <p>No hay productos asociados.</p>
                                  )}
                                </ul>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </TooltipProvider>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="pt-4">
              <h4 className="font-medium text-sm">Detalle de Productos</h4>
              <table className="w-full border-collapse border border-gray-200 mt-4 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 px-4 py-1 w-[40%]">
                      Producto
                    </th>
                    <th className="border border-gray-200 px-4 py-1 w-[20%]">
                      Cantidad
                    </th>
                    <th className="border border-gray-200 px-4 py-1 w-[20%]">
                      Precio
                    </th>
                    <th className="border border-gray-200 px-4 py-1 w-[20%]">
                      Totales
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productsTable.length > 0 ? (
                    productsTable.map((product, index) => (
                      <tr key={index}>
                        <td className="border border-gray-200 px-4 py-1">
                          {product.name}
                        </td>
                        <td className="border border-gray-200 px-4 py-1 text-right">
                          {product.quantity}
                        </td>
                        <td className="border border-gray-200 px-4 py-1 text-right">
                          <Input
                            type="number"
                            value={product.price}
                            className="appearance-none"
                            onChange={(e) => {
                              const newPrice = parseFloat(e.target.value);
                              setProductsTable((prev) =>
                                prev.map((p, i) =>
                                  i === index ? { ...p, price: newPrice } : p
                                )
                              );
                            }}
                          />
                        </td>
                        <td className="border border-gray-200 px-4 py-1 text-right">
                          {formatNumber(product.price * product.quantity)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="border border-gray-200 px-4 py-4 text-center text-gray-500"
                      >
                        Por favor, seleccione los remitos para facturar.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {productsTable.length > 0 && (
                <div className="mt-4 grid grid-cols-4 gap-y-2 justify-items-end">
                  <div className="col-span-2"></div>
                  <div className="font-medium">Subtotal:</div>
                  <div>
                    {formatNumber(
                      productsTable.reduce(
                        (acc, product) =>
                          acc + product.price * product.quantity,
                        0
                      )
                    )}
                  </div>
                  <div className="col-span-2"></div>
                  <div className="font-medium">IVA (21%):</div>
                  <div>
                    {formatNumber(
                      productsTable.reduce(
                        (acc, product) =>
                          acc + product.price * product.quantity,
                        0
                      ) * 0.21
                    )}
                  </div>
                  <div className="col-span-2"></div>
                  <div className="font-medium">Total:</div>
                  <div>
                    {formatNumber(
                      productsTable.reduce(
                        (acc, product) =>
                          acc + product.price * product.quantity,
                        0
                      ) * 1.21
                    )}
                  </div>
                </div>
              )}
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
          <Button type="submit" disabled={isLoading}>
            Guardar Factura
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BillForm;
