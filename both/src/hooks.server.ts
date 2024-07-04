import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  if (event.url.pathname.startsWith('/api/')) {
    // console.log("event.url--",event.url.href);
    
    const apiPath = event.url.href.slice(25); // Remove '/api' prefix
    const goBackendUrl = `http://localhost:4696${apiPath}`;
    
    // console.log("the backend url for req-->>",goBackendUrl);
    

    const response = await fetch(goBackendUrl, {
      method: event.request.method,
      headers: event.request.headers,
      body: event.request.method !== 'GET' && event.request.method !== 'HEAD' ? await event.request.blob() : undefined,
    });

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  }

  return resolve(event);
};