import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8000/wp-json/event-planner/v1/'

export async function getHeaders () {
  const response = await axios.get(`${baseUrl}headers`)
  return response.data.map(head => {
    head.active = true // TODO: sync with localStorage
    return head
  })
}

export async function getGroups () {
  const response = await axios.get(`${baseUrl}header-groups`)
  const groups = {}
  response.data.forEach(group => {
    groups[group.id] = group.name
  })
  return groups
}

export async function getRows () {
  const response = await axios.get(`${baseUrl}events`)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 2)
  return response.data.filter(event => { // show only events starting from yesterday ...
    return event.fields && event.fields[1] && (new Date(event.fields[1]) >= yesterday)
  }).sort(function (event1, event2) { // ... and sort by date
    if (new Date(event1.fields[1]) < new Date(event2.fields[1])) {
      return -1
    }
    return (new Date(event1.fields[1]) > new Date(event2.fields[1])) ? 1 : 0
  })
}

export async function addEvent (newDate) {
  if (newDate) {
    const formattedDate = `${newDate.getUTCFullYear()}-${newDate.getUTCMonth() + 1}-${newDate.getUTCDate()}`
    const response = await axios.post(`${baseUrl}add-event`, {date: formattedDate})
    return response.data
  }
}

export async function updateEvent (eventId, headerId, content) {
  if (eventId && headerId && content) {
    const response = await axios.post(`${baseUrl}update-event`,
      {'event_id': eventId, 'header_id': headerId, content: content})
    return response.data
  }
}
