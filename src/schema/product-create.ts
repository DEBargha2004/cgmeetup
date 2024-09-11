import * as z from "zod";

export const productCreateSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  description: z.string({}).optional(),
  type: z.string({ required_error: "Type is required" }),
  category: z.string({ required_error: "Category is required" }),
  subCategory: z.string({ required_error: "Subcategory is required" }),
  software: z.string({ required_error: "Software is required" }),
  price: z.string({ required_error: "Price is required" }),
  isFree: z.boolean({ required_error: "IsFree is required" }).default(true),
  changelog: z.string({}).optional(),
  license: z.string({ required_error: "License is required" }),
  isAdultContent: z
    .boolean({ required_error: "IsAdultContent is required" })
    .default(false),
  tags: z
    .array(z.string({ required_error: "Tags is required" }))
    .min(1, "Tags is required"),
  "3dModels": z
    .array(z.string({ required_error: "3dModels is required" }))
    .min(1, "3dModels is required"),
  geometry: z.string({ required_error: "Geometry is required" }),
  polygonCount: z.string({ required_error: "PolygonCount is required" }),
  verticesCount: z.string({ required_error: "VerticesCount is required" }),
  visibility: z.string({ required_error: "Visibility is required" }),
  productFiles: z
    .array(
      z.object({
        id: z.string(),
        fileFormat: z.string({
          required_error: "FileFormat is required"
        }),
        software: z.string({ required_error: "Software is required" }),
        softwareVersion: z.string({
          required_error: "Software Version is required"
        }),
        renderer: z.string({ required_error: "RenderUse is required" }),
        rendererVersion: z.string({
          required_error: "Render Version is required"
        }),
        size: z.number()
      })
    )
    .min(1, { message: "At least one file is required" }),
  productMedia: z.array(
    z.object({
      id: z.string(),
      type: z.enum(["image", "video"]),
      url: z.string()
    })
  )
});

export type ProductCreateSchemaType = z.infer<typeof productCreateSchema>;
