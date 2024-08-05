"use client";

import Image from "next/image";
import Link from "next/link";
import { ListFilter, PlusCircle, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MaterialSymbolIcon } from "@/components/custom";
import { useState } from "react";
import {
  Comment,
  Delete,
  Edit,
  Favorite,
  MoreVert,
  Visibility
} from "@mui/icons-material";
import { IconType } from "@/types/icon";
import TableItem from "./_components/table-item";

type FieldType = { label: string; value: string };

const filter: FieldType[] = [
  { label: "Latest", value: "latest" },
  { label: "Popular", value: "popular" },
  { label: "Oldest", value: "oldest" }
];

const info_options: (FieldType & { Icon: IconType })[] = [
  { label: "Edit", value: "edit", Icon: Edit },
  { label: "View", value: "view", Icon: Visibility },
  { label: "Delete", value: "delete", Icon: Delete }
];

export default function Gallery() {
  const [selectedFilter, setSelectedFilter] = useState(filter[0].value);
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex flex-col sm:gap-4">
        <header
          className=" z-30 flex md:h-14 items-center gap-4 bg-background px-4 
        sm:static sm:h-auto sm:bg-transparent sm:px-6"
        >
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Marketplace</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Marketplace Products</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex sm:flex-row flex-col items-center justify-between gap-2 ">
              <div className="flex gap-2 items-center justify-start sm:w-fit w-full">
                <TabsList className="bg-card">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="public">Public</TabsTrigger>
                  <TabsTrigger value="private">Private</TabsTrigger>
                  <TabsTrigger value="draft">Draft</TabsTrigger>
                </TabsList>
              </div>
              <div className="flex justify-between items-center gap-2 w-full">
                <Link
                  href={"/dashboard/marketplace/create"}
                  className=" inline"
                >
                  <Button
                    size="sm"
                    variant={"success"}
                    className="h-8 gap-1 rounded-sm"
                  >
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Add Product
                    </span>
                  </Button>
                </Link>

                <div className="relative md:grow-0 md:w-fit w-[200px] flex justify-between items-center gap-2">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full rounded-lg pl-8 md:w-[200px] lg:w-[336px] h-8"
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 gap-1 bg-transparent"
                      >
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          Filter
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-darkAccent">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {filter.map((item) => (
                        <DropdownMenuCheckboxItem
                          key={item.value}
                          onClick={() => setSelectedFilter(item.value)}
                          checked={selectedFilter === item.value}
                          className=""
                        >
                          {item.label}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0" className="bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">
                    Marketplace Products
                  </CardTitle>
                  <CardDescription>
                    Manage your posts and view their performance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="">
                        <TableHead className="w-[100px] table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Status
                        </TableHead>
                        <TableHead className="">Price</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Category
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Created on
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.from({ length: 10 }, (_, i) => i).map((i) => (
                        <TableItem key={i} />
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="">
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong> Posts
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
