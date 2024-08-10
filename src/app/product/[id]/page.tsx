import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AddShoppingCart, Handshake, InfoOutlined } from "@mui/icons-material";
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

const products = Array.from({ length: 35 }).map((_, i) => {
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

export default function Page({ params }: { params: { id: string } }) {
  return (
    <main className="flex justify-center items-start py-10 px-2">
      <section
        className={cn(
          "4xl:w-[1616px] 2xl:w-[1328px] xl:w-[1040px] lg:w-[843px] w-full",
          "grid gap-4",
        )}
      >
        <div className="w-full flex xl:flex-row flex-col justify-between items-start gap-4">
          <div className={cn("w-full", "grid gap-4")} id="left-section">
            <ProductPreviewProvider images={images}>
              <div className="w-full aspect-video relative">
                <ProductPreviewContainer>
                  <ProductPreviewImage />
                  <ProductPreviewNavigator direction="next" />
                  <ProductPreviewNavigator direction="previous" />
                </ProductPreviewContainer>
              </div>
              <ProductPreviewMapper />
              <div className="w-full bg-lime-500 overflow"></div>
            </ProductPreviewProvider>
          </div>
          <div
            className={cn("3xl:w-[370px] xl:w-[290px] w-full xl:shrink-0", "")}
            id="right-section"
          >
            <Card>
              <CardHeader className="flex flex-row justify-between items-center w-full space-y-0">
                <CardTitle className="text-2xl">$45.00</CardTitle>
                <Badge className="flex gap-1">
                  <Handshake />
                  <span className="text-sm">Offer price</span>
                </Badge>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="text-white flex justify-start items-center gap-3">
                  <p className="">Royalty Free License</p>
                  <InfoOutlined fontSize="small" />
                </div>
                <Button className="w-full py-6">
                  <AddShoppingCart /> Add to Cart
                </Button>
              </CardContent>
            </Card>
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
          <div className="grid @6xl:grid-cols-6 @3xl:grid-cols-4 grid-cols-2 gap-3">
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
