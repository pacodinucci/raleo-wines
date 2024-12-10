"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

import { ProductsColumn } from "./columns";
import { AlertModal } from "@/components/modals/alert-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import useProductStore from "@/hooks/use-product-store";

interface CellActionProps {
  data: ProductsColumn;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onClickUpdate = () => {
    router.push(`/admin/products/${data.id}`);
  };

  const onClickDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/products/${data.id}`);
      toast.success("Product deleted.");
      fetchProducts();
    } catch (error) {
      toast.error("Something went wrong while deleting this product.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onClickDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Opciones</DropdownMenuLabel>
          <DropdownMenuItem onClick={onClickUpdate}>
            <Edit className="mr-2 h-4 w-4" />
            Actualizar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CellAction;
