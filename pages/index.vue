<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>טופס התחברות</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <v-img src="bg.jpg" height="100%">
        <v-container fill-height>
          <v-row align="center" justify="center">
            <v-card style="opacity: 0.8" min-width="500">
              <v-col cols="12">
                <v-form ref="form" @submit="submit">
                  <v-text-field
                    label="תעודת זהות"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                    counter="9"
                    hint="נא להכניס בשדה זה מספר תעודת זהות כולל ספרת ביקורת"
                    v-model="id"
                    validate-on-blur
                    @keypress.enter="submit"
                    :rules="[checkId(id)]"
                  />

                  <v-text-field
                    label="סיסמא"
                    prepend-icon="mdi-lock"
                    :type="showPass ? 'text' : 'password'"
                    :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPass = !showPass"
                    :rules="emptyRules"
                    hint="נא להכניס בשדה זה סיסמא, קיימת רגישות לתווים גדולים"
                    v-model="pass"
                    @keypress.enter="submit"
                  />
                </v-form>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    @click="submit"
                    :disabled="checkId(id) != true || !pass"
                  >התחבר</v-btn>
                  <v-btn color="primary" :disabled="checkId(id) != true">שכחתי סיסמא</v-btn>
                </v-card-actions>
              </v-col>
            </v-card>
          </v-row>
        </v-container>
      </v-img>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    showPass: false,
    id: '127901205',
    pass: '753',
    emptyRules: [(v) => !!v || 'שדה זה הינו חובה'],
  }),
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        await this.$store.dispatch('login', {
          username: this.id,
          password: this.pass,
        })
      }
    },
    checkId(id) {
      if (id === null || id.length != 9) {
        return 'אורך לא תקין'
      }
      var tot = 0
      for (var i = 0; i < 8; i++) {
        var x = ((i % 2) + 1) * id.charAt(i)
        if (x > 9) {
          x = x.toString()
          x = parseInt(x.charAt(0)) + parseInt(x.charAt(1))
        }
        tot += x
      }

      if ((tot + parseInt(id.charAt(8))) % 10 != 0) return 'תעודה לא תקינה'
      return true
    },
  },
}
</script>
