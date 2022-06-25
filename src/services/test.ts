import request from '@/utils/request'

export function testApi() {
  return request('/api/test', {
    method: 'GET',
  })
}
