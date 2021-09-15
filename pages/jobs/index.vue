<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-breadcrumbs
        large
        :items="[
          {
            text: 'Jobs',
            disabled: true,
            href: 'jobs'
          }
        ]"
      >
        <template #divider>
          <v-icon>mdi-forward</v-icon>
        </template>
      </v-breadcrumbs>
    </v-col>
    <v-col cols="12">
      <vue-confirm-dialog />
      <v-data-table
        :headers="headers"
        :items="jobs"
        :loading="loading"
        class="elevation-1"
      >
        <template #top>
          <v-toolbar flat>
            <v-toolbar-title>Jobs List</v-toolbar-title>
            <v-divider class="mx-4" inset vertical />
            <v-spacer />
            <router-link to="/jobs/create">
              <v-btn dark color="blue" class="mb-2">
                New Job
              </v-btn>
            </router-link>
          </v-toolbar>
        </template>
        <template #[`item.actions`]="{ item }">
          <router-link :to="`/jobs/${item.id}`">
            <v-icon small class="mr-2">
              mdi-eye
            </v-icon>
          </router-link>
          <router-link :to="`/jobs/edit/${item.id}`">
            <v-icon small class="mr-2">
              mdi-pencil
            </v-icon>
          </router-link>
          <v-icon small @click="deleteItem(item.id)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    dialogDelete: false,
    loading: false,
    headers: [
      {
        text: 'Title',
        align: 'start',
        sortable: false,
        value: 'title'
      },
      { text: 'type', value: 'type', sortable: false },
      { text: 'Address', value: 'address', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    jobs: []
  }),
  async fetch () {
    this.loading = true
    this.jobs = await this.$store.dispatch('job/browse', `?search=${''}`)
    this.loading = false
  },
  methods: {
    deleteItem (id) {
      this.$confirm({
        message: 'Are you sure you want to delete this job?',
        button: {
          no: 'No',
          yes: 'Yes'
        },
        /**
         * Callback Function
         * @param {Boolean} confirm
         */
        callback: (confirm) => {
          if (confirm) {
            this.$store.dispatch('job/delete', id).then(() => {
              this.$fetch()
            })
          }
        }
      })
    }
  }
}
</script>
