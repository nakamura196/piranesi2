<template>
  <div class="mt-5">
    <v-container>
      <h3>
        Subject index of series by Giovanni Battista and Francesco Piranesi
      </h3>

      <v-card class="mx-auto mt-5">
        <v-sheet class="pa-4 primary lighten-2">
          <v-text-field
            v-model="search"
            label="Search Subject Directory"
            dark
            flat
            solo-inverted
            hide-details
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-text-field>
          <v-checkbox
            v-model="caseSensitive"
            dark
            hide-details
            label="Case sensitive search"
          ></v-checkbox>
        </v-sheet>
        <v-card-text>
          <v-treeview :items="items" :search="search" :filter="filter" open-all>
            <template v-slot:label="{ item }">
              <template v-if="item.link">
                <router-link
                  :to="{ path: '/subsr', query: { subcategoria: item.name } }"
                  >{{ item.name }}</router-link
                >
              </template>
              <template v-else>{{ item.name }}</template>
            </template>
          </v-treeview>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        id: 1,
        name: 'Archeological Objects',
        children: [
          {
            id: 11,
            name: 'Category',
            children: [
              {
                id: 111,
                name: 'Altars',
                link: true
              },
              {
                id: 112,
                name: 'Architectural fragments',
                children: [
                  {
                    id: 1121,
                    name: 'Capitals'
                  }
                ]
              },
              {
                id: 202,
                name: 'Kael'
              },
              {
                id: 203,
                name: 'Nekosaur'
              },
              {
                id: 204,
                name: 'Jacek'
              },
              {
                id: 205,
                name: 'Andrew'
              }
            ]
          },
          {
            id: 3,
            name: 'Administrators',
            children: [
              {
                id: 301,
                name: 'Ranee'
              },
              {
                id: 302,
                name: 'Rachel'
              }
            ]
          },
          {
            id: 4,
            name: 'Contributors',
            children: [
              {
                id: 401,
                name: 'Phlow'
              },
              {
                id: 402,
                name: 'Brandon'
              },
              {
                id: 403,
                name: 'Sean'
              }
            ]
          }
        ]
      }
    ],
    search: null,
    caseSensitive: false
  }),
  computed: {
    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].includes(search)
        : undefined
    }
  }
}
</script>
