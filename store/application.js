import httpResource from '@/http/application'

export default {
  namespaced: true,

  actions: {
    /**
     *
     * @param store
     * @param payload
     * @return {Promise<unknown>}
     */
    browse ({ dispatch }, payload) {
      return new Promise((resolve, reject) => {
        httpResource
          .browse(payload)
          .then(response => resolve(response))
          .catch(error =>
            dispatch('app/handleError', { reject, error }, { root: true })
          )
      })
    },

    view ({ dispatch }, payload) {
      return new Promise((resolve, reject) => {
        httpResource
          .view(payload.id, payload.params)
          .then(response => resolve(response))
          .catch(error =>
            dispatch('app/handleError', { reject, error }, { root: true })
          )
      })
    },

    /**
     *
     * @param store
     * @param payload
     * @return {Promise<unknown>}
     */
    create ({ dispatch }, payload) {
      return new Promise((resolve, reject) => {
        httpResource
          .create(payload)
          .then(response => resolve(response))
          .catch(error =>
            dispatch('app/handleError', { reject, error }, { root: true })
          )
      })
    },

    /**
     *
     * @param store
     * @param payload {{
     *     id: number,
     *     data: Record<string, any>
     * }}
     * @return {Promise<unknown>}
     */
    update ({ dispatch }, payload) {
      return new Promise((resolve, reject) => {
        httpResource
          .update(payload.id, payload.data)
          .then(response => resolve(response))
          .catch(error =>
            dispatch('app/handleError', { reject, error }, { root: true })
          )
      })
    },

    /**
     *
     * @param store
     * @param payload
     * @return {Promise<unknown>}
     */
    delete ({ dispatch }, payload) {
      return new Promise((resolve, reject) => {
        httpResource
          .delete(payload)
          .then(response => resolve(response))
          .catch(error =>
            dispatch('app/handleError', { reject, error }, { root: true })
          )
      })
    }
  }
}
