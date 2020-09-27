<template>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6">
        <v-form ref="form">
          <v-file-input
            label="העלה קבצים"
            clearable
            chips
            outlined
            :counter="file != null"
            :show-size="file != null"
            v-model="file"
            :rules="emptyRules"
            append-icon="mdi-arrow-left"
            @click:append="sent"
            @change="sent"
          ></v-file-input>
          
        </v-form>
      </v-col>
    </v-row>
</template>

<script>
export default {
    props:{
        main: false,
        projectId: Number
    },
    data: () => ({
    file: null,
    emptyRules: [v => !!v || "שדה זה הינו חובה"],
  }),
  methods: {
   async sent() {
      if (this.$refs.form.validate()) {
        let formData = new FormData();
        formData.append("file", this.file);
        formData.append("projectId", this.projectId);
        formData.append("main", this.main);
        const file = await this.$axios.post("/file", formData)
        if(file.status===201) //create
        {
          this.$emit("next")
        }          
      }
    },
  }
}
</script>
