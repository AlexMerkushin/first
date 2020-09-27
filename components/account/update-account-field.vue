<template>
  <v-text-field
    :label="name"
    :prepend-inner-icon="icon"
    :counter="counter"
    clearable
    v-model="value"
    :rules="[emptyRules,validate]"
    append-icon="mdi-arrow-left"
    @click:append="update"
    ref="filed"
    @keypress.enter="update"
    full-width
    filled
    outlined    
  ></v-text-field>
</template>

<script>
export default {
  data: () => ({
    value: null,
    emptyRules: (v) => !!v || 'שדה זה הינו חובה',
  }),
  props: {
    name: String,
    icon: String,
    counter: Number,
    validate: Function,
    nameDatabase: String,
  },
  methods: {
    update() {
      let good
      if (!this.validate) good = this.emptyRules(this.value) === true
      else
        good =
          this.emptyRules(this.value) === true &&
          this.validate &&
          this.validate(this.value) === true
      if (good) {
        this.$swal({
          icon: 'info',
          title: 'לצורך אימות נא הקלד את סיסמתך',
          input: 'password',
          inputPlaceholder: 'סיסמא קודמת',
          inputAttributes: {
            autocapitalize: 'off',
            autocorrect: 'off',
          },
          showCancelButton: true,
          confirmButtonText: 'עדכן',
          cancelButtonText: 'בטל',
          showLoaderOnConfirm: true,
          inputValidator: (password) => {
            if (!password) {
              return 'חובה למלא ערך'
            }
          },
          preConfirm: (password) => {
            var data = {}
            data[this.nameDatabase] = this.value
            this.$axios.put(
              '/accounts/' + this.$store.state.authUser[0].id + '/' + password,
              data
            )
          },
        })
      } else
        this.$swal({
          icon: 'error',
          title: '...אופס',
          text: 'ערך לא תקין, נא למלא מחדש',
          rtl: true,
        })
    },
  },
}
</script>