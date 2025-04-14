import { z } from "zod";

const dataSchema = z.object({
  pregnancies: z.number().gte(0, { message: "Pregnancies must be 0 or more" }),

  glucose: z.number().gte(50, { message: "Glucose must be at least 50" }),

  blood_pressure: z
    .number()
    .gte(30, { message: "Blood Pressure must be at least 30" })
    .lte(122, { message: "Blood Pressure must be 122 or less" }),

  skin_thickness: z
    .number()
    .gte(0, { message: "Skin Thickness must be 0 or more" })
    .lte(99, { message: "Skin Thickness must be 99 or less" }),

  insulin: z
    .number()
    .gte(15, { message: "Insulin must be at least 15" })
    .lte(300, { message: "Insulin must be 300 or less" }),

  bmi: z
    .number()
    .gte(10, { message: "BMI must be at least 10" })
    .lte(67, { message: "BMI must be 67 or less" }),

  diabetes_pedigree_function: z
    .number()
    .gte(0.078, { message: "DPF must be at least 0.078" })
    .lte(2.42, { message: "DPF must be 2.42 or less" }),

  age: z
    .number()
    .gte(1, { message: "Age must be at least 1" })
    .lte(100, { message: "Age must be 100 or less" }),
});

export type Data = z.infer<typeof dataSchema>;
export default dataSchema;
