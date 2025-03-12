module.exports = {
    cookies: () => ({
      get: (name:string) => {
        if (name === 'Authorization') {
          return { value: 'test-token' };
        }
        return null;
      }
    })
  };