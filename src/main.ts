import { invoke } from "@tauri-apps/api/tauri";
import { XMLHttpRequestInterceptor } from '@mswjs/interceptors/XMLHttpRequest'
import "htmx.org";

type RequestDataStore = {
  path: string;
  params: any;
}
let requestData: RequestDataStore;

document.body.addEventListener('htmx:beforeSend', (d) => {
  const detail = (d as CustomEvent<any>).detail;
  requestData = {
    path: detail.pathInfo.finalRequestPath,
    params: detail.requestConfig.parameters
  }
});
const interceptor = new XMLHttpRequestInterceptor();
interceptor.apply();
interceptor.on('request', async ({ request }) => {
  const tauriResponse = await invoke<string>(requestData.path, requestData.params);
  request.respondWith(new Response(tauriResponse, {
    status: 200
  }))
});
