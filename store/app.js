export default {
  namespaced: true,
  state: () => ({
    listOfSkills: [
      { text: '.NET' },
      { text: 'JavaScript' },
      { text: 'SQL' },
      { text: 'Java' },
      { text: 'Ruby' },
      { text: 'PHP' },
      { text: 'Python' },
      { text: 'C' },
      { text: 'C++' },
      { text: 'C#' },
      { text: '.NET' },
      { text: 'HTML' },
      { text: 'CSS' },
      { text: 'Web API' },
      { text: 'Microsoft ASP.NET MVC' }
    ]
  }),
  actions: {
    /**
     *
     * @param store
     * @param payload
     */
    async handleError (store, payload) {
      if (payload.error.response) {
        switch (payload.error.response.status) {
          case 401:
            await this.app.router.push('/error-403')
            break
          case 403:
            await this.app.router.push('/error-403')
            break
          case 422:
            // eslint-disable-next-line no-case-declarations
            const reformatted = {}
            payload.error.response.data.errors.forEach((error) => {
              // eslint-disable-next-line no-prototype-builtins
              if (reformatted.hasOwnProperty(error.param)) {
                reformatted[error.param].push(error.msg)
              } else {
                reformatted[error.param] = [error.msg]
              }
            })
            payload.reject(reformatted)
            break
          default:
            payload.reject(payload.error)
        }
      } else {
        // eslint-disable-next-line no-console
        console.log(payload, payload.error)
      }
    }
  }
}
