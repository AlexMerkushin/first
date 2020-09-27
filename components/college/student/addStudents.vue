<template>
  <v-card>
    <v-card-title class="justify-center">הוספת סטודנט</v-card-title>
    <v-stepper v-model="stepperValue">
      <v-stepper-header>
        <v-stepper-step step="1" :complete="stepperValue > 1">פרטי חשבון</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" :complete="stepperValue > 2">פרטי סטודנט</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <add-account type="student" @next="next" @close="$emit('close')" />
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-form ref="form" lazy-validation @submit="Submit" onsubmit="return false;">
            <v-autocomplete
              :items="teachers"
              item-text="accountId"
              item-value="id"
              label="מנחה"
              v-model="teacher"
              :rules="EmptyRules"
              clearable
              prepend-icon="mdi-school"
            />
            <v-autocomplete
              :items="trends"
              item-text="name"
              item-value="id"
              label="מגמה"
              v-model="trend"
              :rules="EmptyRules"
              clearable
              prepend-icon="mdi-format-list-bulleted-type"
            />
          </v-form>
          <v-card-actions>
            <v-btn @click="stepperValue--">קודם</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="success" tile @click="submit">
              הוסף סטודנט
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
  props: {
    idCollege: Number,
    trends: Object,
    teachers: Object,
  },
  data: () => ({
    stepperValue: 1,
    trend: null,
    teacher: null,
    EmptyRules: [(v) => !!v || 'שדה חובה'],
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
            teacherId: this.teacher,
            collegeId: this.idCollege,
            trendId: this.trend,
          },
          this.data
        )
         const a = await this.$axios.post('/students', this.data)
        if (a.status === 201) {
          // 201 is created
          
          this.$emit('add', {
            id: a.data.id,
            accountId: this.data.id,
            teacherId: this.teacher,
            trendId: this.trend,
          })
        } 

        this.$emit('close')
      }
    },
  },
}
</script>
