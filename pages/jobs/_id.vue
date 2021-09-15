<template>
  <div>
    <v-breadcrumbs
      large
      :items="[
        { text: 'Jobs', disabled: false, href: '/jobs' },
        { text: job.title, disabled: true }
      ]"
    >
      <template #divider>
        <v-icon>mdi-forward</v-icon>
      </template>
    </v-breadcrumbs>

    <v-card :loading="loading" class="mx-auto">
      <template slot="progress">
        <v-progress-linear color="deep-purple" height="10" indeterminate />
      </template>

      <v-system-bar class="transparent">
        <v-spacer />
        <router-link :to="`/jobs/edit/${job.id}`">
          <v-btn rounded text class="mt-5">
            <v-icon small class="mr-2">
              mdi-pencil
            </v-icon>
            Edit
          </v-btn>
        </router-link>
      </v-system-bar>

      <!--Top Header-->
      <v-card-title>{{ job.title }}</v-card-title>
      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-rating
            :value="4.5"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          />

          <div class="grey--text ms-4">
            4.5 (413)
          </div>
        </v-row>

        <div class="d-flex align-center my-4 text-subtitle-1 text-uppercase">
          <v-icon>mdi-alarm</v-icon> • {{ job.type }}
        </div>
        <div class="d-flex align-center my-0 text-subtitle-1">
          <v-icon>mdi-map-marker-check-outline</v-icon> • {{ job.address }}
        </div>
      </v-card-text>

      <!--Top Description-->
      <v-card-title>Description</v-card-title>
      <v-card-text>
        <!-- eslint-disable-next-line vue/no-v-html-->
        <div v-html="job.description" />
      </v-card-text>
      <v-divider class="mx-4" />

      <!--Top Skills-->
      <v-card-title>Skills</v-card-title>
      <v-card-text>
        <v-chip v-for="(skill, index) in job.skills" :key="index" class="mr-2">
          {{ skill }}
        </v-chip>
      </v-card-text>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="job.applications"
      :loading="loading"
      class="mt-4 elevation-2"
    >
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>Job Applications</v-toolbar-title>
          <v-divider class="mx-4" inset vertical />
        </v-toolbar>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-menu bottom left light>
          <template #activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-if="item.resume"
              @click="downloadResume(item.resume)"
            >
              <v-list-item-title>Download Resume</v-list-item-title>
            </v-list-item>
            <v-list-item @click="updateStatus(item, 'Completed')">
              <v-list-item-title>Completed</v-list-item-title>
            </v-list-item>
            <v-list-item @click="updateStatus(item, 'Accepted')">
              <v-list-item-title>Accepted</v-list-item-title>
            </v-list-item>
            <v-list-item @click="updateStatus(item, 'Rejected')">
              <v-list-item-title>Rejected</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-icon small @click="deleteItem(item.id)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <vue-confirm-dialog />
  </div>
</template>
<script>
export default {
  data: () => ({
    loading: false,
    job: {
      title: '',
      address: '',
      description: null,
      type: 'full-time',
      skills: [],
      category: [],
      applications: []
    },
    headers: [
      {
        text: 'Name',
        align: 'start',
        sortable: false,
        value: 'name'
      },
      { text: 'Phone', value: 'phone', sortable: false },
      { text: 'Email', value: 'email', sortable: false },
      { text: 'Status', value: 'status', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false }
    ]
  }),
  async fetch () {
    this.loading = true
    this.job = await this.$store.dispatch('job/view', this.$route.params.id)
    this.loading = false
  },
  methods: {
    updateStatus (item, newStatus) {
      const form = JSON.parse(JSON.stringify(item))
      form.status = newStatus
      this.$store
        .dispatch('application/update', {
          id: form.id,
          data: form
        })
        .then(() => {
          this.$fetch()
        })
    },
    deleteItem (id) {
      this.$confirm({
        message: 'Are you sure you want to delete this application?',
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
            this.$store.dispatch('application/delete', id).then(() => {
              this.$fetch()
            })
          }
        }
      })
    },
    downloadResume (resume) {
      this.$axios({
        url: resume.url,
        method: 'GET',
        responseType: 'blob'
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', resume.name)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
    }
  }
}
</script>
