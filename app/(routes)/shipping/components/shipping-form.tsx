"use client";

import React, { useEffect, useState } from "react";
import {
  useFormContext,
  FormValues,
  FormFieldNames,
} from "@/context/shipping-form-context";
import { motion } from "framer-motion";
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
import { Textarea } from "@/components/ui/textarea";
import { oswald } from "@/lib/fonts";
import { useShippingStore } from "@/hooks/use-shipping-store";
import { days, provincias, time } from "@/lib/constants";
import MultiSelect from "@/components/ui/multiple-select";

const ShippingForm = () => {
  const setShippingInfo = useShippingStore((state) => state.setShippingInfo);
  const shippingInfo = useShippingStore((state) => state.shippingInfo);
  const form = useFormContext();

  const isLoading = form.formState.isSubmitting;

  const [isDifferentDeliveryAddress, setIsDifferentDeliveryAddress] = useState(
    shippingInfo.deliveryAddress
  );

  const handleInputChange = (name: FormFieldNames, value: any) => {
    setShippingInfo({ [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsDifferentDeliveryAddress(checked);
    setShippingInfo({ deliveryAddress: checked });
  };

  return (
    <div className="h-full p-4 space-y-2 max-w-4xl pl-6 md:pr-24">
      <h2
        className={`${oswald.className} text-neutral-700 text-3xl tracking-wide py-4 mb-4 uppercase`}
      >
        Datos para la facturación
      </h2>
      <Form {...form}>
        <form className={`${oswald.className} text-neutral-700 space-y-6`}>
          <FormField
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleInputChange("email", e.target.value);
                    }}
                    className={`rounded-none ${
                      fieldState.error ? "border-red-500" : ""
                    }`}
                  />
                </FormControl>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            name="fullName"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Nombre y Apellido</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleInputChange("fullName", e.target.value);
                    }}
                    className={`rounded-none ${
                      fieldState.error ? "border-red-500" : ""
                    }`}
                  />
                </FormControl>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <div className="flex gap-x-6">
            <FormField
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem className="flex-1">
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleInputChange("phone", e.target.value);
                      }}
                      className={`rounded-none ${
                        fieldState.error ? "border-red-500" : ""
                      }`}
                    />
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage>{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              name="identification"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem className="flex-1">
                  <FormLabel>Documento</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleInputChange("identification", e.target.value);
                      }}
                      className={`rounded-none ${
                        fieldState.error ? "border-red-500" : ""
                      }`}
                    />
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage>{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-x-6">
            <FormField
              name="address"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem className="flex-1">
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleInputChange("address", e.target.value);
                      }}
                      className={`rounded-none ${
                        fieldState.error ? "border-red-500" : ""
                      }`}
                    />
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage>{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              name="apart"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem className="max-w-40">
                  <FormLabel>Piso y depto</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleInputChange("apart", e.target.value);
                      }}
                      className={`rounded-none ${
                        fieldState.error ? "border-red-500" : ""
                      }`}
                    />
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage>{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-x-6">
            <FormField
              name="city"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem className="flex-1">
                  <FormLabel>Ciudad</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleInputChange("city", e.target.value);
                      }}
                      className={`rounded-none ${
                        fieldState.error ? "border-red-500" : ""
                      }`}
                    />
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage>{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              name="zipCode"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem className="max-w-40">
                  <FormLabel>Código postal</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleInputChange("zipCode", e.target.value);
                      }}
                      className={`rounded-none ${
                        fieldState.error ? "border-red-500" : ""
                      }`}
                    />
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage>{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
          </div>
          <FormField
            name="region"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem className="flex-1 max-w-72">
                <FormLabel>Provincia</FormLabel>
                <Select
                  disabled={isLoading}
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleInputChange("region", value);
                  }}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="rounded-none">
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Selecciona una provincia"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-none">
                    {provincias.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              id="differentDeliveryAddress"
              checked={isDifferentDeliveryAddress}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <label
              htmlFor="differentDeliveryAddress"
              className="text-neutral-700"
            >
              ¿Enviar a una dirección diferente?
            </label>
          </div>
          {isDifferentDeliveryAddress && (
            <motion.div
              className="space-y-6"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 30,
                duration: 3,
              }}
            >
              <h3
                className={`${oswald.className} text-neutral-700 text-2xl tracking-wide py-4 mb-4 uppercase`}
              >
                Dirección de Entrega
              </h3>
              <FormField
                name="deliveryFullName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Nombre y Apellido</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleInputChange("deliveryFullName", e.target.value);
                        }}
                        className={`rounded-none ${
                          fieldState.error ? "border-red-500" : ""
                        }`}
                      />
                    </FormControl>
                    {fieldState.error && (
                      <FormMessage>{fieldState.error.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                name="deliveryPhone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleInputChange("deliveryPhone", e.target.value);
                        }}
                        className={`rounded-none ${
                          fieldState.error ? "border-red-500" : ""
                        }`}
                      />
                    </FormControl>
                    {fieldState.error && (
                      <FormMessage>{fieldState.error.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <div className="flex gap-x-6">
                <FormField
                  name="deliveryAddressLine"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Dirección</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleInputChange(
                              "deliveryAddressLine",
                              e.target.value
                            );
                          }}
                          className={`rounded-none ${
                            fieldState.error ? "border-red-500" : ""
                          }`}
                        />
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage>{fieldState.error.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  name="deliveryApart"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FormItem className="max-w-40">
                      <FormLabel>Piso y depto</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleInputChange("deliveryApart", e.target.value);
                          }}
                          className={`rounded-none ${
                            fieldState.error ? "border-red-500" : ""
                          }`}
                        />
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage>{fieldState.error.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-x-6">
                <FormField
                  name="deliveryCity"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Ciudad</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleInputChange("deliveryCity", e.target.value);
                          }}
                          className={`rounded-none ${
                            fieldState.error ? "border-red-500" : ""
                          }`}
                        />
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage>{fieldState.error.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  name="deliveryZipCode"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FormItem className="max-w-40">
                      <FormLabel>Código postal</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleInputChange(
                              "deliveryZipCode",
                              e.target.value
                            );
                          }}
                          className={`rounded-none ${
                            fieldState.error ? "border-red-500" : ""
                          }`}
                        />
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage>{fieldState.error.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                name="deliveryRegion"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormItem className="flex-1 max-w-72">
                    <FormLabel>Provincia</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleInputChange("deliveryRegion", value);
                      }}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="rounded-none">
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Selecciona una provincia"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-none">
                        {provincias.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.error && (
                      <FormMessage>{fieldState.error.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </motion.div>
          )}
          <FormField
            name="deliveryDays"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Días de entrega</FormLabel>
                <MultiSelect
                  name="deliveryDays"
                  values={days}
                  placeholder="Selecciona los días de entrega"
                  onChange={(value) => {
                    field.onChange(value);
                    handleInputChange("deliveryDays", value);
                  }}
                />
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            name="deliveryTime"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Horario de entrega</FormLabel>
                <MultiSelect
                  name="deliveryTime"
                  values={time}
                  placeholder="Selecciona el horario de entrega"
                  multiple={false}
                  onChange={(value) => {
                    field.onChange(value);
                    handleInputChange("deliveryTime", value);
                  }}
                />
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            name="observations"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem className="flex-1">
                <FormLabel>Observaciones para la entrega</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleInputChange("observations", e.target.value);
                    }}
                    className={`rounded-none ${
                      fieldState.error ? "border-red-500" : ""
                    }`}
                  />
                </FormControl>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default ShippingForm;
