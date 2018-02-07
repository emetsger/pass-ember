import ENV from 'pass-ember/config/environment';
import FedoraJsonLdAdapter from './fedora-jsonld';


function getPort() {
  if (!ENV.api.port) {
    return window.location.port;
  } else {
    return ENV.api.port;
  }
}

function getHost() {
  // If ENV.api.host is not specified derive from window.location

  if (ENV.api.host) {
    return ENV.api.host;
  } else {
    return window.location.protocol + "//" + window.location.hostname + ":" + getPort();
  }
}

export default FedoraJsonLdAdapter.extend({
  host: getHost(),
  namespace: ENV.api.namespace
});
