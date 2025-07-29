// NOTE: We haven't had any specific requests yet for which oEmbed providers to support
// (the mainstream ones). The full list of supported providers can be found
// in the official oEmbed providers JSON at https://oembed.com/providers.json.
// We can pick and add whichever ones we want to enable here.
const OEMBED_PROVIDERS = [
  {
    provider_name: "YouTube",
    provider_url: "https://www.youtube.com/",
    endpoints: [
      {
        schemes: [
          "https://*.youtube.com/watch*",
          "https://*.youtube.com/v/*",
          "https://youtu.be/*",
        ],
        url: "https://www.youtube.com/oembed",
        discovery: true,
      },
    ],
  },
  {
    provider_name: "Vimeo",
    provider_url: "https://vimeo.com/",
    endpoints: [
      {
        schemes: [
          "https://vimeo.com/*",
          "https://vimeo.com/album/*/video/*",
          "https://vimeo.com/channels/*/*",
          "https://vimeo.com/groups/*/videos/*",
          "https://vimeo.com/ondemand/*/*",
          "https://player.vimeo.com/video/*",
        ],
        url: "https://vimeo.com/api/oembed.{format}",
        discovery: true,
      },
    ],
  },
];

export default OEMBED_PROVIDERS;
