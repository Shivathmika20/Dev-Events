import Explorebtn from '@/components/Explorebtn'
import EventCard from '@/components/EventCard'
import events from '@/lib/data'
export default function Home() {
  return (
    <section className="mx-6">
      <h1 className="text-center mt-10">The Hub for Every Dev <br /> Event You Can't Miss</h1>
      <p className="text-center mt-4">Hackthons,Meetups, and Conferences, All in One Place</p>
      <Explorebtn />
      

      <div className='mt-20 space-y-6 container mx-auto'>
        <h3>Featured Events</h3>
        <ul className='events'>
         {
          events.map((event)=>(
            <EventCard key={event.title} {...event}/>
          ))
         }
        </ul>
      </div>
    </section>
  )
}