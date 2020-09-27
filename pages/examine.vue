<template>
<v-expansion-panels focusable multiple popout :value="[0]">
  <v-expansion-panel>
      <v-expansion-panel-header>טבלת פרויקטים</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-data-table :headers="header" :items="project" show-expand v-if="project">
      <template v-slot:expanded-item="{ headers, item }">   
        <td :colspan="headers.length" v-if="item.files">          
          <v-simple-table>
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
                <tr v-for="file in item.files" :key="file.id">
                  <td>{{ file.name }}</td>
                  <td>
                    <v-subheader v-text="file.main==0? 'ספר פרויקט': 'קבצי קוד פרויקט'" />
                  </td>
                  <td>
                    <v-btn icon @click="download(file)">
                      <v-icon>mdi-download</v-icon>
                    </v-btn>
                  </td>
                  <td>
                    <v-btn
                      icon
                      @click="next(item)"
                      :disabled="!(
                    (item.statusId == 4 && file.main == 0) ||
                    (item.statusId == 6 && file.main == 1)
                  )"                    >
                      <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <create-test v-if="item.statusId == 7" :projectId ="item.id" @next="item.statusId++"/>
          <get-test-by-project-examine :projectId ="item.id" v-if="item.statusId === 8" />
        </td>
      </template>
    </v-data-table>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <update-account-form />
</v-expansion-panels>
</template>

<script>
export default {
  middleware: 'authenticated',
  data:()=>({
    header: [
      {
        text: 'מספר פרויקט',
        value: 'id',
      },
      {
        text: 'מועד עדכון',
        value: 'dataUpdate',
      },
      {
        text: 'שם פרויקט',
        value: 'name',
      },
      {
        text: 'סטטוס',
        value: 'statusId',
      },
    ],
  }),
async asyncData({$axios})
{
  const project = await $axios.$get("/projects");
  return {project}
},
methods:{
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
head:()=>({
    title: "בוחנים"
  })
}
</script>
