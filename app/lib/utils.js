import {countries} from '~/data/countries';
// export default function getLocaleFromRequest(request) {
//     // Get the user request URL
//     const url = new URL(request.url);
  
//     // Match the URL host
//     switch (url.host) {
//       case 'atp-klaviyo-b4141f24525fa954bdbd.o2.myshopify.dev':
//         // This regex matches `/fr/` paths in the request
//         if (/^\/fr($|\/)/.test(url.pathname)) {
//             return countries['fr-fr'];
//           } 
//           break;
//           default:
//             return countries['default'];
//     }
//   }

  
  export function getApproximateLocaleFromRequest(request){
    const url = new URL(request.url);
  
    // Get the accept-language header
    const acceptLang = request.headers.get('accept-language');
  
    // Do something with accept language.
    // For example:
    if(acceptLang.includes('fr-FR')) {
      return {
        language: 'FR',
        country: 'FR',
      };
    }
  
    // Use the default locale
    return {
      language: 'EN',
      country: 'US',
    };
  }