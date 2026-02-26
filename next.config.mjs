import withPWA from 'next-pwa'

const isDev = process.env.NODE_ENV === 'development'

const config = {
  reactStrictMode: true,
}

export default withPWA({
  dest: 'public',
  disable: isDev,
  register: true,
  skipWaiting: true,
})(config)
