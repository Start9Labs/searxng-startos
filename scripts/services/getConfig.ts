// To utilize the default config system built, this file is required. It defines the *structure* of the configuration file. These structured options display as changeable UI elements within the "Config" section of the service details page in the StartOS UI.

import { compat, types as T } from "../deps.ts";

export const getConfig: T.ExpectedExports.getConfig = compat.getConfig({
  "tor-address": {
    name: "Tor Address",
    description: "The Tor address of the network interface",
    type: "pointer",
    subtype: "package",
    "package-id": "searxng",
    target: "tor-address",
    interface: "main",
  },
  "lan-address": {
    name: "LAN Address",
    description: "The LAN address of the network interface",
    type: "pointer",
    subtype: "package",
    "package-id": "searxng",
    target: "lan-address",
    interface: "main",
  },
  // "tor-only": {
  //   "name": "Enable Tor",
  //   "description": "Enables your search engine on the Tor Network.",
  //   "type": "boolean",
  //   "default": false,
  // },
  // "autocomplete": {
  //   "name": "Enable Autocomplete",
  //   "description": "Turns on autocomplete when using SearXNG. This will send data to your Start9 server while typing, before pressing the search button and use multiple known search engines to return frequently searched terms. Note: This will decrease performance of the website when typing, and will make calls to the search engines before the search button is pressed.",
  //   "type": "boolean",
  //   "default": false,
  // },
  "instance-name": {
    type: "string",
    name: "SearXNG Instance Name",
    description:
      "Enter a name for your SearXNG instance. This is the name that will be listed if you want to share your SearXNG engine publicly.",
    nullable: false,
    default: "My SearXNG Engine",
    placeholder: "Uncle Jim SearXNG Engine",
  },
  "enable-metrics": {
    name: "Enable Stats",
    description:
      "Your SearXNG instance will collect anonymous stats about its own usage and performance. You can view these metrics by appending `/stats` or `/stats/errors` to your SearXNG URL.",
    type: "boolean",
    default: true,
  }, //,
  // "email-address": {
  //   "type": "string",
  //   "name": "Email Address",
  //   "description": "Your Email address - required to create an SSL certificate.",
  //   "nullable": false,
  //   "default": "youremail@domain.com",
  // },
  // "public-host": {
  //   "type": "string",
  //   "name": "Public Domain Name",
  //   "description": "Enter a domain name here if you want to share your SearXNG engine publicly. You will also need to modify your domain name's DNS settings to point to your Start9 server.",
  //   "nullable": true,
  //   "placeholder": "https://search.mydomain.com"
  // }
});
