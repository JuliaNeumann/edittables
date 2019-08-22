import axios from 'axios'

const restRoot = window.eventPlannerApp ? window.eventPlannerApp.rest_url : 'http://127.0.0.1:8000/wp-json/'
const baseUrl = restRoot + 'event-planner/v1/'
axios.defaults.headers.common['X-WP-Nonce'] = window.eventPlannerApp ? window.eventPlannerApp.nonce : null

export async function getData () {
  const response = await axios.get(`${baseUrl}all`)
  return response.data
}

export function getHeaders (data) {
  let footnoteCounter = 1
  return data.headers
    .sort(function (head1, head2) {
      const head1OrderId = parseInt(head1.order_id)
      const head2OrderId = parseInt(head2.order_id)
      if (head1OrderId < head2OrderId) {
        return -1
      }
      return (head1OrderId > head2OrderId) ? 1 : 0
    })
    .map(head => {
      head.active = true // TODO: sync with localStorage
      head.footnotes = []
      data.header_footnotes.forEach((footnote) => {
        if (footnote.header_id === head.id) {
          head.footnotes.push({number: footnoteCounter, text: footnote.text})
          footnoteCounter++
        }
      })
      return head
    })
}

export function getGroups (data) {
  const groups = {}
  data.header_groups.forEach(group => {
    groups[group.id] = group.name
  })
  return groups
}

export function getRowsForEdit (data) {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 2)
  const endDate = new Date(today)
  endDate.setDate(today.getDate() + 130)
  return data.events.filter(event => { // show only events starting from yesterday until 4 months in the future ...
    return event.fields && event.fields[1] &&
      (new Date(event.fields[1]) >= yesterday) && (new Date(event.fields[1]) <= endDate)
  }).sort(function (event1, event2) { // ... and sort by date
    if (new Date(event1.fields[1]) < new Date(event2.fields[1])) {
      return -1
    }
    return (new Date(event1.fields[1]) > new Date(event2.fields[1])) ? 1 : 0
  })
}

export function getRowsForCurrentYear (data) {
  const currentYear = (new Date()).getFullYear()
  return data.events.filter(event => { // show only events starting from yesterday ...
    return event.fields && event.fields[1] && (new Date(event.fields[1]).getFullYear() === currentYear)
  }).sort(function (event1, event2) { // ... and sort by date
    if (new Date(event1.fields[1]) < new Date(event2.fields[1])) {
      return -1
    }
    return (new Date(event1.fields[1]) > new Date(event2.fields[1])) ? 1 : 0
  })
}

export async function addEvent (newDate) {
  if (newDate) {
    const formattedDate = formatDate(newDate)
    const response = await axios.post(`${baseUrl}add-event`, {date: formattedDate})
    return response.data
  }
}

export async function updateEvent (eventId, headerId, content, type) {
  if (eventId && headerId && content) {
    if (type === 'date') {
      content = formatDate(content)
    }
    const response = await axios.post(`${baseUrl}update-event`,
      {'event_id': eventId, 'header_id': headerId, content: content})
    return response.data
  }
}

export async function deleteEvent (rowId) {
  if (rowId) {
    const response = await axios.delete(`${baseUrl}delete-event`, {params: {event_id: rowId}})
    return response.data
  }
}

function formatDate (date) {
  if (typeof date.getTime !== 'function') {
    date = new Date(date)
  }
  const month = ('0' + (date.getUTCMonth() + 1)).slice(-2)
  const day = ('0' + date.getUTCDate()).slice(-2)
  return `${date.getUTCFullYear()}-${month}-${day}`
}

export function getConfig (data) {
  const config = {}
  data.config.forEach(configEntry => {
    if (configEntry.data) {
      try {
        config[configEntry.name] = JSON.parse(configEntry.data)
      } catch (e) {
        config[configEntry.name] = configEntry.data
      }
    }
  })
  return config
}
