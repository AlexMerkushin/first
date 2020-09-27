<template>
  <v-card>
    <v-card-title class="justify-center">הוספת מכללה</v-card-title>
    <v-stepper v-model="stepperValue">
      <v-stepper-header>
        <v-stepper-step step="1" :complete="stepperValue > 1">פרטי מנהל</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" :complete="stepperValue > 2">פרטי מכללה</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <add-account type="college" @next="next" @close="$emit('close')" />
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-form ref="form" lazy-validation @submit="submit" onsubmit="return false;">
            <v-text-field
                label="שם המכללה"
                v-model="name"
                clearable
                prepend-icon="mdi-school"
                :rules="emptyRules"
                counter="30"
            ></v-text-field>
             <v-text-field
                label="כתובת"
                v-model="addres"
                clearable
                prepend-icon="mdi-crosshairs-gps"
                :rules="emptyRules"
                counter="255"
            ></v-text-field>
             <v-text-field
                label="מייל"
                :rules="emailRules"
                clearable
                prepend-icon="mdi-email"
                validate-on-blur
                counter="40"
                v-model="email"
            ></v-text-field>
            <v-text-field
                label="טלפון"
                v-model="phone"
                prepend-icon="mdi-phone-classic"
                validate-on-blur
                :rules="phoneRules"
                counter="9"
            ></v-text-field>
          </v-form>
          <v-card-actions>
            <v-btn @click="stepperValue--">קודם</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="success" tile @click="submit">
              הוסף מכללה
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-card-actions>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    stepperValue: 1,
    name: "null",
    addres: "null",
    email: "hekll1252@gmail.com",
    phone: '026799150',
    emptyRules: [(v) => !!v || 'שדה חובה'],
    emailRules: [
        v => !!v || 'שדה חובה',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'מייל לא תקין'
    ],
    phoneRules: [v => /^0\d([-]{0,1})\d{7}$/.test(v) || "מספר טלפון לא תקין"],
    data: null,
  }),
  methods: {
    next(val) {
      this.data = val
      this.stepperValue++
    },
    async submit() {
      if (this.$refs.form.validate()) {
        this.data = Object.assign(
          {
            name: this.name,
            addres: this.addres,
            phone: this.phone,
            email: this.email
          },
          this.data
        )
         const a = await this.$axios.post('/colleges', this.data)
         if (a.status === 201) {
          // 201 is created
          
          this.$emit('add', a.data)
        } 

        this.$emit('close')
      }
    },
  },
}
</script>
