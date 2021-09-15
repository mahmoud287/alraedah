<template>
  <div>
    <v-breadcrumbs
      large
      :items="[
        { text: 'Jobs', disabled: false, href: '/jobs' },
        { text: 'Edit Job', disabled: true }
      ]"
    >
      <template #divider>
        <v-icon>mdi-forward</v-icon>
      </template>
    </v-breadcrumbs>

    <v-card :loading="loading">
      <v-card-title class="text-h5">
        Edit Job - {{ jobForm.title }}
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row justify="space-between">
            <!--Job Title-->
            <v-col cols="12" lg="6">
              <v-text-field
                v-model="jobForm.title"
                :rules="[v => !!v || 'Job title is required']"
                label="Job Title"
                required
              />
            </v-col>
            <!--Job Address-->
            <v-col cols="12" lg="6">
              <v-text-field
                v-model="jobForm.address"
                :rules="[v => !!v || 'Job address is required']"
                label="Job Address"
                required
              />
            </v-col>
            <!--Job Type-->
            <v-col cols="12" lg="6">
              <v-select
                v-model="jobForm.type"
                :items="jobTypes"
                label="Job Type"
                required
              />
            </v-col>
            <!--Job Type-->
            <v-col cols="12" lg="6">
              <vue-tags-input
                v-model="skill"
                class="v-text-field v-input tags-input"
                :tags="selectedSkills"
                :placeholder="'Add a skill'"
                :autocomplete-items="filteredItems"
                @tags-changed="newSkills => (selectedSkills = newSkills)"
              />
            </v-col>
          </v-row>

          <!--Job description-->
          <quill-editor v-model="jobForm.description" class="mb-2" />

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="submit"
          >
            Save
          </v-btn>

          <v-btn color="error" class="mr-4" @click="$router.push('/jobs')">
            cancel
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    valid: true,
    jobForm: {
      title: '',
      address: '',
      description: null,
      type: 'full-time',
      skills: [],
      category: [],
      applications: []
    },
    skill: '',
    selectedSkills: [],
    jobTypes: ['full-time', 'part-time']
  }),
  async fetch () {
    this.loading = true
    await this.$store.dispatch('job/view', this.$route.params.id).then((res) => {
      this.jobForm = res
      this.selectedSkills = res.skills.map((skill) => {
        return { text: skill }
      })
    })
    this.loading = false
  },
  computed: {
    filteredItems () {
      return this.$store.state.app.listOfSkills.filter((i) => {
        return i.text.toLowerCase().includes(this.skill.toLowerCase())
      })
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.jobForm.skills = this.selectedSkills.map((skill) => {
          return skill.text
        })
        this.$store
          .dispatch('job/update', {
            id: this.jobForm.id,
            data: this.jobForm
          })
          .then((res) => {
            this.$router.push(`/jobs/${res.data.id}`)
          })
      }
    }
  }
}
</script>
<style lang="scss">
.vue-tags-input {
  max-width: 100% !important;
}
.tags-input {
  width: 100%;
  max-width: none;
  .ti-input {
    width: 100%;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.42);
    padding: 2px 12px;
    input {
      font-weight: 400;
      font-size: 16px;
    }
  }
}

.ql-editor {
  min-height: 250px;
}
</style>
