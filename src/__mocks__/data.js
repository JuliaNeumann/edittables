export default {
  headers: [
    {
      name: 'Datum',
      type: 'date',
      id: 1,
      order_id: 1,
      active: true
    },
    {
      name: 'Moderator',
      type: 'text',
      id: 2,
      order_id: 2,
      active: true
    },
    {
      name: 'Musik-Verantwortlicher',
      type: 'text',
      id: 3,
      order_id: 3,
      active: true
    },
    {
      name: 'Musiker',
      type: 'longtext',
      id: 4,
      order_id: 4,
      group_id: 1,
      active: true
    },
    {
      name: 'Predigtlied',
      type: 'text',
      id: 5,
      order_id: 5,
      group_id: 1,
      active: true
    },
    {
      name: 'Besonderheiten',
      type: 'longtext',
      id: 6,
      order_id: 6,
      active: true
    }
  ],
  header_groups: [
    {
      id: 1,
      name: 'Musik'
    }
  ],
  groups: {
    1: 'Musik - Details'
  },
  events: [
    {
      fields: [
        1,
        '2019-08-25',
        'Manuel',
        'Jonas',
        'Jonas\nSusi',
        'Ich verdanke dir soviel, mein Gott',
        'Taufe'
      ]
    }
  ],
  config: [
    {
      data: '[1,2,6]',
      name: 'static_fields'
    }
  ]
}
