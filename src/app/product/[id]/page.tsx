import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  AddShoppingCart,
  Bookmark,
  BookmarkOutlined,
  CheckCircleOutline,
  Favorite,
  Handshake,
  HighlightOff,
  InfoOutlined,
} from "@mui/icons-material";
import { ProductPreviewProvider } from "./_components/product-preview-provider";
import project from "@/../public/data/projects.json";
import {
  ProductPreviewContainer,
  ProductPreviewImage,
  ProductPreviewMapper,
  ProductPreviewNavigator,
} from "./_components/product-preview";
import { ListContainerCard } from "@/components/custom/list-container";
import { v4 } from "uuid";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import _ from "lodash";
import "./style.css";
import { IconType } from "@/types/icon";
import { HTMLProps } from "react";
import ProductStats from "./_components/product-stats";
import ProductDescription from "./_components/product-description";
import { AddFriend, ProfileInfoOverView } from "@/components/custom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const products = Array.from({ length: 10 }).map((_, i) => {
  const id = v4();
  return {
    id,
    price: "$10",
    href: `/product/${id}`,
  };
});

const images = project.data
  .slice(0, 15)
  .map((project) => project.smaller_square_cover_url);

const checker = {
  false: <HighlightOff fontSize="small" className="text-destructive" />,
  true: <CheckCircleOutline fontSize="small" className="text-primary" />,
};

const productDetails = [
  { id: 1, label: "Publish Date", value: "2021-04-17" },
  { id: 2, label: "Model ID", value: "2989762" },
  { id: 3, label: "Animated", value: true },
  { id: 4, label: "Rigged", value: true },
  { id: 5, label: "VR / AR / Low-poly", value: true },
  { id: 6, label: "PBR", value: true },
  { id: 7, label: "Geometry", value: "Polygon mesh" },
  { id: 8, label: "Polygons", value: "0" },
  { id: 9, label: "Vertices", value: "0" },
  { id: 10, label: "Textures", value: false },
  { id: 11, label: "Materials", value: false },
  { id: 12, label: "UV Mapping", value: false },
  { id: 13, label: "Unwrapped UVs", value: "Unknown" },
  { id: 14, label: "Plugins used", value: false },
  { id: 15, label: "Ready for 3D Printing", value: true },
];

export default function Page({ params }: { params: { id: string } }) {
  return (
    <main className="flex justify-center items-start pb-10 px-2">
      <section
        className={cn(
          "4xl:w-[1616px] 2xl:w-[1328px] xl:w-[1040px] lg:w-[843px] w-full",
          "grid gap-4",
        )}
      >
        <header
          className=" z-30 flex md:h-14 items-center gap-4 bg-background
        sm:static sm:h-auto sm:bg-transparent"
        >
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Product</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Xpeng X2 Flying car EVTOL 3D model</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="w-full  product-container gap-4">
          <div className={cn("product-preview", "space-y-4")}>
            <ProductPreviewProvider images={images}>
              <div className="w-full aspect-video relative">
                <ProductPreviewContainer>
                  <ProductPreviewImage />
                  <ProductPreviewNavigator direction="next" />
                  <ProductPreviewNavigator direction="previous" />
                </ProductPreviewContainer>
              </div>
              <ProductPreviewMapper />
            </ProductPreviewProvider>
          </div>
          <div
            className={cn("w-full xl:shrink-0 product-sidebar", "grid gap-4")}
            id="right-section"
          >
            <Card className="bg-card">
              <CardHeader className="flex flex-row justify-between items-center w-full space-y-0">
                <CardTitle className="text-2xl">$45.00</CardTitle>
                <Badge className="flex gap-1">
                  <Handshake />
                  <span className="text-sm">Offer price</span>
                </Badge>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="text-foreground flex justify-start items-center gap-3">
                  <p className="">Royalty Free License</p>
                  <InfoOutlined fontSize="small" />
                </div>
                <Button className="w-full py-6">
                  <AddShoppingCart /> Add to Cart
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardContent className="pt-4">
                <ProfileInfoOverView
                  content={<Button className="mt-3 h-8">Hire Me</Button>}
                >
                  <AddFriend
                    isFriend={false}
                    className="h-8 w-8 cursor-pointer"
                  />
                </ProfileInfoOverView>
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardContent className="pt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <h2 className="text-xl text-foreground">
                          3D Model Formats
                        </h2>
                      </TableHead>
                      <TableHead className="text-right px-0">
                        <InfoOutlined
                          fontSize="small"
                          className="hover:opacity-70 transition-all cursor-pointer text-foreground"
                        />
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y">
                    <TableRow>
                      <TableCell>Autodesk FBX (.fbx)</TableCell>
                      <TableCell className="px-0 text-right">
                        <strong>4.53MB</strong>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>OBJ (.obj, .mtl)</TableCell>
                      <TableCell className="px-0 text-right">
                        <strong>13.3MB</strong>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <p>Blender 2.92.0 (.blend)</p>
                        <p>Version: 2.92.0</p>
                        <p>Renderer: Cycles 2.92.0</p>
                      </TableCell>
                      <TableCell className="px-0 text-right">
                        <strong>22MB</strong>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Textures</TableCell>
                      <TableCell className="px-0 text-right">
                        <strong>4.23MB</strong>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardContent className="pt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <h2 className="text-xl text-foreground whitespace-nowrap">
                          3D Model Details
                        </h2>
                      </TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y">
                    {productDetails.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell>{p.label}</TableCell>
                        <TableCell className="px-0 text-right">
                          <strong className="whitespace-nowrap">
                            {_.isBoolean(p.value)
                              ? checker[`${p.value}`]
                              : p.value}
                          </strong>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <div className={cn("product-description", "w-full space-y-4")}>
            <Card className="bg-card h-fit">
              <CardHeader>
                <CardTitle className="leading-8 md:text-2xl text-xl">
                  Xpeng X2 Flying car EVTOL 3D model
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ProductStats />
              </CardContent>
            </Card>
            <ProductDescription />
          </div>
        </div>
        <div
          className={cn("w-full @container", "space-y-3")}
          id="similar-products"
        >
          <div>
            <h1 className="text-2xl">Similar Products</h1>
            <p>to xyz</p>
          </div>
          <div className="grid @6xl:grid-cols-5 @3xl:grid-cols-3 @md:grid-cols-2 gap-3 overflow-hidden">
            {products.map((p) => (
              <ListContainerCard
                className="w-full md:w-full"
                price={p.price}
                href={p.href}
                id={p.id}
                key={p.id}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
