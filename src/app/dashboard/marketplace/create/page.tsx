"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Cropper } from "@/components/custom";
import { Switch } from "@/components/ui/switch";
import { sample_cateories } from "@/constants/categories";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { UploadType } from "@/components/custom";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from "@/components/ui/dialog";
import { FieldType } from "@/types/field-type";
import { ReactCropperElement } from "react-cropper";
import { FancyMultiSelect } from "@/components/ui/fancy-multi-select";
import {
  FourK,
  Rocket,
  Upload,
  Image as ImageIcon,
  Crop,
  Delete,
  PhotoLibrary,
  SlowMotionVideo,
  FolderZip,
  AttachFile
} from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProductCreateSchemaType,
  productCreateSchema
} from "@/schema/product-create";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { RichTextEditor } from "@/components/custom/editor";
import { tags } from "@/constants/job-filters";
import { useWindowSize } from "@uidotdev/usehooks";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { InsertPhoto } from "@mui/icons-material";

const upload_types: { icon: string; title: string; description: string }[] = [
  {
    icon: "photo_library",
    title: "Images",
    description: "JPG, PNG, GIF"
  },
  {
    icon: "slow_motion_video",
    title: "Video",
    description: "Youtube, Vimeo"
  }
];

const visibilityOptions: string[] = ["Public", "Private"];

export default function Dashboard() {
  const form = useForm<ProductCreateSchemaType>({
    resolver: zodResolver(productCreateSchema),
    defaultValues: {
      visibility: "Public",
      productFiles: []
    }
  });

  const [images, setImages] = useState<
    { id: string; url: string; type: string; caption: string }[]
  >([]);
  const [thumbnail, setThumbnail] = useState<{
    id: string;
    url: string;
    type: string;
    caption: string;
    custom: boolean;
    crop: boolean;
  } | null>();

  const videoDomains = ["youtube.com/watch?v=", "vimeo.com"];
  const [videoUrl, setVideoUrl] = useState("");
  const showFrame = useMemo(() => {
    return videoDomains.some((domain) => videoUrl.includes(domain));
  }, [videoUrl]);

  const productDropzone = useDropzone({
    accept: {
      ".zip,.rar,.7zip": [
        "application/x-zip-compressed",
        "application/zip",
        "application/x-rar-compressed",
        "application/x-7z-compressed"
      ]
    }
  });
  const productImagesDropzone = useDropzone({
    accept: {
      "image/*": []
    }
  });
  const thumbnailDropzone = useDropzone({
    multiple: false,
    accept: {
      "image/*": []
    }
  });

  const windowDimension = useWindowSize();

  const thumbnailRef = useRef<HTMLInputElement>(null);
  const mainUploaderRef = useRef<HTMLInputElement>(null);
  const cropperRef = useRef<ReactCropperElement>(null);

  const getFormattedFileSize = (size: number) => {
    const formattedFileSizeInKb = size / 1024;
    const formattedFileSizeInMb = formattedFileSizeInKb / 1024;
    const formattedFileSizeInGb = formattedFileSizeInMb / 1024;

    if (formattedFileSizeInGb > 1) {
      return {
        size: formattedFileSizeInGb.toFixed(2),
        unit: "GB",
        formattedString: `${formattedFileSizeInGb.toFixed(2)} GB`
      };
    } else if (formattedFileSizeInMb > 1) {
      return {
        size: formattedFileSizeInMb.toFixed(2),
        unit: "MB",
        formattedString: `${formattedFileSizeInMb.toFixed(2)} MB`
      };
    } else {
      return {
        size: formattedFileSizeInKb.toFixed(2),
        unit: "KB",
        formattedString: `${formattedFileSizeInKb.toFixed(2)} KB`
      };
    }
  };

  const handleProductUpload = (files: File[] | null) => {
    if (files) {
      const file_length = files.length;
      for (let i = 0; i < file_length; i++) {
        const reader = new FileReader();

        reader.readAsDataURL(files[i]);

        reader.onloadend = () => {
          //@ts-ignore
          form.setValue("productFiles", [
            ...(form.getValues("productFiles") || []),
            {
              id: uuidv4(),
              size: files[i].size,
              fileFormat: files[i].type,
              renderer: "",
              rendererVersion: "",
              software: "",
              softwareVersion: ""
            }
          ]);
        };
      }
    }
  };

  // const onDragEnd = e => {}

  const handleCustomThumbnailChange = (files: File[] | null) => {
    if (files?.length) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);

      reader.onloadend = () => {
        setThumbnail({
          id: uuidv4(),
          url: reader.result as string,
          type: files[0].type,
          caption: "",
          custom: true,
          crop: false
        });
      };
    }
  };

  const handleCrop = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      //@ts-ignore
      setThumbnail((prev) => ({
        ...prev,
        url: cropperRef.current?.cropper
          .getCroppedCanvas()
          .toDataURL() as string,
        crop: false
      }));
    }
  };

  const handleDeleteProductFile = (id: string) => {
    form.setValue(
      "productFiles",
      form.getValues("productFiles").filter((file) => file.id !== id)
    );
  };

  useEffect(() => {
    setThumbnail((prev) => {
      if (prev?.custom) return prev;
      return images.length
        ? { ...images[0], custom: false, crop: false }
        : null;
    });
  }, [images]);

  // digital art types
  const productTypes = [
    "Digital Art",
    "3D Art",
    "2D Art",
    "NFT Art",
    "3D Printing"
  ];

  const categories = useMemo(() => {
    if (form.watch("type")) {
      return [
        "cat1",
        "cat2",
        "cat3",
        "cat4",
        "cat5",
        "cat6",
        "cat7",
        "cat8",
        "cat9",
        "cat10"
      ];
    }
    return [];
  }, [form.watch("type")]);

  const subCategories = useMemo(() => {
    if (form.watch("category")) {
      return [
        "subCat1",
        "subCat2",
        "subCat3",
        "subCat4",
        "subCat5",
        "subCat6",
        "subCat7",
        "subCat8",
        "subCat9",
        "subCat10"
      ];
    }
    return [];
  }, [form.watch("category")]);

  const softwares = [
    "Blender",
    "Maya",
    "Photoshop",
    "Adobe XD",
    "Premiere",
    "After Effects",
    "Cinema 4D",
    "Fusion 360"
  ];

  const licenses = [
    "CC0",
    "CC BY",
    "CC BY-SA",
    "CC BY-ND",
    "CC BY-NC",
    "CC BY-NC-SA"
  ];

  const models = [
    "Animated",
    "Low Poly (Game-Ready)",
    "Textures",
    "High Poly",
    "Materials"
  ];

  const geometry = [
    "Triangle",
    "Square",
    "Circle",
    "Rectangle",
    "Ellipse",
    "Polygon"
  ];

  const productFiles = form.watch("productFiles");

  useEffect(() => {
    if (productDropzone.acceptedFiles.length) {
      handleProductUpload(productDropzone.acceptedFiles);
    }
  }, [productDropzone.acceptedFiles]);

  useEffect(() => {
    handleCustomThumbnailChange(thumbnailDropzone.acceptedFiles);
  }, [thumbnailDropzone.acceptedFiles]);

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <header
          className=" flex z-40 lg:h-14 items-center gap-4 border-b px-4 sm:h-auto 
        sm:border-0 sm:bg-darkAccent sm:px-6"
        >
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Marketplace</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Create Product</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Form {...form}>
            <form className=" grid flex-1 auto-rows-max gap-4">
              <div className="flex items-center gap-4">
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                  Create Product
                </h1>
                <Badge variant="outline" className="ml-auto sm:ml-0">
                  Draft
                </Badge>
                <Badge variant="outline" className="ml-auto sm:ml-0">
                  {form.watch("visibility")}
                </Badge>
              </div>
              <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                <Card className="auto-rows-max lg:col-span-2 bg-card">
                  <CardContent className="grid grid-cols-2 pt-4 items-start gap-4  lg:gap-8">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <input
                      type="file"
                      {...productDropzone.getInputProps()}
                      hidden
                    />
                    <div
                      {...productDropzone.getRootProps()}
                      className={cn(
                        "py-10 w-full border-2 border-dashed bg-darkAccent col-span-2",
                        "flex flex-col justify-center items-center gap-4"
                      )}
                    >
                      <div
                        className={cn(
                          "p-4 flex flex-col justify-center items-center gap-2",
                          "border-2 border-dashed"
                        )}
                      >
                        <FolderZip />
                        <p>Upload Zip Files</p>
                      </div>
                      <p>Upload or drag and drop Zip files</p>
                    </div>
                    {productFiles.length > 0 && (
                      <div className="grid gap-2 col-span-2">
                        <h1 className="text-xl">Product Files</h1>
                        <Accordion type="multiple" className="grid gap-2">
                          {productFiles.map((file, index) => (
                            <AccordionItem
                              key={file.id}
                              value={file.id}
                              className="border-none"
                            >
                              <AccordionTrigger className="w-full bg-lightAccent hover:no-underline">
                                <div className="p-3 flex justify-between items-center w-full">
                                  <div className="flex gap-1 items-center">
                                    <FolderZip />
                                    <p className="font-semibold">
                                      Product file {index + 1}
                                    </p>
                                    <AttachFile
                                      fontSize="small"
                                      className="opacity-70"
                                    />
                                    <p className="opacity-70">
                                      {file.fileFormat.split(".")[1]}/
                                      {
                                        getFormattedFileSize(file.size)
                                          .formattedString
                                      }
                                    </p>
                                  </div>
                                  <div className="flex gap-2 items-center">
                                    <Badge
                                      className="flex items-center gap-2"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteProductFile(file.id);
                                      }}
                                    >
                                      <Delete
                                        fontSize="small"
                                        className="text-destructive"
                                      />
                                      <span>Remove</span>
                                    </Badge>
                                  </div>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="flex justify-center items-start">
                                <div className="w-[90%] grid grid-cols-4 gap-4 py-4">
                                  <FormField
                                    control={form.control}
                                    name={`productFiles.${index}.software`}
                                    render={({ field }) => (
                                      <FormItem className="col-span-3">
                                        <FormLabel>Software Used</FormLabel>
                                        <FormControl>
                                          <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                          >
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select Software" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              {softwares.map((type) => (
                                                <SelectItem
                                                  key={type}
                                                  value={type}
                                                >
                                                  {type}
                                                </SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name={`productFiles.${index}.softwareVersion`}
                                    render={({ field }) => (
                                      <FormItem className="">
                                        <FormLabel>Software Version</FormLabel>
                                        <FormControl>
                                          <Input {...field} />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name={`productFiles.${index}.renderer`}
                                    render={({ field }) => (
                                      <FormItem className="col-span-3">
                                        <FormLabel>Renderer Used</FormLabel>
                                        <FormControl>
                                          <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                          >
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select Renderer Use" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              {softwares.map((type) => (
                                                <SelectItem
                                                  key={type}
                                                  value={type}
                                                >
                                                  {type}
                                                </SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name={`productFiles.${index}.rendererVersion`}
                                    render={({ field }) => (
                                      <FormItem className="">
                                        <FormLabel>Renderer Version</FormLabel>
                                        <FormControl>
                                          <Input {...field} />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>
                    )}
                    <input
                      type="file"
                      {...productImagesDropzone.getInputProps()}
                      hidden
                    />
                    <div
                      className={cn(
                        "py-10 w-full border-2 border-dashed bg-darkAccent col-span-2",
                        "flex flex-col justify-center items-center gap-4"
                      )}
                    >
                      <h2 className="text-lg">
                        Add Cover Images and Video Url
                      </h2>

                      <div className="grid grid-cols-2 gap-4">
                        <div
                          {...productImagesDropzone.getRootProps()}
                          className={cn(
                            "flex flex-col justify-start items-center gap-2",
                            "border-2 border-dashed px-6 py-2 cursor-pointer hover:bg-lightAccent",
                            "transition-all"
                          )}
                        >
                          <InsertPhoto />
                          <p>Add Image</p>
                        </div>
                        <div
                          className={cn(
                            "flex flex-col justify-start items-center gap-2",
                            "border-2 border-dashed px-6 py-2 cursor-pointer hover:bg-lightAccent",
                            "transition-all"
                          )}
                        >
                          <SlowMotionVideo />
                          <p>Add Video Url</p>
                        </div>
                      </div>
                      <p>Upload or drag and drop Images</p>
                    </div>
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <RichTextEditor
                              content={field.value}
                              onUpdate={field.onChange}
                              editorWrapperClassName="border"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Product Type" />
                              </SelectTrigger>
                              <SelectContent>
                                {productTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subCategory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sub Category</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Sub Category" />
                              </SelectTrigger>
                              <SelectContent>
                                {subCategories.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="software"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Software Used</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Software" />
                              </SelectTrigger>
                              <SelectContent>
                                {softwares.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              className="hide-input-inner-buttons"
                              min={0}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field }) => (
                        <FormItem className="h-full">
                          <FormLabel className=" inline-block">{""}</FormLabel>
                          <FormControl>
                            <div className="flex items-center justify-start gap-4 h-10">
                              <FormLabel>Free Content</FormLabel>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="changelog"
                      render={({ field }) => (
                        <FormItem className="h-full col-span-2">
                          <FormLabel>Changelog</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={10}
                              {...field}
                              placeholder="Changelog"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="license"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>License</FormLabel>
                          <FormControl>
                            <Select>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {licenses.map((license) => (
                                  <SelectItem key={license} value={license}>
                                    {license}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="isAdultContent"
                      render={({ field }) => (
                        <FormItem className="h-full">
                          <FormLabel className=" inline-block">{""}</FormLabel>
                          <FormControl>
                            <div className="flex items-center justify-start gap-4 h-10">
                              <FormLabel>Adult Content</FormLabel>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Tags</FormLabel>
                          <FormControl>
                            <FancyMultiSelect
                              options={tags.map((t) => ({
                                label: t,
                                value: t
                              }))}
                              className="h-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="3dModels"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>3D Models</FormLabel>
                          <FormControl>
                            <FancyMultiSelect
                              options={models.map((t) => ({
                                label: t,
                                value: t
                              }))}
                              className="h-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-3 gap-4 col-span-2">
                      <FormField
                        control={form.control}
                        name="geometry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Geometry</FormLabel>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {geometry.map((item) => (
                                    <SelectItem key={item} value={item}>
                                      {item}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="polygonCount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Polygons Count</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                className="hide-input-inner-buttons"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="verticesCount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vertices Count</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                className="hide-input-inner-buttons"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                  <Card
                    x-chunk="dashboard-07-chunk-3"
                    className="xl:w-[60%] lg:w-4/5 bg-card"
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl">Post Options</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        <div className="grid gap-3">
                          <FormField
                            control={form.control}
                            name="visibility"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                  >
                                    <SelectTrigger
                                      id="status"
                                      aria-label="Select status"
                                    >
                                      <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {visibilityOptions.map((item, index) => (
                                        <SelectItem
                                          key={index}
                                          value={item}
                                          className="cursor-pointer hover:bg-darkAccent/80"
                                        >
                                          {item}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button variant={"success"}>
                            <Rocket className="mr-2">rocket</Rocket>
                            Publish
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card
                    x-chunk="dashboard-07-chunk-5"
                    className="p-4 space-y-3 xl:w-[60%] lg:w-4/5 bg-card"
                  >
                    <CardHeader className="p-0">
                      <CardTitle className="text-xl">Thumbnail</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 px-0 pb-0">
                      <input
                        hidden
                        type="file"
                        id="thumbnail"
                        ref={thumbnailRef}
                        {...thumbnailDropzone.getInputProps()}
                      />
                      <div
                        className="w-full aspect-square border-2 border-dashed bg-darkAccent"
                        {...(!thumbnail?.crop &&
                          thumbnailDropzone.getRootProps())}
                      >
                        {thumbnail ? (
                          <div className="h-full w-full flex justify-center items-center">
                            <Image
                              src={thumbnail.url}
                              alt="thumbnail"
                              width={300}
                              height={300}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-full w-full flex flex-col justify-center items-center">
                            <ImageIcon />
                            <p className="text-sm text-white opacity-70 text-center">
                              Upload or drag & drop image
                            </p>
                          </div>
                        )}
                      </div>
                      <div className=" w-full flex justify-center items-center gap-3">
                        {thumbnail && (
                          <Badge
                            variant={"outline"}
                            className="cursor-pointer hover:bg-darkAccent/80"
                            onClick={() => {
                              if (thumbnail.crop) {
                                handleCrop();
                              }
                              //@ts-ignore
                              setThumbnail((prev) => ({
                                ...prev,
                                crop: !prev?.crop
                              }));
                            }}
                          >
                            <Crop className="mr-2 text-primary" />
                            <span>Crop</span>
                          </Badge>
                        )}

                        <Badge
                          variant={"outline"}
                          className="cursor-pointer hover:bg-darkAccent/80"
                          {...thumbnailDropzone.getRootProps()}
                        >
                          <Upload className="mr-2 text-primary" />
                          <span>Upload</span>
                        </Badge>
                      </div>
                      {thumbnail?.custom && (
                        <div className="flex justify-center items-center">
                          <Button
                            variant={"destructive"}
                            className=""
                            onClick={() => {
                              if (thumbnailDropzone.inputRef.current)
                                thumbnailDropzone.inputRef.current.value = "";
                              setThumbnail(
                                images.length
                                  ? { ...images[0], custom: false, crop: false }
                                  : null
                              );
                            }}
                          >
                            <Delete className="mr-2" />
                            <span>Remove thumbnail</span>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  <Card className="p-4 space-y-3 xl:w-[60%] lg:w-4/5 bg-card">
                    <CardHeader className="px-0 pb-2 pt-0">
                      <CardTitle className="text-xl">Delete</CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 grid place-content-center">
                      <Button
                        variant={"destructive"}
                        className="min-w-24 "
                        type="button"
                      >
                        <Delete className="mr-2" />
                        Delete Post
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </Form>
        </main>
      </div>
      <Dialog
        open={thumbnail?.crop}
        onOpenChange={(e) => {
          //@ts-ignore
          setThumbnail((prev) => ({ ...prev, crop: e }));
        }}
      >
        <DialogContent className="max-w-[800px] bg-card pb-0">
          <div
            className="h-[400px]  border 
              bg-darkAccent"
            style={{
              width: Math.min(800, windowDimension.width!) - 48 - 2
            }}
          >
            <Cropper
              ref={cropperRef}
              style={{
                height: "100%",
                aspectRatio: "100%"
              }}
              className="object-contain cropper overflow-hidden"
              aspectRatio={1}
              src={thumbnail?.url}
              // zoomTo={0.5}
              initialAspectRatio={1}
              preview=".img-preview"
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              guides={true}
            />
          </div>
          <div className="w-full p-3 grid place-content-center">
            <Badge
              className="h-8 w-full px-2 flex justify-start items-center gap-2
                cursor-pointer"
              onClick={handleCrop}
            >
              <Crop className="h-4" />
              <span>Crop</span>
            </Badge>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
