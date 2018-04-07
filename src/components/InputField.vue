<script>
  import DateInput from './inputs/DateInput'
  import SingleLineInput from './inputs/SingleLineInput'
  import MultiLineInput from './inputs/MultiLineInput'

  const mapTypeToComponent = {
    'date': DateInput,
    'text': SingleLineInput,
    'longtext': MultiLineInput
  }

  export default {
    components: {
      DateInput,
      SingleLineInput,
      MultiLineInput
    },
    name: 'InputField',
    props: [
      'value',
      'type'
    ],
    render: function (h) {
      const self = this
      return h(mapTypeToComponent[this.type], {
        props: {
          value: this.value
        },
        on: {
          input: function (payload) {
            self.$emit('input', payload)
            self.$emit('stopEditMode')
          }
        },
        domProps: {
          value: self.value
        }
      })
    }
  }
</script>