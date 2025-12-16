"use client"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field"

const BASE_URL=process.env.NEXT_PUBLIC_BASE_URL

const eventSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10 , "Description is required"),
  overview: z.string().min(10, "Overview is required"),
  image: z.any().optional(),
  date: z.string(),
  time: z.string(),
  venue: z.string().min(3, "Venue is required"),
  location: z.string(),
  audience: z.string().min(3, "Audience is required"),
  organizer: z.string(),
  mode: z.enum(["ONLINE", "OFFLINE", "HYBRID"]),
  agenda: z.array(z.string().min(2)),
  tags: z.array(z.string().min(1)),
})

type EventFormValues = z.infer<typeof eventSchema>

 function CreateEventForm() {
  const [success, setSuccess] = useState(false);
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
        title: "",
        description: "",
        overview: "",
        venue: "",
        location: "",
        audience:"",
        date: "",
        time: "",
        mode: "OFFLINE",   
        organizer: "",
        agenda: [""],      
        tags: [""],        
        image: null,  
    },
  })

  const onSubmit = async (data: EventFormValues) => {
    // console.log("Final Event Data:", data)
    try{
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('overview', data.overview);
        formData.append('venue', data.venue);
        formData.append('location', data.location);
        formData.append('date', data.date);
        formData.append('time', data.time);
        formData.append('mode', data.mode);
        formData.append('audience', data.audience);
        formData.append('organizer', data.organizer);
        formData.append('agenda', JSON.stringify(data.agenda));
        formData.append('tags', JSON.stringify(data.tags));
        if(data.image){
          formData.append('image', data.image);
        }

        
        const res=await fetch(`${BASE_URL}/api/events`, {
          method: 'POST',
          body: formData
        })

        const result=await res.json();
        console.log(result);
        if(!res.ok){
          throw new Error(result.message || 'Failed to create event');
        }
        setSuccess(true);
        form.reset();
        // console.log("Event Creation Suscessfully", result);
    }
    catch(e){
      console.error("Error creating event:", e);
    }
  }

  return (
    <div className="flex justify-center px-4">
      <Card className="w-full max-w-xl bg-zinc-950 border border-zinc-600 rounded-xl text-white">
        <CardContent className="pt-6">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="space-y-0 text-white/50">

              {/* Title */}
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-xs text-zinc-300">
                      Event Title
                    </FieldLabel>
                    <Input {...field} className="h-9 bg-zinc-900 border-zinc-800" placeholder="Enter title" />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              {/* Date */}
              <Controller
                name="date"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel className="text-xs text-zinc-300">
                      Event Date
                    </FieldLabel>
                    <Input type="date" {...field} className="h-9 bg-zinc-900 border-zinc-800" style={{ colorScheme: "dark" }} />
                  </Field>
                )}
              />

              {/* Time */}
              <Controller
                name="time"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel className="text-xs text-zinc-300">
                      Event Time
                    </FieldLabel>
                    <Input type="time" {...field} className="h-9 bg-zinc-900 border-zinc-800" style={{ colorScheme: "dark" }} />
                  </Field>
                )}
              />

              {/* Venue */}
              <Controller
                name="venue"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel className="text-xs text-zinc-300">
                      Venue 
                    </FieldLabel>
                    <Input {...field} className="h-9 bg-zinc-900 border-zinc-800" />
                  </Field>
                )}
              />

              {/* Location */}
              <Controller
                name="location"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel className="text-xs text-zinc-300">
                      Location
                    </FieldLabel>
                    <Input {...field} className="h-9 bg-zinc-900 border-zinc-800" />
                  </Field>
                )}
              />
             


              {/* Mode */}
              <Controller
                name="mode"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel className="text-xs text-zinc-300">
                      Event Mode
                    </FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-9 bg-zinc-900 border-zinc-800 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                        <SelectItem value="ONLINE">Online</SelectItem>
                        <SelectItem value="OFFLINE">Offline</SelectItem>
                        <SelectItem value="HYBRID">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />

              {/* Image Upload */}
              <Controller
                name="image"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel className="text-xs text-zinc-300">
                      Event Image / Banner
                    </FieldLabel>
                    <Input
                      type="file"

                      onChange={(e) => field.onChange(e.target.files?.[0] ?? null)}
                      className="h-9 bg-zinc-900 border-zinc-800"
                    />
                  </Field>
                )}
              />

              {/* Organizer */}
              <Controller
                name="organizer"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel className="text-xs text-zinc-300">
                      Organizer
                    </FieldLabel>
                    <Input {...field} className="h-9 bg-zinc-900 border-zinc-800" />
                  </Field>
                )}
              />

              {/* Agenda → string[] */}
                <Controller
                  name="agenda"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel className="text-xs text-zinc-300">
                        Agenda
                      </FieldLabel>

                      <Textarea
                        rows={3}
                        placeholder={`Keynote,\nNetworking,\nWorkshop`}
                        value={(field.value ?? []).join(", ")}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value
                              .split(",")
                              .map((v) => v.trim())
                              .filter(Boolean)
                          )
                        }
                        className="bg-zinc-900 border-zinc-800 text-white resize-none"
                      />

                      <FieldDescription className="text-xs text-zinc-500">Comma Seperated</FieldDescription>
                    </Field>
                  )}
                />


                   

              {/* Tags → string[] */}
              <Controller
                name="tags"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel className="text-xs text-zinc-300">
                      Tags
                    </FieldLabel>
                    <Input
                      placeholder="react, nextjs, ai"
                      value={field.value.join(", ")}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value
                            .split(",")
                            .map((v) => v.trim())
                            .filter(Boolean)
                        )
                      }
                      className="h-9 bg-zinc-900 border-zinc-800"
                    />
                    <FieldDescription>Comma separated</FieldDescription>
                  </Field>
                )}
              />

              {/* Description */}
              <Controller
                name="description"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel className="text-xs text-zinc-300">
                      Description
                    </FieldLabel>
                    <Textarea
                      {...field}
                      rows={2}
                      className="bg-zinc-900 border-zinc-800 resize-none"
                    />
                    {(field.value?.length ?? 0)}/500
                  </Field>
                )}
              />
              {/* Audience */}
               <Controller
                  name="audience"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-zinc-300 text-sm">
                        Audience
                      </FieldLabel>
                      <Input
                        {...field}
                        placeholder="Students, Developers, Open to all"
                        className="h-9 bg-zinc-900 border-zinc-800"
                      />
                    </Field>
                  )}
                />

              {/* Overview */}
              <Controller
                name="overview"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel className="text-xs text-zinc-300">
                      Overview
                    </FieldLabel>
                    <Textarea
                      {...field}
                      rows={2}
                      className="bg-zinc-900 border-zinc-800 resize-none"
                    />
                    {(field.value?.length ?? 0)}/500
                  </Field>
                )}
              />
              {success && (
                  <p className="text-green-400 text-sm mt-2">
                    Event created successfully 
                  </p>
              )}

              <Button
                type="submit"
                className="h-9 w-full bg-emerald-400 text-black hover:bg-emerald-500"
              >
                Save Event
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreateEventForm