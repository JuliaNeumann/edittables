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
  return response.data
}
