const TMDB_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmN2NhZTRkMjY3MjdkYzg5OTk5NmE1NmVmMmVkMDM5MiIsInN1YiI6IjVjZTgxMzY2YzNhMzY4MTMzZDFlMGYyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NL9I-7cAcXaDUFmHJcwlLGbTrlKwgaE1-qe_GtNm1M0";

export const getConfigurationTMDB = () => {
  return fetch(`https://api.themoviedb.org/3/configuration`, {
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
  }).then((res) => res.json());
};

export const getFromTMDB = (name: string, page: number | null = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
      name
    )}&include_adult=false&language=en-US&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    }
  ).then((res) => res.json());
};

class TMDB {
  token;
  url = "https://api.themoviedb.org/3";
  config?: any;
  headers = {};

  constructor() {
    this.token = TMDB_TOKEN;
    this.headers = {
      Authorization: `Bearer ${this.token}`,
    };
    this.getConfig();
  }

  async getConfig() {
    this.config = await this.request(`configuration`).then((res) => res.json());
  }

  async search(name: string, page: number | null = 1) {
    return this.request(
      `search/multi?query=${encodeURIComponent(
        name
      )}&include_adult=false&language=en-US&page=${page}`
    ).then((res) => res.json());
  }

  request(url: string, customHeaders: object | null = null) {
    return fetch(`${this.url}/${url}`, {
      headers: {
        ...this.headers,
        ...customHeaders,
      },
    });
  }

  async getTvItem(id: string) {
    return this.request(`tv/${id}`).then((res) => res.json());
  }

  async getTvItemEpisodes(id: string, seasonNumber: number) {
    return this.request(`tv/${id}/season/${seasonNumber}`).then((res) =>
      res.json()
    );
  }

  constructImageUrl(url: string, width?: string) {
    return this.config.images.secure_base_url + (width || "w500") + url;
  }
}

const tmdbInstance = new TMDB();

export default tmdbInstance;
