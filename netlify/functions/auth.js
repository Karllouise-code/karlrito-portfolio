exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ authenticated: false, message: 'Method not allowed' }),
    };
  }

  try {
    const { password } = JSON.parse(event.body);
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ authenticated: false, message: 'Server misconfiguration' }),
      };
    }

    if (password === adminPassword) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ authenticated: true }),
      };
    }

    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ authenticated: false }),
    };
  } catch (err) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ authenticated: false, message: 'Invalid request' }),
    };
  }
};
