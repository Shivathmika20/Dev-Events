import { NextRequest, NextResponse } from 'next/server';  
import {prisma} from '@/lib/prisma';
export default async function GET({params}:{params:{slug:string}}){
    try{

    }
    catch(e){
        return NextResponse.json({message:"Couldnt find the Event"}, {status:500});
    }
}