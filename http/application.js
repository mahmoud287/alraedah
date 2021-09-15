import axios from '@/plugins/axios'

export default {
  /**
   * Display a listing of the resource.
   *
   * @param data
   * @return {*}
   */
  browse (data = { search: '' }) {
    return axios.get('/application', data)
  },
  /**
   * Display the specified resource.
   *
   * @param id
   * @return {*}
   */
  view (id) {
    return axios.get(`/application/${id}`)
  },
  /**
   * Store a newly created resource in storage.
   * @param data
   * @return {*}
   */
  create (data) {
    return axios.post('/application', data)
  },
  /**
   * Update the specified resource in storage.
   *
   * @param id
   * @param data
   * @return {*}
   */
  update (id, data) {
    return axios.post(`/application/${id}`, data)
  },
  /**
   * Remove the specified resource from storage.
   *
   * @param id
   * @return {*}
   */
  delete (id) {
    return axios.delete(`/application/${id}`)
  }
}
