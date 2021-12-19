"use strict";

import { Client, ApiResponse, RequestParams, errors} from "@elastic/elasticsearch";
require('dotenv').config();
const client = new Client({
  cloud: {
    id: process.env.CLOUD_ID
  },
  auth: {
    apiKey: process.env.APIKEY
  }
});
async function run(): Promise<void> {
  const indices = ["users", "songs", "songsubmissions", "comments", "prompts"];
  for (const index of indices) {
    if (!(await client.indices.exists({ index: index }))) {
      const createUsersIndexResponse: ApiResponse = await client.indices.create(
        {
          index: index,
          body: {},
        }
      );
    }
  }
}

export const seed = async () => {
  console.log("Starting up ES...");
  try {
    await run();
  } catch (error) {
    console.error(error);
  }
};

export default client;
