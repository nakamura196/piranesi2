<template>
  <div>
    <v-container>
      <h2 class="my-5">Index of cities</h2>
      <p>According to the site of architecures, remains excavated.</p>
      <v-row>
        aaaaaaaaa
        <v-col v-for="(value, index) in data" :key="index" cols="2">
          <router-link :to="{ path: '/citta', query: { citta: value } }">{{
            value
          }}</router-link>
        </v-col>
      </v-row>
      <br />
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    data: [
      'Agrigento',
      'Albano',
      'Ancona',
      'Anzio',
      'Aosta',
      'Athens',
      'Avvezzano',
      'Benevento',
      'Boville (Frattocchie)',
      'Campello sul Clitunno',
      'Capua',
      'Castel Gandolfo',
      'Chiusi',
      'Cori',
      'Cornazzano',
      'Corneto',
      'Ercolano',
      'Frascati',
      'Napoli',
      'Ostia',
      'Padova',
      'Palazzolo',
      'Palestrina',
      'Pesto',
      'Pompei',
      'Posilipo',
      'Pula',
      'Rimini',
      'Roma',
      'Siena',
      'Stabia',
      'Tivoli',
      'Verona'
    ]
  })
}
</script>
