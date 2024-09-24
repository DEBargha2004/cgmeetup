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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Cropper } from "@/components/custom";
import { Switch } from "@/components/ui/switch";
import { HTMLProps, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ReactCropperElement } from "react-cropper";
import { FancyMultiSelect } from "@/components/ui/fancy-multi-select";
import {
  Rocket,
  Upload,
  Image as ImageIcon,
  Crop,
  Delete,
  PlayArrow,
  Add,
  DragIndicator,
  Title,
  PlayCircleOutline,
  ImageOutlined,
  AddLinkOutlined
} from "@mui/icons-material";
import { v4 as uuidv4, v4 } from "uuid";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductCreateSchemaType } from "@/schema/product-create";
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
import { courseSchema, CourseSchemaType } from "@/schema/tutorial";
import { categories } from "@/constants/job-categories";
import { job_skills } from "@/constants/job-skills";
import PrefixInput from "@/components/custom/prefix-input";
import _ from "lodash";
import LessionCreateButton from "../_components/content-create-button";
import Lesson from "../_components/lesson";
import Curriculum from "../_components/curriculum";
import { CurriculumContext } from "../_components/curriculum-context";
import { SingleTutorialContext } from "../_components/single-tutorial-context";
import SingleTutorial from "../_components/single-tutorial";

const visibilityOptions: string[] = ["Public", "Private"];
const languages: string[] = [
  "English",
  "Hindi",
  "Spanish",
  "French",
  "German",
  "Portuguese"
];

const sample = [1, 2, 4, 5, 6];

export default function TutorialPage() {
  const form = useForm<CourseSchemaType>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      visibility: visibilityOptions[0],
      chapters: [],
      lessons: [],
      isFree: false,
      hasAdultContent: false,
      skills: [],
      software_used: [],
      tags: [],
      tutorial: { is_free: false, contents: [] }
    }
  });

  const chapters = useFieldArray({
    control: form.control,
    name: "chapters"
  });
  const lessons = useFieldArray({
    control: form.control,
    name: "lessons"
  });

  const [thumbnail, setThumbnail] = useState<{
    id: string;
    url: string;
    type: string;
    crop: boolean;
  } | null>();

  const thumbnailDropzone = useDropzone({
    multiple: false,
    onDrop(acceptedFiles, fileRejections, event) {
      if (!acceptedFiles.length) return;

      acceptedFiles.map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setThumbnail({
            id: uuidv4(),
            url: reader.result as string,
            type: file.type,
            crop: false
          });
        };
      });
    },
    accept: {
      "image/*": []
    }
  });

  const windowDimension = useWindowSize();
  const subCategories = useMemo(() => {
    return categories.find((c) => c.value === form.watch("category"))
      ?.sub_category;
  }, [form.watch("category")]);

  const thumbnailRef = useRef<HTMLInputElement>(null);
  const cropperRef = useRef<ReactCropperElement>(null);

  // const onDragEnd = e => {}

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

  //done
  const addChapter = () => {
    chapters.append({
      chapter_id: v4(),
      img: "",
      title: "",
      saved: false
    });
  };

  const onSubmit = (data: CourseSchemaType) => {};

  return (
    <>
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
                  <Link href="#">Tutorials</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Create Tutorial</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Form {...form}>
            <form
              className="grid flex-1 auto-rows-max gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex items-center gap-4">
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                  Create Tutorial
                </h1>
                <Badge variant="outline" className="ml-auto sm:ml-0">
                  Draft
                </Badge>
                <Badge variant="outline" className="ml-auto sm:ml-0">
                  {form.watch("visibility")}
                </Badge>
              </div>
              <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8 ">
                <Card className="grid lg:col-span-2 bg-card">
                  <CardContent className="grid grid-cols-2 sm:p-4 p-2 items-start gap-4 lg:gap-8">
                    <div className="flex col-span-2 gap-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="isCouse"
                        render={({ field }) => (
                          <FormItem className="flex pt-4 justify-center items-center gap-2">
                            <FormLabel>Course</FormLabel>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    {form.watch("isCouse") ? (
                      <CurriculumContext.Provider
                        value={{ form, chapters, lessons }}
                      >
                        {form.watch("chapters").length > 0 && <Curriculum />}

                        <div className="grid place-content-center col-span-2">
                          <Button
                            variant={"success"}
                            className="min-w-24 space-x-3"
                            type="button"
                            onClick={addChapter}
                          >
                            <Add />
                            <span>Add Section</span>
                          </Button>
                        </div>
                      </CurriculumContext.Provider>
                    ) : (
                      <SingleTutorialContext.Provider value={{ form }}>
                        <SingleTutorial />
                      </SingleTutorialContext.Provider>
                    )}

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
                    {/* <FormField
                      control={form.control}
                      name="requirements"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Requirements</FormLabel>
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
                      name="syllabus"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Syllabus</FormLabel>
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
                    /> */}
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category (Subject)</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem
                                    key={category.value}
                                    value={category.value}
                                  >
                                    {category.label}
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
                      name="sub_category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sub-Category (Subject)</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {subCategories?.map((subcategory) => (
                                  <SelectItem
                                    key={subcategory.value}
                                    value={subcategory.value}
                                  >
                                    {subcategory.label}
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
                      name="skills"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Skills</FormLabel>
                          <FormControl>
                            <FancyMultiSelect
                              options={job_skills}
                              onChange={(e) => {
                                field.onChange(e?.map((op) => op.value) || []);
                              }}
                              values={field.value?.map(
                                (v) => job_skills.find((s) => s.value === v)!
                              )}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="software_used"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Software Used</FormLabel>
                          <FormControl>
                            <FancyMultiSelect
                              options={job_skills}
                              onChange={(e) => {
                                field.onChange(e?.map((op) => op.value) || []);
                              }}
                              values={field.value?.map(
                                (v) => job_skills.find((s) => s.value === v)!
                              )}
                            />
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
                            <PrefixInput prefix="USD" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field }) => (
                        <FormItem className="flex justify-start items-center gap-6 mt-8">
                          <FormLabel>Free Content</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="language"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Language</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {languages.map((l) => (
                                  <SelectItem key={l} value={l}>
                                    {l}
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
                      name="hasAdultContent"
                      render={({ field }) => (
                        <FormItem className="flex justify-start items-center gap-6 mt-8">
                          <FormLabel>Adult Content</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
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
                              onChange={(e) => {
                                field.onChange(e?.map((op) => op.value) || []);
                              }}
                              values={field.value?.map((v) => ({
                                label: v,
                                value: v
                              }))}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
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
    </>
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
          isVideo ? "grid" : "hidden"
        )}
      >
        <PlayArrow />
      </div>
    </div>
  );
};
