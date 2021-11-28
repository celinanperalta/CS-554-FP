'use strict'

import { Client, ApiResponse, RequestParams } from '@elastic/elasticsearch'

const client = new Client({ node: 'http://localhost:9200' })


function run (): void {
}

export default client;