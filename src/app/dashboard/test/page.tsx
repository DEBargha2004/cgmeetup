"use client";

import {
  Accordion,
  AccordionContent,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { courseSchema, CourseSchemaType } from "@/schema/tutorial";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from "@hello-pangea/dnd";
import { zodResolver } from "@hookform/resolvers/zod";
import { DragHandle } from "@mui/icons-material";
import { AccordionItem } from "@radix-ui/react-accordion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";

export default function Page() {
  const [list, setList] = useState<{ id: string }[]>([]);
  const [list2, setList2] = useState<{ id: string }[]>([]);
  const form = useForm<CourseSchemaType>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      visibility: "Public",
      tutorial: [],
      isFree: false,
      hasAdultContent: false,
      skills: [],
      software_used: [],
      tags: []
    }
  });
  const handleDragEnd = (e: DropResult) => {
    const { source, destination } = e;
    if (!destination) return;
    const items = Array.from(list);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);
    setList(items);
  };
  useEffect(() => {
    setList(Array.from({ length: 13 }, (_, i) => ({ id: v4() })));
    setList2(Array.from({ length: 5 }, (_, i) => ({ id: v4() })));
  }, []);
  return (
    <Form {...form}>
      <form className="grid flex-1 auto-rows-max gap-4">
        <Card className="auto-rows-max lg:col-span-2 bg-card">
          <CardContent className="grid grid-cols-2 sm:p-4 p-2 items-start gap-4 lg:gap-8 ">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="droppable" type="column">
                {(provided) => (
                  <div
                    className=" p-4"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {list.map((itemp, index) => (
                      <Draggable
                        key={itemp.id}
                        index={index}
                        draggableId={itemp.id}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="mb-3"
                          >
                            <>
                              <div className="flex justify-start items-center gap-3 border-2 p-4 hover:no-underline">
                                <div {...provided.dragHandleProps}>
                                  <DragHandle />
                                </div>

                                <p>{itemp.id}</p>
                              </div>
                            </>
                            <>
                              <Droppable droppableId={itemp.id + "droppable"}>
                                {(provided) => (
                                  <div
                                    {...provided.droppableProps}
                                    className="p-4 bg-green-300"
                                    ref={provided.innerRef}
                                  >
                                    {list2.map((item, index) => (
                                      <Draggable
                                        index={index}
                                        key={`${itemp.id}-${item.id}`}
                                        draggableId={`${itemp.id}-${item.id}`}
                                      >
                                        {(provided) => (
                                          <div
                                            className="h-10 mb-3 bg-red-500"
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                          ></div>
                                        )}
                                      </Draggable>
                                    ))}
                                    {provided.placeholder}
                                  </div>
                                )}
                              </Droppable>
                            </>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
