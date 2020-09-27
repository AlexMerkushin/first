<template>
<v-card>
  <v-card-text>
    <v-layout row wrap>
        <v-flex xs12 sm6>
          <v-list subheader>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-school</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{college.name}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-map-marker-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{college.addres}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item :href="'tel:'+college.phone">
              <v-list-item-icon>
                <v-icon>mdi-cellphone-iphone</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{college.phone}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item :href="'mailto:'+college.email">
              <v-list-item-icon>
                <v-icon>mdi-email-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{college.email}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-flex>
        <v-flex xs12 sm6>
          <v-img contain height="200" src="/college.png"></v-img>
        </v-flex>
      </v-layout>
  </v-card-text>
</v-card>
</template>

<script>
export default {
  props: {
    id: Number,
  },
  data: () => ({
    college: null,
  }),

  async fetch() {
    this.college = await this.$axios.$get(
      '/colleges/pk/' + this.id
    )
  },
  created(){
    this.$fetch()
  }
}
</script>
