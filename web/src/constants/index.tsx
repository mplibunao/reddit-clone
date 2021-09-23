// for development with docker

// when we are using ssr, the node server for nextjs makes the request to the
// server so we need to use the service name

// when we are using cliend-side rendering, the browser makes the request so we
// can use localhost instead

// I think only env variables prefixed with NEXT_PUBLIC are loaded into the browser.

// For prod we can just use the value I think
export const URL =
  process.env.GRAPH_API_HOST || process.env.NEXT_PUBLIC_GRAPH_API_HOST
