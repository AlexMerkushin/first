<template>
  <v-container grid-list-xs fluid>
    <v-card-text v-if="$fetchState.pending" fluid>load</v-card-text>
    <v-card-text v-else-if="$fetchState.error">error</v-card-text>
    <v-data-table v-else :headers="headers" :items="files" hide-default-footer>
      <template v-slot:[`item.download`]="{ item }">
        <v-btn icon @click="download(item)">
          <v-icon>mdi-download</v-icon>
        </v-btn>
      </template>
      <template v-slot:[`item.delete`] =" {item}">
        <v-btn icon @click="del(item)" :disabled="!((statusId<5 && item.main == 0) || (statusId==6 && item.main == 1))">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  props: {
    projectId: Number,
    statusId: Number,
  },
  data: () => ({
    files: null,
    headers: [
      { text: 'מזהה', value: 'id', sortable: false },
      { text: 'סוג', value: 'type', sortable: false },
      { text: 'שם', value: 'name', sortable: false },
      { text: 'תאריך יצירה', value: 'createAt', sortable: false },
      { text: 'הורד', value: 'download', sortable: false },
      { text: 'מחק', value: 'delete', sortable: false },
    ],
  }),
  async fetch() {
    this.files = await this.$axios.$get('/file/project/' + this.projectId)
  },
  methods: {
    async download(item) {
      const id = item.id
      const res = await this.$axios.$get('/file/' + id + '/' + this.projectId, {
        responseType: 'blob',
      })
      var fileURL = window.URL.createObjectURL(res)
      var fileLink = document.createElement('a')
      fileLink.href = fileURL
      fileLink.setAttribute('download', item.name)
      document.body.appendChild(fileLink)
      fileLink.click()
    },
    del(file) {
      alert('/file/' + file.id)
      this.$swal({
        title: 'מחיקת קובץ',
        text: 'לא ניתן לבטל פעולה זו',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'מחק קובץ',
        cancelButtonText: 'בטל',
      }).then((res) => {
        if (res.value) {
          this.$axios.$delete('/file/' + file.id).then((statusId) => {
            this.$emit('back', statusId);
            if(statusId === 5)//remove file from table in front
            {
              const index = this.files.indexOf(file)
              alert(index)
              this.files.splice(index, 1)
            }
          })
        }
      })
    },
  },
  watch:{
    statusId()
    {
      if(this.statusId === 6) this.$fetch();
    }
  },
  created(){
    this.$fetch()
  }
}
</script>
