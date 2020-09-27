<template>
  <v-card>
    <v-card-title class="justify-center">הוספת מרצה</v-card-title>
    <v-stepper v-model="stepperValue">
      <v-stepper-header>
        <v-stepper-step step="1" :complete="stepperValue > 1">פרטי חשבון</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" :complete="stepperValue > 2">פרטי מרצה</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <add-account type="teacher" @next="next" @close="$emit('close')" />
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-form ref="form" lazy-validation @submit="Submit" onsubmit="return false;">
            <v-text-field
              label="השכלה"
              v-model="adocation"
              prepend-icon="mdi-school"
              :rules="EmptyRules"
              clearable
              counter="20"
            ></v-text-field>

            <v-switch
              v-model="out"
              label="מרצה חוץ"
              messages="יש לסמן במידה והמרצה איננו עובד במכללה"
            ></v-switch>
          </v-form>
          <v-card-actions>
            <v-btn @click="stepperValue--">קודם</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="success" tile @click="submit">
              הוסף מרצה
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
    IdCollege: Number,
    trends: Object,
    teachers: Object,
  },
  data: () => ({
    stepperValue: 1,
    trend: null,
    teacher: null,
    EmptyRules: [(v) => !!v || 'שדה חובה'],
    data: null,
    adocation: null,
    out: false,
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
            collegeId: this.IdCollege,            
            trendId: this.trend,
            adocation: this.adocation
          },
          this.data
        )
        const a = await this.$axios.post('/teachers', this.data)
        if(a.status == 201)
        {
          this.$emit('add', {
            id: a.data.id,
            accountId: this.data.id,
            teacherId: this.data.teacherId,
            collegeId: this.data.collegeId,
            trendId: this.trend,
            adocation: this.adocation
          })
        }
          this.$emit('close');
      }
    },
  },
  /*
  mounted() {
    
    let formData = new FormData();
    formData.append("Func", "getListTrend");
    this.axios
      .post(this.$store.state.ServerPhp + "clsCollege.php", formData)
      .then(data => {
        this.Trends = data.data;
        if (this.Trends != null) {
          formData.delete("Func");
          formData.append("Func", "getListTeacher");
          formData.append("Id", this.IdCollege);
          this.axios
            .post(this.$store.state.ServerPhp + "clsCollege.php", formData)
            .then(data => {
              this.Teachers = data.data;
            });
        }
      });
  
  },
  
  methods: {
    Submit() {
      console.log("5")
      }
    },
    checkId() {
      if (this.Id == null || this.Id.length != 9) {
        return "אורך לא תקין";
      }
      var tot = 0;
      for (var i = 0; i < 8; i++) {
        var x = ((i % 2) + 1) * this.Id.charAt(i);
        if (x > 9) {
          x = x.toString();
          x = parseInt(x.charAt(0)) + parseInt(x.charAt(1));
        }
        tot += x;
      }

      if ((tot + parseInt(this.Id.charAt(8))) % 10 != 0)
        return "תעודה לא תקינה";
    }
  }
  */
}
</script>
