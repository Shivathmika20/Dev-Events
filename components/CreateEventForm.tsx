"use client"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

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

const eventSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  overview: z.string().min(10),
  image: z.any().optional(),
  date: z.string(),
  time: z.string(),
  venue: z.string(),
  location: z.string(),
  organizer: z.string(),
  mode: z.enum(["ONLINE", "OFFLINE", "HYBRID"]),
  agenda: z.array(z.string().min(2)),
  tags: z.array(z.string().min(1)),
})

type EventFormValues = z.infer<typeof eventSchema>

 function CreateEventForm() {
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      mode: "OFFLINE",
      agenda: [],
      tags: [],
    },
  })

  const onSubmit = (data: EventFormValues) => {
    console.log("Final Event Data:", data)
  }

  return (
    <div className="flex justify-center px-4">
      <Card className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-xl text-white">
        <CardContent className="pt-6">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="space-y-0 text-white/50">

              {/* Title */}
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-xs text-zinc-400">
                      Event Title
                    </FieldLabel>
                    <Input {...field} className="h-9 bg-zinc-900 border-zinc-800" />
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
                    <FieldLabel className="text-xs text-zinc-400">
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
                    <FieldLabel className="text-xs text-zinc-400">
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
                    <FieldLabel className="text-xs text-zinc-400">
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
                    <FieldLabel className="text-xs text-zinc-400">
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
                    <FieldLabel className="text-xs text-zinc-400">
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
                    <FieldLabel className="text-xs text-zinc-400">
                      Event Image / Banner
                    </FieldLabel>
                    <Input
                      type="file"

                      onChange={(e) => field.onChange(e.target.files?.[0])}
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
                    <FieldLabel className="text-xs text-zinc-400">
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
                    <FieldLabel className="text-xs text-zinc-400">
                      Agenda
                    </FieldLabel>
                    <Input
                      placeholder="Keynote, Networking, Workshop"
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

              {/* Tags → string[] */}
              <Controller
                name="tags"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel className="text-xs text-zinc-400">
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
                    <FieldLabel className="text-xs text-zinc-400">
                      Description
                    </FieldLabel>
                    <Textarea
                      {...field}
                      rows={2}
                      className="bg-zinc-900 border-zinc-800 resize-none"
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
                    <FieldLabel className="text-xs text-zinc-400">
                      Overview
                    </FieldLabel>
                    <Textarea
                      {...field}
                      rows={2}
                      className="bg-zinc-900 border-zinc-800 resize-none"
                    />
                  </Field>
                )}
              />

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