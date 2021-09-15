import axios from '@/plugins/axios'

export default {
  /**
   * Display a listing of the resource.
   *
   * @param queryParams
   * @return {*}
   */
  browse (queryParams = '') {
    return axios.get(`/job${queryParams}`)
  },
  /**
   * Display the specified resource.
   *
   * @param id
   * @return {*}
   */
  view (id) {
    return axios.get(`/job/${id}`)
  },
  /**
   * Store a newly created resource in storage.
   * @param data
   * @return {*}
   */
  create (data) {
    return axios.post('/job', data)
  },
  /**
   * Update the specified resource in storage.
   *
   * @param id
   * @param data
   * @return {*}
   */
  update (id, data) {
    return axios.post(`/job/${id}`, data)
  },
  /**
   * Remove the specified resource from storage.
   *
   * @param id
   * @return {*}
   */
  delete (id) {
    return axios.delete(`/job/${id}`)
  }
}
