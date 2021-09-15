<template>
  <div>
    <v-breadcrumbs large>
      <template #divider>
        <v-icon>mdi-forward</v-icon>
      </template>
    </v-breadcrumbs>
    <v-dialog v-model="dialog" max-width="900px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Job Application</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" lazy-validation>
              <v-row justify="space-between">
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="applicationFrom.name"
                    label="Full Name"
                    :rules="[v => !!v || 'Name is required']"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="applicationFrom.phone"
                    label="Phone"
                    :rules="[v => !!v || 'Phone is required']"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="applicationFrom.email"
                    :rules="[
                      v => !!v || 'E-mail is required',
                      v => /.+@.+/.test(v) || 'E-mail must be valid'
                    ]"
                    label="E-mail"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-file-input
                    v-model="applicationFrom.resume"
                    :rules="[
                      value =>
                        !value ||
                        value.size < 2000000 ||
                        'Resume size should be less than 2 MB!'
                    ]"
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="Resume"
                    prepend-icon="mdi-file-account-outline"
                    label="Resume"
                  />
                </v-col>

                <v-col cols="12" md="6">
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
            </v-form>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="submit">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card :loading="loading" class="mx-auto">
      <template slot="progress">
        <v-progress-linear color="deep-purple" height="10" indeterminate />
      </template>

      <v-system-bar class="transparent" dark>
        <v-spacer />
        <v-btn small class="ma-2" color="success" @click="dialog = true">
          Apply Now
          <v-icon right>
            mdi-book-arrow-right-outline
          </v-icon>
        </v-btn>
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
        <v-chip v-for="(item, index) in job.skills" :key="index" class="mr-2">
          {{ item }}
        </v-chip>
      </v-card-text>
    </v-card>
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
    applicationFrom: {
      job_id: null,
      name: null,
      phone: null,
      email: null,
      resume: null,
      status: 'Created',
      skills: []
    },
    skill: '',
    selectedSkills: [],
    dialog: false
  }),
  async fetch () {
    this.loading = true
    this.job = await this.$store.dispatch('job/view', this.$route.params.id)
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
        this.applicationFrom.skills = this.selectedSkills.map((skill) => {
          return skill.text
        })
        this.applicationFrom.job_id = this.$route.params.id
        this.$store
          .dispatch('application/create', this.applicationFrom)
          .then(() => {
            this.$router.push('/career')
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
