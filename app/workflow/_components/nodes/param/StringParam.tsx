import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ParamProps } from "@/types/appNodes";
import { useEffect, useId, useState } from "react";

const StringParam = ({
  param,
  value,
  disabled,
  updateNodeParamValue,
}: ParamProps) => {
  const id = useId();
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  return (
    <div className="space-y-1 w-full p-1">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <p className="text-primary px-1">*</p>}
      </Label>
      <Input
        id={id}
        disabled={disabled}
        value={internalValue}
        className="text-xs"
        placeholder="Enter value here"
        onChange={(e) => setInternalValue(e.target.value)}
        onBlur={(e) => updateNodeParamValue(e.target.value)}
      />
      {param.helperText && (
        <p className="text-muted-foreground px-2">{param.helperText}</p>
      )}
    </div>
  );
};

export { StringParam };
