<template>
  <v-expansion-panel>
    <v-expansion-panel-header>עדכון חשבון</v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-row justify="center">
        <v-col cols="12">
          <v-alert
            type="info"
            :value="true"
            class="mt-12"
          >נא לבחור את השדה הרצוי לעדכון וללחוץ על החץ לעדכון</v-alert>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <update-account-field
            name="שם פרטי"
            icon="mdi-contacts"
            :counter="10"
            nameDatabase="firstName"
          />
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <update-account-field
            name="שם משפחה"
            icon="mdi-scale-bathroom"
            :counter="10"
            nameDatabase="lastName"
          />
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <update-account-field
            name="כתובת מייל"
            icon="mdi-gmail"
            :counter="40"
            :validate="v =>/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||'מייל זה איננו תקין'"
            nameDatabase="email"
          />
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <update-account-field
            name="מספר פלאפון"
            icon="mdi-cellphone-iphone"
            :counter="10"
            :validate="v => /^05\d([-]{0,1})\d{7}$/.test(v) || 'מספר טלפון לא תקין'"
            nameDatabase="phone"
          />
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <update-account-field
            name="סיסמא"
            icon="mdi-key"
            :validate="v=>v && v.length>5||'מינימום 6 תווים'"
            nameDatabase="password"
          />
        </v-col>
      </v-row>

      <v-form></v-form>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
