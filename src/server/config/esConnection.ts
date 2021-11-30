"use strict";

import { Client, ApiResponse, RequestParams } from "@elastic/elasticsearch";

const client = new Client({ node: "http://localhost:9200" });

async function run(): Promise<void> {
  const indices = ["users", "songs", "submissions", "comments", "prompts"];
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
