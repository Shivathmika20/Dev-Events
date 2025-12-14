'use server'
import {prisma} from '@/lib/prisma';


export async function getSimilarEvents(slug:string) {
    try{
        const currentEvent = await prisma.event.findUnique({
            where: { slug },
            
        });

        if(!currentEvent){
            return [];
        }

       return  await prisma.event.findMany({
            where:{
                id: { not: currentEvent?.id },
                tags:{hasSome: currentEvent?.tags || []}
            }
        })
    }
    catch(e){
        console.log("Error fetching similar events:",e);
       
    }

}