"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Cropper, Navigator } from "@/components/custom";
import { Switch } from "@/components/ui/switch";
import { HTMLProps, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactCropperElement } from "react-cropper";
import { FancyMultiSelect } from "@/components/ui/fancy-multi-select";
import {
  Rocket,
  Upload,
  Image as ImageIcon,
  Crop,
  Delete,
  SlowMotionVideo,
  FolderZip,
  AttachFile,
  PlayArrow,
  ArrowBackIos,
  ArrowForwardIos,
} from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProductCreateSchemaType,
  productCreateSchema,
} from "@/schema/product-create";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RichTextEditor } from "@/components/custom/editor";
import { tags } from "@/constants/job-filters";
import { useWindowSize } from "@uidotdev/usehooks";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { InsertPhoto } from "@mui/icons-material";
import { getYoutubeThumbnail } from "@/functions";
import { scroll } from "@/functions/scroll";
import placeholderImage from "@/../public/images/cover-image.jpg";

const visibilityOptions: string[] = ["Public", "Private"];
const softwares = [
  "Blender",
  "Maya",
  "Photoshop",
  "Adobe XD",
  "Premiere",
  "After Effects",
  "Cinema 4D",
  "Fusion 360",
];

const licenses = [
  "CC0",
  "CC BY",
  "CC BY-SA",
  "CC BY-ND",
  "CC BY-NC",
  "CC BY-NC-SA",
];

const models = [
  "Animated",
  "Low Poly (Game-Ready)",
  "Textures",
  "High Poly",
  "Materials",
];

const geometry = [
  "Triangle",
  "Square",
  "Circle",
  "Rectangle",
  "Ellipse",
  "Polygon",
];

export default function Dashboard() {
  const form = useForm<ProductCreateSchemaType>({
    resolver: zodResolver(productCreateSchema),
    defaultValues: {
      visibility: "Public",
      productFiles: [],
      productMedia: [],
    },
  });

  const [thumbnail, setThumbnail] = useState<{
    id: string;
    url: string;
    type: string;
    custom: boolean;
    crop: boolean;
  } | null>();

  const [videoUrl, setVideoUrl] = useState("");
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [videoDialogState, setVideoDialogState] = useState(false);

  const productDropzone = useDropzone({
    accept: {
      ".zip,.rar,.7zip": [
        "application/x-zip-compressed",
        "application/zip",
        "application/x-rar-compressed",
        "application/x-7z-compressed",
      ],
    },
  });
  const productImagesDropzone = useDropzone({
    accept: {
      "image/*": [],
    },
  });
  const thumbnailDropzone = useDropzone({
    multiple: false,
    accept: {
      "image/*": [],
    },
  });

  const windowDimension = useWindowSize();

  const thumbnailRef = useRef<HTMLInputElement>(null);
  const cropperRef = useRef<ReactCropperElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const getFormattedFileSize = (size: number) => {
    const formattedFileSizeInKb = size / 1024;
    const formattedFileSizeInMb = formattedFileSizeInKb / 1024;
    const formattedFileSizeInGb = formattedFileSizeInMb / 1024;

    if (formattedFileSizeInGb > 1) {
      return {
        size: formattedFileSizeInGb.toFixed(2),
        unit: "GB",
        formattedString: `${formattedFileSizeInGb.toFixed(2)} GB`,
      };
    } else if (formattedFileSizeInMb > 1) {
      return {
        size: formattedFileSizeInMb.toFixed(2),
        unit: "MB",
        formattedString: `${formattedFileSizeInMb.toFixed(2)} MB`,
      };
    } else {
      return {
        size: formattedFileSizeInKb.toFixed(2),
        unit: "KB",
        formattedString: `${formattedFileSizeInKb.toFixed(2)} KB`,
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
              fileFormat: "Zip",
              renderer: "",
              rendererVersion: "",
              software: "",
              softwareVersion: "",
            },
          ]);
        };
      }
    }
  };

  const handleProductImagesUpload = (files: File[] | null) => {
    if (files) {
      const file_length = files.length;
      for (let i = 0; i < file_length; i++) {
        const reader = new FileReader();

        reader.readAsDataURL(files[i]);

        reader.onloadend = () => {
          //@ts-ignore
          form.setValue("productMedia", [
            ...(form.getValues("productMedia") || []),
            {
              id: uuidv4(),
              url: reader.result as string,
              type: "image",
            },
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
          custom: true,
          crop: false,
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
        crop: false,
      }));
    }
  };

  const handleDeleteProductFile = (id: string) => {
    form.setValue(
      "productFiles",
      form.getValues("productFiles").filter((file) => file.id !== id),
    );
  };

  const handleSaveVideo = () => {
    form.setValue("productMedia", [
      ...(form.getValues("productMedia") || []),
      {
        id: uuidv4(),
        url: getYoutubeThumbnail(videoUrl),
        type: "video",
      },
    ]);

    setVideoDialogState(false);
  };

  // digital art types
  const productTypes = [
    "Digital Art",
    "3D Art",
    "2D Art",
    "NFT Art",
    "3D Printing",
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
        "cat10",
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
        "subCat10",
      ];
    }
    return [];
  }, [form.watch("category")]);

  const productFiles = form.watch("productFiles");
  const productMedia = form.watch("productMedia");

  const handleImageSwap = (start: number, end: number) => {
    const productMedia = form.getValues("productMedia");
    const item1 = productMedia[start];
    productMedia[start] = productMedia[end];
    productMedia[end] = item1;

    form.setValue("productMedia", productMedia);
  };

  const handleDeleteProductMedia = (id: string) => {
    form.setValue(
      "productMedia",
      form.getValues("productMedia").filter((file) => file.id !== id),
    );
  };

  const isValidVideoUrl = (url: string) => {
    const youtubeRegex =
      /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
    return youtubeRegex.test(url);
  };

  useEffect(() => {
    if (productDropzone.acceptedFiles.length) {
      handleProductUpload(productDropzone.acceptedFiles);
    }
  }, [productDropzone.acceptedFiles]);

  useEffect(() => {
    handleCustomThumbnailChange(thumbnailDropzone.acceptedFiles);
  }, [thumbnailDropzone.acceptedFiles]);

  useEffect(() => {
    if (productImagesDropzone.acceptedFiles.length) {
      handleProductImagesUpload(productImagesDropzone.acceptedFiles);
    }
  }, [productImagesDropzone.acceptedFiles]);

  useEffect(() => {
    setThumbnail((prev) => {
      if (prev?.custom) return prev;
      return productMedia.length
        ? {
            ...productMedia[0],
            custom: false,
            crop: false,
          }
        : null;
    });
  }, [productMedia]);

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <header
          className="sm:flex hidden z-40 lg:h-14 items-center gap-4 border-b px-4 sm:h-auto 
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
            <form className="grid flex-1 auto-rows-max gap-4">
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
                  <CardContent className="grid grid-cols-2 sm:p-4 p-2 items-start gap-4 lg:gap-8 @container">
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
                    <div className="grid gap-2 col-span-2">
                      <p className="text-sm">Product Files</p>
                      <div
                        {...productDropzone.getRootProps()}
                        className={cn(
                          "py-10 w-full border-2 border-dashed bg-darkAccent col-span-2",
                          "flex flex-col justify-center items-center gap-4",
                        )}
                      >
                        <div
                          className={cn(
                            "p-4 flex flex-col justify-center items-center gap-2",
                            "border-2 border-dashed",
                          )}
                        >
                          <FolderZip />
                          <p className="sm:text-base text-xs">
                            Upload Zip Files
                          </p>
                        </div>
                        <p className="sm:text-base text-sm text-center">
                          Upload or drag and drop Zip files
                        </p>
                      </div>
                    </div>

                    {productFiles.length > 0 ? (
                      <div className="grid gap-2 col-span-2">
                        <h1 className="text-xl">Product Files</h1>
                        <Accordion type="multiple" className="grid gap-2">
                          {productFiles.map((file, index) => (
                            <AccordionItem
                              key={file.id}
                              value={file.id}
                              className="border-none"
                            >
                              <AccordionTrigger className="w-full bg-lightAccent hover:no-underline pr-3 py-1">
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
                                      {file.fileFormat}/
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
                    ) : null}

                    {productMedia.length ? (
                      <div className="col-span-2 space-y-4">
                        <Image
                          src={productMedia[selectedMediaIndex]?.url}
                          alt="thumbnail"
                          height={600}
                          width={600}
                          className="w-full aspect-video object-contain border"
                        />
                        <div className="relative">
                          <div
                            className="w-full overflow-x-scroll scroller-hide flex justify-start items-center gap-2"
                            ref={scrollerRef}
                          >
                            {productMedia.map((media, media_idx) => (
                              <ProductMedia
                                key={media.id}
                                media={media}
                                draggable
                                index={media_idx}
                                className={cn(
                                  "border-2 border-transparent",
                                  media_idx === selectedMediaIndex &&
                                    "border-primary",
                                )}
                                onClick={() => setSelectedMediaIndex(media_idx)}
                                onDragStart={(e) => {
                                  e.dataTransfer.setData(
                                    "text/plain",
                                    media_idx.toString(),
                                  );
                                }}
                                onDrop={(e) => {
                                  const droppedItemIndex = Number(
                                    e.dataTransfer.getData("text/plain"),
                                  );
                                  handleImageSwap(droppedItemIndex, media_idx);
                                }}
                              >
                                <div
                                  className={cn(
                                    "h-8 aspect-square rounded-full bg-lightAccent/60 hover:bg-lightAccent",
                                    "grid place-content-center",
                                    "absolute top-2 right-2 cursor-pointer",
                                  )}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteProductMedia(media.id);
                                  }}
                                >
                                  <Delete
                                    fontSize="small"
                                    className="text-destructive"
                                  />
                                </div>
                              </ProductMedia>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {!productMedia.length ? (
                      <div className="col-span-2 space-y-4">
                        <div className="w-full aspect-video border grid place-content-center">
                          <InsertPhoto className="h-8 w-8 scale-[4]" />
                        </div>
                        <div className="relative">
                          <div className="w-full overflow-x-scroll scroller-hide flex justify-start items-center gap-2">
                            {Array.from({ length: 5 }).map((_, idx) => (
                              <div
                                key={idx}
                                className="h-28 aspect-video bg-lightAccent grid place-content-center"
                              >
                                <InsertPhoto />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : null}

                    <input
                      type="file"
                      {...productImagesDropzone.getInputProps()}
                      hidden
                    />
                    <div className="grid col-span-2 gap-2">
                      <p className="text-sm">Product Images</p>
                      <div
                        className={cn(
                          "py-10 w-full border-2 border-dashed bg-darkAccent col-span-2",
                          "flex flex-col justify-center items-center gap-4",
                        )}
                      >
                        <h2 className="sm:text-lg text-base text-center">
                          Add Cover Images and Video Url
                        </h2>

                        <div className="grid @sm:grid-cols-2 gap-4">
                          <div
                            {...productImagesDropzone.getRootProps()}
                            className={cn(
                              "flex flex-col justify-start items-center gap-2",
                              "border-2 border-dashed px-6 py-2 cursor-pointer hover:bg-lightAccent",
                              "transition-all",
                            )}
                          >
                            <InsertPhoto />
                            <p className="sm:text-base text-xs">Add Image</p>
                          </div>
                          <Dialog
                            onOpenChange={(e) => {
                              setVideoUrl("");
                              setVideoDialogState(e);
                            }}
                            open={videoDialogState}
                          >
                            <DialogTrigger asChild>
                              <div
                                className={cn(
                                  "flex flex-col justify-start items-center gap-2",
                                  "border-2 border-dashed px-6 py-2 cursor-pointer hover:bg-lightAccent",
                                  "transition-all",
                                )}
                              >
                                <SlowMotionVideo />
                                <p className="sm:text-base text-xs">
                                  Add Video Url
                                </p>
                              </div>
                            </DialogTrigger>
                            <DialogContent className="p-0 space-y-0 bg-darkAccent max-w-[600px]">
                              <DialogHeader className="p-4 text-xl bg-lightAccent">
                                Video
                              </DialogHeader>
                              <div className="px-4 py-2 space-y-4">
                                <div className="space-y-2">
                                  <p>Paste a YouTube or Vimeo video URL here</p>
                                  <Input
                                    value={videoUrl}
                                    onChange={(e) =>
                                      setVideoUrl(e.target.value)
                                    }
                                    placeholder="Example: https://www.youtube.com/watch?v=doPV-Shqm7k"
                                    className="placeholder:text-gray-500"
                                  />
                                </div>
                              </div>
                              <DialogFooter className="p-4 pt-0">
                                <Button
                                  className="h-8"
                                  disabled={!isValidVideoUrl(videoUrl)}
                                  onClick={handleSaveVideo}
                                >
                                  Save
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                        <p className="sm:text-base text-sm text-center">
                          Upload or drag and drop Images
                        </p>
                      </div>
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
                        <FormItem className="col-span-2 @md:col-span-1">
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
                        <FormItem className="col-span-2 @md:col-span-1">
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
                        <FormItem className="col-span-2">
                          <FormLabel>Sub Category</FormLabel>
                          <FormControl>
                            <FancyMultiSelect
                              options={subCategories.map((t) => ({
                                label: t,
                                value: t,
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
                      name="software"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Software Used</FormLabel>
                          <FormControl>
                            <FancyMultiSelect
                              options={softwares.map((t) => ({
                                label: t,
                                value: t,
                              }))}
                              className="h-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid @lg:grid-cols-4">
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem className="@lg:col-span-3">
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type="number"
                                  {...field}
                                  className="hide-input-inner-buttons pl-[70px]"
                                  min={0}
                                />
                                <div
                                  className={cn(
                                    "absolute left-0 top-1/2 -translate-y-1/2 px-3 h-full bg-lightAccent rounded-l-md",
                                    "flex items-center border-r",
                                  )}
                                >
                                  <p>USD</p>
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
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
                                value: t,
                              }))}
                              className="py-2"
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
                                value: t,
                              }))}
                              className="py-2"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid @xl:grid-cols-3 grid-cols-2 gap-4 col-span-2">
                      <FormField
                        control={form.control}
                        name="geometry"
                        render={({ field }) => (
                          <FormItem className="@xl:col-span-1 col-span-2">
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
                          <FormItem className="">
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
                                crop: !prev?.crop,
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
                                productMedia.length
                                  ? {
                                      ...productMedia[0],
                                      custom: false,
                                      crop: false,
                                    }
                                  : null,
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
              width: Math.min(800, windowDimension.width!) - 48 - 2,
            }}
          >
            <Cropper
              ref={cropperRef}
              style={{
                height: "100%",
                aspectRatio: "100%",
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

const ProductMedia = ({
  media,
  className,
  children,
  ...props
}: {
  media: ProductCreateSchemaType["productMedia"][number];
  index: number;
} & Omit<HTMLProps<HTMLDivElement>, "media">) => {
  const url = media.url;
  const isVideo = media.type === "video";

  return (
    <div
      className={cn("h-28 aspect-video relative border", className)}
      {...props}
    >
      <Image
        src={url}
        alt="thumbnail"
        width={300}
        height={300}
        className="h-full w-full object-cover"
      />
      {children}
      <div
        className={cn(
          "h-10 aspect-square rounded-full bg-lightAccent/70",
          "place-content-center",
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          isVideo ? "grid" : "hidden",
        )}
      >
        <PlayArrow />
      </div>
    </div>
  );
};
