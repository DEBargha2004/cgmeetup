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
import { Cropper, MaterialSymbolIcon } from "@/components/custom";
import { sample_cateories } from "@/constants/categories";
import {
  HTMLProps,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { FieldType } from "@/types/field-type";
import { RichTextEditor } from "@/components/custom/editor";
import { tags } from "@/constants/job-filters";
import { FancyMultiSelect } from "@/components/ui/fancy-multi-select";
import { ReactCropperElement } from "react-cropper";
import {
  Rocket,
  Image as ImageIcon,
  Crop,
  Upload,
  Delete,
  Photo,
  Description,
  YouTube,
  Close,
  Remove
} from "@mui/icons-material";
import { useWindowSize } from "@uidotdev/usehooks";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from "@/components/ui/dialog";
import { IconType } from "@/types/icon";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { v4 as uuidv4 } from "uuid";

const visibilityOptions: FieldType[] = [
  {
    label: "Public",
    value: "public"
  },
  {
    label: "Private",
    value: "private"
  }
];

type EditorData =
  | {
      type: "text";
      data: string;
    }
  | {
      type: "image";
      data: { url: string; caption: string };
    }
  | {
      type: "video";
      data: {
        url: string;
        title: string;
      };
    };

const youtubeDomains = ["https://www.youtube.com/", "https://youtu.be/"];
function formatUrl(url: string): string {
  if (youtubeDomains.some((domain) => url.startsWith(domain))) {
    const videoId = url
      .replace("https://www.youtube.com/", "")
      .replace("https://youtu.be/", "");
    return `https://www.youtube.com/embed/${videoId}`;
  } else {
    return url;
  }
}

export default function Dashboard() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedVisibility, setSelectedVisibility] = useState(
    visibilityOptions[0]
  );
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
  const [editorData, setEditorData] = useState<
    (EditorData & {
      id: string;
    })[]
  >([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [dialogState, setDialogState] = useState({
    videoUrl: false
  });

  const thumbnailDropzone = useDropzone();
  const mainFeedDropzone = useDropzone({
    accept: {
      "image/*": []
    }
  });

  const windowDimension = useWindowSize();

  const thumbnailRef = useRef<HTMLInputElement>(null);
  const cropperRef = useRef<ReactCropperElement>(null);
  const mainUploaderRef = useRef<HTMLInputElement>(null);

  // const onDragEnd = e => {}

  const generateEditorComponentInstance = ({ data, type }: EditorData) => {
    if (type === "image") {
      setEditorData((prev) => [...prev, { type, id: uuidv4(), data }]);
    } else if (type === "video") {
      setEditorData((prev) => [...prev, { type, id: uuidv4(), data }]);
    } else {
      setEditorData((prev) => [...prev, { type, id: uuidv4(), data }]);
    }
  };

  function handleEditorComponentUpdate(id: string, data: EditorData) {
    if (data.type === "image") {
      //@ts-ignore
      setEditorData((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            return { ...item, data: data.data };
          }
          return item;
        })
      );
    } else if (data.type === "video") {
      //@ts-ignore
      setEditorData((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            return { ...item, data: data.data };
          }
          return item;
        })
      );
    } else {
      //@ts-ignore
      setEditorData((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            return { ...item, data: data.data };
          }
          return item;
        })
      );
    }
  }

  const handleEditorComponentDelete = (id: string) => {
    setEditorData((prev) => prev.filter((item) => item.id !== id));
  };

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

  useEffect(() => {
    handleCustomThumbnailChange(thumbnailDropzone.acceptedFiles);
  }, [thumbnailDropzone.acceptedFiles]);

  useEffect(() => {
    if (mainFeedDropzone.acceptedFiles.length) {
      mainFeedDropzone.acceptedFiles.map((file) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
          generateEditorComponentInstance({
            type: "image",
            data: {
              url: reader.result as string,
              caption: ""
            }
          });
        };
      });
    }
  }, [mainFeedDropzone.acceptedFiles]);

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
                  <Link href="#">News</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Create</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className=" grid flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Add News Post
              </h1>
              <Badge>{selectedVisibility.label}</Badge>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card
                  x-chunk="dashboard-07-chunk-1"
                  className="border bg-card p-2 max-w-full overflow-hidden"
                >
                  <CardContent className="flex flex-col justify-between items-stretch gap-1 p-0 w-full ">
                    <div className="space-y-2 mb-2">
                      <p className="text-sm">Title</p>
                      <Input className="" placeholder="Post Title" />
                    </div>
                    {editorData.map((data, index) => (
                      <>
                        {data.type === "text" && (
                          <EditorComponentWrapper>
                            <div className="space-y-2">
                              <EditorComponentHeader
                                heading="Text"
                                onClose={() =>
                                  handleEditorComponentDelete(data.id)
                                }
                              />
                              <RichTextEditor key={data.id} />
                            </div>
                          </EditorComponentWrapper>
                        )}
                        {data.type === "image" && (
                          <EditorComponentWrapper>
                            <div className="space-y-2">
                              <EditorComponentHeader
                                heading="Image"
                                onClose={() =>
                                  handleEditorComponentDelete(data.id)
                                }
                              />
                              <EditorImageComponent
                                url={data.data.url}
                                key={data.id}
                                caption={data.data.caption}
                                handleCaptionChange={(e) => {
                                  console.log(data.data);
                                  handleEditorComponentUpdate(data.id, {
                                    type: "image",
                                    data: { ...data.data, caption: e }
                                  });
                                }}
                              />
                            </div>
                          </EditorComponentWrapper>
                        )}
                        {data.type === "video" && (
                          <EditorComponentWrapper>
                            <div className="space-y-2">
                              <EditorComponentHeader
                                heading="Video"
                                onClose={() =>
                                  handleEditorComponentDelete(data.id)
                                }
                              />
                              <EditorVideoComponent
                                key={data.id}
                                title={data.data.title}
                                url={data.data.url}
                                handleTitleChange={(e) =>
                                  handleEditorComponentUpdate(data.id, {
                                    type: "video",
                                    data: { ...data.data, title: e }
                                  })
                                }
                              />
                            </div>
                          </EditorComponentWrapper>
                        )}
                      </>
                    ))}
                    <section className="w-full flex sm:flex-row flex-col gap-2">
                      <EditorOption
                        Icon={Description}
                        label="Add Text"
                        description="Add Details"
                        onClick={() =>
                          generateEditorComponentInstance({
                            type: "text",
                            data: ""
                          })
                        }
                      />
                      <input hidden {...mainFeedDropzone.getInputProps()} />
                      <EditorOption
                        {...mainFeedDropzone.getRootProps({
                          Icon: Photo,
                          label: "Add Image",
                          description: "JPG,PNG"
                        })}
                      />

                      <Dialog
                        open={dialogState.videoUrl}
                        onOpenChange={(e) =>
                          setDialogState((prev) => ({ ...prev, videoUrl: e }))
                        }
                      >
                        <DialogTrigger asChild>
                          <EditorOption
                            Icon={YouTube}
                            label="Add Video"
                            description="Youtube,Vimeo"
                          />
                        </DialogTrigger>
                        <DialogContent className="p-0 space-y-0 bg-darkAccent max-w-[600px]">
                          <DialogHeader className="p-2 px-4 md:text-lg text-base bg-lightAccent">
                            Video
                          </DialogHeader>
                          <div className="px-4 py-2 space-y-4">
                            <div className="space-y-2">
                              <p>Paste a YouTube or Vimeo video URL here</p>
                              <Input
                                value={videoUrl}
                                onChange={(e) =>
                                  setVideoUrl(formatUrl(e.target.value))
                                }
                                placeholder="Example: https://www.youtube.com/watch?v=doPV-Shqm7k"
                                className="placeholder:text-gray-500"
                              />
                            </div>
                            {videoUrl && (
                              <iframe
                                src={videoUrl}
                                className="w-full aspect-video"
                              />
                            )}
                          </div>
                          <DialogFooter className="p-4 pt-0">
                            <DialogClose>
                              <Button
                                className="h-8"
                                onClick={() => {
                                  generateEditorComponentInstance({
                                    type: "video",
                                    data: {
                                      url: videoUrl,
                                      title: ""
                                    }
                                  });
                                  setVideoUrl("");
                                  setDialogState((prev) => ({
                                    ...prev,
                                    videoUrl: false
                                  }));
                                }}
                              >
                                Save
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </section>
                  </CardContent>
                </Card>
                <Card
                  x-chunk="dashboard-07-chunk-1"
                  className="border bg-card p-2 max-w-full"
                >
                  <CardContent className="flex flex-col justify-between items-stretch gap-4 p-0 w-full ">
                    <div className="space-y-2">
                      <p className="text-sm">Category</p>

                      <FancyMultiSelect
                        options={sample_cateories.map((cat) => ({
                          label: cat,
                          value: cat
                        }))}
                        placeholder="Select Category"
                        className="py-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm">Tags</p>
                      <FancyMultiSelect
                        options={tags.map((tag) => ({
                          label: tag,
                          value: tag
                        }))}
                        placeholder="Select Tags"
                        className="py-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
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
                        <Select
                          value={selectedVisibility.value}
                          onValueChange={(e) => {
                            setSelectedVisibility(
                              visibilityOptions.find(
                                (v) => v.value === e
                              ) as typeof selectedVisibility
                            );
                          }}
                        >
                          <SelectTrigger
                            id="status"
                            aria-label="Select status"
                            className="w-[250px] md:w-full mx-auto"
                          >
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            {visibilityOptions.map((item, index) => (
                              <SelectItem
                                key={index}
                                value={item.value}
                                className="cursor-pointer hover:bg-darkAccent/80"
                              >
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          variant={"success"}
                          className="w-[250px] md:w-full mx-auto"
                        >
                          <Rocket className="mr-2" />
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
                      className="w-full aspect-video border-2 border-dashed bg-darkAccent"
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
          </div>
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
                aspectRatio: 16 / 9
              }}
              className="object-contain cropper overflow-hidden"
              aspectRatio={16 / 9}
              src={thumbnail?.url}
              // zoomTo={0.5}
              initialAspectRatio={16 / 9}
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

const EditorOption = forwardRef<
  HTMLDivElement,
  {
    Icon: IconType;
    label: string;
    description: string;
  } & HTMLProps<HTMLDivElement>
>(({ className, Icon, label, description, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col items-center justify-start gap-1 cursor-pointer p-4 py-8 border border-dashed transition-all hover:bg-lightAccent w-full rounded",
      className
    )}
    {...props}
  >
    <Icon className="text-primary sm:h-8 h-6" />
    <p>{label}</p>
    <p className="text-sm opacity-70">{description}</p>
  </div>
));

EditorOption.displayName = "EditorOption";

function EditorComponentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full border-b last:border-none py-4">{children}</div>
  );
}

function EditorImageComponent({
  url,
  caption,
  handleCaptionChange
}: {
  url: string;
  caption: string;
  handleCaptionChange: (value: string) => void;
}) {
  return (
    <div className="w-full flex flex-col items-stretch justify-start gap-2">
      <Image
        src={url}
        alt=""
        className="w-full aspect-auto object-cover object-center"
        width={300}
        height={300}
      />
      <Textarea
        value={caption}
        onChange={(e) => handleCaptionChange(e.target.value)}
      />
    </div>
  );
}

function EditorVideoComponent({
  url,
  title,
  handleTitleChange
}: {
  url: string;
  title: string;
  handleTitleChange: (value: string) => void;
}) {
  const src = useMemo(() => {
    return url;
  }, [url]);
  return (
    <div className="w-full flex flex-col items-stretch justify-start gap-2">
      <Input
        value={title}
        onChange={(e) => handleTitleChange(e.target.value)}
      />
      <iframe src={src} className="w-full aspect-video"></iframe>
    </div>
  );
}

function EditorComponentHeader({
  onClose,
  heading
}: {
  onClose: () => void;
  heading: string;
}) {
  return (
    <div className="flex justify-between items-center p-1 px-2 border rounded-sm bg-lightAccent">
      <p className="text-sm">{heading}</p>
      <EditorClose onClick={onClose} />
    </div>
  );
}

function EditorClose({ className, ...props }: HTMLProps<HTMLDivElement>) {
  return (
    <div className={cn("cursor-pointer", className)} {...props}>
      <Delete fontSize="small" className="opacity-70" />
    </div>
  );
}
