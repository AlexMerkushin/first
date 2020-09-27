<template>
  <v-form ref="form">
    <v-row align="center">
      <v-col cols="4">
        <v-menu
          v-model="menuDate"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="inputDate"
              readonly
              v-on="on"
              prepend-icon="mdi-calendar-plus"
              label="תאריך"
              :disabled="lockFile"
              hint="מינימום חודש וחצי, מקסימום 7 חודשים וחצי"
              autofocus
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="inputDate"
            @input="[(menuDate = false), (menuTime = true)]"
            :no-title="!inputDate"
            :min="minTime"
            :max="maxTime"
            :disabled="lockFile"
            :allowed-dates="goodDays"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="4">
        <v-menu
          v-model="menuTime"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="menuTime"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="inputTime"
              label="בחר שעה"
              prepend-icon="mdi-calendar-clock"
              readonly
              v-on="on"
              :disabled="lockFile"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="menuTime"
            v-model="inputTime"
            full-width
            @input="menuTime = false"
            format="24hr"
            :allowedHours="goodHouers"
            :no-title="!inputTime"
            :readonly="lockFile"
          ></v-time-picker>
        </v-menu>
      </v-col>
      <v-col cols="4">
        <v-btn color="success" @click.once="createTest" :disabled="lockFile">
          צור בחינה
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  props: {
    projectId: Number
  },
  data: () => ({
    inputDate: null,
    menuDate: true,
    inputTime: null,
    menuTime: null,
    Now: new Date(),
    lockFile: false,
  }),
  methods: {
    goodHouers: (v) => v >= 9 && v <= 20,
    goodDays: (val) => new Date(val).getDay() < 5,
    async createTest() {
      const test = {
        projectId: this.projectId,
        date: this.inputDate,
        time: this.inputTime,
      }
      const res = await this.$axios.post('/test', test)
      if (res.status == 200) {
        this.$emit('next', test)
        this.lockFile = true
      }
    },
  },

  computed: {
    minTime() {
      return new Date(
        this.Now.getFullYear(),
        this.Now.getMonth() + 1,
        this.Now.getDay() + 15
      )
        .toISOString()
        .slice(0, 10)
    },
    maxTime() {
      return new Date(
        this.Now.getFullYear(),
        this.Now.getMonth() + 7,
        this.Now.getDay() + 15
      )
        .toISOString()
        .slice(0, 10)
    },
  },
}
</script>
