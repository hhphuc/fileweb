const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080';

enum ApiMethod {
  GET = 'GET',
}

export enum ApiEndpoint {
  FS = 'fs',
}

const apiHelper = {
  get: async (endPoint: string, query?: Record<string, string>) => {
    let url = `${apiUrl}/${endPoint}`;

    if (query) {
      const queryParams = new URLSearchParams(query).toString();
      url += `?${queryParams}`;
    }

    const config = {
      method: ApiMethod.GET,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const fetchResult = await fetch(url, config);
    return fetchResult.json();
  }
};

export default apiHelper;