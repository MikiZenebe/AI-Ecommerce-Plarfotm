import { type SchemaTypeDefinition } from "sanity";
import { customerTypes } from "./customerTypes";
import { categoryType } from "./categoryType";
import { orderType } from "./orderType";
import { productType } from "./productType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [customerTypes, categoryType, orderType, productType],
};
