<template>
  <v-container grid-list-xs fluid>
    <v-card-text v-if="$fetchState.pending">load</v-card-text>
    <v-card-text v-else-if="$fetchState.error">error, {{$fetchState.error}}</v-card-text>

    <v-data-table v-else-if="data" :headers="header" :items="data" show-expand>
      <template v-slot:expanded-item="{ headers, item }" style="background: white">
        <td :colspan="headers.length">
          <v-simple-table v-if="item.student.project && item.student.project.files.length>0">
            <template v-slot:default>
              <thead>
                <tr>
                  <th>שם קובץ</th>
                  <th>סוג קובץ</th>
                  <th>הורד קובץ</th>
                  <th>אשר קובץ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="file in item.student.project.files" :key="file.id">
                  <td>{{ file.name }}</td>
                  <td>
                    <v-subheader v-text="file.main==0? 'ספר פרויקט': 'קבצי קוד פרויקט'" />
                  </td>
                  <td>
                    <v-btn icon @click="download(file)">
                      <v-icon>mdi-download</v-icon>
                    </v-btn>
                  </td>
                  <td v-if="file.main == 0">
                    <v-btn
                      icon
                      @click="next(item.student.project)"
                      :disabled="item.student.project.statusId!==3"
                    >
                      <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-card-text v-else>
            טרם הועלו קבצים
          </v-card-text>
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  props: {
    id: Number,
  },
  data: () => ({
    data: null,
    header: [
      {
        text: 'תעודת זהות',
        value: 'id',
      },
      {
        text: 'שם מלא',
        value: 'fullName',
      },
      {
        text: 'מייל',
        value: 'email',
      },
      {
        text: 'טלפון',
        value: 'phone',
      },
      {
        text: 'מספר מגמה',
        value: 'student.trendId',
      },
      {
        text: 'מספר פרויקט',
        value: 'student.project.id',
      },
      {
        text: 'מועד עדכון',
        value: 'student.project.dataUpdate',
      },
      {
        text: 'שם פרויקט',
        value: 'student.project.name',
      },
      {
        text: 'סטטוס',
        value: 'student.project.statusId',
      },
    ],
  }),
  async fetch() {
    this.data = await this.$axios.$get('/projects/teacher/' + this.id)
  },
  methods: {
    async download(item) {
      const id = item.id
      const res = await this.$axios.$get(
        '/file/' + item.id + '/' + item.projectId,
        { responseType: 'blob' }
      )
      var fileURL = window.URL.createObjectURL(res)
      var fileLink = document.createElement('a')
      fileLink.href = fileURL
      fileLink.setAttribute('download', item.name)
      document.body.appendChild(fileLink)
      fileLink.click()
    },
    next(project) {
      this.$swal({
        title: 'אשר קובץ',
        text: 'לא ניתן לבטל פעולה זו',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'אשר קובץ',
        cancelButtonText: 'בטל',
      }).then((res) => {
        if (res.value) {
          this.$axios.put('/projects/plus1/' + project.id).then((res) => {
            project.statusId++
          })
        }
      })
    },
  },
  created(){
    this.$fetch()
  }
}
</script>
