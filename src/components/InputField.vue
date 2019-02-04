<script>
  import DateInput from './inputs/DateInput'
  import SingleLineInput from './inputs/SingleLineInput'
  import MultiLineInput from './inputs/MultiLineInput'
  import IconInput from './inputs/IconInput'

  const mapTypeToComponent = {
    'date': DateInput,
    'text': SingleLineInput,
    'longtext': MultiLineInput,
    'icons': IconInput
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
      'type',
      'additional'
    ],
    render: function (h) {
      const self = this
      return h(mapTypeToComponent[this.type], {
        props: {
          value: this.value,
          additional: this.additional
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
