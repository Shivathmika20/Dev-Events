import CreateEventForm from "@/components/CreateEventForm";
export default function Create(){
    return(
        <section id="book-event" className="my-8">
            <h1 className="text-2xl text-center mb-4">Create Event</h1>
            <CreateEventForm />
        </section>
    )
}