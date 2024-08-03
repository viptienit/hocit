import { json, useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

function Events() {
  const data = useLoaderData();
  // if (data.isError) {
  //   return data.message;
  // }
  const events = data.events;

  return <EventsList events={events} />;
}

export default Events;
export const loader = async () => {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // ...
    // return { isError: true, message: "Could not fetch events." };
    // throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
    //   status: 500,
    // });
    return json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData;
  }
};
