<template>
  <v-card>
    <v-card-text>
      <v-form
        ref="form"
        lazy-validation
        @submit="Submit"
        onSubmit="return false;"
      >
        <v-text-field
          label="תעודת זהות"
          counter="9"
          v-model.lazy="id"
          prepend-icon="mdi-account-key"
          clearable
          validate-on-blur
        />
        <v-text-field
          label="שם פרטי"
          counter="10"
          v-model="firstName"
          :rules="EmptyRules"
          prepend-icon="mdi-contacts"
          clearable
        />
        <v-text-field
          label="שם משפחה"
          counter="10"
          v-model="lastName"
          :rules="EmptyRules"
          prepend-icon="mdi-scale-bathroom"
          clearable
        />
        <v-text-field
          label="מספר פלאפון"
          counter="10"
          v-model="phone"
          :rules="phoneRules"
          prepend-icon="mdi-cellphone-iphone"
          clearable
        />
        <v-text-field
          label="כתובת מייל"
          counter="40"
          v-model="email"
          :rules="emailRules"
          prepend-icon="mdi-gmail"
          clearable
          validate-on-blur
        />
        <v-radio-group
          v-model="sex"
          row
          label="מין:"
          :rules="EmptyRules"
          prepend-icon="mdi-gender-male-female"
        >
          <v-radio label="זכר" value="זכר"></v-radio>
          <v-radio label="נקבה" value="נקבה"></v-radio>
        </v-radio-group>
        <v-text-field
          label="כתובת מגורים"
          counter="25"
          v-model="addres"
          :rules="EmptyRules"
          prepend-icon="mdi-map-marker-radius"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="$emit('close')">סגור</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="success" tile @click="submit">
        צור חשבון
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
      type: String
  },
  data: () => ({
    sex: "זכר",
    id: "456",
    firstName: "null",
    lastName: "null",
    email: "msdf@gmail.com",
    phone: '0503314556',
    addres: "null",
    EmptyRules: [v => !!v || "שדה חובה"],
    emailRules: [
      v => !!v || "שדה חובה",
      v =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "מייל זה איננו תקין"
    ],
    phoneRules: [v => /^05\d([-]{0,1})\d{7}$/.test(v) || "מספר טלפון לא תקין"]
  }),
  methods:{
      submit()
        {
            if(this.$refs.form.validate())
            {
                const value={
                    id: this.id,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    phone: this.phone,
                    addres: this.addres,
                    sex: this.sex,
                    password: 123,
                    type: this.type,
                    addres: this.addres
                }
                this.$emit("next", value)
            }
        }
  }
};
</script>
