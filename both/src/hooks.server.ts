import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  if (event.url.pathname.startsWith('/api/')) {
    console.log("event.url--",event.url);

    console.log("index of ", event.url.href.slice(event.url.href.indexOf('api/') + 3 ), "\n\n");
    
    // what is it -->> give me the index of api/  and + 3 (letter in api) and start from '/' and go to the end
    const apiPath = event.url.href.slice(event.url.href.indexOf('api/') + 3 ); // Remove '/api' prefix
    const goBackendUrl = `http://localhost:4696${apiPath}`;
    
    console.log("the backend url in contianer for req-->>",goBackendUrl);
    

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
  String('').indexOf

  return resolve(event);
};