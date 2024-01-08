import {
  makeProviders,
  makeStandardFetcher,
  getBuiltinSources,
  MovieMedia,
  targets,
} from "@movie-web/providers";

export const providers = makeProviders({
  fetcher: makeStandardFetcher(fetch),
  consistentIpForRequests: true,
  target: targets.NATIVE,
});
