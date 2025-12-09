import { NextRequest, NextResponse } from 'next/server';  
import {prisma} from '@/lib/prisma';
export async function GET(req: NextRequest, {params}:{params:Promise<{slug:string}>}) {
    try{
        
        const {slug} = await params
        
        //validation
        if(!slug || typeof slug !== 'string'){
            return NextResponse.json({message:"Invalid Slug Provided"}, {status:400});
        }

        const eventInfo=await prisma.event.findUnique({
            where:{slug},
            
        })
        if(!eventInfo){
            return NextResponse.json({message:"Event not found"}, {status:404});
        }
        console.log(eventInfo);
        return NextResponse.json({message:"Event found",eventInfo},{status:200});
    }
    catch(e){
        return NextResponse.json({message:"Couldnt find the Event"}, {status:500});
    }
}