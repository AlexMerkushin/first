<template>
  
    <v-simple-table v-if="project">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-right">מזהה</th>
            <th class="text-right">מועד עדכון</th>
            <th class="text-right">שם פרויקט</th>
            <th class="text-right">מחק</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ project.id}}</td>
            <td>{{ project.dataUpdate }}</td>
            <td>{{ project.name }}</td>
            <td>
              <v-btn icon @click.stop="del" :disabled="project.statusId > 6">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
</template>

<script>
export default {
props:{
    project: Object
},
methods:{
    
    del() {
      this.$swal({
        title: 'מחיקת פרויקט',
        text: 'לא ניתן לבטל פעולה זו. כל ה קבצים המצורפים ימחקו',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'מחק פרויקט',
        cancelButtonText: 'בטל',
      }).then((res) => {
        if (res.value) {
          this.$axios.delete('/projects/' + this.project.id).then((d) => {
            if(d.status < 298)
            this.$emit("back", 1)
          })
        }
      })
    },
}
}
</script>