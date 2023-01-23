export async function keepAlive() {
    const url = '/api/alive/';
    const options = {
      method: 'PUT',
    };
    await fetch(url, options);
  }