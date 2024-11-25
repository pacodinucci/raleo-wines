import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useShippingStore } from "@/hooks/use-shipping-store";
import { ShippingInfo } from "@/lib/types";
import { FormLabel } from "./form";

interface ISelectProps {
  values: string[];
  placeholder: string;
  name: keyof ShippingInfo;
  multiple?: boolean;
  onChange: (value: string[]) => void;
}

const MultiSelect = ({
  values,
  placeholder,
  name,
  multiple = true,
  onChange,
}: ISelectProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { shippingInfo, setShippingInfo } = useShippingStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectChange = (value: string) => {
    let newValue;
    if (multiple) {
      if (!selectedItems.includes(value)) {
        newValue = [...selectedItems, value];
      } else {
        newValue = selectedItems.filter((item) => item !== value);
      }
    } else {
      newValue = [value];
    }
    setSelectedItems(newValue);
    setIsOpen(false);
    onChange(newValue);
  };

  const isOptionSelected = (value: string): boolean => {
    return selectedItems.includes(value);
  };

  useEffect(() => {
    setShippingInfo({ [name]: selectedItems });
  }, [selectedItems, setShippingInfo, name]);

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild className="rounded-none">
          <Button
            variant="outline"
            className="flex justify-between gap-2 font-normal min-w-80 hover:bg-white"
          >
            {selectedItems.length > 0 ? (
              <span className="flex justify-between w-full">
                {selectedItems.join(", ")}
                <ChevronDown size={16} className="text-slate-400" />
              </span>
            ) : (
              <span className="flex justify-between w-full items-center">
                {placeholder}{" "}
                <ChevronDown size={16} className="text-slate-400" />
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="min-w-80 rounded-none"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          {values.map((value, index) => (
            <DropdownMenuCheckboxItem
              onSelect={(e) => e.preventDefault()}
              key={index}
              checked={isOptionSelected(value)}
              onCheckedChange={() => handleSelectChange(value)}
            >
              {value}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default MultiSelect;
