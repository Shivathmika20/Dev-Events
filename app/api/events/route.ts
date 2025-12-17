import {NextResponse,NextRequest} from 'next/server';
import {prisma} from '@/lib/prisma';
import {EventMode} from '@/generated/prisma/client';
import {generateSlug, normalizeDate, normalizeTime} from '@/lib/event-utils';
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title")?.toString()!;
    const description = formData.get("description")?.toString()!;
    const overview = formData.get("overview")?.toString()!;
    const venue = formData.get("venue")?.toString()!;
    const location = formData.get("location")?.toString()!;
    const date = formData.get("date")?.toString()!;
    const time = formData.get("time")?.toString()!;
    const modeString = formData.get("mode")?.toString() || "ONLINE";
    const audience = formData.get("audience")?.toString()!;
    const organizer = formData.get("organizer")?.toString()!;
    const image = formData.get("image")?.toString() || "";
    const mode = EventMode[modeString.toUpperCase() as keyof typeof EventMode];
    const agenda = JSON.parse(formData.get("agenda") as string);
    const tags = JSON.parse(formData.get("tags") as string);

  

    if (!mode) {
    return NextResponse.json({ message: "Invalid mode" }, { status: 400 });
    }
     
    const file = formData.get("image") as File;
    if (!file) return NextResponse.json({ message: "Image is required" }, { status: 400 });


    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ resource_type: "image", folder: "DevEvent" }, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      }).end(buffer);
    });

    const slug = generateSlug(title);

    const createdEvent = await prisma.event.create({
      data: {
        title,
        slug,
        description,
        overview,
        venue,
        location,
        date: normalizeDate(date),
        time: normalizeTime(time),
        mode,
        audience,
        organizer,
        image:uploadResult.secure_url,
        agenda,
        tags,
      },
    });

    revalidatePath("/")
    return NextResponse.json({ message: "Event created successfully", createdEvent }, { status: 201 });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ message: e.message || "Error creating event" }, { status: 500 });
  }
}


export async function GET() {
  try{
    await prisma.$connect();
    console.log("✅ Prisma connected to MongoDB");

    const events=await prisma.event.findMany({
      orderBy:{
        createdAt:'desc'
      }
    });
       console.log("📦 Events count:", events.length);
    
    return NextResponse.json({ message:"Events fetched successfully",events }, { status: 200 });
  }
  catch(e){
    return NextResponse.json({ message: "Error fetching events" }, { status: 500 });
  }
}
