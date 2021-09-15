<template>
  <div>
    <v-row justify="center">
      <v-col cols="6">
        <v-text-field
          v-model="search"
          height="20"
          filled
          label="Search Jobs"
          prepend-inner-icon="mdi-briefcase-search"
          @input="$fetch()"
        />
        <v-card
          v-for="job in jobs"
          :key="job.id"
          :loading="loading"
          elevation="2"
          class="mb-5"
          shaped
        >
          <v-card-title primary-title>
            #{{ job.title }}
          </v-card-title>
          <v-card-subtitle>{{ job.address }}</v-card-subtitle>
          <v-card-text>
            <v-chip
              v-for="(skill, index) in job.skills"
              :key="index"
              class="mr-2"
            >
              {{ skill }}
            </v-chip>
          </v-card-text>
          <v-card-actions>
            <v-chip
              v-if="job.type === 'full-time'"
              class="ma-2"
              color="pink"
              small
              label
              text-color="white"
            >
              #Full-Time
            </v-chip>
            <v-chip v-else class="ma-2" color="primary" small label>
              #Part-Time
            </v-chip>
            <v-spacer />
            <router-link :to="`/career/${job.id}`">
              <v-btn small class="ma-2" color="success">
                Apply
                <v-icon right dark>
                  mdi-book-arrow-right-outline
                </v-icon>
              </v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  layout: 'career',
  data () {
    return {
      loading: false,
      jobs: [],
      search: ''
    }
  },
  async fetch () {
    this.loading = true
    this.jobs = await this.$store.dispatch(
      'job/browse',
      `?search=${this.search}`
    )
    this.loading = false
  }
}
</script>
