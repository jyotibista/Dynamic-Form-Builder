import * as z from "zod";

export const validationSchema = (elements: any[]) => {
  const schema: any = {};

  elements.forEach((el) => {
    switch (el.type) {
      case "textbox":
        schema[el.id] = z.string().min(5, { message: `${el.label} must be at least 5 characters` });
        break;
      case "dropdown":
        schema[el.id] = z.string().nonempty({ message: `${el.label} is required` });
        break;
      // Add more cases for other element types
    }
  });

  return z.object(schema);
};
