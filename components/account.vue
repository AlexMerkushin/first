<template>
  <v-card v-if="account">
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs12 sm6>
          <v-list subheader>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account-key</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{account.fullName}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item :href="'tel:'+account.phone">
              <v-list-item-icon>
                <v-icon>mdi-cellphone-iphone</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{account.phone}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item :href="'mailto:'+account.email">
              <v-list-item-icon>
                <v-icon>mdi-email-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{account.email}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-flex>
        <v-flex xs12 sm6>
          <v-img contain height="200" src="/account.png"></v-img>
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
    account: null,
  }),

  async fetch() {
    this.account = await this.$axios.$get(
      '/accounts/find/' + this.id + '/teacher'
    )
  },
  created(){
    this.$fetch()
  }
}
</script>
