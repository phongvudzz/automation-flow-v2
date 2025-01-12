import { ParamProps } from "@/types/appNodes";
import React from "react";

function BrowserInstanceParam({ param }: ParamProps) {
  return <p className="text-xs">{param.name}</p>;
}


export { BrowserInstanceParam };