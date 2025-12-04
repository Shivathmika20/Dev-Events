import Explorebtn from '@/components/Explorebtn'
import EventCard from '@/components/EventCard'
const events=[
  {
    title:"Hackathon 2024",
    image:"/images/event1.png",
    location:"Oslo, Norway",
    slug:"hackathon-2024",
    date:"25th Dec 2024",
    time:"10:00 AM - 6:00 PM"
  },
  {
    title:"Hackathon 2025",
    image:"/images/event2.png",
    location:"Stockholm, Sweden",
    slug:"hackathon-2025",
    date:"15th Jan 2025",
    time:"9:00 AM - 5:00 PM"
  },
  {
    title:"Hackathon 2026",
    image:"/images/event3.png",
    location:"Copenhagen, Denmark",
    slug:"hackathon-2026",
    date:"10th Feb 2026",
    time:"11:00 AM - 7:00 PM"
  },

]

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